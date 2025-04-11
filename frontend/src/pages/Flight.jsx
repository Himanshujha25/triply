import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import bg from "../assets/bg.png";

const Flight = () => {
  const location = useLocation();
  const {
    destination,
    arrivalDate,
    departureDate,
    from,
  } = location.state || {};

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (destination && arrivalDate && departureDate) {
      fetchFlights();
    }
  }, [destination, arrivalDate, departureDate]);

  const fetchFlights = async () => {
    setLoading(true);
    setError("");

    try {
      console.log("📦 Sending request:", {
        destination,
        arrivalDate,
        departureDate,
        from,
      });

      const response = await fetch("http://localhost:3001/api/flights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ destination, arrivalDate, departureDate, from }),
      });

      const data = await response.json();
      if (response.ok) {
        setFlights(data.flights || []);
      } else {
        setError(data.message || "No flights found.");
      }
    } catch (err) {
      console.error("❌ Error:", err.message);
      setError("Failed to fetch flights.");
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (datetime) => {
    if (!datetime) return "N/A";
    const date = new Date(datetime);
    return isNaN(date.getTime())
      ? "Invalid Date"
      : date.toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          day: "numeric",
          month: "short",
          year: "numeric",
        });
  };

  return (
    <div
      className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white bg-cover bg-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-3xl font-bold text-center mb-2 text-sky-700 dark:text-teal-400">
        ✈️ Flights from {from || "Unknown"} destination {destination || "Unknown"}
      </h1>
      <p className="text-center mb-6 text-lg text-gray-800 dark:text-gray-300">
        🗓️ <strong>{departureDate || "N/A"}</strong> ➡️ <strong>{arrivalDate || "N/A"}</strong>
      </p>

      {loading && <p className="text-center text-yellow-600">🔍 Searching flights...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {flights.length > 0 && (
        <div className="max-w-4xl mx-auto space-y-4">
          {flights.map((flight, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md border border-gray-300 dark:border-gray-700"
            >
              <p>
                <strong>✈️ Airline:</strong> {flight.airline}
              </p>
              <p>
                <strong>📍 From:</strong> {from} ({flight.departureAirport}) — {flight.departure}
              </p>
              <p>
                <strong>📍 destination:</strong> {destination} ({flight.arrivalAirport}) — {flight.arrival}
              </p>
              <p>
                <strong>🕑 Departure Time:</strong> {formatDateTime(flight.departureTime)}
              </p>
              <p>
                <strong>🕓 Arrival Time:</strong> {formatDateTime(flight.arrivalTime)}
              </p>
              <p>
                <strong>💲 Estimated Price:</strong> ${flight.price}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Flight;
