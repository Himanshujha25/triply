import React, { useState, useEffect } from "react";
import triply from "../assets/ChatGPT Image Apr 7, 2025, 08_48_52 PM.png";
import { FaRobot, FaBars, FaTimes, FaSearch, FaUserCircle } from "react-icons/fa";
import { MdNotifications, MdFlight, MdHotel } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const fullText =
    "Welcome to Triply! I'm here to assist you in your travel plan. Click on Get Started to generate your plan itinerary.";

  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const speakWelcome = () => {
    // If already speaking, stop it
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    const msg = new SpeechSynthesisUtterance(fullText);
    msg.lang = "en-US";
    msg.pitch = 1.2;
    msg.rate = 1;

    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find((v) => v.lang.includes("en"));
    if (englishVoice) msg.voice = englishVoice;

    msg.onend = () => setIsSpeaking(false);

    window.speechSynthesis.speak(msg);

    if ("vibrate" in navigator) navigator.vibrate(100);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-2 bg-gray-900/90 backdrop-blur-xl shadow-xl"
          : "py-4 bg-gray-900/50 backdrop-blur-md"
      } border-b border-indigo-500/20`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3 text-indigo-400 text-xl font-bold">
            <motion.img
              src={triply}
              alt="triply"
              className="w-15 h-15 rounded-full shadow-inner border border-indigo-300/30 "
              whileHover={{ rotate: 10, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            />
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Triply AI
            </motion.span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/destinations"
              className="text-gray-300 hover:text-indigo-400 transition-colors flex items-center gap-1"
            >
              <MdFlight />
              <span>Destinations</span>
            </a>
            <a
              href="/accommodations"
              className="text-gray-300 hover:text-indigo-400 transition-colors flex items-center gap-1"
            >
              <MdHotel />
              <span>Accommodations</span>
            </a>
          </div>

          {/* AI Status + Robot */}
          <div className="flex items-center gap-4 text-indigo-300">
            <div className="hidden md:flex text-sm items-center gap-2 font-medium">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
              </span>
              AI Agent Online
            </div>

            {/* Robot Button */}
            <motion.button
              onClick={speakWelcome}
              whileTap={{ scale: 0.9 }}
              className={`transition rounded-full p-2 shadow-md border-2 ${
                isSpeaking
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } border-transparent`}
              title={isSpeaking ? "Stop Speaking" : "Speak Welcome Message"}
            >
              <FaRobot className="w-6 h-6 text-white" />
              {isSpeaking && (
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              )}
            </motion.button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-indigo-400 transition-colors"
              >
                {isMenuOpen ? (
                  <FaTimes className="w-6 h-6" />
                ) : (
                  <FaBars className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gray-800/95 backdrop-blur-lg mt-1"
          >
            <div className="px-5 pt-2 pb-2 space-y-3">
              <a
                href="#destinations"
                className="block text-gray-300 hover:text-indigo-400 py-2 flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <MdFlight />
                <span>Destinations</span>
              </a>
              <a
                href="#accommodations"
                className="block text-gray-300 hover:text-indigo-400 py-2 flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <MdHotel />
                <span>Accommodations</span>
              </a>
             
              <div className="flex justify-between items-center pt-2">
                <div className="flex text-sm items-center gap-2 font-medium text-indigo-300">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                  </span>
                  AI Agent Online
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;