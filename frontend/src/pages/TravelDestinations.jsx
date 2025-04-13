import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaMapMarkerAlt, FaStar, FaHeart, FaRegHeart, FaFilter } from "react-icons/fa";
import { MdFlightTakeoff, MdHotel, MdRestaurant, MdAttractions, MdFilterList, MdClose } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Mock API service for destinations
const apiService = {
  async getDestinations(params = {}) {
    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // This would be replaced with an actual API call
    const allDestinations = [
      {
        id: 1,
        name: "Paris",
        country: "France",
        description: "Known as the 'City of Light', Paris is famous for its iconic Eiffel Tower, world-class art museums like the Louvre, and romantic Seine River cruises.",
        rating: 4.8,
        reviews: 4253,
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000",
        activities: ["Eiffel Tower", "Louvre Museum", "Notre Dame Cathedral", "Seine River Cruise"],
        tags: ["romantic", "culture", "food", "architecture"],
        priceLevel: "expensive",
        coordinates: { lat: 48.8566, lng: 2.3522 }
      },
      {
        id: 2,
        name: "Bali",
        country: "Indonesia",
        description: "Bali offers a perfect mix of stunning beaches, lush rice terraces, volcanic hillsides, and ancient temples alongside luxury resorts and vibrant nightlife.",
        rating: 4.7,
        reviews: 3890,
        image: "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=1000",
        activities: ["Uluwatu Temple", "Tegallalang Rice Terraces", "Ubud Monkey Forest", "Kuta Beach"],
        tags: ["beach", "nature", "spiritual", "budget-friendly"],
        priceLevel: "moderate",
        coordinates: { lat: -8.3405, lng: 115.0920 }
      },
      {
        id: 3,
        name: "Kyoto",
        country: "Japan",
        description: "Former imperial capital of Japan, Kyoto is known for its classical Buddhist temples, gardens, imperial palaces, Shinto shrines and traditional wooden houses.",
        rating: 4.9,
        reviews: 2985,
        image: "https://images.unsplash.com/photo-1624253321171-1be53e12f5f4?q=80&w=1000",
        activities: ["Fushimi Inari Shrine", "Kinkaku-ji (Golden Pavilion)", "Arashiyama Bamboo Grove", "Gion District"],
        tags: ["cultural", "temples", "traditional", "scenic"],
        priceLevel: "expensive",
        coordinates: { lat: 35.0116, lng: 135.7681 }
      },
      {
        id: 4,
        name: "Santorini",
        country: "Greece",
        description: "Santorini is famous for its dramatic views, stunning sunsets, white-washed houses, and blue-domed churches perched on volcanic cliffs.",
        rating: 4.8,
        reviews: 3456,
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1000",
        activities: ["Oia Sunset", "Black Sand Beach", "Caldera Cruise", "Ancient Akrotiri"],
        tags: ["scenic", "romantic", "beach", "luxury"],
        priceLevel: "expensive",
        coordinates: { lat: 36.3932, lng: 25.4615 }
      },
      {
        id: 5,
        name: "New York City",
        country: "USA",
        description: "The Big Apple offers world-class museums, iconic landmarks, diverse neighborhoods, incredible dining options, and unmatched energy.",
        rating: 4.7,
        reviews: 5289,
        image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1000",
        activities: ["Central Park", "Times Square", "Empire State Building", "Metropolitan Museum of Art"],
        tags: ["urban", "culture", "shopping", "nightlife"],
        priceLevel: "expensive",
        coordinates: { lat: 40.7128, lng: -74.0060 }
      },
      {
        id: 6,
        name: "Cape Town",
        country: "South Africa",
        description: "Cape Town offers dramatic scenery, beaches, and mountains, alongside vibrant culture and rich history.",
        rating: 4.6,
        reviews: 2457,
        image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=1000",
        activities: ["Table Mountain", "Robben Island", "Cape of Good Hope", "V&A Waterfront"],
        tags: ["scenic", "wildlife", "beach", "adventure"],
        priceLevel: "moderate",
        coordinates: { lat: -33.9249, lng: 18.4241 }
      },
      {
        id: 7,
        name: "Bangkok",
        country: "Thailand",
        description: "Thailand's capital city is a vibrant metropolis offering ornate shrines, street food, and bustling markets.",
        rating: 4.5,
        reviews: 3124,
        image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?q=80&w=1000",
        activities: ["Grand Palace", "Wat Arun", "Chatuchak Weekend Market", "Chao Phraya River Cruise"],
        tags: ["food", "temples", "shopping", "budget-friendly"],
        priceLevel: "budget",
        coordinates: { lat: 13.7563, lng: 100.5018 }
      },
      {
        id: 8,
        name: "Barcelona",
        country: "Spain",
        description: "Barcelona is known for its art and architecture, particularly Gaudi's works, alongside beautiful beaches and vibrant street life.",
        rating: 4.7,
        reviews: 3845,
        image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=1000",
        activities: ["Sagrada Familia", "Park Güell", "La Rambla", "Barceloneta Beach"],
        tags: ["architecture", "beach", "food", "culture"],
        priceLevel: "moderate",
        coordinates: { lat: 41.3851, lng: 2.1734 }
      }
    ];
    
    // Apply search filter if present
    let filteredDestinations = [...allDestinations];
    
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filteredDestinations = filteredDestinations.filter(dest => 
        dest.name.toLowerCase().includes(searchLower) || 
        dest.country.toLowerCase().includes(searchLower) ||
        dest.description.toLowerCase().includes(searchLower) ||
        dest.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    // Apply tag filters if present
    if (params.tags && params.tags.length > 0) {
      filteredDestinations = filteredDestinations.filter(dest => 
        params.tags.some(tag => dest.tags.includes(tag))
      );
    }
    
    // Apply price level filter if present
    if (params.priceLevel && params.priceLevel.length > 0) {
      filteredDestinations = filteredDestinations.filter(dest => 
        params.priceLevel.includes(dest.priceLevel)
      );
    }
    
    // Apply rating filter
    if (params.minRating) {
      filteredDestinations = filteredDestinations.filter(dest => 
        dest.rating >= params.minRating
      );
    }
    
    return {
      destinations: filteredDestinations,
      totalCount: filteredDestinations.length
    };
  },
  
  async getDestinationById(id) {
    // This would be replaced with an actual API call
    const allDestinations = [
      {
        id: 1,
        name: "Paris",
        country: "France",
        description: "Known as the 'City of Light', Paris is famous for its iconic Eiffel Tower, world-class art museums like the Louvre, and romantic Seine River cruises.",
        rating: 4.8,
        reviews: 4253,
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000",
        activities: ["Eiffel Tower", "Louvre Museum", "Notre Dame Cathedral", "Seine River Cruise"],
        tags: ["romantic", "culture", "food", "architecture"],
        priceLevel: "expensive",
        coordinates: { lat: 48.8566, lng: 2.3522 }
      },
      // Other destinations would be here
    ];
    
    return allDestinations.find(dest => dest.id === parseInt(id, 10));
  }
};

const DestinationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [filters, setFilters] = useState({
    tags: [],
    priceLevel: [],
    minRating: 0
  });
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [isDetailView, setIsDetailView] = useState(false);
  
  const searchInputRef = useRef(null);
  
  // Available filter options
  const tagOptions = ["beach", "culture", "food", "nature", "adventure", "romantic", "architecture", "spiritual", "shopping", "nightlife", "wildlife", "scenic", "luxury", "budget-friendly"];
  const priceLevelOptions = ["budget", "moderate", "expensive", "luxury"];
  
  useEffect(() => {
    // Focus search input if we came from navbar search
    if (initialQuery && searchInputRef.current) {
      searchInputRef.current.focus();
    }
    
    fetchDestinations();
  }, [initialQuery]);
  
  const fetchDestinations = async () => {
    setLoading(true);
    try {
      const params = {
        search: searchQuery,
        ...filters
      };
      
      const { destinations } = await apiService.getDestinations(params);
      setDestinations(destinations);
    } catch (error) {
      console.error("Error fetching destinations:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    // Update URL with search query for bookmarking/sharing
    navigate(`/destinations?q=${encodeURIComponent(searchQuery)}`);
    fetchDestinations();
  };
  
  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => {
      if (filterType === 'minRating') {
        return { ...prevFilters, minRating: value };
      }
      
      const currentValues = prevFilters[filterType];
      
      if (currentValues.includes(value)) {
        return { 
          ...prevFilters, 
          [filterType]: currentValues.filter(item => item !== value) 
        };
      } else {
        return { 
          ...prevFilters, 
          [filterType]: [...currentValues, value] 
        };
      }
    });
  };
  
  const applyFilters = () => {
    fetchDestinations();
    setShowFilters(false);
  };
  
  const resetFilters = () => {
    setFilters({
      tags: [],
      priceLevel: [],
      minRating: 0
    });
  };
  
  const toggleFavorite = (id) => {
    setFavorites(prev => {
      if (prev.includes(id)) {
        return prev.filter(favId => favId !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  
  const viewDestinationDetails = (destination) => {
    setSelectedDestination(destination);
    setIsDetailView(true);
    // Update URL for direct linking to destination
    navigate(`/destinations/${destination.id}/${destination.name.toLowerCase().replace(/\s+/g, '-')}`);
  };
  
  const backToResults = () => {
    setIsDetailView(false);
    setSelectedDestination(null);
    // Go back to main destinations page with current search
    navigate(`/destinations${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ''}`);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screenfixed inset-0 bg-black/20 backdrop-blur-sm z-0">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
        {isDetailView && selectedDestination ? (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {/* Back button */}
              <button 
                onClick={backToResults}
                className="absolute top-28 left-8 z-10 bg-white/80 hover:bg-white rounded-full p-3 shadow-md transition-all"
              >
                <IoArrowBack className="w-5 h-5 text-gray-800" />
              </button>
              
              {/* Hero image */}
              <div className="relative h-96 w-full">
                <img 
                  src={selectedDestination.image} 
                  alt={selectedDestination.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="flex items-center mb-2">
                    <FaMapMarkerAlt className="mr-2" />
                    <span className="text-lg">{selectedDestination.country}</span>
                  </div>
                  <h1 className="text-4xl font-bold mb-2">{selectedDestination.name}</h1>
                  <div className="flex items-center">
                    <div className="flex items-center mr-4">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span>{selectedDestination.rating}</span>
                    </div>
                    <span className="text-gray-300">({selectedDestination.reviews} reviews)</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => toggleFavorite(selectedDestination.id)}
                  className="absolute top-8 right-8 bg-white/80 hover:bg-white rounded-full p-3 shadow-md transition-all"
                >
                  {favorites.includes(selectedDestination.id) ? (
                    <FaHeart className="w-5 h-5 text-red-500" />
                  ) : (
                    <FaRegHeart className="w-5 h-5 text-gray-800" />
                  )}
                </button>
              </div>
              
              {/* Content */}
              <div className="p-8">
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">About</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedDestination.description}
                  </p>
                </section>
                
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">Popular Activities</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedDestination.activities.map((activity, index) => (
                      <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                          <MdAttractions className="text-blue-600 w-6 h-6" />
                        </div>
                        <span className="font-medium">{activity}</span>
                      </div>
                    ))}
                  </div>
                </section>
                
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {selectedDestination.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </section>
                
                <div className="border-t border-gray-200 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between">
                  <div className="mb-4 md:mb-0">
                    <span className="text-sm text-gray-500">Price Level</span>
                    <p className="text-lg font-semibold capitalize">{selectedDestination.priceLevel}</p>
                  </div>
                  
                  <div className="flex gap-4">
                    <button className="px-6 py-3 bg-white border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center">
                      <MdHotel className="mr-2" /> Find Hotels
                    </button>
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center">
                      <MdFlightTakeoff className="mr-2" /> Plan Trip
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <>
            {/* Search & Filter Bar */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-6 text-gray-800">Discover Destinations</h1>
              
              <div className="flex flex-col md:flex-row gap-4">
                <form onSubmit={handleSearch} className="flex-grow">
                  <div className="relative">
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search for cities, countries, or experiences..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                    />
                    <FaSearch className="absolute left-4 top-4 text-gray-400" />
                    
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                      >
                        <MdClose className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </form>
                
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-6 py-3 bg-white border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center shadow-sm"
                >
                  <MdFilterList className="mr-2" /> 
                  Filters
                  {(filters.tags.length > 0 || filters.priceLevel.length > 0 || filters.minRating > 0) && (
                    <span className="ml-2 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {filters.tags.length + filters.priceLevel.length + (filters.minRating > 0 ? 1 : 0)}
                    </span>
                  )}
                </button>
              </div>
              
              {/* Filter Panel */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-white rounded-lg mt-4 shadow-lg overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Tags */}
                        <div>
                          <h3 className="font-semibold mb-3 text-gray-800">Destination Type</h3>
                          <div className="flex flex-wrap gap-2">
                            {tagOptions.map(tag => (
                              <button
                                key={tag}
                                onClick={() => handleFilterChange('tags', tag)}
                                className={`px-3 py-1.5 rounded-full text-sm ${
                                  filters.tags.includes(tag)
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                {tag}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        {/* Price Level */}
                        <div>
                          <h3 className="font-semibold mb-3 text-gray-800">Price Level</h3>
                          <div className="flex flex-wrap gap-2">
                            {priceLevelOptions.map(price => (
                              <button
                                key={price}
                                onClick={() => handleFilterChange('priceLevel', price)}
                                className={`px-3 py-1.5 rounded-full text-sm ${
                                  filters.priceLevel.includes(price)
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                {price}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        {/* Rating */}
                        <div>
                          <h3 className="font-semibold mb-3 text-gray-800">Rating</h3>
                          <div className="flex items-center gap-2 mb-4">
                            {[0, 3, 3.5, 4, 4.5].map(rating => (
                              <button
                                key={rating}
                                onClick={() => handleFilterChange('minRating', rating)}
                                className={`px-3 py-1.5 rounded-full text-sm ${
                                  filters.minRating === rating
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                {rating === 0 ? 'Any' : `${rating}+`}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between mt-6 pt-4 border-t border-gray-100">
                        <button 
                          onClick={resetFilters}
                          className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                          Reset Filters
                        </button>
                        <button 
                          onClick={applyFilters}
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Apply Filters
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Results */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {destinations.length === 0 
                      ? "No destinations found" 
                      : `${destinations.length} Destinations Found`}
                  </h2>
                  
                  {/* Sort options would go here */}
                </div>
                
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {destinations.map((destination) => (
                    <motion.div
                      key={destination.id}
                      variants={itemVariants}
                      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="relative">
                        <img 
                          src={destination.image} 
                          alt={destination.name}
                          className="w-full h-48 object-cover"
                        />
                        <button 
                          onClick={() => toggleFavorite(destination.id)}
                          className="absolute top-4 right-4 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all"
                        >
                          {favorites.includes(destination.id) ? (
                            <FaHeart className="w-4 h-4 text-red-500" />
                          ) : (
                            <FaRegHeart className="w-4 h-4 text-gray-800" />
                          )}
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
                          <div className="flex items-center mb-1">
                            <FaMapMarkerAlt className="mr-1 w-3 h-3" />
                            <span className="text-sm">{destination.country}</span>
                          </div>
                          <h3 className="text-xl font-bold">{destination.name}</h3>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="flex items-center mb-3">
                          <div className="flex items-center mr-2">
                            <FaStar className="text-yellow-400 mr-1 w-4 h-4" />
                            <span className="font-medium">{destination.rating}</span>
                          </div>
                          <span className="text-sm text-gray-500">({destination.reviews} reviews)</span>
                        </div>
                        
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {destination.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 mb-4">
                          {destination.tags.slice(0, 3).map((tag, index) => (
                            <span 
                              key={index}
                              className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                          {destination.tags.length > 3 && (
                            <span className="px-2 py-1 bg-gray-50 text-gray-500 rounded-full text-xs">
                              +{destination.tags.length - 3}
                            </span>
                          )}
                        </div>
                        
                        <button
                          onClick={() => viewDestinationDetails(destination)}
                          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
                
                {destinations.length === 0 && (
                  <div className="text-center py-16">
                    <div className="text-4xl mb-4">🔍</div>
                    <h3 className="text-xl font-medium text-gray-800 mb-2">No destinations found</h3>
                    <p className="text-gray-500">Try adjusting your search or filters</p>
                    <button 
                      onClick={resetFilters}
                      className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default DestinationPage;