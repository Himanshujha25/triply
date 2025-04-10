import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Footer from "../components/Footer";
import bg from "../assets/bg.png";

const Itinerary = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { destination, budget, preferences, itinerary } = location.state || {};

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
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div className="relative z-10 flex flex-col flex-grow">
        <div className="p-5 flex-grow">
          {/* Top Controls */}
          <div className="flex justify-between mb-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-base font-medium px-5 py-2 rounded-full text-gray-200 bg-gray-800 hover:bg-gray-700 transition duration-300"
            >
              <FaArrowLeft />
              Back To Home
            </Link>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-center text-sky-700 dark:text-teal-400 mb-6">
            ✈️ Your Itinerary Plan
          </h1>

          {/* Itinerary Info */}
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
                <h3 className="text-xl font-semibold">Day {item.day}</h3>
                <p>{item.activity}</p>
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Itinerary;
