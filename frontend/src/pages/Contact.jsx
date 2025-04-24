import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import bg from "../assets/bg.png";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function ContactPage({ darkMode, setDarkMode }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  // Parallax effect on scroll
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.message.trim()) errors.message = "Message is required";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Show success animation
      setShowSuccessAnimation(true);
      
      // Reset form after submission
      setTimeout(() => {
        setFormData({ name: "", email: "", subject: "", message: "" });
        toast.success("🎉 Message sent successfully! We'll get back to you soon.");
        setShowSuccessAnimation(false);
        setIsSubmitting(false);
      }, 1000);
      
    } catch (error) {
      toast.error("😔 Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Success animation
  const SuccessAnimation = () => (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center bg-indigo-600/95 rounded-xl z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
      >
        <svg className="w-24 h-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </svg>
        <p className="text-white text-center font-medium mt-4">Message Sent!</p>
      </motion.div>
    </motion.div>
  );

  return (
    <div
      className="min-h-screen font-poppins text-gray-200 transition-colors duration-500 relative"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: `center ${scrollY * 0.25}px`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80 backdrop-blur-sm z-0" />
      <div className="relative z-10">
        <Navbar />

        <section className="px-6 py-16 md:py-24 mt-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column: Contact Info */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="text-left"
              >
                <motion.h2
                  variants={itemVariants}
                  className="text-4xl md:text-5xl font-bold mb-6 text-white"
                >
                  <span className="text-indigo-400">Contact</span> Cybernexus
                </motion.h2>
                
                <motion.p 
                  variants={itemVariants}
                  className="text-gray-300 text-lg mb-10"
                >
                  Have questions or ideas? We'd love to hear from you. Our team is ready to assist you with any inquiries about our services.
                </motion.p>
                
                <div className="space-y-8">
                  <motion.div variants={itemVariants} className="flex items-start">
                    <div className="bg-indigo-600/30 p-3 rounded-lg mr-4">
                      <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Email Us</h3>
                      <p className="text-indigo-300 mt-1">jhahimanshu930@gmail.com</p>
                      <p className="text-gray-400 text-sm mt-1">We'll respond within 24 hours</p>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="mt-12">
                    <h3 className="text-xl font-semibold text-white mb-4">Connect With Us</h3>
                    <div className="flex space-x-4">
                      {[
                        { platform: "twitter", url: "https://twitter.com/himanshujha25" },
                        { platform: "instagram", url: "https://instagram.com/himanshu.jha123" },
                        { platform: "linkedin", url: "https://linkedin.com/in/himanshujha25" },
                        { platform: "github", url: "https://github.com/himanshujha25" }
                      ].map(item => (
                        <motion.a
                          key={item.platform}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ y: -4, scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-indigo-600/20 hover:bg-indigo-600/40 transition p-3 rounded-full"
                        >
                          <span className="sr-only">{item.platform}</span>
                          <svg className="w-5 h-5 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                            {item.platform === "twitter" && (
                              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                            )}
                            {item.platform === "instagram" && (
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            )}
                            {item.platform === "linkedin" && (
                              <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                            )}
                            {item.platform === "github" && (
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            )}
                          </svg>
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Right Column: Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-indigo-600/10 backdrop-blur-sm rounded-xl -rotate-3 scale-105 z-0" />
                <div className="absolute inset-0 bg-indigo-600/10 backdrop-blur-sm rounded-xl rotate-1 scale-105 z-0" />
                
                <form
                  onSubmit={handleSubmit}
                  className="relative bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 shadow-xl z-1"
                >
                  {showSuccessAnimation && <SuccessAnimation />}
                  
                  <h3 className="text-2xl font-bold mb-6 text-white">Send us a message</h3>
                  
                  <div className="mb-5">
                    <label htmlFor="name" className="block text-sm font-medium text-indigo-300 mb-1">
                      Your Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full pl-10 p-3 rounded-lg bg-white/20 placeholder-gray-300 text-white 
                          focus:outline-none focus:ring-2 ${formErrors.name ? 'focus:ring-red-400 border-red-400' : 'focus:ring-indigo-400 border-transparent'}`}
                        placeholder="Your full name"
                      />
                    </div>
                    {formErrors.name && (
                      <p className="mt-1 text-sm text-red-400">{formErrors.name}</p>
                    )}
                  </div>
                  
                  <div className="mb-5">
                    <label htmlFor="email" className="block text-sm font-medium text-indigo-300 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full pl-10 p-3 rounded-lg bg-white/20 placeholder-gray-300 text-white 
                          focus:outline-none focus:ring-2 ${formErrors.email ? 'focus:ring-red-400 border-red-400' : 'focus:ring-indigo-400 border-transparent'}`}
                        placeholder="your.email@example.com"
                      />
                    </div>
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-400">{formErrors.email}</p>
                    )}
                  </div>
                  
                  <div className="mb-5">
                    <label htmlFor="subject" className="block text-sm font-medium text-indigo-300 mb-1">
                      Subject (Optional)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full pl-10 p-3 rounded-lg bg-white/20 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 border-transparent"
                        placeholder="What's this about?"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-indigo-300 mb-1">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full p-3 rounded-lg bg-white/20 placeholder-gray-300 text-white 
                        focus:outline-none focus:ring-2 ${formErrors.message ? 'focus:ring-red-400 border-red-400' : 'focus:ring-indigo-400 border-transparent'}`}
                      placeholder="How can we help you?"
                    ></textarea>
                    {formErrors.message && (
                      <p className="mt-1 text-sm text-red-400">{formErrors.message}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className={`bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 
                        transition px-8 py-3 rounded-lg font-semibold text-white shadow-lg 
                        ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                          Send Message
                        </span>
                      )}
                    </motion.button>
                    
                    <Link
                      to="/"
                      className="text-indigo-300 hover:text-indigo-200 font-medium text-sm transition ml-10 "
                    >
                      Back to Home
                    </Link>
                  </div>
                </form>

                {/* Decorative elements */}
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-indigo-500/30 rounded-full blur-xl z-0" />
                <div className="absolute -top-8 -left-8 w-32 h-32 bg-indigo-600/20 rounded-full blur-xl z-0" />
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
        <ToastContainer position="top-right" theme="dark" />
      </div>
    </div>
  );
}

export default ContactPage;