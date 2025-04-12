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
  const [sortBy, setSortBy] = useState("price"); // Default sort by price

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

  const formatTime = (datetime) => {
    if (!datetime) return "N/A";
    const date = new Date(datetime);
    return isNaN(date.getTime())
      ? "Invalid Date"
      : date.toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });
  };

  const formatDate = (datetime) => {
    if (!datetime) return "N/A";
    const date = new Date(datetime);
    return isNaN(date.getTime())
      ? "Invalid Date"
      : date.toLocaleString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
  };

  const sortedFlights = [...flights].sort((a, b) => {
    if (sortBy === "price") {
      return parseFloat(a.price) - parseFloat(b.price);
    } else if (sortBy === "duration") {
      const aDuration = new Date(a.arrivalTime) - new Date(a.departureTime);
      const bDuration = new Date(b.arrivalTime) - new Date(b.departureTime);
      return aDuration - bDuration;
    } else if (sortBy === "departure") {
      return new Date(a.departureTime) - new Date(b.departureTime);
    }
    return 0;
  });

  const calculateDuration = (departure, arrival) => {
    const start = new Date(departure);
    const end = new Date(arrival);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return "N/A";
    }
    
    const diffMs = end - start;
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${diffHrs}h ${diffMins}m`;
  };

  return (
    <div
      className="min-h-screen py-8 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white bg-cover bg-center"
      style={{
        backgroundImage: ` url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h1 className="text-3xl font-bold mb-1 text-sky-700 dark:text-sky-400">
                ✈️ Flight Search Results
              </h1>
              <p className="text-xl font-medium text-gray-700 dark:text-gray-300">
                {from || "Unknown"} → {destination || "Unknown"}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {departureDate || "N/A"} - {arrivalDate || "N/A"}
              </p>
            </div>
            
            {flights.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-gray-700 dark:text-gray-300">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 rounded-md py-1 px-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="price">Price</option>
                  <option value="duration">Duration</option>
                  <option value="departure">Departure Time</option>
                </select>
              </div>
            )}
          </div>
          
          {loading && (
            <div className="flex justify-center items-center p-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
              <p className="ml-3 text-lg text-sky-600 dark:text-sky-400">Searching flights...</p>
            </div>
          )}
          
          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-400 p-4 rounded">
              <p className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
                {error}
              </p>
            </div>
          )}
          
          {flights.length === 0 && !loading && !error && (
            <div className="text-center py-10">
              <p className="text-gray-500 dark:text-gray-400 text-lg">No flights found for your search criteria.</p>
              <p className="text-gray-500 dark:text-gray-400">Try different dates or destinations.</p>
            </div>
          )}
          
          {sortedFlights.length > 0 && (
            <div className="space-y-4">
              {sortedFlights.map((flight, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition duration-300"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700">
                    {/* Flight Info */}
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-lg font-bold text-sky-700 dark:text-sky-400">{flight.airline}</span>
                        <span className="text-sm bg-gray-100 dark:bg-gray-700 py-1 px-2 rounded text-gray-600 dark:text-gray-300">
                          {flight.departureAirport} → {flight.arrivalAirport}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-center">
                          <p className="text-xl font-bold">{formatTime(flight.departureTime)}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{formatDate(flight.departureTime)}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">{flight.departureAirport}</p>
                        </div>
                        
                        <div className="flex flex-col items-center flex-grow px-2">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            {calculateDuration(flight.departureTime, flight.arrivalTime)}
                          </p>
                          <div className="w-full flex items-center">
                            <div className="h-0.5 bg-gray-300 dark:bg-gray-600 flex-grow"></div>
                            <svg className="w-4 h-4 text-gray-400 dark:text-gray-500 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                            </svg>
                            <div className="h-0.5 bg-gray-300 dark:bg-gray-600 flex-grow"></div>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Direct</p>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-xl font-bold">{formatTime(flight.arrivalTime)}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{formatDate(flight.arrivalTime)}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">{flight.arrivalAirport}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Flight Details */}
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase mb-2">Flight Details</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span>
                            <strong>Duration:</strong> {calculateDuration(flight.departureTime, flight.arrivalTime)}
                          </span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                          </svg>
                          <span>
                            <strong>From:</strong> {from} ({flight.departureAirport})
                          </span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          </svg>
                          <span>
                            <strong>To:</strong> {destination} ({flight.arrivalAirport})
                          </span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                          </svg>
                          <span>
                            <strong>Airline:</strong> {flight.airline}
                          </span>
                        </li>
                      </ul>
                    </div>
                    
                    {/* Price and Book */}
                    <div className="p-4 flex flex-col justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">Price</p>
                        <p className="text-3xl font-bold text-sky-600 dark:text-sky-400">${flight.price}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">per person</p>
                      </div>
                      
                      <div className="mt-4">
                        <button className="w-full bg-sky-600 hover:bg-sky-700 text-white py-2 px-4 rounded-md transition duration-200 font-medium">
                          Select Flight
                        </button>
                        <p className="text-xs text-center mt-2 text-gray-500 dark:text-gray-400">
                          Limited seats available
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Flight;