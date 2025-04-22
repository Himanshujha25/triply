const axios = require("axios");

const getPlaceImages = async (destination, days, apiKey) => {
  try {
    console.log(`Searching for place: ${destination}`);

    // Get place details from Text Search
    const searchRes = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(destination)}&key=${apiKey}`
    );
    
    const place = searchRes.data.results[0];
    if (!place) throw new Error("No place found");

    const placeId = place.place_id;
    console.log(`Found place ID: ${placeId}`);

    // Fetch place details to get photos
    const detailsRes = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}`
    );

    const photos = detailsRes.data.result.photos || [];
    if (photos.length === 0) throw new Error("No photos found for this place");

    console.log(`Found ${photos.length} photos, fetching up to ${days}`);

    const images = await Promise.all(
      photos.slice(0, days).map(async (photo, index) => {
        try {
          const res = await axios.get(
            `https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photoreference=${photo.photo_reference}&key=${apiKey}`,
            { responseType: "arraybuffer" }
          );
          const base64Image = Buffer.from(res.data, "binary").toString("base64");
          return `data:${res.headers['content-type']};base64,${base64Image}`;
        } catch (err) {
          console.error(`Error fetching photo ${index + 1}:`, err.message);
          return null;
        }
      })
    );

    const validImages = images.filter(img => img);
    if (validImages.length === 0) throw new Error("Failed to retrieve any valid photos");

    console.log(`Successfully retrieved ${validImages.length} photos`);
    return validImages;

  } catch (error) {
    console.error("Error in getPlaceImages:", error.message);
    return [];
  }
};

module.exports = getPlaceImages;
