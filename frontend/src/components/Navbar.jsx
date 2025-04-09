import React from "react";
import triply from "../assets/ChatGPT Image Apr 7, 2025, 08_48_52 PM.png";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-900 border-b border-gray-800 shadow-md">
      {/* Logo */}
      <div className="flex items-center space-x-2 text-indigo-400 text-xl font-bold">
     <img src={`${triply}`} alt="triply" className="w-16 h-16 rounded-full"/>
        <span>Triply AI</span>
      </div>
    </nav>
  );
};

export default Navbar;
