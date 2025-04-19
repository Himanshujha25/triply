const getPlaceImage = async (destination, days, apiKey) => {
  try {
    console.log(`Searching for place: ${destination}`);
    // 1. Get place ID
    const searchRes = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${destination}&key=${apiKey}`
    );
    
    const results = searchRes.data.results;
    if (!results || results.length === 0) {
      console.log("No places found for the destination");
      throw new Error("No place found");
    }
    
    const placeId = results[0].place_id;
    console.log(`Found place ID: ${placeId}`);
    
    // 2. Get photo references
    console.log(`Fetching details for place ID: ${placeId}`);
    const detailsRes = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}`
    );
    
    console.log("Place details response status:", detailsRes.status);
    console.log("Place details result:", detailsRes.data.result);
    
    // Check if there's a 'photos' property in the result
    if (!detailsRes.data.result || !detailsRes.data.result.photos) {
      console.log("No photos property in result");
      throw new Error("No photos found in place details");
    }
    
    const photos = detailsRes.data.result.photos;
    if (!photos || photos.length === 0) {
      console.log("Photos array is empty");
      throw new Error("No photos found");
    }
    
    console.log(`Found ${photos.length} photos, using up to ${days}`);
    
    // 3. Limit photos to 'days' or available length
    const photoRefs = photos.slice(0, days).map(p => p.photo_reference);
    console.log("Photo references:", photoRefs);
    
    // 4. Convert all to base64
    console.log("Starting to fetch photo data...");
    const imagePromises = photoRefs.map(async (ref, index) => {
      try {
        console.log(`Fetching photo ${index + 1}/${photoRefs.length}`);
        const res = await axios.get(
          `https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photoreference=${ref}&key=${apiKey}`,
          { responseType: "arraybuffer" }
        );
        console.log(`Photo ${index + 1} fetched successfully`);
        const contentType = res.headers["content-type"];
        const base64Image = Buffer.from(res.data, "binary").toString("base64");
        return `data:${contentType};base64,${base64Image}`;
      } catch (photoError) {
        console.error(`Error fetching photo ${index + 1}:`, photoError.message);
        return null;  // Return null for failed photos
      }
    });
    
    console.log("Waiting for all photo promises to resolve...");
    const images = await Promise.all(imagePromises);
    
    // Filter out any null values (failed photos)
    const validImages = images.filter(img => img !== null);
    console.log(`Successfully processed ${validImages.length} out of ${photoRefs.length} photos`);
    
    if (validImages.length === 0) {
      throw new Error("Failed to retrieve any valid photos");
    }
    
    return validImages;
    
  } catch (error) {
    console.error("Error in getPlaceImage:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
    }
    return [];
  }
};