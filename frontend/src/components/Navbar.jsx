import { FaRobot, FaHome, FaMapMarkedAlt, FaCalendarAlt } from 'react-icons/fa';
import logo from '../assets/ChatGPT Image Apr 7, 2025, 08_48_52 PM.png'; // make sure your logo path is correct

const Navbar = () => {
  return (
    <nav className="sticky top-0 bg-white/80 backdrop-blur-lg shadow-md z-50 px-4 py-3 flex justify-between items-center">

      {/* Logo + AI Assistant Title */}
      <div className="flex items-center space-x-3">
        <img src={logo} alt="Triply Logo" className="w-10 h-10 rounded-full shadow" />
        <h1 className="text-xl font-bold text-gray-800 tracking-wide">
          Triply <span className="text-indigo-600">AI</span>
        </h1>
      </div>

      {/* Nav Icons - Assistant Style */}
      <div className="flex space-x-6 text-gray-700 text-lg">
        <button className="flex items-center space-x-1 hover:text-indigo-600 transition">
          <FaHome />
          <span className="hidden sm:inline">Home</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-indigo-600 transition">
          <FaMapMarkedAlt />
          <span className="hidden sm:inline">Explore</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-indigo-600 transition">
          <FaCalendarAlt />
          <span className="hidden sm:inline">Planner</span>
        </button>
        <button className="flex items-center space-x-1 text-white bg-indigo-600 px-3 py-1.5 rounded-full hover:bg-indigo-700 transition">
          <FaRobot />
          <span className="hidden sm:inline">Ask AI</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
