const axios = require("axios");

const getPlaceImages = async (destination, days, apiKey) => {
  try {
    console.log(`Searching for place: ${destination}`);

    // 1. Text Search to get place and initial photo references
    const searchRes = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(destination)}&key=${apiKey}`
    );

    const results = searchRes.data.results;
    if (!results || results.length === 0) {
      console.log("No places found for the destination");
      throw new Error("No place found");
    }

    const place = results[0];
    console.log(`Found place ID: ${place.place_id}`);
    let photos = place.photos;

    // 2. Fallback to Place Details if no photos in initial search
    if (!photos || photos.length === 0) {
      console.log("No photos in initial result, fetching place details...");
      const detailsRes = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?placeid=${place.place_id}&key=${apiKey}`
      );

      const details = detailsRes.data.result;
      if (details && details.photos && details.photos.length > 0) {
        photos = details.photos;
      } else {
        console.log("No photos found in place details");
        throw new Error("No photos found for this place");
      }
    }

    console.log(`Found ${photos.length} photos, using up to ${days}`);
    const photoRefs = photos.slice(0, days).map(p => p.photo_reference);
    console.log("Photo references:", photoRefs);

    // 3. Fetch photos as base64
    const imagePromises = photoRefs.map(async (ref, index) => {
      try {
        console.log(`Fetching photo ${index + 1}/${photoRefs.length}`);
        const res = await axios.get(
          `https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photoreference=${ref}&key=${apiKey}`,
          { responseType: "arraybuffer" }
        );
        const contentType = res.headers["content-type"];
        const base64Image = Buffer.from(res.data, "binary").toString("base64");
        return `data:${contentType};base64,${base64Image}`;
      } catch (photoError) {
        console.error(`Error fetching photo ${index + 1}:`, photoError.message);
        return null;
      }
    });

    const images = await Promise.all(imagePromises);
    const validImages = images.filter(img => img !== null);
    console.log(`Successfully processed ${validImages.length} out of ${photoRefs.length} photos`);

    if (validImages.length === 0) {
      throw new Error("Failed to retrieve any valid photos");
    }

    return validImages;

  } catch (error) {
    console.error("Error in getPlaceImages:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
    }
    return [];
  }
};

module.exports = getPlaceImages;
