import React, { useState } from "react";
import { FaMoon, FaSun, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import triply from "../assets/ChatGPT Image Apr 7, 2025, 08_48_52 PM.png";
import Footer from "../components/Footer";


const Planner = ({ darkMode, setDarkMode }) => {
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [preferences, setPreferences] = useState("");

  return (
    <div
      className={`min-h-screen px-8 py-6 flex flex-col justify-between transition-colors duration-500 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"
      }`}
    >
      {/* Top Navigation */}
      <div className="flex justify-between items-center">
        <Link
          to="/"
          className={`flex items-center gap-2 text-base font-medium px-5 py-2 rounded-full transition duration-300 ${
            darkMode
              ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
              : "bg-white text-sky-700 hover:bg-sky-100 border border-sky-300"
          }`}
        >
          <FaArrowLeft />
          Back
        </Link>

        <button
          onClick={() => setDarkMode(!darkMode)}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          className={`text-2xl p-3 rounded-full transition duration-300 shadow-md ${
            darkMode
              ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
              : "bg-white text-sky-700 hover:bg-sky-200 border border-sky-300"
          }`}
        >
          {darkMode ? <FaMoon /> : <FaSun />}
        </button>
      </div>

      {/* Logo & Heading */}
      <div className="text-center mt-6">
        <div className="flex justify-center mb-4">
          <img
            src={triply}
            alt="Triply Logo"
            className="w-28 h-28 object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>
        <h1 className="text-4xl font-bold text-sky-700 dark:text-teal-400">
          Plan Your Trip 🧭
        </h1>
        <p className="text-lg mt-2 text-sky-600 dark:text-gray-400">
          Smart suggestions just for you
        </p>
      </div>

      {/* Form Inputs */}
      <div
  className={`max-w-6xl mx-auto mt-6 p-6 rounded-xl shadow-md transition-all duration-300 ${
    darkMode ? "bg-gray-800" : "bg-white"
  }`}
>
  <div className="flex flex-wrap md:flex-nowrap gap-4">
    {[["Destination", destination, setDestination, "e.g., Paris"],
      ["Budget", budget, setBudget, "e.g., $1000"],
      ["Preferences", preferences, setPreferences, "e.g., hiking, beach"]
    ].map(([label, value, setter, placeholder], i) => (
      <div className="flex-1" key={i}>
        <label className="block text-base font-semibold mb-2 text-sky-700 dark:text-gray-300">
          {label}
        </label>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setter(e.target.value)}
          className={`w-full p-4 rounded-md text-lg border focus:outline-none focus:ring-2 ${
            darkMode
              ? "bg-gray-900 text-white border-gray-600 focus:ring-teal-500"
              : "bg-white border-sky-300 text-gray-800 focus:ring-sky-500"
          }`}
        />
      </div>
    ))}
  </div>
</div>

      {/* Button */}
      <div className="mt-6 text-center mb-3">
        <button
          onClick={() =>
            alert(
              `Planning a trip to ${destination || "??"} with a budget of ${
                budget || "??"
              } focusing on ${preferences || "??"}`
            )
          }
          className="bg-sky-600 text-white px-8 py-4 rounded-full hover:bg-sky-700 text-lg transition duration-300"
        >
          🧳 Generate Itinerary
        </button>
      </div>
      <Footer darkMode={darkMode} />
    </div>

  );
};

export default Planner;
