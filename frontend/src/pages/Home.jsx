import React, { useState, useEffect, useCallback, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import bg from "../assets/bg.png";

function HomePage() {
  const [ripples, setRipples] = useState([]);
  const [setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeFeedback, setActiveFeedback] = useState(0);
  const [isVisible, setIsVisible] = useState({
    hero: false,
    features: false,
    cta: false,
    faq0: false,
    faq1: false,
    faq2: false,
    faq3: false
  });


  // Auto-rotate feedback cards
  useEffect(() => {
    const feedbackInterval = setInterval(() => {
      setActiveFeedback(prev => (prev + 1) % 4);
    }, 5000);

    return () => clearInterval(feedbackInterval);
  }, []);

  // Debounced scroll handler to improve performance
  useEffect(() => {
    let timeoutId = null;

    const handleScroll = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        setScrollY(window.scrollY);

        // Check elements visibility for animation triggers
        const heroSection = document.getElementById('hero-section');
        const featuresSection = document.getElementById('features-section');
        const ctaSection = document.getElementById('cta-section');

        if (heroSection) {
          setIsVisible(prev => ({
            ...prev,
            hero: isElementInViewport(heroSection)
          }));
        }

        if (featuresSection) {
          setIsVisible(prev => ({
            ...prev,
            features: isElementInViewport(featuresSection)
          }));
        }

        if (ctaSection) {
          setIsVisible(prev => ({
            ...prev,
            cta: isElementInViewport(ctaSection)
          }));
        }
      }, 10); 
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  // Helper function to check if element is in viewport
  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  };

  // Throttled mouse move handler
  useEffect(() => {
    let throttleTimeout = null;
    let lastExecution = 0;
    const throttleDelay = 30;

    const handleMouseMove = (e) => {
      const now = Date.now();

      if (now - lastExecution > throttleDelay) {
        setMousePosition({ x: e.clientX, y: e.clientY });
        lastExecution = now;
      } else if (!throttleTimeout) {
        throttleTimeout = setTimeout(() => {
          setMousePosition({ x: e.clientX, y: e.clientY });
          lastExecution = Date.now();
          throttleTimeout = null;
        }, throttleDelay);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (throttleTimeout) {
        clearTimeout(throttleTimeout);
      }
    };
  }, []);

  // Memoized ripple creation function
  const createRipple = useCallback((e) => {
    if (ripples.length > 10) return;

    const x = e.clientX;
    const y = e.clientY;
    const id = Date.now();
    const size = Math.random() * 100 + 100;

    setRipples(prev => [...prev, { x, y, id, size }]);

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 1500);
  }, [ripples.length]);

  // Features data with enhanced icons and descriptions
  const features = useMemo(() => [
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
  ], []);

  // Beta user feedback data
  const betaUserFeedback = useMemo(() => [
    {
      id: 1,
      name: "nitin",
      role: "developer",
      avatar: "AR",
      avatarGradient: "from-cyan-400 to-blue-500",
      text: "I've tested dozens of travel apps, but Triply's AI itinerary builder is next level. Can't wait for the full release!",
      rating: 4.2,
      badge: "founding member",
      badgeColor: "bg-blue-500"
    },
    {
      id: 2,
      name: "akash malwaia",
      role: "Student & developer",
      avatar: "MC",
      avatarGradient: "from-pink-400 to-rose-500",
      text: "The hidden gem feature alone is worth signing up for. As someone who's always looking for authentic experiences, Triply gets it.",
      rating: 4.6,
      badge: "erly access member",
      badgeColor: "bg-rose-500"
    },
    {
      id: 3,
      name: "rahul kumar",
      role: "Student",
      avatar: "JT",
      avatarGradient: "from-emerald-400 to-green-500",
      text: "I've been part of the beta testing group for Triply and the real-time adjustments have saved my trips multiple times already.",
      rating: 4.8,
      badge: "BETA TESTER ",
      badgeColor: "bg-emerald-500"
    },
    {
      id: 4,
      name: "sweta singh",
      role: "Student",
      avatar: "JT",
      avatarGradient: "from-pink-400 to-green-500",
      text: "I've been part of the beta testing group for Triply and the real-time adjustments have saved my trips multiple times already.",
      rating: 4.7,
      badge: "early access member",
      badgeColor: "bg-green-500"
    }


  ], []);

  // Optimized background particles with reduced count
  const particles = useMemo(() =>
    Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      opacity: Math.random() * 0.5 + 0.3,
      duration: Math.random() * 20 + 15
    })),
    []);

  // Calculate parallax effect based on mouse position - memoized
  const calcParallax = useCallback((depth = 10) => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const moveX = (mousePosition.x - windowWidth / 2) / windowWidth * depth;
    const moveY = (mousePosition.y - windowHeight / 2) / windowHeight * depth;

    return { x: moveX, y: moveY };
  }, [mousePosition]);

  // Precompute parallax values to avoid recalculation in render
  const parallaxValues = useMemo(() => calcParallax(20), [calcParallax]);

  return (
    <div
      onClick={createRipple}
      className="min-h-screen font-poppins text-gray-800 dark:text-gray-200 transition-colors duration-500 relative overflow-hidden"
    >
      {/* Will-change hint for better performance */}
      <div className="fixed inset-0 will-change-transform" style={{ zIndex: -1 }} />

      {/* Optimized Parallax Background with reduced movement range */}
      <motion.div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "110% 110%",
          backgroundPosition: "center",
        }}
       
      />

      {/* Overlay with depth blur effect - reduced blur for better performance */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-0" />

      {/* Optimized animated particles in background */}
      <div className="fixed inset-0 z-5 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full bg-indigo-400/30"
            style={{
              x: particle.x,
              y: particle.y,
              opacity: particle.opacity,
              willChange: "transform"
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
        ))}
      </div>

      {/* Optimized ripple effects */}
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
                x: -ripple.size / 2,
                y: -ripple.size / 2,
                willChange: "transform, opacity"
              }}
              className="absolute rounded-full border-indigo-400 border-solid"
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Main content */}
      <div className="relative z-20">
        <Navbar />

        {/* Hero Section with enhanced animations and ID for visibility tracking */}
        <header id="hero-section" className="px-6 py-28 text-center">
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
              <span className="relative inline-block">
                <motion.span
                  className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-400"
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
                </motion.span>
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-purple-500"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.7 }}
                />
              </span>{" "}
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
                  className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg shadow-lg group"
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
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    whileHover={{
                      x: "100%",
                      transition: { duration: 0.8 }
                    }}
                  />
                </motion.button>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Added floating elements for visual interest */}
          <div className="absolute top-10 right-10 hidden md:block">
            <motion.div
              className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-400/20 to-purple-400/20 backdrop-blur-md"
              animate={{
                y: [0, -15, 0],
                rotate: [0, 10, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "mirror"
              }}
            />
          </div>
          <div className="absolute bottom-10 left-10 hidden md:block">
            <motion.div
              className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-400/20 to-indigo-400/20 backdrop-blur-md"
              animate={{
                y: [0, 15, 0],
                rotate: [0, -10, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "mirror",
                delay: 1
              }}
            />
          </div>
        </header>

        {/* Features Section with staggered animations and ID for visibility tracking */}
        <section id="features-section" className="px-6 py-20">
          <div className="max-w-5xl mx-auto text-center text-gray-200">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl font-semibold mb-16 text-white"
            >
              <motion.span
                className="relative inline-block bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300"
                animate={{
                  backgroundPosition: ["0% center", "100% center"],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "mirror"
                }}
              >
                What can I help you with today?
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-indigo-300/50 to-purple-300/50"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </motion.span>
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
                    className="text-4xl mb-4 relative"
                    whileHover={{ scale: 1.2, rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {item.icon}
                    <motion.div
                      className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-70"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    />
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

            {/* Beta User Feedback Section */}
            <motion.div
              className="mt-24 max-w-4xl mx-auto relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7 }}
            >
              <h3 className="text-2xl font-semibold mb-12 text-white">
                <motion.span
                  className="inline-block"
                  animate={{
                    y: [0, -5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "mirror"
                  }}
                >
                  📣
                </motion.span> What our beta users are saying
              </h3>

              {/* Beta user feedback carousel */}
              <div className="relative h-72 w-full">
                <AnimatePresence mode="wait">
                  {betaUserFeedback.map((feedback, i) => (
                    activeFeedback === i && (
                      <motion.div
                        key={feedback.id}
                        className="absolute inset-0 p-8 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/20 backdrop-blur-lg"
                        initial={{ opacity: 0, y: 40, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -40, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 100, damping: 15 }}
                      >
                        {/* Badge at top of card */}
                        <motion.div
                          className={`absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white ${feedback.badgeColor}`}
                          initial={{ y: -20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {feedback.badge}
                        </motion.div>

                        <div className="flex flex-col md:flex-row items-center mt-4">
                          {/* Avatar */}
                          <motion.div
                            className={`w-16 h-16 rounded-full bg-gradient-to-r ${feedback.avatarGradient} flex items-center justify-center text-white font-bold text-xl shadow-lg`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", delay: 0.1 }}
                          >
                            {feedback.avatar}
                          </motion.div>

                          <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
                            <h4 className="font-semibold text-lg">{feedback.name}</h4>
                            <div className="text-sm text-gray-300 mt-1">{feedback.role}</div>
                            <div className="text-yellow-400 text-sm mt-1">
                              {"★".repeat(feedback.rating)}
                            </div>
                          </div>
                        </div>
                        <div className="relative mt-6 text-center md:text-left">
                          <motion.span
                            className="absolute -top-3 -left-2 text-3xl text-indigo-400/40"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            "
                          </motion.span>
                          <p className="text-gray-200 italic px-4">{feedback.text}</p>
                          <motion.span
                            className="absolute -bottom-4 -right-2 text-3xl text-indigo-400/40"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            "
                          </motion.span>
                        </div>
                      </motion.div>
                    )
                  ))}
                </AnimatePresence>

                {/* Navigation buttons */}
                <div className="absolute -bottom-12 left-0 right-0 flex justify-center gap-4 mt-4">
                  {[0, 1, 2, 3].map((i) => (
                    <motion.button
                      key={i}
                      className={`w-3 h-3 rounded-full ${activeFeedback === i ? "bg-white" : "bg-white/30"}`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setActiveFeedback(i)}
                    />
                  ))}
                </div>
              </div>

              {/* Contact us section instead of feedback form */}
              <motion.div
                className="mt-24 p-6 rounded-xl bg-white/5 border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h4 className="text-xl font-medium text-white mb-4">Have suggestions or feedback?</h4>
                <p className="text-gray-300 mb-6">We value your input! If you have any suggestions or feedback for our product, we'd love to hear from you.</p>

                <div className="flex flex-col sm:flex-row gap-5 justify-center">

                  <motion.a
                    href="/contact"
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-white/20 text-white font-medium hover:bg-white/10 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-lg">💬</span>
                    <span>Contact Support</span>
                  </motion.a>
                </div>
              </motion.div>

              {/* Social proof metrics */}
              <div className="grid grid-cols-3 gap-4 mt-12">
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div
                    className="text-3xl font-bold text-white"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
                  >
                    10+
                  </motion.div>
                  <div className="text-sm text-gray-300">Beta Testers</div>
                </motion.div>
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.div
                    className="text-3xl font-bold text-white"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 5, delay: 1 }}
                  >
                    3+
                  </motion.div>
                  <div className="text-sm text-gray-300">Api Use</div>
                </motion.div>
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.div
                    className="text-3xl font-bold text-white"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 5, delay: 2 }}
                  >
                    4.5
                  </motion.div>
                  <div className="text-sm text-gray-300">Avg. Rating</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section with enhanced animations and ID for visibility tracking */}
        <section id="cta-section" className="px-6 py-24 mb-12">
          <motion.div
            className="max-w-5xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 10, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
          >
            {/* FAQ Section */}
            <section id="faq-section" className="px-6 mt-[-110px] mb-10 ">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-10"
                >
                  <h2 className="text-4xl font-bold text-white mb-4">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-gray-300 text-lg">
                    Get answers to common questions about Triply AI
                  </p>
                </motion.div>

                <div className="space-y-6">
                  {[
                    {
                      question: "How does Triply AI create travel plans?",
                      answer: "Our AI analyzes millions of data points including local events, and user preferences to create optimized itineraries that adapt to your needs in real-time."
                    },
                    {
                      question: "Is my personal data safe?",
                      answer: "Absolutely. we never share your data with third parties. Your privacy is our top priority."
                    },
                    {
                      question: "Can I modify generated itineraries?",
                      answer: "Yes! you can you just need to modify your preferences and our AI will adjust the itinerary accordingly."
                    },
                    {
                      question: "What makes Triply different from other planners?",
                      answer: "Our real-time adaptation engine considers live data we use google Api for images and our ui/ux is very modern and easy to use and it is fast responding Ai ."
                    }
                  ].map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="rounded-xl border border-white/20 bg-white/5 backdrop-blur-md overflow-hidden"
                    >
                      <motion.button
                        onClick={() => setIsVisible(prev => ({ ...prev, [index]: !prev[index] }))}
                        className="w-full px-6 py-4 text-left flex justify-between items-center"
                      >
                        <span className="text-white font-medium text-lg">{faq.question}</span>
                        <motion.span
                          animate={{ rotate: isVisible[index] ? 180 : 0 }}
                          className="text-2xl ml-4"
                        >
                          ▼
                        </motion.span>
                      </motion.button>

                      <AnimatePresence>
                        {isVisible[index] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="px-6 pb-4 text-gray-300"
                          >
                            {faq.answer}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Your Adventure?
            </h2>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of travelers who are already planning smarter with Triply AI. Your perfect trip is just a click away!
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.a
                href="/destinations"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                See Popular Destinations 🌍
              </motion.a>
            </motion.div>
          </motion.div>
        </section>


        <Footer />
      </div>
    </div>
  );
}

export default HomePage;