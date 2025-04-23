import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { FaArrowLeft, FaCar, FaWalking, FaBicycle } from "react-icons/fa";
import Footer from "../components/Footer";
import bg from "../assets/bg.png";

const Transport = () => {
  const { state } = useLocation();
  const { from, destination } = state || {};

  const [transportOptions, setTransportOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!from || !destination) {
      setError("Missing origin or destination.");
      return;
    }

    const fetchTransportOptions = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://triply-2-o.onrender.com/api/transport", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ from, destination }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch transport options");
        }

        const data = await response.json();
        setTransportOptions(data.options || []);
      } catch (err) {
        console.error("Error fetching transport options:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransportOptions();
  }, [from, destination]);

  const openInGoogleMaps = (origin, destination, mode) => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=${mode}`;
    window.open(url, "_blank");
  };
  

  const modeIcons = {
    driving: <FaCar className="text-teal-400" />,
    walking: <FaWalking className="text-teal-400" />,
    bicycling: <FaBicycle className="text-teal-400" />,
  };

  return (
    <div className="min-h-screen bg-cover bg-center text-gray-100" style={{ backgroundImage: `url(${bg})` }}>
      <div className="bg-black/60 backdrop-blur-md px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Link
              to="/planner"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gray-800 hover:bg-gray-700 text-sm md:text-base font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <FaArrowLeft className="text-teal-400" />
              Back to Planner
            </Link>
          </div>

          <div className="text-center mb-10 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-extrabold mt-6 bg-gradient-to-r from-teal-300 to-teal-500 text-transparent bg-clip-text">
              Transport Options 🚗
            </h1>
            <p className="text-lg text-gray-300 mt-3 max-w-2xl mx-auto">
              Available transport options from <span className="font-semibold">{from}</span> to <span className="font-semibold">{destination}</span>.
            </p>
          </div>

          <div className="max-w-5xl mx-auto mt-4 bg-gray-900/90 p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-700/50 backdrop-blur-sm">
            {loading ? (
              <div className="flex flex-col items-center justify-center p-4">
                <div className="relative w-16 h-16 mb-3">
                  <div className="absolute top-0 left-0 w-full h-full border-4 border-teal-500/30 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-full h-full border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="text-base sm:text-lg text-white font-medium text-center">
                  Fetching transport options<span className="animate-pulse">...</span>
                </p>
              </div>
            ) : error ? (
              <div className="text-center text-red-400">
                <p>Error: {error}</p>
              </div>
            ) : transportOptions.length === 0 ? (
              <div className="text-center text-gray-400">
                <p>No transport options available.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {transportOptions.map((option, index) => (
                  <div
                  key={index}
                  onClick={() => openInGoogleMaps(from, destination, option.mode)}
                  className="p-6 bg-gray-800/80 rounded-xl border border-gray-700 hover:border-teal-500 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20 cursor-pointer"
                >
                
                    <div className="flex items-center gap-3 mb-4">
                      {modeIcons[option.mode] || <FaCar className="text-teal-400" />}
                      <h3 className="text-xl font-semibold text-teal-400 capitalize">{option.mode}</h3>
                    </div>
                    <p className="text-gray-300">Distance: {option.distance} km</p>
                    <p className="text-gray-300">Duration: {option.duration} hrs</p>
                    <p className="text-gray-300">Cost: ₹{option.cost_inr} / ${option.cost_usd}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Transport;
