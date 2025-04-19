import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FaArrowLeft, FaCalendarAlt, FaMapMarkerAlt, FaDollarSign, FaHeart, FaPlane } from "react-icons/fa";
import Footer from "../components/Footer";
import bg from "../assets/bg.png";
import { fetchImageFromUnsplash } from "../../../backend/utils/unsplash.js";

const Itinerary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState(null);

  const {
    destination,
    budget,
    preferences,
    itinerary,
    arrivalDate,
    departureDate,
    from,
  } = location.state || {};

  const handleCheckFlights = () => {
    navigate("/flight", {
      state: {
        from: from,
        destination: `${destination}`,
        arrivalDate: `${arrivalDate}`,
        departureDate: `${departureDate}`,
      },
    });
  };

  // Set the first day as active when itinerary loads
  useEffect(() => {
    if (itinerary && itinerary.length > 0) {
      setActiveDay(itinerary[0].day);
    }
  }, [itinerary]);

  // Fetch image for each day based on activity or fallback to destination
  useEffect(() => {
    const fetchImages = async () => {
      if (!itinerary || !destination) return;
  
      setLoading(true);
  
      try {
        // Fetch all required images from your backend
        const response = await fetch(`https://triply-2-o.onrender.com/api/getPlaceImage?destination=${encodeURIComponent(destination)}&days=${itinerary.length}`);
        const data = await response.json();
        
        if (data.error) {
          console.error("API error:", data.error);
          setImages({});  // Set empty object to prevent mapping errors
          return;
        }
        
        if (!data.images || !Array.isArray(data.images)) {
          console.error("Invalid image data format:", data);
          setImages({});
          return;
        }
        
        const imageMap = {};
        itinerary.forEach((item, index) => {
          // Only map if the image at that index exists
          if (data.images[index]) {
            imageMap[item.day] = data.images[index];
          }
        });
  
        setImages(imageMap);
      } catch (err) {
        console.error("Error fetching images:", err);
        setImages({});
      }
  
      setLoading(false);
    };
  
    fetchImages();
  }, [itinerary, destination]);
  

  // Format dates for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const formattedArrival = formatDate(arrivalDate);
  const formattedDeparture = formatDate(departureDate);

  if (!destination || !budget || !preferences || !itinerary) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cover bg-center p-6" style={{ backgroundImage: `url(${bg})` }}>
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl p-10 shadow-2xl max-w-md w-full text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">No Itinerary Data Found!</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Looks like we're missing some important information to display your itinerary.</p>
          <button
            onClick={() => navigate("/planner")}
            className="w-full px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-full hover:from-teal-600 hover:to-teal-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Create New Itinerary
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col relative bg-cover bg-center bg-no-repeat dark:text-white"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="relative z-10 flex flex-col flex-grow bg-black/50 backdrop-blur-sm">
        <div className="p-5 flex-grow max-w-6xl mx-auto w-full">
          <div className="flex justify-between mb-6">
            <Link
              to="/"
              className="flex items-center gap-2 text-base font-medium px-5 py-3 rounded-full text-gray-200 bg-gray-800/80 hover:bg-gray-700 transition duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <FaArrowLeft className="text-teal-400" />
              Back To Home
            </Link>
          </div>

          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-teal-300 to-teal-500 text-transparent bg-clip-text mb-3">
              ✈️ Your Personalized Travel Plan
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Explore your custom itinerary for {destination}, tailored to your preferences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Trip summary card */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-gray-700/50 sticky top-5">
                <h2 className="text-2xl font-semibold text-teal-400 mb-6 pb-2 border-b border-gray-700">Trip Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-teal-500/20 p-2 rounded-lg">
                      <FaMapMarkerAlt className="text-teal-400 text-lg" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Destination</p>
                      <p className="text-lg font-medium text-white">{destination}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-teal-500/20 p-2 rounded-lg">
                      <FaCalendarAlt className="text-teal-400 text-lg" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Trip Duration</p>
                      <p className="text-lg font-medium text-white">
                        {formattedArrival} - {formattedDeparture}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        {itinerary.length} days
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-teal-500/20 p-2 rounded-lg">
                      <FaDollarSign className="text-teal-400 text-lg" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Budget</p>
                      <p className="text-lg font-medium text-white">{budget}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-teal-500/20 p-2 rounded-lg">
                      <FaHeart className="text-teal-400 text-lg" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Preferences</p>
                      <p className="text-lg font-medium text-white">{preferences}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <button
                    onClick={handleCheckFlights}
                    className="w-full py-3 bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-600 hover:to-sky-800 text-white rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <FaPlane /> Search Available Flights
                  </button>
                </div>
              </div>
            </div>
            
            {/* Itinerary details */}
            <div className="lg:col-span-2">
              {/* Day selector */}
              <div className="mb-6 overflow-x-auto pb-2">
                <div className="flex gap-2 min-w-max">
                  {itinerary.map((item) => (
                    <button
                      key={`day-btn-${item.day}`}
                      onClick={() => setActiveDay(item.day)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        activeDay === item.day
                          ? "bg-teal-500 text-white shadow-md"
                          : "bg-gray-800/70 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      Day {item.day}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Day details */}
              {itinerary.map((item) => (
                <div
                  key={`day-content-${item.day}`}
                  className={`mb-6 transform transition-all duration-500 ${
                    activeDay === item.day ? "scale-100 opacity-100" : "scale-95 opacity-0 hidden"
                  }`}
                >
                  <div className="bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden border border-gray-700/50">
                    {/* Day header */}
                    <div className="bg-gradient-to-r from-teal-700 to-teal-900 p-4">
                      <h3 className="text-2xl font-bold text-white">Day {item.day}</h3>
                    </div>
                    
                    {/* Image section */}
                    <div className="relative h-64 md:h-80 overflow-hidden">
                      {loading ? (
                        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      ) : images[item.day] ? (
                        <img
                          src={images[item.day]}
                          alt={`Image for day ${item.day}`}
                          className="w-full h-full object-cover transition-transform duration-5000 hover:scale-110"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                          <p className="text-gray-400">No image available</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Activity details */}
                    <div className="p-6">
                      <div className="prose prose-lg dark:prose-invert max-w-none">
                        {item.activity.split('\n').map((paragraph, idx) => (
                          <p key={idx} className="text-gray-200 leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Print button */}
              <div className="mt-8 mb-4 text-center">
                <button 
                  onClick={() => window.print()}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition duration-300 shadow-md hover:shadow-lg inline-flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
                  </svg>
                  Print Itinerary
                </button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Itinerary;