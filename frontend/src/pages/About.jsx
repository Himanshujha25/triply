import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import bg from "../assets/bg.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import cybernexus from "../assets/ChatGPT Image Apr 4, 2025, 09_02_22 PM.png";

function About() {
  const team = [
    {
      name: "Himanshu Jha",
      role: "Team Leader | Full Stack Developer",
      desc: "Leads development, architecture, and project execution.",
    },
    {
      name: "Kartik Verma",
      role: "Frontend Developer",
      desc: "Builds beautiful UI with React and modern CSS.",
    },
    {
      name: "Nitin Prakash",
      role: "Frontend Developer",
      desc: "Contributes in crafting responsive and interactive designs.",
    },
    {
        name: "Bittu Kumar",
        role: "Tester",
        desc: "Ensures flawless user experience and bug-free delivery.",
      },
  ];

  return (
    <div
      className="min-h-screen font-poppins transition-colors duration-500 relative text-gray-800 dark:text-gray-200"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" />
      <div className="relative z-10">
        <Navbar />

    
        <header className="text-center px-6 py-20">

  <motion.img
    src={cybernexus}
    alt="CyberNexus Team Logo"
    className="mx-auto w-32 h-32 sm:w-40 sm:h-40 object-contain mb-6 rounded-full shadow-lg border-4 border-indigo-500 hover:scale-105 transition-transform duration-300"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6 }}
  />

  <motion.h1
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="text-4xl font-bold text-indigo-300 mb-4"
  >
    Meet the CyberNexus Team 🚀
  </motion.h1>

  <p className="text-gray-300 max-w-2xl mx-auto text-lg">
    We are passionate tech enthusiasts dedicated to building smart solutions that make life easier. From trip planning to AI-powered services — we love solving real-world problems through code.
  </p>
</header>


        {/* Team Section */}
        <section className="px-6 py-10 max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-5 text-center text-white shadow-lg"
              >
                <div className="text-3xl mb-2">👤</div>
                <h2 className="font-semibold text-lg">{member.name}</h2>
                <p className="text-indigo-200 text-sm mb-1">{member.role}</p>
                <p className="text-sm">{member.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="px-6 py-12 text-center text-white">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-indigo-200 mb-4"
          >
            Our Vision 🌐
          </motion.h2>
          <p className="max-w-3xl mx-auto text-gray-300 text-lg">
            At CyberNexus, we aim to revolutionize the digital space by blending creativity with code. We’re deeply invested in open-source collaboration, real-world project building, and shaping the future with ethical tech and AI.
          </p>

          <div className="mt-8">
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="inline-block"
  >
    <Link
      to="/"
      className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-full shadow-lg transition duration-300"
    >
      ⬅️ Back to Home
    </Link>
  </motion.div>
</div>

        </section>

        <Footer />
      </div>
    </div>
  );
}

export default About;
