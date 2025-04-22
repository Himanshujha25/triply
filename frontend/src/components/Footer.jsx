import React from "react";
import { 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin, 
  FaGithub,
  FaEnvelope,
  FaArrowUp,
  FaHeart
} from "react-icons/fa";
import { Link } from "react-router-dom";
import cybernexus from "../assets/ChatGPT Image Apr 4, 2025, 09_02_22 PM.png";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 border-t border-indigo-900/30 pt-16 pb-6 relative">
      {/* Scroll to top button */}
      <button 
        onClick={scrollToTop}
        className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
        aria-label="Scroll to top"
      >
        <FaArrowUp className="group-hover:-translate-y-1 transition-transform duration-300" />
      </button>
      
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-3">
              <img 
                src={cybernexus} 
                alt="Cybernexus Logo" 
                className="w-14 h-14 rounded-lg shadow-lg shadow-indigo-500/20" 
              />
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  CYBERNEXUS
                </h3>
                <p className="text-xs text-gray-400">Digital Solutions</p>
              </div>
            </div>
            
            <p className="text-sm text-gray-400 leading-relaxed">
              Empowering the digital future — one project at a time. We build innovative solutions 
              that help businesses thrive in the digital landscape.
            </p>
            
            <div className="pt-2">
              <h4 className="text-sm font-medium text-gray-300 mb-3">Connect With Us</h4>
              <div className="flex space-x-3">
                <a 
                  href="https://github.com/himanshujha25" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-gray-800 hover:bg-indigo-600 text-gray-300 hover:text-white p-2 rounded-lg transition-all duration-300"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>
                <a 
                  href="https://linkedin.com/in/himanshujha25" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-gray-800 hover:bg-indigo-600 text-gray-300 hover:text-white p-2 rounded-lg transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
                <a 
                  href="https://instagram.com/himanshu.jha123" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-gray-800 hover:bg-indigo-600 text-gray-300 hover:text-white p-2 rounded-lg transition-all duration-300"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a 
                  href="https://twitter.com/himanshujha25" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-gray-800 hover:bg-indigo-600 text-gray-300 hover:text-white p-2 rounded-lg transition-all duration-300"
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Services", path: "/services", underDevelopment: true },
                { name: "Portfolio", path: "https://cybernexus.vercel.app" },
                { name: "Blog", path: "/blog", underDevelopment: true },
                { name: "Contact", path: "/contact", }
              ].map((link, index) => (
                <li key={index}>
                  {link.underDevelopment ? (
                    <span className="text-gray-700 flex items-center cursor-not-allowed">
                      {link.name} <span className="ml-2 text-xs text-indigo-400">(Under Development)</span>
                    </span>
                  ) : link.path.startsWith('http') ? (
                    <a 
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 flex items-center"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link 
                      to={link.path} 
                      className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 flex items-center"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Our Services</h3>
            <ul className="space-y-2">
              {[
                "Web Development",
                "Mobile Applications",
                "UI/UX Design",
                "Cloud Solutions",
                "DevOps Services",
                "AI & Machine Learning"
              ].map((service, index) => (
                <li key={index}>
                  <span className="text-gray-700 cursor-not-allowed">
                    {service} <span className="ml-1 text-xs text-indigo-400">(Under Development)</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <FaEnvelope className="text-indigo-400 mr-3" />
                <a href="mailto:himanshjha930@gmail.com" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300">
                jhahimanshu930@gmail.com
                </a>
              </li>
            </ul>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Subscribe to our newsletter</h4>
              <form 
  action="https://formsubmit.co/jhahimanshu930@gmail.com" 
  method="POST"
  className="flex"
>
  <input 
    type="email" 
    name="email"
    placeholder="Your email" 
    className="bg-gray-800 text-sm rounded-l-lg px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-indigo-500 text-gray-300"
    aria-label="Email address"
    required
  />
  <button 
    type="submit" 
    className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-r-lg px-3 transition-colors duration-300"
    aria-label="Subscribe"
  >
    Join 
  </button>
</form>

            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Area */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div className="mb-4 md:mb-0">
            © {currentYear} Cybernexus. All rights reserved.
          </div>
          
          <div className="flex items-center">
            <span >Made with ❤️</span>
       
            <span >by</span>
            <span className="ml-1 font-semibold text-indigo-400">Cybernexus</span>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-4">
            <span className="text-gray-500 cursor-not-allowed">Privacy Policy</span>
            <span className="text-gray-500 cursor-not-allowed">Terms of Service</span>
            <span className="text-gray-500 cursor-not-allowed">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;