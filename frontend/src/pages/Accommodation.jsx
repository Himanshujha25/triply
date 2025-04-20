import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, parseISO, differenceInDays } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faStar, 
  faMapMarkerAlt, 
  faBed, 
  faTag, 
  faArrowLeft,
  faSearch,
  faSpinner,
  faMoneyBillWave
} from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer';
import bg from '../assets/bg.png';
import Navbar from '../components/Navbar';

const Accommodation = () => {
  const [city, setCity] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  useEffect(() => {
    if (checkIn && checkOut) {
      const days = differenceInDays(parseISO(checkOut), parseISO(checkIn));
      if (days < 1) {
        setError('Check-out date must be after check-in date');
        setCheckOut('');
      }
    }
  }, [checkIn, checkOut]);

  const searchHotels = async (e) => {
    e.preventDefault();
    
    if (!city || !checkIn || !checkOut) {
      setError('Please fill all required fields');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const res = await axios.get(`https://triply-2-o.onrender.com/api/accommodation/search`, {
        params: {
          city,
          check_in_date: checkIn,
          check_out_date: checkOut,
        },
      });
      
      setHotels(Array.isArray(res.data) ? res.data : []);
      setSelectedHotel(null);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to fetch hotels');
    } finally {
      setLoading(false);
    }
  };

  const viewHotelDetails = (hotel) => {
    setSelectedHotel(hotel);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatPrice = (price) => {
    if (!price) return 'Contact for price';
    if (price.formatted) return price.formatted;
    if (price.value && price.currency) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: price.currency,
      }).format(price.value);
    }
    if (price.lowest) return `From ${price.lowest}`;
    return 'Contact for price';
  };

  const renderRatingStars = (rating) => {
    if (!rating) return null;
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    
    return (
      
      <div className="flex items-center"  >
        {[...Array(fullStars)].map((_, i) => (
          <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400 w-4 h-4" />
        ))}
        {halfStar > 0 && (
          <FontAwesomeIcon icon={faStar} className="text-yellow-400 w-4 h-4" />
        )}
        <span className="ml-2 text-sm font-medium text-gray-600">
          ({rating.toFixed(1)})
        </span>
      </div>)

  };

  const renderAmenities = (amenities) => {
    if (!amenities?.length) return null;
    const visibleAmenities = showAllAmenities ? amenities : amenities.slice(0, 12);
    
    return (
      <div className="mt-6" >
        <h3 className="text-lg font-medium text-gray-800 mb-3">Amenities</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2" >
          {visibleAmenities.map((amenity, index) => (
            <div key={index} className="flex items-center text-sm text-gray-600">
              <span className="mr-2 text-green-500">✓</span>
              <span className="truncate">{amenity}</span>
            </div>
          ))}
        </div>
        {amenities.length > 12 && (
          <button
            onClick={() => setShowAllAmenities(!showAllAmenities)}
            className="text-blue-600 text-sm mt-2 hover:underline focus:outline-none"
          >
            {showAllAmenities ? 'Show less' : `+${amenities.length - 12} more`}
          </button>
        )}
      </div>
    );
  };

  const renderImageGallery = (images) => {
    if (!images?.length) return null;
    
    return (
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Photo Gallery</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {images.slice(0, 8).map((image, index) => (
            <div key={index} className="relative h-32 overflow-hidden rounded-md group">
              <img 
                src={image.original_image || image} 
                alt={`Hotel photo ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const HotelCard = ({ hotel }) => (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer h-full"
      onClick={() => viewHotelDetails(hotel)}
    >
      <div className="relative h-48">
        {hotel.thumbnail ? (
          <img
            src={hotel.thumbnail}
            alt={hotel.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center">
            <img 
              src={hotel.image}
              alt={hotel.name}
              className="w-24 h-24 object-cover"
            />
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60">
          <h3 className="text-white font-semibold text-lg truncate">{hotel.name}</h3>
          <div className="flex items-center justify-between mt-1">
            {renderRatingStars(hotel.overall_rating)}
            <span className="text-white text-sm bg-black/30 px-2 py-1 rounded">
              {formatPrice(hotel.rate_per_night || hotel.price)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-blue-400" />
          <span className="truncate">{hotel.name}</span>
        </div>
        
        {hotel.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{hotel.description}</p>
        )}

        {renderImageGallery(hotel.images.slice(0, 4))}
      </div>
    </div>
  );

  return (
    <>
    <Navbar/>
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen" style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' ,  }}>
    <div className="max-w-7xl mx-auto px-4 py-26" >
      <h1 className="text-4xl font-bold text-gray-900 mb-8 flex items-center">
        <FontAwesomeIcon icon={faBed} className="mr-3 text-blue-500" />
        Find Your Perfect Stay
      </h1>

      <form onSubmit={searchHotels} className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-blue-500" />
              Destination
            </label>
            <input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FontAwesomeIcon icon={faBed} className="mr-2 text-blue-500" />
              Check-in
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              min={format(new Date(), 'yyyy-MM-dd')}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FontAwesomeIcon icon={faBed} className="mr-2 text-blue-500" />
              Check-out
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={checkIn || format(new Date(), 'yyyy-MM-dd')}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="flex items-end mb-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                  Searching...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faSearch} className="mr-2" />
                  Search Hotels
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg flex items-center">
          <span className="text-red-500 mr-3">⚠</span>
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center py-12 space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-gray-600">Searching for the best deals...</p>
        </div>
      )}

      {selectedHotel ? (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <button
              onClick={() => setSelectedHotel(null)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              Back to Results
            </button>
            <span className="text-gray-500 text-sm">
              {hotels.length} properties found
            </span>
          </div>

          <div className="p-6">
            <div className="md:flex gap-6">
              <div className="md:w-1/3 mb-6 md:mb-0">
                {selectedHotel.thumbnail ? (
                  <img 
                    src={selectedHotel.thumbnail} 
                    alt={selectedHotel.name} 
                    className="w-full h-64 object-cover rounded-xl"
                  />
                ) : (
                  <div className="w-full h-64 bg-gradient-to-r from-blue-50 to-blue-100 flex justify-center items-center rounded-xl">
                    <FontAwesomeIcon icon={faBed} className="text-blue-200 text-4xl" />
                  </div>
                )}
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedHotel.hotel_class && (
                    <span className="inline-block bg-purple-100 text-purple-800 px-2 py-1 rounded-md text-xs font-medium">
                      {selectedHotel.hotel_class}
                    </span>
                  )}
                  
                  {selectedHotel.overall_rating && (
                    <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-xs font-medium">
                      ⭐ {selectedHotel.overall_rating} ({selectedHotel.reviews || 0} reviews)
                    </span>
                  )}
                </div>

                {selectedHotel.deal && (
                  <div className="mt-4 bg-green-100 text-green-800 p-3 rounded-md">
                    <div className="font-bold text-green-700">{selectedHotel.deal_description || 'Special Deal'}</div>
                    <div className="text-sm">{selectedHotel.deal}</div>
                  </div>
                )}
              </div>
              
              <div className="md:w-2/3">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedHotel.name}</h2>
                </div>
                
                {selectedHotel.description && (
                  <p className="text-gray-600 mb-6">{selectedHotel.description}</p>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-blue-400" />
                      Location
                    </h3>
                    <p className="text-gray-600">{selectedHotel.address}</p>
                    
                    {selectedHotel.gps_coordinates && (
                      <div className="mt-2 bg-gray-100 p-3 rounded-md text-sm text-gray-600">
                        GPS: {selectedHotel.gps_coordinates.latitude}, {selectedHotel.gps_coordinates.longitude}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      <FontAwesomeIcon icon={faMoneyBillWave} className="mr-2 text-green-400" />
                      Pricing
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Nightly Rate:</span>
                        <span className="font-bold text-blue-600">
                          {formatPrice(selectedHotel.rate_per_night)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Stay:</span>
                        <span className="font-bold text-blue-600">
                          {formatPrice(selectedHotel.total_rate)}
                        </span>
                      </div>
                    </div>
                    
                    {selectedHotel.link && (
                      <a 
                        href={selectedHotel.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="block w-full text-center mt-4 px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Book Now
                      </a>
                    )}
                  </div>
                </div>
                
                {renderAmenities(selectedHotel.amenities)}
                {renderImageGallery(selectedHotel.images)}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel, i) => (
            <HotelCard key={i} hotel={hotel} />
          ))}
        </div>
      )}

      {!loading && !error && hotels.length === 0 && (
        <div className="text-center py-12">
          <div className="mb-4 text-gray-400 text-6xl">🏨</div>
          <p className="text-gray-500 text-lg">
            No hotels found. Try adjusting your search criteria.
          </p>
        </div>

      )}
 
    </div>
    <Footer />
    </div>
  </>
  );
};

export default Accommodation;