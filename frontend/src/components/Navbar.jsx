import React from "react";
import triply from "../assets/ChatGPT Image Apr 7, 2025, 08_48_52 PM.png";
import { FaRobot } from "react-icons/fa";
import { motion } from "framer-motion";

const Navbar = () => {
  const fullText =
    "Welcome to Triply! I’m here to assist you in your travel plan. Click on Get Started to generate your plan itinerary.";

  const speakWelcome = () => {
    const msg = new SpeechSynthesisUtterance(fullText);
    msg.lang = "en-US";
    msg.pitch = 1.2;
    msg.rate = 1;

    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find((v) => v.lang.includes("en"));
    if (englishVoice) msg.voice = englishVoice;

    window.speechSynthesis.speak(msg);

    if ("vibrate" in navigator) navigator.vibrate(100);
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-900/50 backdrop-blur-md border-b border-indigo-500/20 shadow-lg relative">
      {/* Logo */}
      <div className="flex items-center space-x-3 text-indigo-400 text-xl font-bold">
        <img
          src={triply}
          alt="triply"
          className="w-14 h-14 rounded-full shadow-inner border border-indigo-300/30"
        />
        <span>Triply AI</span>
      </div>

      {/* AI Status + Robot */}
      <div className="flex items-center gap-4 text-indigo-300 relative">
        <div className="text-sm flex items-center gap-2 font-medium">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
          </span>
          AI Agent Online
        </div>

        {/* Robot Button Only */}
        <motion.button
          onClick={speakWelcome}
          whileTap={{ scale: 0.9 }}
          className="transition rounded-full p-2 shadow-md border-2 bg-indigo-600 hover:bg-indigo-700 border-transparent"
          title="Speak Welcome Message"
        >
          <FaRobot className="w-7 h-7 text-white" />
        </motion.button>
      </div>
    </nav>
  );
};

export default Navbar;
