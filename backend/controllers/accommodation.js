const axios = require('axios');

const searchAccommodation = async (req, res) => {
  const { city, check_in_date, check_out_date } = req.query;

  // Validate that all necessary fields are present
  if (!city || !check_in_date || !check_out_date) {
    return res.status(400).json({ error: 'City, check-in date, and check-out date are required' });
  }

  try {
    // Send the API request to SerpApi
    const response = await axios.get('https://serpapi.com/search.json', {
      params: {
        engine: 'google_hotels',
        q: `hotels in ${city}`,
        check_in_date,
        check_out_date,
        api_key: process.env.SERPAPI_KEY,  // Ensure your SERPAPI_KEY is set in .env
      },
    });

    // Extract hotel results, with multiple fallback options
    const hotels = response.data.hotels_results || 
                  response.data.properties || 
                  response.data.organic_results || 
                  [];

    res.json(hotels);
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch hotels' });
  }
};

module.exports = { searchAccommodation };