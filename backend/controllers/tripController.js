const TripPlan = require('../models/tripPlan');  
const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios'); // For fetching images from Pexels

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const predefinedPreferences = [
    'Adventure (hiking, trekking, water sports)',
    'Relaxation (beaches, spas, nature walks)',
    'Cultural (historical sites, museums, local events)',
    'Food Tour (famous restaurants, street food, cafes)',
    'Family-Friendly (theme parks, zoos, interactive museums)'
];

// Function to create a structured trip plan prompt
function createTravelPlannerPrompt(destination, days, preferences) {
    return `
        Plan a detailed ${days}-day trip to ${destination}. 
        Preferences: Choose from ${preferences.join(", ")} based on the location.

        Provide a structured daily itinerary:
        - **Day-wise breakdown** with time slots (e.g., 9:00 AM - Visit XYZ Museum)
        - **Local food recommendations** (best breakfast, lunch, and dinner spots)
        - **Hidden gems & cultural insights**
        - **Best visiting hours & estimated costs**
        - **Recommended transport options**
        - **Personalized tips** (for solo travelers, families, and groups)

        Format response like this:
        **Day 1**
        - 9:00 AM - Visit XYZ Attraction
        - 12:00 PM - Lunch at ABC Restaurant
        - 2:00 PM - Explore Hidden Gem
        - 6:00 PM - Sunset at DEF Beach
        - 8:00 PM - Dinner at Local Eatery
    `;
}

// Function to fetch an image from Pexels
async function fetchImageFromPexels(query) {
    try {
        const response = await axios.get('https://api.pexels.com/v1/search', {
            params: { query, per_page: 1 },
            headers: { Authorization: `Bearer ${process.env.PEXELS_API_KEY}` }
        });

        if (response.data.photos.length > 0) {
            return response.data.photos[0].src.medium; // Return the first image URL
        } else {
            return null;
        }
    } catch (error) {
        console.error(`Error fetching image for ${query}:`, error.message);
        return null;
    }
}

// Travel Planner function
async function travelPlanner(req, res) {
    try {
        const { destination, days, preferences } = req.body;

        if (!destination || !days) {
            return res.status(400).json({ error: "Destination and number of days are required." });
        }

        const prompt = createTravelPlannerPrompt(destination, days, preferences);

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }]
        });

        console.log("Gemini API Raw Response:", JSON.stringify(result, null, 2)); // Debugging log

        // Extract trip plan from the correct path
        const tripPlan = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ?? null;

        if (!tripPlan) {
            console.error("Error: Unexpected response structure");
            return res.status(500).json({ error: "Failed to generate trip plan", details: "Unexpected response structure" });
        }

        // Fetch an image related to the destination
        const imageUrl = await fetchImageFromPexels(destination);

        // Send response with trip plan and image
        res.status(200).json({
            tripPlan,
            imageUrl: imageUrl || "No image found for this destination"
        });

    } catch (error) {
        console.error("Error generating trip plan:", error.message);
        res.status(500).json({ error: "Failed to generate trip plan", details: error.message });
    }
}



module.exports = { travelPlanner };
