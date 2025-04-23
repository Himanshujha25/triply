import React, { useState } from "react";
import { FaArrowLeft, FaPlaneDeparture, FaCalendarAlt, FaUser, FaBus, FaMoneyBillWave } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import triply from "../assets/ChatGPT Image Apr 7, 2025, 08_48_52 PM.png";
import Footer from "../components/Footer";
import bg from "../assets/bg.png";

// ✅ Reusable Input Field Component with improved styling
const Input = ({ label, value, onChange, placeholder, autoFocus = false, icon }) => (
  <div className="w-full group">
    <label className="block text-sm font-semibold text-gray-300 mb-2 transition-all group-hover:text-teal-400">{label}</label>
    <div className="relative">
      {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-teal-400">{icon}</span>}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full p-3 ${icon ? 'pl-10' : 'pl-3'} rounded-xl bg-gray-950 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 hover:border-teal-500 placeholder-gray-400 shadow-sm`}
      />
    </div>
  </div>
);

// ✅ Budget Input with Currency Selection
const BudgetInput = ({ value, onChange, currency, onCurrencyChange }) => (
  <div className="w-full group">
    <label className="block text-sm font-semibold text-gray-300 mb-2 transition-all group-hover:text-teal-400">Budget</label>
    <div className="flex">
      <div className="relative flex-1">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-teal-400">
          <FaMoneyBillWave />
        </span>
        <input
          type="text"
          placeholder="e.g., 1000"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-3 pl-10 rounded-l-xl bg-gray-950 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 hover:border-teal-500 placeholder-gray-400 shadow-sm"
        />
      </div>
      <select
        value={currency}
        onChange={(e) => onCurrencyChange(e.target.value)}
        className="w-24 p-3 rounded-r-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 hover:border-teal-500 shadow-sm"
      >
        <option value="USD">$ USD</option>
        <option value="INR">₹ INR</option>
      </select>
    </div>
  </div>
);

// ✅ Date Input Component with improved styling
const InputDate = ({ label, value, onChange }) => (
  <div className="w-full group">
    <label className="block text-sm font-semibold text-gray-300 mb-2 transition-all group-hover:text-teal-400">{label}</label>
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-teal-400">
        <FaCalendarAlt />
      </span>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 pl-10 rounded-xl bg-gray-950 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 hover:border-teal-500 shadow-sm"
      />
    </div>
  </div>
);

const Planner = () => {
  const [from, setFrom] = useState("");
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [currency, setCurrency] = useState("USD");
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
    if (arrivalDate > departureDate) {
      alert("Arrival date cannot be after departure date.");
      return;
    }
    if (new Date(arrivalDate) < new Date()) {
      alert("Arrival date cannot be in the past.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://triply-2-o.onrender.com/api/travel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          destination,
          startDate: arrivalDate,
          endDate: departureDate,
          interests: preferences,
          budget: `${currency} ${budget}`,
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
          budget: budget, // Just pass the budget amount
          currency: currency, // Pass currency separately
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

  const handleShowTransport = () => {
    if (!from || !destination) {
      alert("Please enter your starting location and destination.");
      return;
    }
    
    navigate("/transport", {
      state: {
        from,
        destination
      }
    });
  };

  return (
    <div className="mt-0">
      <div
        className="min-h-screen bg-cover bg-center text-gray-100 flex flex-col justify-between"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="flex-1 bg-black/60 backdrop-blur-md px-4 py-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gray-800 hover:bg-gray-700 text-sm md:text-base font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <FaArrowLeft className="text-teal-400" />
                Back To Home
              </Link>
            </div>

            <div className="text-center mb-10 animate-fade-in">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-teal-500/20 rounded-full blur-xl"></div>
                <img
                  src={triply}
                  alt="Triply Logo"
                  className="w-20 h-20 md:w-28 md:h-28 rounded-full mx-auto object-cover relative z-10 hover:scale-105 transition-transform duration-300 shadow-lg border-2 border-teal-400"
                />
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold mt-6 bg-gradient-to-r from-teal-300 to-teal-500 text-transparent bg-clip-text">Plan Your Trip 🧭</h1>
              <p className="text-md md:text-lg text-gray-300 mt-3 max-w-2xl mx-auto">Smart AI-powered suggestions tailored for your adventure, creating memorable experiences.</p>
            </div>

            <form
              onSubmit={handleGenerate}
              className="max-w-5xl mx-auto mt-4 bg-gray-900/90 p-8 md:p-10 rounded-3xl shadow-2xl space-y-10 mb-10 border border-gray-700/50 backdrop-blur-sm transform transition-all duration-500 hover:shadow-teal-900/20"
            >
              {/* Trip Information */}
              <div>
                <h2 className="text-2xl font-semibold text-teal-400 mb-5 flex items-center gap-3 border-b border-gray-700/50 pb-3">
                  <FaPlaneDeparture className="text-teal-500" />
                  Trip Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <Input 
                    label="From" 
                    value={from} 
                    onChange={setFrom} 
                    placeholder="e.g., Delhi" 
                    autoFocus 
                    icon={<FaUser />}
                  />
                  <Input 
                    label="Destination" 
                    value={destination} 
                    onChange={setDestination} 
                    placeholder="e.g., Paris" 
                    icon={<FaPlaneDeparture />}
                  />
                  <BudgetInput 
                    value={budget} 
                    onChange={setBudget} 
                    currency={currency}
                    onCurrencyChange={setCurrency}
                  />
                  <Input
                    label="Preferences"
                    value={preferences}
                    onChange={setPreferences}
                    placeholder="e.g., hiking, beaches"
                    icon={<span>✦</span>}
                  />
                  
                </div>
              </div>

              {/* Travel Dates */}
              <div>
                <h2 className="text-2xl font-semibold text-teal-400 mb-5 flex items-center gap-3 border-b border-gray-700/50 pb-3">
                  <FaCalendarAlt className="text-teal-500" />
                  Travel Dates
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <InputDate label="Arrival Date" value={arrivalDate} onChange={setArrivalDate} />
                  <InputDate label="Departure Date" value={departureDate} onChange={setDepartureDate} />
                </div>
              </div>

              {/* Transport Button */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleShowTransport}
                  className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 text-white text-lg px-8 py-3 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2 mx-auto"
                >
                  <FaBus /> Show Available Transport Options
                </button>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-4">
                {loading ? (
                <div className="flex flex-col items-center justify-center p-4">
                <div className="relative w-16 h-16 mb-3">
                  {/* Static circle */}
                  <div className="absolute top-0 left-0 w-full h-full border-4 border-teal-500/30 rounded-full"></div>
                  {/* Spinning circle */}
                  <div className="absolute top-0 left-0 w-full h-full border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="text-base sm:text-lg text-white font-medium text-center">
                  Creating your dream itinerary<span className="animate-pulse">...</span>
                </p>
              </div>
                ) : (
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-400 hover:to-teal-600 text-white text-lg px-12 py-4 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:shadow-teal-500/20"
                  >
                    🧳 Generate Your Itinerary
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Planner;