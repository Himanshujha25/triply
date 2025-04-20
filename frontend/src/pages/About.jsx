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
      emoji: "👨‍💻"
    },
    {
      name: "Kartik Verma",
      role: "Frontend Developer",
      desc: "Builds beautiful UI with React and modern CSS.",
      emoji: "🎨"
    },
    {
      name: "Nitin Prakash",
      role: "Frontend Developer",
      desc: "Contributes in crafting responsive and interactive designs.",
      emoji: "📱"
    },
    {
      name: "Bittu Kumar",
      role: "Tester",
      desc: "Ensures flawless user experience and bug-free delivery.",
      emoji: "🔍"
    },
  ];

  const achievements = [
    { number: "5+", title: "Projects Completed", icon: "🚀" },
    { number: "90%", title: "Accurracy", icon: "❤️" },
    { number: "8+", title: "Month Combined Experience", icon: "⏱️" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

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
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />
      <div className="relative z-10">
        <Navbar />

        {/* About Header */}
        <header className="text-center px-6 py-16 md:py-24 mt-10">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              whileHover={{ rotate: [0, -5, 5, -5, 0], scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={cybernexus}
                alt="CyberNexus Team Logo"
                className="mx-auto w-32 h-32 sm:w-40 sm:h-40 object-cover mb-8 rounded-full shadow-xl border-4 border-indigo-500"
              />
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold text-indigo-300 mb-6">
              Meet the <span className="text-indigo-400">CyberNexus</span> Team
            </h1>

            <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
              We are passionate tech enthusiasts dedicated to building smart solutions that make life easier. From trip planning to AI-powered services — we love solving real-world problems through code.
            </p>
          </motion.div>
        </header>

        {/* Stats/Numbers Section */}
        <section className="px-6 py-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            {achievements.map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-indigo-900/40 border border-indigo-600/30 rounded-xl p-6 text-center backdrop-blur-sm transform transition-all hover:translate-y-2 hover:shadow-indigo-500/20 hover:shadow-lg"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-3xl font-bold text-white mb-1">{item.number}</h3>
                <p className="text-indigo-200">{item.title}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Team Section */}
        <section className="px-6 py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-indigo-300">Our Dream Team</h2>
            <div className="w-24 h-1 bg-indigo-500 mx-auto mt-4 mb-6 rounded-full"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Talented individuals working together to create extraordinary digital experiences.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 15px 30px rgba(79, 70, 229, 0.2)"
                }}
                className="bg-white/10 backdrop-blur-md rounded-xl border border-indigo-500/20 p-6 text-center text-white shadow-lg overflow-hidden group relative"
              >
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-xl group-hover:bg-indigo-500/30 transition-all duration-700"></div>
                
                <div className="text-4xl mb-3 bg-indigo-800/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto border border-indigo-500/30">{member.emoji}</div>
                <h2 className="font-bold text-xl mb-1">{member.name}</h2>
                <p className="text-indigo-200 text-sm mb-3 font-medium">{member.role}</p>
                <p className="text-sm text-gray-300">{member.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Vision Section with timeline */}
        <section className="px-6 py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-indigo-300 mb-4"
              >
                Our Vision & Mission
              </motion.h2>
              <div className="w-24 h-1 bg-indigo-500 mx-auto mt-4 mb-8 rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 p-6 rounded-xl border border-indigo-500/30 backdrop-blur-sm"
              >
                <div className="text-3xl mb-3">🌐</div>
                <h3 className="text-xl font-bold text-indigo-300 mb-3">Our Vision</h3>
                <p className="text-gray-300">
                  At CyberNexus, we aim to revolutionize the digital space by blending creativity with code. We envision a future where technology enhances human potential and connects people in meaningful ways.
                </p>
              </motion.div>

              <motion.div
                initial={{ x: 30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 p-6 rounded-xl border border-indigo-500/30 backdrop-blur-sm"
              >
                <div className="text-3xl mb-3">🚀</div>
                <h3 className="text-xl font-bold text-indigo-300 mb-3">Our Mission</h3>
                <p className="text-gray-300">
                  We're deeply invested in open-source collaboration, real-world project building, and shaping the future with ethical tech and AI. Every line of code we write serves a purpose.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Values Section */}
        <section className="px-6 py-16 bg-indigo-900/30 backdrop-blur-md">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-indigo-300">Our Core Values</h2>
              <div className="w-24 h-1 bg-indigo-500 mx-auto mt-4 mb-6 rounded-full"></div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              {[
                { icon: "🧠", title: "Innovation", desc: "We continuously push boundaries and embrace new technologies." },
                { icon: "🤝", title: "Collaboration", desc: "We believe great ideas emerge from diverse teamwork." },
                { icon: "🛡️", title: "Integrity", desc: "We build trust through transparency and ethical practices." }
              ].map((value, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="text-center p-6"
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                  <p className="text-gray-300">{value.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-16 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto bg-gradient-to-r from-indigo-900/60 to-purple-900/60 p-8 md:p-12 rounded-2xl border border-indigo-500/30 backdrop-blur-md"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Collaborate?</h2>
            <p className="text-gray-300 mb-8 text-lg">
              We're always open to new opportunities and partnerships. Let's build something amazing together!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/"
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full shadow-lg transition duration-300 inline-block"
                >
                  ⬅️ Back to Home
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contact"
                  className="px-6 py-3 bg-white hover:bg-gray-100 text-indigo-600 font-semibold rounded-full shadow-lg transition duration-300 inline-block"
                >
                  Contact Us 📧
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <Footer />
      </div>
    </div>
  );
}

export default About;