import React from "react";
import { FaMapMarkedAlt, FaMoon, FaSun } from "react-icons/fa";

const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <nav className={`flex justify-between items-center px-6 py-4 transition-all duration-300 
      ${darkMode 
        ? 'bg-gray-900 border-b border-gray-800 shadow-md' 
        : 'bg-gray-50 border-b border-gray-200 shadow-sm'
      }`}>
      
      {/* Logo */}
      <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 text-xl font-bold">
        <FaMapMarkedAlt />
        <span>Triply AI</span>
      </div>

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        className={`text-xl p-2 rounded-full transition duration-300
          ${darkMode 
            ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' 
            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
      >
        {darkMode ? <FaMoon /> : <FaSun />}
      </button>
    </nav>
  );
};

export default Navbar;
