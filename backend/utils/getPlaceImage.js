const axios = require("axios");

const getPlaceImage = async (destination, days, apiKey) => {
  try {
    // 1. Get place ID
    const searchRes = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${destination}&key=${apiKey}`
    );

    const results = searchRes.data.results;
    if (!results || results.length === 0) throw new Error("No place found");

    const placeId = results[0].place_id;

    // 2. Get photo references
    const detailsRes = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}`
    );

    const photos = detailsRes.data.result.photos;
    if (!photos || photos.length === 0) throw new Error("No photos found");

    // 3. Limit photos to 'days' or available length
    const photoRefs = photos.slice(0, days).map(p => p.photo_reference);

    // 4. Convert all to base64
    const imagePromises = photoRefs.map(async (ref) => {
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photoreference=${ref}&key=${apiKey}`,
        { responseType: "arraybuffer" }
      );
      const contentType = res.headers["content-type"];
      const base64Image = Buffer.from(res.data, "binary").toString("base64");
      return `data:${contentType};base64,${base64Image}`;
    });

    const images = await Promise.all(imagePromises);
    return images;

  } catch (error) {
    console.error("Error fetching place images:", error.message);
    return [];
  }
};

module.exports = getPlaceImage;
