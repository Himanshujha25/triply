import React from "react";
import {
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import cybernexus from "../assets/ChatGPT Image Apr 4, 2025, 09_02_22 PM.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-700 px-6 py-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center sm:items-start space-y-8 sm:space-y-0">

        {/* Brand */}
        <div className="text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start space-x-2 mb-1">
            <img src={cybernexus} alt="Cybernexus Logo" className="w-20 h-20" />
            <span className="text-xl font-bold text-indigo-400 underline">CYBERNEXUS</span>
          </div>
          <p className="text-sm max-w-xs text-gray-400">
            Empowering the digital future — one project at a time.
          </p>
        </div>

        {/* Links */}
        <div className="text-center">
          <h3 className="text-md font-semibold mb-2 text-gray-200">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="/about" className="hover:text-indigo-500">About Us</a></li>
            <li><a href="/contact" className="hover:text-indigo-500">Contact Info</a></li>
          </ul>
        </div>

        {/* Social Icons */}
        <div className="text-center sm:text-right">
          <h3 className="text-md font-semibold mb-2 text-gray-200">Follow Us</h3>
          <div className="flex justify-center sm:justify-end space-x-4 text-2xl">
            <a href="https://github.com/himanshujha25" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500"><FaGithub /></a>
            <a href="https://linkedin.com/in/himanshujha25" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500"><FaLinkedin /></a>
            <a href="https://instagram.com/himanshu.jha123" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500"><FaInstagram /></a>
            <a href="https://twitter.com/himanshujha25" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500"><FaTwitter /></a>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="mt-8 border-t pt-4 text-center text-lg text-gray-400">
        Made with 💙 by <span className="font-semibold text-indigo-400">Cybernexus</span>
      </div>
    </footer>
  );
};

export default Footer;
