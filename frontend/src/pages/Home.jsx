import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import bg from "../assets/bg.png";

function HomePage({ darkMode, setDarkMode }) {
  return (
    <div
      className="min-h-screen font-poppins text-gray-800 dark:text-gray-200 transition-colors duration-500 relative"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* 🔲 Global dark overlay for entire page */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" />

      {/* 🔳 Content layer */}
      <div className="relative z-10">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* Hero Section */}
        <header className="px-6 py-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold mb-4 text-indigo-300"
          >
            Hello, I'm <span className="text-indigo-400">Triply AI</span> 🧭
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg sm:text-xl max-w-2xl mx-auto mb-8 text-gray-300"
          >
            Your smart travel companion. I craft custom itineraries, hidden gems, and the perfect trip tailored just for you.
          </motion.p>

          <motion.a href="/planner" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-full text-lg hover:bg-indigo-700 transition">
              🧠 Plan My Trip with AI
            </button>
          </motion.a>
        </header>

        {/* Features Section */}
        <section className="px-6 py-16">
          <div className="max-w-5xl mx-auto text-center text-gray-200">
            <h2 className="text-3xl font-semibold mb-10 text-indigo-300">
              What can I help you with today?
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: "✈️",
                  title: "Plan a custom trip",
                  desc: "Tell me where and when you want to go.",
                },
                {
                  icon: "📍",
                  title: "Suggest hidden spots",
                  desc: "Find offbeat and beautiful locations.",
                },
                {
                  icon: "🏨",
                  title: "Book stays & activities",
                  desc: "Smart suggestions for hotels and experiences.",
                },
                {
                  icon: "⏱️",
                  title: "Create a daily plan",
                  desc: "Organize your itinerary by day and time.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  className="p-5 rounded-xl border transition duration-300 shadow-md bg-white/10 border-white/20 backdrop-blur-lg text-white"
                >
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-200">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
