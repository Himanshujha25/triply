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

  const navigate = useNavigate();

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!destination.trim() || !budget.trim() || !preferences.trim()) {
      alert("Please fill in all the fields with valid information.");
      return;
    }

    navigate("/itinerary", {
      state: {
        destination,
        budget,
        preferences,
      },
    });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat text-gray-100  flex flex-col justify-between"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="px-8 py-6 flex-1 flex flex-col justify-between">
        {/* Top Navigation */}
        <div className=" p-2 flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center gap-2 text-base font-medium px-5 py-2 rounded-full text-gray-200 bg-gray-800 hover:bg-gray-700 transition duration-300"
          >
            <FaArrowLeft />
            Back To Home
          </Link>

        </div>

        {/* Logo & Heading */}
        <div className="text-center mt-6">
          <div className="flex justify-center mb-4">
            <img
              src={triply}
              alt="Triply Logo"
              className="w-28 h-28 object-contain transition-transform duration-300 hover:scale-105 rounded-full"
            />
          </div>
          <h1 className="text-4xl font-bold text-teal-400">Plan Your Trip 🧭</h1>
          <p className="text-lg mt-2 text-gray-800">
            Smart suggestions just for you
          </p>
        </div>

        {/* Form Inputs */}
        <div className="max-w-6xl mx-auto mt-6 p-6 rounded-xl shadow-md bg-gray-800">
          <div className="flex flex-wrap md:flex-nowrap gap-4">
            {[
              ["Destination", destination, setDestination, "e.g., Paris"],
              ["Budget", budget, setBudget, "e.g., $1000"],
              ["Preferences", preferences, setPreferences, "e.g., hiking, beach"],
            ].map(([label, value, setter, placeholder], i) => (
              <div className="flex-1" key={i}>
                <label className="block text-base font-semibold mb-2 text-gray-300">
                  {label}
                </label>
                <input
                  autoFocus={i === 0}
                  type="text"
                  placeholder={placeholder}
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  className="w-full p-4 rounded-md text-lg bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <div className="mt-10 text-center mb-12">
          <button
            onClick={handleGenerate}
            className="bg-teal-600 text-white px-8 py-4 rounded-full hover:bg-teal-700 text-lg transition duration-300"
          >
            🧳 Generate Itinerary
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Planner;
