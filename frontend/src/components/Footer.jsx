import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

const Footer = ({ darkMode }) => {
  // dynamic styles using props
  const bgColor = darkMode ? "bg-gray-900" : "bg-white";
  const textColor = darkMode ? "text-gray-300" : "text-gray-700";
  const headingColor = darkMode ? "text-gray-200" : "text-gray-800";
  const borderColor = darkMode ? "border-gray-700" : "border-gray-200";
  const subTextColor = darkMode ? "text-gray-400" : "text-gray-600";
  const brandColor = darkMode ? "text-indigo-400" : "text-indigo-600";

  return (
    <footer className={`${bgColor} ${textColor} border-t ${borderColor} px-6 py-10`}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center sm:items-start space-y-8 sm:space-y-0">

        {/* Brand */}
        <div className="text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start space-x-2 mb-2">
            <img src="/logo.png" alt="Cybernexus Logo" className="w-8 h-8" />
            <span className={`text-xl font-bold ${brandColor}`}>Cybernexus</span>
          </div>
          <p className={`text-sm max-w-xs ${subTextColor}`}>
            Empowering the digital future — one project at a time.
          </p>
        </div>

        {/* Links */}
        <div className="text-center">
          <h3 className={`text-md font-semibold mb-2 ${headingColor}`}>Quick Links</h3>
          <ul className={`space-y-1 text-sm`}>
            <li><a href="/about" className="hover:text-indigo-500">About Us</a></li>
            <li><a href="/contact" className="hover:text-indigo-500">Contact Info</a></li>
          </ul>
        </div>

        {/* Social Icons */}
        <div className="text-center sm:text-right">
          <h3 className={`text-md font-semibold mb-2 ${headingColor}`}>Follow Us</h3>
          <div className="flex justify-center sm:justify-end space-x-4 text-2xl">
            <a href="https://github.com/himanshujha25" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500"><FaGithub /></a>
            <a href="https://linkedin.com/in/himanshujha25" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500"><FaLinkedin /></a>
            <a href="https://instagram.com/himanshujha25" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500"><FaInstagram /></a>
            <a href="https://twitter.com/himanshujha25" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500"><FaTwitter /></a>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className={`mt-8 border-t pt-4 text-center text-md ${subTextColor}`}>
        Made with 💙 by <span className={`font-semibold ${brandColor}`}>Cybernexus</span>
      </div>
    </footer>
  );
};

export default Footer;
