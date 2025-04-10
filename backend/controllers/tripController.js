const axios = require("axios");

exports.travelPlanner = async (req, res) => {
  const { destination, startDate, endDate, interests, budget } = req.body;

  if (!destination || !startDate || !endDate || !budget) {
    return res.status(400).json({ message: "Please provide all required fields." });
  }

  const prompt = `
Create a personalized travel itinerary for a trip to ${destination} from ${startDate} to ${endDate}.
The traveler's total budget is ${budget} USD. Interests: ${interests || "general tourism"}.

Format:
Day X: Activity 1 (estimated cost), Activity 2 (estimated cost), etc.

Guidelines:
- Also check the currency logo or currency name used by user
- Stay within the budget
- Include top attractions & hidden gems
- Suggest food, transport, and local tips
- Mention estimated cost in USD after each activity
- Ensure total cost doesn’t exceed budget
`;

  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error("❌ OPENAI_API_KEY is missing in environment variables.");
      return res.status(500).json({ message: "Server configuration error." });
    }

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful travel planner assistant." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7
      },
      {
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        }
      }
    );

    const plan =
      response.data?.choices?.[0]?.message?.content ||
      response.data?.choices?.[0]?.content;

    if (!plan) {
      console.error("❗ No content in OpenAI response:", response.data);
      return res.status(500).json({ message: "AI did not return a travel plan." });
    }

    res.status(200).json({ travelPlan: plan });

  } catch (error) {
    console.error("❌ OpenAI API error:", {
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers,
      message: error.message
    });
    res.status(500).json({
      message:
        error.response?.data?.error?.message || "Failed to generate travel plan."
    });;
  }
};
