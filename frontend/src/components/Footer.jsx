import { FaLinkedin, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const Footer = ({ darkMode }) => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`${
        darkMode ? 'bg-[#0f0f11] text-gray-300' : 'bg-gray-100 text-gray-800'
      } py-6 shadow-inner transition-all duration-300 relative text-sm`}
    >
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Brand & Tagline */}
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold text-indigo-600">Triply AI</h1>
          <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
            Your AI-powered travel companion.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center">
          <p className="font-semibold text-gray-600 dark:text-gray-300 mb-1">Quick Links</p>
          <ul className="space-y-1">
            <li><a href="#features" className="hover:text-indigo-500 transition">Features</a></li>
            <li><a href="#destinations" className="hover:text-indigo-500 transition">Destinations</a></li>
            <li><a href="/planner" className="hover:text-indigo-500 transition">Trip Planner</a></li>
          </ul>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center md:justify-end space-x-4 text-indigo-600">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:scale-110 transition">
            <FaLinkedin size={20} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:scale-110 transition">
            <FaTwitter size={20} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:scale-110 transition">
            <FaInstagram size={20} />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:scale-110 transition">
            <FaGithub size={20} />
          </a>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-5 text-center text-xs text-gray-400 dark:text-gray-500">
        &copy; {new Date().getFullYear()} Triply AI. Created by <span className="text-indigo-500 font-medium">CyberNexus</span> 🚀
      </div>

      {/* Back to Top Button */}
      {showTop && (
        <button
          onClick={handleScrollToTop}
          className="fixed bottom-6 right-6 bg-indigo-600 text-white p-2 rounded-full shadow-xl hover:bg-indigo-700 transition"
          aria-label="Back to top"
        >
          ↑
        </button>
      )}
    </footer>
  );
};

export default Footer;
