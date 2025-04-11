import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Flight = () => {
  const location = useLocation();
  const { destination } = location.state || {};

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (destination) {
      fetchFlights(destination);
    }
  }, [destination]);

  const fetchFlights = async (dest) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:3000/api/flights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destination: dest })
      });
      const data = await response.json();
      if (response.ok) {
        setFlights(data.flights);
      } else {
        setError(data.message || "No flights found.");
      }
    } catch (err) {
      setError("Failed to fetch flights.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold text-center mb-6 text-sky-700 dark:text-teal-400">
        ✈️ Available Flights to {destination || "Unknown"}
      </h1>

      {loading && <p className="text-center text-yellow-600">Searching flights...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {flights.length > 0 && (
        <div className="max-w-4xl mx-auto space-y-4">
          {flights.map((flight, index) => (
            <div key={index} className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md">
              <p><strong>Airline:</strong> {flight.airline}</p>
              <p><strong>From:</strong> {flight.departure}</p>
              <p><strong>To:</strong> {flight.arrival}</p>
              <p><strong>Estimated Price:</strong> ${flight.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Flight;
