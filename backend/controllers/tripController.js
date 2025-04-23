const axios = require("axios");
const Itinerary = require("../models/Itinerary");

exports.travelPlanner = async (req, res) => {
  try {
    const { from, destination, startDate, endDate, interests, budget } = req.body;

    if (!destination || !startDate || !endDate || !budget) {
      return res.status(400).json({ message: "Please provide all required fields." });
    }

    // Parse budget string to extract currency and amount
    // The budget comes in format "USD 1000" or "INR 50000"
    const budgetParts = budget.split(' ');
    const currency = budgetParts[0]; // "USD" or "INR"
    const budgetAmount = budgetParts[1]; // The numeric amount

    // Determine currency symbol for prompt
    const currencySymbol = currency === "INR" ? "₹" : "$";

    const prompt = `
Create a personalized travel itinerary for a trip from ${from} to ${destination} from ${startDate} to ${endDate}.
The traveler's total budget is ${currencySymbol}${budgetAmount} ${currency}. Interests: ${interests || "general tourism"}.

Format your response as a daily itinerary where each day includes activities and their estimated costs in ${currency}.
Please be practical and specific with cost estimates for each activity in ${currency}.
Avoid generic recommendations and don't include shopping activities.

Format:
Day X: Activity 1 (${currencySymbol}[cost]), Activity 2 (${currencySymbol}[cost]), etc.
`;

    const response = await axios.post(
      "https://api.together.xyz/v1/chat/completions",
      {
        model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
        messages: [
          { 
            role: "system", 
            content: `You are a helpful travel planner assistant. Provide detailed itineraries with practical advice and cost estimates in ${currency}. Don't include shopping activities and focus on authentic local experiences.` 
          },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1000,
        top_p: 0.9
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const plan =
      response.data?.choices?.[0]?.message?.content ||
      response.data?.choices?.[0]?.content;

    if (!plan) {
      console.error("❌ No plan content found in response:", response.data);
      return res.status(500).json({ message: "No itinerary received from AI." });
    }

    // Parse the plan into structured format
    const lines = plan.trim().split("\n");
    const structuredItinerary = [];
    let currentDay = null;

    lines.forEach((line) => {
      const trimmed = line.trim();
      const match = trimmed.match(/^Day\s*(\d+):/i);
      if (match) {
        currentDay = parseInt(match[1]);
        structuredItinerary.push({ day: currentDay, activity: trimmed });
      } else if (currentDay !== null && trimmed) {
        structuredItinerary[structuredItinerary.length - 1].activity += `\n${trimmed}`;
      }
    });

    // Save to MongoDB with currency information
    const savedItinerary = await Itinerary.create({
      from,
      destination,
      startDate,
      endDate,
      interests,
      budget: budgetAmount,
      currency,
      itinerary: structuredItinerary
    });

    res.status(200).json({
      message: "Travel plan generated and saved successfully",
      travelPlan: plan,
      currency,
      id: savedItinerary._id,
    });

  } catch (error) {
    console.error("❌ Error generating travel plan:");
    console.error(error.response?.data || error.message || error);
    res.status(500).json({ message: "Failed to generate travel plan." });
  }
};