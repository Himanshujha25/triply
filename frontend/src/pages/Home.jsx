import { Link } from 'react-router-dom';
import { FaRobot, FaMapMarkedAlt, FaCalendarAlt, FaGlobe, FaUserFriends } from 'react-icons/fa';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from '../components/Footer'; 

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 text-gray-800">

      {/* Hero Section */}
      <section className="px-6 py-24 flex flex-col items-center justify-center text-center" data-aos="fade-up">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-indigo-700">Meet <span className="text-indigo-600">Triply AI</span> 🌍</h1>
        <p className="text-lg sm:text-xl max-w-2xl mb-8 text-gray-600">
          Your personal AI-powered travel assistant. Get personalized trips, smart suggestions, live maps, and more — all in one place.
        </p>
        <Link
          to="/planner"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-full transition shadow"
        >
          🧠 Start Planning with AI
        </Link>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8" data-aos="fade-up">
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <FaRobot className="text-3xl text-indigo-600 mb-3" />
          <h3 className="text-xl font-semibold mb-2">AI Trip Planner</h3>
          <p className="text-sm text-gray-600">Just tell us your dream — Triply AI will craft a smart, optimized travel plan tailored to you.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <FaMapMarkedAlt className="text-3xl text-indigo-600 mb-3" />
          <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
          <p className="text-sm text-gray-600">Explore locations using AI-enhanced interactive maps. Zoom in to hidden gems!</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <FaCalendarAlt className="text-3xl text-indigo-600 mb-3" />
          <h3 className="text-xl font-semibold mb-2">Day-wise Scheduler</h3>
          <p className="text-sm text-gray-600">Your trip, broken down day by day — fully editable and powered by AI logic.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <FaUserFriends className="text-3xl text-indigo-600 mb-3" />
          <h3 className="text-xl font-semibold mb-2">Group Collaboration</h3>
          <p className="text-sm text-gray-600">Invite friends or family to join and edit the trip live, just like Google Docs!</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <FaGlobe className="text-3xl text-indigo-600 mb-3" />
          <h3 className="text-xl font-semibold mb-2">Global Intelligence</h3>
          <p className="text-sm text-gray-600">From Paris to remote villages, Triply AI learns trends and adapts your plans smartly.</p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-16  bg-indigo-600 text-white text-center" data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-4">Ready to make your next trip smarter?</h2>
        <p className="mb-6">Let Triply AI guide you every step of the way.</p>
        <Link
          to="/planner"
          className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition"
        >
          🚀 Get Started
        </Link>
      </section>
<Footer/>
    </div>
  );
};

export default Home;
