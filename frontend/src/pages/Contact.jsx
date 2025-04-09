import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import bg from "../assets/bg.png";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function ContactPage({ darkMode, setDarkMode }) {
  const handleSubmit = () => {
    toast.success("🎉 Message sent successfully!");
  };

  return (
    <div
      className="min-h-screen font-poppins text-gray-200 transition-colors duration-500 relative"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" />
      <div className="relative z-10">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        <section className="px-6 py-20">
          <div className="max-w-3xl mx-auto text-center text-white">
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold mb-6 text-indigo-300"
            >
              Contact Triply ✉️
            </motion.h2>
            <p className="text-gray-300 mb-10">
              Have a question or idea? Drop us a message!
            </p>

            <form
              action="https://formsubmit.co/jhahimanshu930@gmail.com"
              method="POST"
              onSubmit={handleSubmit}
              className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-lg"
            >
              {/* FormSubmit Hidden Inputs */}
              <input
                type="hidden"
                name="_next"
                value="https://your-site.com/thank-you"
              />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="box" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="w-full p-3 rounded-lg bg-white/20 placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="w-full p-3 rounded-lg bg-white/20 placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <textarea
                name="message"
                rows="5"
                placeholder="Your Message"
                required
                className="w-full p-3 mb-4 rounded-lg bg-white/20 placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              ></textarea>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 transition px-6 py-3 rounded-full font-semibold"
              >
                📬 Send Message
              </motion.button>
            </form>

            {/* Back to Home Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 inline-block"
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
        <ToastContainer position="top-right" theme="dark" />
      </div>
    </div>
  );
}

export default ContactPage;
