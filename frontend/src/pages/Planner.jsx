// Planner.jsx
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

    if (!destination.trim() || !budget.trim() || !preferences.trim() || !arrivalDate || !departureDate) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/travel", {
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
        const trimmed = line.trim();
        const dayMatch = trimmed.match(/^Day\s*(\d+):/i); // only match if line starts with Day X:
      
        if (dayMatch) {
          currentDay = parseInt(dayMatch[1]);
          itinerary.push({ day: currentDay, activity: trimmed });
        } else if (trimmed && currentDay !== null) {
          let last = itinerary[itinerary.length - 1];
          last.activity += `\n${trimmed}`;
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
      <div className="px-4 py-6 flex-1 bg-black/50 backdrop-blur-sm">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm md:text-base font-medium px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700 transition"
          >
            <FaArrowLeft />
            Back
          </Link>
        </div>

        {/* Logo + Heading */}
        <div className="text-center">
          <div className="flex justify-center">
            <img
              src={triply}
              alt="Triply Logo"
              className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover hover:scale-105 transition-transform"
            />
          </div>
          <h1 className="text-xl md:text-3xl font-bold mt-4 text-teal-400">Plan Your Trip 🧭</h1>
          <p className="text-sm md:text-base mt-1 text-gray-300">Smart suggestions tailored for you</p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleGenerate} className="max-w-3xl mx-auto mt-8 bg-gray-800 p-4 md:p-6 rounded-xl shadow-md space-y-6">
          {/* Text Inputs */}
          <div className="space-y-4">
            {[
              ["Destination", destination, setDestination, "e.g., Paris"],
              ["Budget", budget, setBudget, "e.g., $1000"],
              ["Preferences", preferences, setPreferences, "e.g., hiking, beach"],
            ].map(([label, value, setter, placeholder], i) => (
              <div key={i}>
                <label className="block text-sm font-semibold text-gray-300 mb-1">{label}</label>
                <input
                  autoFocus={i === 0}
                  type="text"
                  placeholder={placeholder}
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  className="w-full p-3 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            ))}
          </div>

          {/* Date Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-1">Arrival Date</label>
              <input
                type="date"
                value={arrivalDate}
                onChange={(e) => setArrivalDate(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-1">Departure Date</label>
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Button or Loader */}
          <div className="text-center mt-6">
            {loading ? (
              <div className="flex justify-center items-center gap-3">
                <div className="animate-spin h-10 w-10 border-4 border-teal-500 border-t-transparent rounded-full" />
                <p className="text-base text-white">Generating itinerary...</p>
              </div>
            ) : (
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white text-base px-6 py-3 rounded-full transition"
              >
                🧳 Generate Itinerary
              </button>
            )}
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Planner;
