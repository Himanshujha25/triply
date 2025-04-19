import React, { useState, useEffect } from "react";
import axios from "axios";

const PlaceImage = () => {
  const [images, setImages] = useState([]);
  const destination = "indirapuram";
  const days = 5;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/getPlaceImage`, {
          params: { destination, days }
        });
        setImages(res.data.images);
      } catch (error) {
        console.error("Error fetching place images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      {images.length > 0 ? (
        images.map((img, index) => (
          <img key={index} src={img} alt={`Place ${index}`} style={{ maxWidth: "300px", margin: "10px" }} />
        ))
      ) : (
        <p>Loading images...</p>
      )}
    </div>
  );
};

export default PlaceImage;
