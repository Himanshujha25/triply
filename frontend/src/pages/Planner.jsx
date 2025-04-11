import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import triply from "../assets/ChatGPT Image Apr 7, 2025, 08_48_52 PM.png";
import Footer from "../components/Footer";
import bg from "../assets/bg.png";

// ✅ Reusable Input Field Component
const Input = ({ label, value, onChange, placeholder, autoFocus = false }) => (
  <div className="w-full">
    <label className="block text-sm font-semibold text-gray-300 mb-1">{label}</label>
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      autoFocus={autoFocus}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 rounded-xl bg-gray-950 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 hover:border-teal-500 placeholder-gray-400"
    />
  </div>
);

// ✅ Date Input Component
const InputDate = ({ label, value, onChange }) => (
  <div className="w-full">
    <label className="block text-sm font-semibold text-gray-300 mb-1">{label}</label>
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 rounded-xl bg-gray-950 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 hover:border-teal-500"
    />
  </div>
);

const Planner = () => {
  const [from, setFrom] = useState("");
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [preferences, setPreferences] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!from || !destination || !budget || !preferences || !arrivalDate || !departureDate) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/api/travel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          destination,
          startDate: arrivalDate,
          endDate: departureDate,
          interests: preferences,
          budget,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to generate itinerary");

      const lines = data.travelPlan?.split("\n") || [];
      const itinerary = [];

      let currentDay = null;
      lines.forEach((line) => {
        const trimmed = line.trim();
        const dayMatch = trimmed.match(/^Day\s*(\d+):/i);

        if (dayMatch) {
          currentDay = parseInt(dayMatch[1]);
          itinerary.push({ day: currentDay, activity: trimmed });
        } else if (trimmed && currentDay !== null) {
          itinerary[itinerary.length - 1].activity += `\n${trimmed}`;
        }
      });

      navigate("/itinerary", {
        state: {
          from,
          destination,
          budget,
          preferences,
          arrivalDate,
          departureDate,
          itinerary,
        },
      });
    } catch (err) {
      console.error("Error generating itinerary:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-0">
      <div
        className="min-h-screen bg-cover bg-center text-gray-100 flex flex-col justify-between"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="flex-1 bg-black/50 backdrop-blur-sm px-4 py-1">
          <div className="mb-0">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gray-800 hover:bg-gray-700 text-sm md:text-base font-medium transition-all duration-200"
            >
              <FaArrowLeft />
              Back To Home
            </Link>
          </div>

          <div className="text-center mb-8">
            <img
              src={triply}
              alt="Triply Logo"
              className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto object-cover hover:scale-105 transition-transform shadow-lg"
            />
            <h1 className="text-3xl md:text-4xl font-extrabold mt-4 text-teal-400">Plan Your Trip 🧭</h1>
            <p className="text-md md:text-lg text-gray-300 mt-3">Smart suggestions tailored for your adventure</p>
          </div>

          <form
            onSubmit={handleGenerate}
            className="max-w-5xl mx-auto mt-1 bg-gray-900/80 p-6 md:p-10 rounded-3xl shadow-2xl space-y-8 mb-10 border border-gray-700/50"
          >
            {/* Trip Information */}
            <div>
              <h2 className="text-2xl font-semibold text-teal-400 mb-3 flex items-center gap-2">
                ✈️ Trip Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="From" value={from} onChange={setFrom} placeholder="e.g., Delhi" autoFocus />
                <Input label="Destination" value={destination} onChange={setDestination} placeholder="e.g., Paris" />
                <Input label="Budget" value={budget} onChange={setBudget} placeholder="e.g., $1000" />
                <Input
                  label="Preferences"
                  value={preferences}
                  onChange={setPreferences}
                  placeholder="e.g., hiking, beaches"
                />
              </div>
            </div>

            {/* Travel Dates */}
            <div>
              <h2 className="text-2xl font-semibold text-teal-400 mb-3 flex items-center gap-2">
                📅 Travel Dates
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputDate label="Arrival Date" value={arrivalDate} onChange={setArrivalDate} />
                <InputDate label="Departure Date" value={departureDate} onChange={setDepartureDate} />
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              {loading ? (
                <div className="flex justify-center items-center gap-3">
                  <div className="animate-spin h-10 w-10 border-4 border-teal-500 border-t-transparent rounded-full" />
                  <p className="text-base text-white">Generating itinerary...</p>
                </div>
              ) : (
                <button
                  type="submit"
                  className="bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 text-white text-lg px-10 py-3 rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  🧳 Generate Itinerary
                </button>
              )}
            </div>
          </form>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Planner;
