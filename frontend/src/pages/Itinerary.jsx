import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Footer from "../components/Footer";
import bg from "../assets/bg.png";
// import { fetchImageFromUnsplash } from "../../../backend/utils/unsplash.js";


const Itinerary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [images, setImages] = useState({}); // 🔧 Store day-wise images

  const {
    destination,
    budget,
    preferences,
    itinerary,
    arrivalDate,
    departureDate,
    from,
  } = location.state || {};

  const handleCheckFlights = () => {
    navigate("/flight", {
      state: {
         from: from,
        destination: `${destination}`,
        arrivalDate: `${arrivalDate}`,
        departureDate: `${departureDate}`,
      },
    });
  };

  // 🔧 Fetch image for each day based on activity or fallback to destination
  // useEffect(() => {
  //   const fetchImages = async () => {
  //     if (!itinerary) return;

  //     const imageMap = {};
  //     for (const item of itinerary) {
  //       const query = item.activity || destination;
  //       const img = await fetchImageFromUnsplash(query);
  //       imageMap[item.day] = img;
  //     }
  //     setImages(imageMap);
  //   };

  //   fetchImages();
  // }, [itinerary, destination]);

  if (!destination || !budget || !preferences || !itinerary) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-red-500">No data found!</h2>
        <button
          onClick={() => navigate("/planner")}
          className="mt-4 px-6 py-3 bg-sky-600 text-white rounded-full hover:bg-sky-700"
        >
          Go Back to Planner
        </button>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col relative bg-cover bg-center bg-no-repeat dark:text-white"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="relative z-10 flex flex-col flex-grow">
        <div className="p-5 flex-grow">
          <div className="flex justify-between mb-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-base font-medium px-5 py-2 rounded-full text-gray-200 bg-gray-800 hover:bg-gray-700 transition duration-300"
            >
              <FaArrowLeft />
              Back To Home
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-center text-sky-700 dark:text-teal-400 mb-6">
            ✈️ Your Itinerary Plan
          </h1>

          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <p className="text-lg mb-4">
              <strong>Destination:</strong> {destination}
            </p>
            <p className="text-lg mb-4">
              <strong>Budget:</strong> {budget}
            </p>
            <p className="text-lg mb-6">
              <strong>Preferences:</strong> {preferences}
            </p>

            <hr className="mb-6" />

            {itinerary.map((item) => (
              <div
                key={item.day}
                className="mb-4 p-4 rounded-lg bg-sky-100 dark:bg-gray-700"
              >
                <h3 className="text-xl font-semibold mb-2">Day {item.day}</h3>
                <p className="mb-2">{item.activity}</p>

                {/* 🖼️ Image section */}
                {images[item.day] && (
                  <img
                    src={images[item.day]}
                    alt={`Image for ${item.activity}`}
                    className="rounded-lg shadow-lg mt-2 w-full h-64 object-cover"
                  />
                )}
              </div>
            ))}

            <div className="text-center mt-10">
              <button
                onClick={handleCheckFlights}
                className="px-6 py-3 bg-sky-600 text-white rounded-full hover:bg-sky-700"
              >
                🔍 Search Flights
              </button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Itinerary;
