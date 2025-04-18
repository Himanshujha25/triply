// backend/unsplash.js or utils/unsplash.js
import axios from "axios";

const UNSPLASH_ACCESS_KEY = "-YpAyH-nWooFTprn1BjwjCwDgYLQmyAJoU9KrEJVTz4"

 export const fetchImageFromUnsplash = async (query) => {
  try {
    const res = await axios.get(
      `https://api.unsplash.com/search/photos`,
      {
        params: {
          query,
          client_id: UNSPLASH_ACCESS_KEY,
          per_page: 1,
          orientation: "landscape",
        },
      }
    );

    return res.data.results[0]?.urls?.regular || null;
  } catch (error) {
    console.error("Error fetching image from Unsplash:", error.message);
    return null;
  }
};
