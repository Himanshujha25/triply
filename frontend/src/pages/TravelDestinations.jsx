import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaMapMarkerAlt, FaStar, FaHeart, FaRegHeart, FaUmbrellaBeach, FaUtensils, FaMountain, FaLandmark } from "react-icons/fa";
import { MdFlightTakeoff, MdHotel, MdAttractions, MdFilterList, MdClose, MdNightlife, MdDirectionsWalk } from "react-icons/md";
import { IoArrowBack, IoLeaf } from "react-icons/io5";
import { GiCastle, GiIndianPalace, GiShoppingBag } from "react-icons/gi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import bg from "../assets/bg.png";

// Hardcoded destinations data
const hardcodedDestinations = [
  {
    id: "fsq_1",
    name: "Bali",
    country: "Indonesia",
    rating: 4.8,
    reviews: 2450,
    description: "Experience paradise on Earth with stunning beaches, lush rice terraces, and vibrant cultural experiences. Bali offers a perfect blend of relaxation and adventure.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1080",
    priceLevel: "moderate",
    tags: ["beach", "culture", "spiritual", "nature"],
    activities: [
      "Visit ancient temples",
      "Explore rice terraces",
      "Surf in Kuta Beach",
      "Enjoy Balinese spa treatments"
    ],
    city: "Denpasar"
  },
  {
    id: "fsq_2",
    name: "Kyoto",
    country: "Japan",
    rating: 4.9,
    reviews: 1876,
    description: "Step back in time in Japan's cultural capital with its classical Buddhist temples, gardens, imperial palaces, Shinto shrines and traditional wooden houses.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1080",
    priceLevel: "expensive",
    tags: ["culture", "architecture", "spiritual", "food"],
    activities: [
      "Visit Fushimi Inari Shrine",
      "Explore bamboo forests",
      "Experience a traditional tea ceremony",
      "Stroll through Gion district"
    ],
    city: "Kyoto"
  },
  {
    id: "fsq_3",
    name: "Santorini",
    country: "Greece",
    rating: 4.7,
    reviews: 3240,
    description: "The jewel of the Aegean Sea, Santorini offers breathtaking sunsets, white-washed buildings with blue domes, and crystal clear waters.",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1080",
    priceLevel: "luxury",
    tags: ["scenic", "romantic", "beach", "luxury"],
    activities: [
      "Watch the sunset in Oia",
      "Visit volcanic beaches",
      "Wine tasting tours",
      "Sailing around the caldera"
    ],
    city: "Thira"
  },
  {
    id: "fsq_4",
    name: "Marrakech",
    country: "Morocco",
    rating: 4.5,
    reviews: 1560,
    description: "An exotic city of immense beauty, Marrakech entices visitors with its medina, vibrant souks, palaces, gardens, and unique cultural experiences.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&q=80&w=1080",
    priceLevel: "moderate",
    tags: ["culture", "shopping", "architecture", "food"],
    activities: [
      "Explore Jemaa el-Fnaa square",
      "Shop in the souks",
      "Visit Majorelle Garden",
      "Experience a traditional hammam"
    ],
    city: "Marrakech"
  },
  {
    id: "fsq_5",
    name: "Machu Picchu",
    country: "Peru",
    rating: 4.9,
    reviews: 2280,
    description: "Walk in the footsteps of the Incas at this ancient citadel set high in the Andes Mountains, offering spectacular views and mystical energy.",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1080",
    priceLevel: "expensive",
    tags: ["adventure", "nature", "architecture", "spiritual"],
    activities: [
      "Hike the Inca Trail",
      "Explore the ancient ruins",
      "Visit Huayna Picchu",
      "Learn about Inca history"
    ],
    city: "Cusco"
  },
  {
    id: "fsq_6",
    name: "Venice",
    country: "Italy",
    rating: 4.6,
    reviews: 3120,
    description: "Built on more than 100 small islands in a lagoon in the Adriatic Sea, Venice has no roads, just canals – including the Grand Canal thoroughfare.",
    image: "https://images.unsplash.com/photo-1534113414509-0eec2bfb493f?q=80&w=1080",
    priceLevel: "expensive",
    tags: ["romantic", "culture", "architecture", "scenic"],
    activities: [
      "Gondola ride through canals",
      "Visit St. Mark's Square",
      "Explore Doge's Palace",
      "Tour the Grand Canal"
    ],
    city: "Venice"
  },
  {
    id: "fsq_7",
    name: "Cape Town",
    country: "South Africa",
    rating: 4.7,
    reviews: 1890,
    description: "A stunning coastal city where mountains meet the sea, offering urban excitement, natural beauty, and rich cultural heritage.",
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=1080",
    priceLevel: "moderate",
    tags: ["nature", "scenic", "adventure", "culture"],
    activities: [
      "Visit Table Mountain",
      "Tour Robben Island",
      "Explore Cape Peninsula",
      "Wine tasting in nearby vineyards"
    ],
    city: "Cape Town"
  },
  {
    id: "fsq_8",
    name: "New York City",
    country: "United States",
    rating: 4.8,
    reviews: 5230,
    description: "The city that never sleeps offers iconic skyscrapers, diverse neighborhoods, world-class museums, Broadway shows, and endless entertainment.",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1080",
    priceLevel: "luxury",
    tags: ["culture", "food", "shopping", "architecture", "nightlife"],
    activities: [
      "Visit Times Square",
      "Explore Central Park",
      "See a Broadway show",
      "Tour the Metropolitan Museum of Art"
    ],
    city: "New York"
  },
  {
    id: "fsq_9",
    name: "Bangkok",
    country: "Thailand",
    rating: 4.5,
    reviews: 2780,
    description: "A city of contrasts with ornate shrines and vibrant street life. Modern skyscrapers rise next to traditional canal communities and the iconic temples.",
    image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?q=80&w=1080",
    priceLevel: "budget",
    tags: ["food", "culture", "shopping", "spiritual", "nightlife"],
    activities: [
      "Visit the Grand Palace",
      "Explore floating markets",
      "Experience street food scene",
      "Shop at Chatuchak Weekend Market"
    ],
    city: "Bangkok"
  },
  {
    id: "fsq_10",
    name: "Rio de Janeiro",
    country: "Brazil",
    rating: 4.6,
    reviews: 1950,
    description: "Famous for its stunning harbor, Carnival celebrations, samba-fueled nightlife, and iconic beaches like Copacabana and Ipanema.",
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=1080",
    priceLevel: "moderate",
    tags: ["beach", "culture", "scenic", "nightlife"],
    activities: [
      "Visit Christ the Redeemer",
      "Relax on Copacabana Beach",
      "Take a cable car to Sugarloaf Mountain",
      "Experience Brazilian nightlife"
    ],
    city: "Rio de Janeiro"
  },
  {
    id: "fsq_11",
    name: "Sydney",
    country: "Australia",
    rating: 4.7,
    reviews: 2340,
    description: "A vibrant city known for its iconic Opera House, Harbour Bridge, beautiful beaches and year-round outdoor lifestyle.",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1080",
    priceLevel: "expensive",
    tags: ["beach", "scenic", "culture", "architecture"],
    activities: [
      "Tour Sydney Opera House",
      "Climb Sydney Harbour Bridge",
      "Relax at Bondi Beach",
      "Explore The Rocks district"
    ],
    city: "Sydney"
  },
  {
    id: "fsq_12",
    name: "Amsterdam",
    country: "Netherlands",
    rating: 4.6,
    reviews: 2140,
    description: "Known for its artistic heritage, elaborate canal system and narrow houses, Amsterdam combines rich history with progressive attitudes.",
    image: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?q=80&w=1080",
    priceLevel: "expensive",
    tags: ["culture", "architecture", "scenic", "nightlife"],
    activities: [
      "Cruise the canals",
      "Visit the Van Gogh Museum",
      "Tour Anne Frank House",
      "Explore Vondelpark"
    ],
    city: "Amsterdam"
  },
  {
    id: "fsq_13",
    name: "Prague",
    country: "Czech Republic",
    rating: 4.8,
    reviews: 1870,
    description: "The 'City of a Hundred Spires' offers fairytale-like Gothic architecture, medieval atmosphere, and a vibrant arts scene.",
    image: "https://images.unsplash.com/photo-1541849546-216549ae216d?q=80&w=1080",
    priceLevel: "moderate",
    tags: ["architecture", "culture", "history", "budget-friendly"],
    activities: [
      "Explore Prague Castle",
      "Walk across Charles Bridge",
      "Visit Old Town Square",
      "See the Astronomical Clock"
    ],
    city: "Prague"
  },
  {
    id: "fsq_14",
    name: "Reykjavik",
    country: "Iceland",
    rating: 4.7,
    reviews: 1540,
    description: "The perfect base to experience Iceland's natural wonders - from geothermal spas to magnificent waterfalls, glaciers, and the Northern Lights.",
    image: "https://images.unsplash.com/photo-1486514706042-9c0a16e5f401?q=80&w=1080",
    priceLevel: "luxury",
    tags: ["nature", "adventure", "scenic", "wildlife"],
    activities: [
      "Relax in the Blue Lagoon",
      "Tour the Golden Circle",
      "Chase the Northern Lights",
      "Whale watching tours"
    ],
    city: "Reykjavik"
  },
  {
    id: "fsq_15",
    name: "Dubai",
    country: "United Arab Emirates",
    rating: 4.7,
    reviews: 3420,
    description: "A city of superlatives with the world's tallest building, largest mall, and most luxurious hotels, blending futuristic architecture with Arabian culture.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1080",
    priceLevel: "luxury",
    tags: ["luxury", "shopping", "architecture", "beach"],
    activities: [
      "Visit Burj Khalifa",
      "Shop at Dubai Mall",
      "Experience desert safari",
      "Explore Palm Jumeirah"
    ],
    city: "Dubai"
  },
  {
    id: "fsq_16",
    name: "Barcelona",
    country: "Spain",
    rating: 4.8,
    reviews: 2840,
    description: "A city celebrated for Gaudí's whimsical architecture, Mediterranean beaches, world-class cuisine, and vibrant cultural scene.",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=1080",
    priceLevel: "moderate",
    tags: ["architecture", "beach", "food", "culture"],
    activities: [
      "Visit Sagrada Familia",
      "Stroll down La Rambla",
      "Explore Park Güell",
      "Relax on Barceloneta Beach"
    ],
    city: "Barcelona"
  },
  {
    id: "fsq_17",
    name: "Queenstown",
    country: "New Zealand",
    rating: 4.8,
    reviews: 1720,
    description: "The adventure capital of the world set against the dramatic Southern Alps, offering adrenaline-pumping activities and breathtaking landscapes.",
    image: "https://images.unsplash.com/photo-1589196726441-1068a6d73f93?q=80&w=1080",
    priceLevel: "expensive",
    tags: ["adventure", "nature", "scenic", "luxury"],
    activities: [
      "Bungee jumping",
      "Explore Milford Sound",
      "Jet boating on Shotover River",
      "Wine tasting in Central Otago"
    ],
    city: "Queenstown"
  },
  {
    id: "fsq_18",
    name: "Istanbul",
    country: "Turkey",
    rating: 4.6,
    reviews: 2340,
    description: "The only city spanning two continents, Istanbul blends Eastern and Western cultures with magnificent mosques, bustling bazaars, and rich history.",
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=1080",
    priceLevel: "moderate",
    tags: ["culture", "history", "food", "architecture", "shopping"],
    activities: [
      "Visit Hagia Sophia",
      "Explore the Grand Bazaar",
      "Cruise the Bosphorus",
      "Experience Turkish hammam"
    ],
    city: "Istanbul"
  },
  {
    id: "fsq_19",
    name: "Paris",
    country: "France",
    rating: 4.7,
    reviews: 4560,
    description: "The City of Light captivates with its iconic landmarks, world-class art museums, charming cafés, and fashion heritage.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1080",
    priceLevel: "expensive",
    tags: ["romantic", "culture", "food", "architecture", "luxury"],
    activities: [
      "Visit the Eiffel Tower",
      "Explore the Louvre Museum",
      "Stroll along the Seine River",
      "Experience French cuisine"
    ],
    city: "Paris"
  },
  {
    id: "fsq_20",
    name: "Cairo",
    country: "Egypt",
    rating: 4.4,
    reviews: 1890,
    description: "Home to the Pyramids and the Sphinx, Cairo offers an unforgettable journey through one of the world's most ancient civilizations.",
    image: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?q=80&w=1080",
    priceLevel: "budget",
    tags: ["history", "culture", "architecture", "budget-friendly"],
    activities: [
      "Visit the Pyramids of Giza",
      "Explore the Egyptian Museum",
      "Shop at Khan el-Khalili bazaar",
      "Cruise the Nile River"
    ],
    city: "Cairo"
  },
  {
    id: "fsq_21",
    name: "Havana",
    country: "Cuba",
    rating: 4.5,
    reviews: 1450,
    description: "Frozen in time with vintage cars, colonial architecture, and salsa rhythms, Havana offers a vibrant cultural experience unlike any other.",
    image: "https://images.unsplash.com/photo-1500759285222-a95626b934cb?q=80&w=1080",
    priceLevel: "budget",
    tags: ["culture", "architecture", "nightlife", "budget-friendly"],
    activities: [
      "Tour Old Havana",
      "Ride in a classic vintage car",
      "Visit Revolution Square",
      "Enjoy live music at local venues"
    ],
    city: "Havana"
  },
  {
    id: "fsq_22",
    name: "Tokyo",
    country: "Japan",
    rating: 4.8,
    reviews: 3670,
    description: "Ultra-modern meets traditional in this dynamic metropolis offering cutting-edge technology, stunning temples, world-class dining, and unique pop culture.",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1080",
    priceLevel: "expensive",
    tags: ["food", "culture", "technology", "shopping", "nightlife"],
    activities: [
      "Visit Senso-ji Temple",
      "Experience Shibuya Crossing",
      "Explore Tsukiji Fish Market",
      "Discover Akihabara electronics district"
    ],
    city: "Tokyo"
  },
  {
    id: "fsq_23",
    name: "Dubrovnik",
    country: "Croatia",
    rating: 4.7,
    reviews: 1820,
    description: "Known as the 'Pearl of the Adriatic', this walled city features marble streets, baroque buildings, and stunning coastal views.",
    image: "https://images.unsplash.com/photo-1542623024-a797a755b8d0?q=80&w=1080",
    priceLevel: "moderate",
    tags: ["architecture", "beach", "scenic", "history"],
    activities: [
      "Walk the city walls",
      "Take a cable car for panoramic views",
      "Visit Lokrum Island",
      "Explore Game of Thrones filming locations"
    ],
    city: "Dubrovnik"
  }
];

const DestinationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [destinations, setDestinations] = useState(hardcodedDestinations);
  const [filteredDestinations, setFilteredDestinations] = useState(hardcodedDestinations);
  const [loading, setLoading] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [filters, setFilters] = useState({
    tags: [],
    priceLevel: [],
    minRating: 0
  });
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [isDetailView, setIsDetailView] = useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayCount, setDisplayCount] = useState(12);

  const searchInputRef = useRef(null);

  // Available filter options
  const tagOptions = ["beach", "culture", "food", "nature", "adventure", "romantic", "architecture", "spiritual", "shopping", "nightlife", "wildlife", "scenic", "luxury", "budget-friendly"];
  const priceLevelOptions = ["budget", "moderate", "expensive", "luxury"];
 

  useEffect(() => {
    // Focus search input if we came from navbar search
    if (initialQuery && searchInputRef.current) {
      searchInputRef.current.focus();
    }

    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      filterDestinations();
      setLoading(false);
      setIsLoaded(true);
    }, 800);
  }, [initialQuery]);

  useEffect(() => {
    // Check if we have a destination ID in the URL on load
    const path = location.pathname;
    const matches = path.match(/\/destinations\/([^\/]+)/);
    if (matches && matches[1]) {
      const destinationId = matches[1];
      const destination = hardcodedDestinations.find(dest => dest.id === destinationId);
      if (destination) {
        setSelectedDestination(destination);
        setIsDetailView(true);
      }
    }
  }, [location.pathname]);

  // Filter destinations based on search query and filters
  const filterDestinations = () => {
    let results = [...hardcodedDestinations];
    
    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(destination => 
        destination.name.toLowerCase().includes(query) || 
        destination.country.toLowerCase().includes(query) || 
        destination.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Apply tag filters
    if (filters.tags.length > 0) {
      results = results.filter(destination => 
        filters.tags.some(tag => destination.tags.includes(tag))
      );
    }
    
    // Apply price level filters
    if (filters.priceLevel.length > 0) {
      results = results.filter(destination => 
        filters.priceLevel.includes(destination.priceLevel)
      );
    }
    
    // Apply rating filter
    if (filters.minRating > 0) {
      results = results.filter(destination => 
        destination.rating >= filters.minRating
      );
    }
    
    setFilteredDestinations(results);
    setDisplayCount(12); // Reset display count when filtering
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Update URL with search query for bookmarking/sharing
    navigate(`/destinations?q=${encodeURIComponent(searchQuery)}`);
    setLoading(true);
    setTimeout(() => {
      filterDestinations();
      setLoading(false);
    }, 500);
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
    setLoading(true);
    setTimeout(() => {
      filterDestinations();
      setShowFilters(false);
      setLoading(false);
    }, 500);
  };

  const resetFilters = () => {
    setFilters({
      tags: [],
      priceLevel: [],
      minRating: 0
    });
    
    if (searchQuery) {
      setSearchQuery('');
    }
    
    setLoading(true);
    setTimeout(() => {
      setFilteredDestinations(hardcodedDestinations);
      setLoading(false);
      navigate('/destinations');
    }, 500);
  };

  const toggleFavorite = (id, e) => {
    e.stopPropagation(); // Prevent card click event
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
    
    // Scroll to top when viewing details
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backToResults = () => {
    setIsDetailView(false);
    setSelectedDestination(null);
    // Go back to main destinations page with current search
    navigate(`/destinations${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ''}`);
  };

  const loadMore = () => {
    setDisplayCount(prevCount => Math.min(prevCount + 12, filteredDestinations.length));
  };

  // Format rating stars
  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStar key="half-star" className="text-yellow-400 opacity-50" />);
    }
    
    return (
      <div className="flex items-center">
        {stars}
        <span className="ml-1 font-medium">{rating}</span>
      </div>
    );
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
    <div className="min-h-screen bg-gray-50" style={{
      backgroundImage: `url(${bg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed"
    }}>
      <Navbar />

      <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
        {isDetailView && selectedDestination ? (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {/* Detail View Content */}
              <div className="relative">
                <img 
                  src={selectedDestination.image} 
                  alt={selectedDestination.name} 
                  className="w-full h-96 object-cover object-center"
                />
                <button 
                  onClick={backToResults}
                  className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors"
                >
                  <IoArrowBack className="text-gray-800 text-xl" />
                </button>
                <div className="absolute top-4 right-4">
                  <button 
                    onClick={(e) => toggleFavorite(selectedDestination.id, e)}
                    className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors"
                  >
                    {favorites.includes(selectedDestination.id) ? 
                      <FaHeart className="text-red-500 text-xl" /> : 
                      <FaRegHeart className="text-gray-800 text-xl" />
                    }
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800">{selectedDestination.name}</h1>
                    <div className="flex items-center mt-1 text-gray-600">
                      <FaMapMarkerAlt className="mr-1" />
                      <span>{selectedDestination.city}, {selectedDestination.country}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center">
                      {renderRatingStars(selectedDestination.rating)}
                      <span className="ml-2 text-gray-500">({selectedDestination.reviews} reviews)</span>
                    </div>
                    <div className="mt-1 text-right">
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {selectedDestination.priceLevel.charAt(0).toUpperCase() + selectedDestination.priceLevel.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-6">{selectedDestination.description}</p>

                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3 text-gray-800">Highlights</h2>
                  <div className="flex flex-wrap gap-2">
                    {selectedDestination.tags.map((tag, index) => (
                      <span key={index} className="flex items-center px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium"> 
                        {tag}
                                    </span>
                                  ))}
                                  </div>
                                </div>

                                <div className="mb-6">
                                  <h2 className="text-xl font-semibold mb-3 text-gray-800">Details</h2>
                                  <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h3 className="text-lg font-semibold mb-2 text-gray-800">Location</h3>
                                    <p className="text-gray-700">{selectedDestination.location}</p>
                                  </div>
                                  <div>
                                    <h3 className="text-lg font-semibold mb-2 text-gray-800">Duration</h3>
                                    <p className="text-gray-700">{selectedDestination.duration}</p>
                                  </div>
                                  <div>
                                    <h3 className="text-lg font-semibold mb-2 text-gray-800">Price</h3>
                                    <p className="text-gray-700">{selectedDestination.price}</p>
                                  </div>
                                  <div>
                                    <h3 className="text-lg font-semibold mb-2 text-gray-800">Website</h3>
                                    <a href={selectedDestination.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{selectedDestination.website}</a>
                                  </div>
                                  </div>
                                </div>

                                <div className="mb-6">
                                  <h2 className="text-xl font-semibold mb-3 text-gray-800">Reviews</h2>
                                  {selectedDestination.reviews.map((review, index) => (
                                  <div key={index} className="mb-4">
                                    <div className="flex items-center mb-2">
                                    <div className="flex items-center">
                                      {renderRatingStars(review.rating)}
                                      <span className="ml-2 text-gray-500">{review.date}</span>
                                    </div>
                                    <div className="ml-4">
                                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                      {review.username}
                                      </span>
                                    </div>
                                    </div>
                                    <p className="text-gray-700">{review.comment}</p>
                                  </div>
                                  ))}
                                </div>
                                </div>
                              </motion.div>
                              </AnimatePresence>
                            ) : (
                              <motion.div
                              variants={containerVariants}
                              initial="hidden"
                              animate="visible"
                              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                              >
                              {filteredDestinations.slice(0, displayCount).map((destination, index) => (
                                <motion.div
                                key={index}
                                variants={itemVariants}
                                className="bg-white rounded-xl shadow-lg overflow-hidden"
                                onClick={() => viewDestinationDetails(destination)}
                                >
                                <img 
                                  src={destination.image} 
                                  alt={destination.name} 
                                  className="w-full h-48 object-cover object-center"
                                />
                                <div className="p-4">
                                  <h3 className="text-lg font-semibold mb-2 text-gray-800">{destination.name}</h3>
                                  <div className="flex items-center mb-1 text-gray-600">
                                  <FaMapMarkerAlt className="mr-1" />
                                  <span>{destination.city}, {destination.country}</span>
                                  </div>
                                  <div className="flex items-center">
                                  {renderRatingStars(destination.rating)}
                                  <span className="ml-2 text-gray-500">({destination.reviews} reviews)</span>
                                  </div>
                                  <div className="mt-2">
                                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                    {destination.priceLevel.charAt(0).toUpperCase() + destination.priceLevel.slice(1)}
                                  </span>
                                  </div>
                                </div>
                                </motion.div>
                              ))}
                              </motion.div>
                            )}
                            </div>

                            <Footer />
                          </div>
                          );
                        };

                        export default DestinationPage;