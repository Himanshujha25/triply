import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import Planner from './pages/Planner';
import Itinerary from './pages/Itinerary';
;import Contact from './pages/Contact';
import About from './pages/About';
import Flight from './pages/Flight';
import DestinationPage from './pages/TravelDestinations';
import Accommodation from './pages/Accommodation';
import './App.css';
import PlaceImage from './pages/placeImage';


function App() {
  // Ensure dark mode class is always applied
  document.documentElement.classList.add("dark");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/itinerary" element={<Itinerary />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path='/Flight' element={<Flight/>}/>
        <Route path='/destinations' element={<DestinationPage/>}/>
        <Route path='/Accommodations' element={<Accommodation/>}/>
        <Route path='/placeImage' element={<PlaceImage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
