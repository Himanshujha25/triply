const axios = require("axios");
const Itinerary = require("../models/Itinerary");

exports.travelPlanner = async (req, res) => {
  try {
    const { from, destination, startDate, endDate, interests, budget } = req.body;

    // 1️⃣ Validate inputs
    if (!from || !destination || !startDate || !endDate || !budget) {
      return res.status(400).json({ message: "Please provide all required fields." });
    }

    const parts = budget.trim().split(" ");
    if (parts.length !== 2) {
      return res.status(400).json({ message: "Budget must be in format: 'INR 1000'" });
    }

    const currency = parts[0].toUpperCase();
    const amount = parts[1];
    const symbol = currency === "INR" ? "₹" : "$";

    // 2️⃣ Calculate trip duration
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1);
    const dailyBudget = (amount / days).toFixed(0);

    // 3️⃣ AI Prompt
    const prompt = `
Create a detailed ${days}-day travel itinerary from ${from} to ${destination} (${startDate} - ${endDate}).
Total budget: ${symbol}${amount} (${currency}). Daily budget ≈ ${symbol}${dailyBudget}.
User interests: ${interests || "general tourism"}.

For each day, use this exact structure:

Day 1: [Short title]
Morning:
• Activity - Description
  Cost: ${symbol}XXX | Duration: X hrs
Afternoon:
• Activity - Description
  Cost: ${symbol}XXX | Duration: X hrs
Evening:
• Activity - Description
  Cost: ${symbol}XXX | Duration: X hrs
💡 Tip: [Local advice]
🍽️ Food: [Local dish]
Avoid shopping activities.
`;

    // 4️⃣ API call
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "system",
            content: `You are a structured travel itinerary generator. Keep responses consistent and clearly labeled by days.`
          },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 2000
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    // 5️⃣ Extract and parse AI response
    const text =
      response?.data?.choices?.[0]?.message?.content ||
      response?.data?.choices?.[0]?.content;

    if (!text) {
      return res.status(500).json({ message: "No itinerary returned by AI." });
    }

    const lines = text.split(/\r?\n/);
    const itinerary = [];
    let current = null;
    let content = [];

    for (const line of lines) {
      const trimmed = line.trim();
      const match = trimmed.match(/^Day\s*(\d+)[\s:.-]*/i);

      if (match) {
        if (current && content.length > 0) {
          itinerary.push({
            day: current,
            activities: content.join("\n").trim()
          });
        }
        current = parseInt(match[1]);
        content = [trimmed];
      } else if (current && trimmed) {
        content.push(trimmed);
      }
    }

    // Push last day
    if (current && content.length > 0) {
      itinerary.push({ day: current, activities: content.join("\n").trim() });
    }

    // Fallback in case no "Day X" detected
    if (itinerary.length === 0) {
      itinerary.push({ day: 1, activities: text.trim() });
    }

    // 6️⃣ Save to MongoDB
    const saved = await Itinerary.create({
      from,
      destination,
      startDate,
      endDate,
      interests,
      budget: amount,
      currency,
      itinerary
    });

    // 7️⃣ Return result
    res.status(200).json({
      message: "Travel plan generated successfully",
      summary: {
        totalDays: itinerary.length,
        budget: `${symbol}${amount}`,
        currency
      },
      itinerary,
      id: saved._id
    });

  } catch (err) {
    console.error("❌ Travel plan error:", err.response?.data || err.message);
    res.status(500).json({ message: "Failed to generate travel plan.", error: err.message });
  }
};
