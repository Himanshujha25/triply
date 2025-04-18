import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import bg from "../assets/bg.png";

function HomePage() {
  const [ripples, setRipples] = useState([]);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const createRipple = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const id = Date.now();
    const size = Math.random() * 100 + 100; // Random size between 100-200px

    setRipples((prev) => [...prev, { x, y, id, size }]);
    
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 1500); 
  };

  // Features data with enhanced icons and descriptions
  const features = [
    {
      icon: "✈️",
      title: "Plan a custom trip",
      desc: "AI-powered itineraries based on your preferences and travel style.",
    },
    {
      icon: "📍",
      title: "Discover hidden gems",
      desc: "Explore local favorites and secret spots other tourists miss.",
    },
    {
      icon: "🏨",
      title: "Smart bookings",
      desc: "Find accommodations and activities perfect for your budget and style.",
    },
    {
      icon: "⏱️",
      title: "Dynamic scheduling",
      desc: "Flexible day plans that adapt to weather, crowds, and your energy.",
    },
  ];

  // Calculate parallax effect based on mouse position
  const calcParallax = (depth = 10) => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    const moveX = (mousePosition.x - windowWidth / 2) / windowWidth * depth;
    const moveY = (mousePosition.y - windowHeight / 2) / windowHeight * depth;
    
    return { x: moveX, y: moveY };
  };

  return (
    <div
      onClick={createRipple}
      className="min-h-screen font-poppins text-gray-800 dark:text-gray-200 transition-colors duration-500 relative overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div 
        className="fixed inset-0 z-0"
        animate={{
          x: calcParallax(20).x,
          y: calcParallax(20).y,
        }}
        transition={{ type: "spring", stiffness: 75, damping: 30 }}
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "110% 110%",
          backgroundPosition: "center",
        }}
      />
      
      {/* Overlay with depth blur effect */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-0" />

      {/* Animated particles in background */}
      <div className="fixed inset-0 z-5 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-indigo-400/30"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.5 + 0.3
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
        ))}
      </div>
      
      {/* Ripple effects */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.div
              key={ripple.id}
              initial={{ opacity: 0.5, scale: 0, borderWidth: 5 }}
              animate={{ opacity: 0, scale: 1, borderWidth: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{
                top: ripple.y,
                left: ripple.x,
                width: ripple.size,
                height: ripple.size,
                x: -ripple.size/2,
                y: -ripple.size/2,
              }}
              className="absolute rounded-full border-indigo-400 border-solid"
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Main content */}
      <div className="relative z-20">
        <Navbar/>

        {/* Hero Section with enhanced animations */}
        <header className="px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, type: "spring" }}
              className="text-5xl sm:text-6xl font-bold mb-4 text-white"
            >
              Hello, I'm{" "}
              <motion.span 
                className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500"
                animate={{ 
                  backgroundPosition: ["0% center", "100% center"],
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  repeatType: "mirror" 
                }}
              >
                Triply AI
              </motion.span>{" "}
              <motion.span
                animate={{ 
                  rotate: [0, 15, 0, -15, 0],
                  scale: [1, 1.2, 1, 1.2, 1]
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity, 
                  repeatDelay: 3
                }}
                className="inline-block mt-1"
              >
                ✈️
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="text-xl sm:text-2xl max-w-2xl mx-auto mb-12 text-gray-300"
            >
              Your smart travel companion. I craft custom itineraries, hidden gems, and the perfect trip tailored just for you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
            >
              <motion.a 
                href="/planner"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <motion.button 
                  className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg shadow-lg"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 25px rgba(99, 102, 241, 0.6)"
                  }} 
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.span className="relative z-10 flex items-center justify-center gap-2">
                    Get Started
                    <motion.span
                      animate={isHovering ? { x: [0, 5, 0] } : {}}
                      transition={{ 
                        repeat: isHovering ? Infinity : 0, 
                        duration: 0.8 
                      }}
                    >
                      ➡️
                    </motion.span>
                  </motion.span>
                  <motion.div 
                    className="absolute inset-0 bg-white opacity-20"
                    initial={{ x: "-100%", opacity: 0 }}
                    whileHover={{ 
                      x: "100%", 
                      opacity: 0.3,
                      transition: { duration: 1 }
                    }}
                  />
                </motion.button>
              </motion.a>
            </motion.div>
          </motion.div>
        </header>

        {/* Features Section with staggered animations */}
        <section className="px-6 py-20">
          <div className="max-w-5xl mx-auto text-center text-gray-200">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl font-semibold mb-16 text-white"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
                What can I help you with today?
              </span>
            </motion.h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.5, 
                    delay: i * 0.1,
                  }}
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 15px 30px -10px rgba(79, 70, 229, 0.4)",
                  }}
                  className="p-6 rounded-2xl border transition-all duration-300 shadow-lg bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-md text-white overflow-hidden relative group"
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <motion.div
                    className="text-4xl mb-4"
                    whileHover={{ scale: 1.2, rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {item.icon}
                  </motion.div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-300">{item.desc}</p>
                  <motion.div 
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500"
                    initial={{ width: "0%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to action section */}
        <motion.section 
          className="px-6 py-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-indigo-900/30 to-purple-900/30 p-8 rounded-2xl border border-white/10 backdrop-blur-md shadow-xl">
            <motion.h3 
              className="text-2xl font-semibold mb-4 text-white"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Ready for your next adventure?
            </motion.h3>
            <motion.p 
              className="mb-6 text-gray-300"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Let me guide you to create memories that will last a lifetime.
            </motion.p>
            <motion.a 
              href="/destinations" 
              className="inline-block"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <button className="bg-white text-indigo-900 font-semibold px-6 py-3 rounded-full text-lg shadow-md hover:shadow-lg transition-all">
                Explore Destinations
              </button>
            </motion.a>
          </div>
        </motion.section>

        <Footer />
      </div>
    </div>
  );
}

export default HomePage;