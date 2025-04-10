import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import triply from "../assets/ChatGPT Image Apr 7, 2025, 08_48_52 PM.png";
import Footer from "../components/Footer";
import bg from "../assets/bg.png";

const Planner = () => {
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [preferences, setPreferences] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (
      !destination.trim() ||
      !budget.trim() ||
      !preferences.trim() ||
      !arrivalDate ||
      !departureDate
    ) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://192.168.1.6:3000/api/travel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination,
          budget,
          interests: preferences,
          startDate: arrivalDate,
          endDate: departureDate,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to generate itinerary");

      const itineraryText = data.travelPlan;
      const lines = itineraryText.split("\n");

      let itinerary = [];
      let currentDay = null;

      lines.forEach((line) => {
        const dayMatch = line.match(/day\s*(\d+)/i);
        if (dayMatch) {
          currentDay = parseInt(dayMatch[1]);
          itinerary.push({ day: currentDay, activity: "" });
        } else if (line.trim() && currentDay !== null) {
          let last = itinerary[itinerary.length - 1];
          last.activity += last.activity ? `\n${line.trim()}` : line.trim();
        }
      });

      setLoading(false);
      navigate("/itinerary", {
        state: {
          destination,
          budget,
          preferences,
          arrivalDate,
          departureDate,
          itinerary,
        },
      });
    } catch (err) {
      setLoading(false);
      console.error("Error generating itinerary:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat text-gray-100 flex flex-col justify-between"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="px-4 md:px-8 py-6 flex-1 flex flex-col justify-between inset-0 bg-black/40 backdrop-blur-sm z-0">
        <div className="p-2 flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm md:text-base font-medium px-4 md:px-5 py-2 rounded-full text-gray-200 bg-gray-800 hover:bg-gray-700 transition duration-300"
          >
            <FaArrowLeft />
            Back To Home
          </Link>
        </div>

        <div className="text-center mt-6">
          <div className="flex justify-center mb-4">
            <img
              src={triply}
              alt="Triply Logo"
              className="w-20 h-20 md:w-28 md:h-28 object-contain hover:scale-105 rounded-full transition-transform"
            />
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-teal-400">Plan Your Trip 🧭</h1>
          <p className="text-base md:text-lg mt-2 text-gray-300">Smart suggestions just for you</p>
        </div>

        <div className="max-w-6xl mx-auto mt-6 p-4 md:p-6 rounded-xl shadow-md bg-gray-800">
          <div className="flex flex-col md:flex-row gap-4">
            {[
              ["Destination", destination, setDestination, "e.g., Paris"],
              ["Budget", budget, setBudget, "e.g., $1000"],
              ["Preferences", preferences, setPreferences, "e.g., hiking, beach"],
            ].map(([label, value, setter, placeholder], i) => (
              <div className="flex-1" key={i}>
                <label className="block text-sm md:text-base font-semibold mb-2 text-gray-300">
                  {label}
                </label>
                <input
                  autoFocus={i === 0}
                  type="text"
                  placeholder={placeholder}
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  className="w-full p-3 md:p-4 rounded-md text-base bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <div className="flex-1">
              <label className="block text-sm md:text-base font-semibold mb-2 text-gray-300">Arrival Date</label>
              <input
                type="date"
                value={arrivalDate}
                onChange={(e) => setArrivalDate(e.target.value)}
                className="w-full p-3 md:p-4 rounded-md bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm md:text-base font-semibold mb-2 text-gray-300">Departure Date</label>
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="w-full p-3 md:p-4 rounded-md bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 text-center mb-12">
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-t-4 border-b-4 border-teal-600"></div>
              <p className="ml-3 md:ml-4 text-base md:text-lg text-white">Generating your itinerary...</p>
            </div>
          ) : (
            <button
              onClick={handleGenerate}
              className="bg-teal-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-teal-700 text-base md:text-lg transition duration-300"
            >
              🧳 Generate Itinerary
            </button>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Planner;
