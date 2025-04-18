const axios = require("axios");
const Itinerary = require("../models/Itinerary"); // 👈 Import MongoDB model


exports.travelPlanner = async (req, res) => {
  try {
    const { destination, startDate, endDate, interests, budget } = req.body;

    if (!destination || !startDate || !endDate || !budget) {
      return res.status(400).json({ message: "Please provide all required fields." });
    }

    const prompt = `
Create a personalized travel itinerary for a trip to ${destination} from ${startDate} to ${endDate}.
The traveler's total budget is ${budget} USD. Interests: ${interests || "general tourism"}.

Format:
Day X: Activity 1 (estimated cost), Activity 2 (estimated cost), etc.
`;

    const response = await axios.post(
      "https://api.together.xyz/v1/chat/completions",
      {
        model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
        messages: [
          { role: "system", content: "You are a helpful travel planner assistant. and dont add shopping in travelling ande also be practical guid" },
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

    // 🧠 Parse the plan into structured format
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
        structuredItinerary[structuredItinerary.length - 1].activity += ` ${trimmed}`;
      }
    });

    // 💾 Save to MongoDB
    const savedItinerary = await Itinerary.create({
      destination,
      startDate,
      endDate,
      interests,
      budget,
      itinerary: structuredItinerary
    });

    res.status(200).json({
      message: "Travel plan generated and saved successfully",
      travelPlan: plan,
      id: savedItinerary._id,
    });

  } catch (error) {
    console.error("❌ Error generating travel plan:");
    console.error(error.response?.data || error.message || error);
    res.status(500).json({ message: "Failed to generate travel plan." });
  }
};
