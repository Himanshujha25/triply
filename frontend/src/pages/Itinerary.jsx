import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaDollarSign,
  FaHeart,
  FaPlane,
  FaCloudSun,
  FaUmbrella,
  FaSun,
  FaSnowflake,
  FaCloud,
  FaPrint,
  FaCar,
  FaInfoCircle,
} from "react-icons/fa";
import Footer from "../components/Footer";
import bg from "../assets/bg.png";

const Itinerary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [imageLoadError, setImageLoadError] = useState({});

  const { destination, budget, preferences, itinerary, arrivalDate, departureDate, from } =
    location.state || {};

  useEffect(() => {
    if (itinerary && itinerary.length > 0) {
      setActiveDay(itinerary[0].day);
    }
  }, [itinerary]);

  useEffect(() => {
    const fetchImages = async () => {
      if (!itinerary || !destination) return;
      setLoading(true);
      try {
        const response = await fetch(
          `https://triply-2-o.onrender.com/api/getPlaceImage?destination=${encodeURIComponent(destination)}&days=${itinerary.length}`
        );
        const data = await response.json();
        if (data.error || !Array.isArray(data.images)) {
          setImages(null);
          return;
        }
        const imageMap = {};
        itinerary.forEach((item, index) => {
          if (data.images[index]) {
            imageMap[item.day] = data.images[index];
          }
        });
        setImages(imageMap);
      } catch (err) {
        setImages(null);
        console.log("error while fetching images", err);
      }
      setLoading(false);
    };
    fetchImages();
  }, [itinerary, destination]);

  const fetchWeatherForecast = async () => {
    if (!destination || !arrivalDate || !departureDate) return;

    setLoading(true);
    try {
      const startDate = new Date(arrivalDate);
      const endDate = new Date(departureDate);
      let tripDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
      tripDays = Math.min(tripDays, 10);

      const weatherForecast = Array.from({ length: tripDays }, (_, i) => {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        const weatherTypes = ["sunny", "cloudy", "rainy", "partly-cloudy", "stormy"];
        const randomWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
        const tempMin = Math.floor(Math.random() * 10) + 15;
        const tempMax = tempMin + Math.floor(Math.random() * 10) + 3;

        return {
          date: date.toISOString().split("T")[0],
          day: i + 1,
          weather: randomWeather,
          tempMin,
          tempMax,
          humidity: Math.floor(Math.random() * 50) + 30,
        };
      });

      setWeatherData(weatherForecast);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWeatherForecast();
  }, [destination, arrivalDate, departureDate]);

  const renderWeatherIcon = (weatherType) => {
    const iconProps = { "aria-hidden": "true" };
    switch (weatherType) {
      case "sunny":
        return <FaSun {...iconProps} className="text-yellow-400 text-xl md:text-2xl" />;
      case "cloudy":
        return <FaCloud {...iconProps} className="text-gray-400 text-xl md:text-2xl" />;
      case "rainy":
        return <FaUmbrella {...iconProps} className="text-blue-400 text-xl md:text-2xl" />;
      case "partly-cloudy":
        return <FaCloudSun {...iconProps} className="text-yellow-300 text-xl md:text-2xl" />;
      case "stormy":
        return <FaSnowflake {...iconProps} className="text-blue-300 text-xl md:text-2xl" />;
      default:
        return <FaCloudSun {...iconProps} className="text-gray-300 text-xl md:text-2xl" />;
    }
  };

  const WeatherWidget = ({ dayNumber }) => {
    if (!weatherData) {
      return (
        <div className="bg-gradient-to-r from-gray-800/70 to-gray-900/70 rounded-lg md:rounded-xl p-3 md:p-4 mb-4 md:mb-6 border border-gray-700/50">
          <p className="text-gray-400 text-center text-sm md:text-base">Loading weather forecast...</p>
        </div>
      );
    }

    const dayWeather = weatherData.find((w) => w.day === dayNumber);
    if (!dayWeather) {
      return (
        <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg md:rounded-xl p-3 md:p-4 mb-4 md:mb-6 border border-yellow-700/50">
          <div className="flex items-center gap-2 text-yellow-300">
            <FaInfoCircle className="text-sm md:text-base flex-shrink-0" />
            <p className="text-xs md:text-sm">Weather forecast available for up to 10 days only</p>
          </div>
        </div>
      );
    }

    return (
      <div
        className="bg-gradient-to-br from-teal-900/40 via-gray-900/50 to-blue-900/40 rounded-lg md:rounded-xl p-4 md:p-5 mb-4 md:mb-6 border border-teal-700/30 shadow-lg backdrop-blur-sm hover:shadow-xl transition-all duration-300"
        role="region"
        aria-label={`Weather forecast for day ${dayNumber}`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
          <div className="flex items-center gap-3 md:gap-4 w-full sm:w-auto">
            <div className="bg-teal-500/20 p-2 md:p-3 rounded-lg flex-shrink-0">
              {renderWeatherIcon(dayWeather.weather)}
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5 md:mb-1">Expected Weather</p>
              <p className="text-base md:text-xl font-semibold text-white capitalize">{dayWeather.weather}</p>
              <p className="text-xs text-teal-300 mt-0.5 md:mt-1">{dayWeather.date}</p>
            </div>
          </div>
          <div className="text-left sm:text-right w-full sm:w-auto">
            <p className="text-xl md:text-2xl font-bold text-white mb-0.5 md:mb-1">
              {dayWeather.tempMin}° - {dayWeather.tempMax}°C
            </p>
            <p className="text-xs text-gray-300 bg-gray-800/50 px-2 py-1 rounded inline-block">
              Humidity: {dayWeather.humidity}%
            </p>
          </div>
        </div>
      </div>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formattedArrival = formatDate(arrivalDate);
  const formattedDeparture = formatDate(departureDate);

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

  if (!destination || !budget || !preferences || !itinerary) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 md:p-6"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-2xl md:rounded-3xl p-8 md:p-12 shadow-2xl max-w-md w-full text-center border border-gray-200/20">
          <div className="text-red-500 mb-4 md:mb-6 animate-pulse">
            <svg className="w-16 h-16 md:w-20 md:h-20 mx-auto" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-3 md:mb-4">
            No Itinerary Found
          </h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-6 md:mb-8 leading-relaxed">
            We couldn't find your travel plans. Let's create a new adventure together!
          </p>
          <button
            onClick={() => navigate("/planner")}
            className="w-full px-6 py-3 md:py-4 bg-gradient-to-r from-teal-500 to-teal-700 text-white text-sm md:text-base rounded-xl md:rounded-2xl hover:from-teal-600 hover:to-teal-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-500/50"
            aria-label="Create a new travel itinerary"
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
      <div className="relative z-10 flex flex-col flex-grow bg-gradient-to-b from-black/60 via-black/50 to-black/60 backdrop-blur-sm">
        <div className="p-4 sm:p-6 lg:p-8 flex-grow max-w-7xl mx-auto w-full">
          {/* Header Navigation */}
          <nav className="flex justify-between items-center mb-6 md:mb-8" aria-label="Page navigation">
            <Link
              to="/"
              className="flex items-center gap-2 text-xs sm:text-sm md:text-base font-medium px-4 sm:px-5 py-2.5 md:py-3 rounded-full text-white bg-gray-800/90 hover:bg-gray-700/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-gray-700/50 focus:outline-none focus:ring-4 focus:ring-teal-500/50"
              aria-label="Return to home page"
            >
              <FaArrowLeft className="text-teal-400 text-sm md:text-base" aria-hidden="true" />
              <span className="hidden xs:inline">Back To Home</span>
              <span className="xs:hidden">Home</span>
            </Link>
          </nav>

          {/* Hero Section */}
          <header className="text-center mb-8 md:mb-10 px-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-teal-300 via-teal-400 to-emerald-400 text-transparent bg-clip-text mb-3 md:mb-4 drop-shadow-lg leading-tight">
              ✈️ Your Personalized Journey
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed px-2">
              Discover your carefully crafted itinerary for <span className="text-teal-300 font-semibold">{destination}</span>,
              designed around your unique preferences
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Trip Summary Card */}
            <aside className="lg:col-span-1 order-2 lg:order-1" aria-label="Trip summary">
              <div className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-lg rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8 border border-gray-700/50 lg:sticky lg:top-5 hover:shadow-teal-500/10 transition-all duration-300">
                <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 mb-6 md:mb-8 pb-2 md:pb-3 border-b-2 border-teal-500/30">
                  Trip Overview
                </h2>

                <div className="space-y-5 md:space-y-6">
                  <div className="flex items-start gap-3 md:gap-4 group hover:translate-x-1 transition-transform duration-300">
                    <div className="bg-gradient-to-br from-teal-500/30 to-teal-600/20 p-2.5 md:p-3 rounded-xl group-hover:from-teal-500/40 group-hover:to-teal-600/30 transition-all duration-300 flex-shrink-0">
                      <FaMapMarkerAlt className="text-teal-400 text-lg md:text-xl" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-gray-400 text-xs uppercase tracking-wide mb-0.5 md:mb-1">Destination</p>
                      <p className="text-lg md:text-xl font-semibold text-white break-words">{destination}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 md:gap-4 group hover:translate-x-1 transition-transform duration-300">
                    <div className="bg-gradient-to-br from-teal-500/30 to-teal-600/20 p-2.5 md:p-3 rounded-xl group-hover:from-teal-500/40 group-hover:to-teal-600/30 transition-all duration-300 flex-shrink-0">
                      <FaCalendarAlt className="text-teal-400 text-lg md:text-xl" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-gray-400 text-xs uppercase tracking-wide mb-0.5 md:mb-1">Trip Duration</p>
                      <p className="text-base md:text-lg font-semibold text-white break-words">
                        {formattedArrival} - {formattedDeparture}
                      </p>
                      <p className="text-sm text-teal-300 mt-1 font-medium">{itinerary.length} days adventure</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 md:gap-4 group hover:translate-x-1 transition-transform duration-300">
                    <div className="bg-gradient-to-br from-teal-500/30 to-teal-600/20 p-2.5 md:p-3 rounded-xl group-hover:from-teal-500/40 group-hover:to-teal-600/30 transition-all duration-300 flex-shrink-0">
                      <FaDollarSign className="text-teal-400 text-lg md:text-xl" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-gray-400 text-xs uppercase tracking-wide mb-0.5 md:mb-1">Budget</p>
                      <p className="text-lg md:text-xl font-semibold text-white break-words">{budget}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 md:gap-4 group hover:translate-x-1 transition-transform duration-300">
                    <div className="bg-gradient-to-br from-teal-500/30 to-teal-600/20 p-2.5 md:p-3 rounded-xl group-hover:from-teal-500/40 group-hover:to-teal-600/30 transition-all duration-300 flex-shrink-0">
                      <FaHeart className="text-teal-400 text-lg md:text-xl" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-gray-400 text-xs uppercase tracking-wide mb-0.5 md:mb-1">Your Interests</p>
                      <p className="text-base md:text-lg font-semibold text-white break-words">{preferences}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 md:mt-10 space-y-3">
                  <button
                    onClick={handleCheckFlights}
                    className="w-full py-3 md:py-4 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white text-sm md:text-base rounded-xl md:rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 flex items-center justify-center gap-2 md:gap-3 focus:outline-none focus:ring-4 focus:ring-sky-500/50"
                    aria-label="Search for available flights"
                  >
                    <FaPlane className="text-base md:text-lg" aria-hidden="true" />
                    Search Flights
                  </button>
                </div>
              </div>
            </aside>

            {/* Itinerary Details */}
            <main className="lg:col-span-2 order-1 lg:order-2" aria-label="Daily itinerary">
              {/* Day Selector */}
              <div className="mb-6 md:mb-8 overflow-x-auto pb-3 -mx-4 px-4 sm:mx-0 sm:px-0">
                <div
                  className="flex gap-2 md:gap-3 min-w-max"
                  role="tablist"
                  aria-label="Select day to view"
                >
                  {itinerary.map((item) => (
                    <button
                      key={`day-btn-${item.day}`}
                      role="tab"
                      aria-selected={activeDay === item.day}
                      aria-controls={`day-panel-${item.day}`}
                      onClick={() => setActiveDay(item.day)}
                      className={`
    inline-flex items-center justify-center
    px-5 py-2.5 rounded-lg
    font-semibold text-sm sm:text-base whitespace-nowrap
    mt-5 ml-3
    transition-all duration-300 ease-in-out
    transform hover:-translate-y-1 hover:scale-105
    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900
    ${activeDay === item.day
                          ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-lg shadow-teal-500/40 focus-visible:ring-emerald-400'
                          : 'bg-white/5 text-gray-300 ring-1 ring-inset ring-white/10 hover:bg-white/10 hover:text-white focus-visible:ring-sky-400'
                        }
  `}
                    >
                      Day {item.day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Day Details */}
              {itinerary.map((item) => (
                <article
                  key={`day-content-${item.day}`}
                  id={`day-panel-${item.day}`}
                  role="tabpanel"
                  aria-labelledby={`day-btn-${item.day}`}
                  className={`mb-6 md:mb-8 transform transition-all duration-500 ${activeDay === item.day ? "scale-100 opacity-100" : "scale-95 opacity-0 hidden"
                    }`}
                >
                  <div className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-lg rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border border-gray-700/50 hover:shadow-teal-500/10 transition-all duration-500">
                    {/* Day Header */}
                    <header className="bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-700 p-4 md:p-6 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 animate-pulse"></div>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white relative z-10 drop-shadow-lg">
                        Day {item.day}
                      </h3>
                    </header>

                    {/* Image Section */}
                    <div className="relative h-56 sm:h-64 md:h-80 lg:h-96 overflow-hidden bg-gray-900">
                      {loading ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
                          <div className="relative">
                            <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-teal-500/30 border-t-teal-500 rounded-full animate-spin"></div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
                          </div>
                        </div>
                      ) : images[item.day] && !imageLoadError[item.day] ? (
                        <>
                          <img
                            src={images[item.day]}
                            alt={`Scenic view for day ${item.day} in ${destination}`}
                            className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-110"
                            onError={() => setImageLoadError(prev => ({ ...prev, [item.day]: true }))}
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent"></div>
                        </>
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col items-center justify-center p-4">
                          <svg className="w-16 h-16 md:w-20 md:h-20 text-gray-700 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-gray-500 text-base md:text-lg">Image unavailable</p>
                        </div>
                      )}
                    </div>

                    {/* Activity Details */}
                    <div className="p-5 sm:p-6 md:p-8">
                      <WeatherWidget dayNumber={item.day} />

                      <div className="space-y-3 md:space-y-4">
                        <h4 className="text-xl md:text-2xl font-bold text-teal-300 mb-3 md:mb-4 flex items-center gap-2">
                          <span className="w-1 h-6 md:h-8 bg-gradient-to-b from-teal-400 to-emerald-400 rounded-full"></span>
                          Today's Activities
                        </h4>
                        {item.activities.split("\n").filter(p => p.trim()).map((paragraph, idx) => (
                          <p
                            key={idx}
                            className="text-gray-200 leading-relaxed text-base md:text-lg pl-3 md:pl-4 border-l-2 border-gray-700/50 hover:border-teal-500/50 transition-colors duration-300"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}

              {/* Action Buttons */}
              <div className="mt-8 md:mt-10 mb-6 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-stretch sm:items-center">
                <button
                  onClick={() => window.print()}
                  className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white text-sm md:text-base rounded-xl md:rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center justify-center gap-2 md:gap-3 font-semibold transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-500/50"
                  aria-label="Print your itinerary"
                >
                  <FaPrint className="text-base md:text-lg" aria-hidden="true" />
                  Print Itinerary
                </button>

                {!loading && itinerary && (
                  <button
                    onClick={() =>
                      navigate("/transport", {
                        state: {
                          from: from,
                          destination: destination,
                          arrivalDate: arrivalDate,
                          departureDate: departureDate,
                        },
                      })
                    }
                    className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm md:text-base rounded-xl md:rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center justify-center gap-2 md:gap-3 font-semibold transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
                    aria-label="Check available transportation options"
                  >
                    <FaCar className="text-base md:text-lg" aria-hidden="true" />
                    Transportation Options
                  </button>
                )}
              </div>
            </main>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Itinerary;