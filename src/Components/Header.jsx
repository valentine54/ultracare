import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Clock, ChevronDown, Menu, X } from "lucide-react";
import { 
  FaFacebookF, 
  FaLinkedinIn, 
  FaInstagram, 
  FaYoutube, 
  FaTiktok 
} from "react-icons/fa6";
import { FaEnvelope, FaPhone, FaClock } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../assets/logo.jpg";

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const socialLinks = [
    { icon: <FaFacebookF size={16} />, href: "https://www.facebook.com/bosongohospital", label: "Facebook" },
    { icon: <FaLinkedinIn size={16} />, href: "#", label: "LinkedIn" },
    { icon: <FaXTwitter size={16} />, href: "https://x.com/Bosongohospital", label: "Twitter" },
    { icon: <FaInstagram size={16} />, href: "https://www.instagram.com/bosongohospital", label: "Instagram" },
    { icon: <FaYoutube size={16} />, href: "https://www.youtube.com/@bosongohospital", label: "YouTube" },
    { icon: <FaTiktok size={16} />, href: "https://www.tiktok.com/@bosongohospital", label: "TikTok" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header className="w-full bg-white fixed top-0 left-0 z-50 shadow-sm">
      {/* Top Bar */}
      <div className="bg-white text-gray-600 py-2 px-4 md:px-6 lg:px-10 flex flex-col md:flex-row justify-between items-center text-xs border-b border-gray-200">
        <div className="flex flex-wrap justify-center md:justify-start gap-x-3 md:gap-x-4 gap-y-1 mb-1 md:mb-0">
          <span className="flex items-center whitespace-nowrap">
            <FaEnvelope className="text-blue-600 mr-1 md:mr-2" size={12} />
            <a href="mailto:bosongomedical@yahoo.com" className="hover:text-blue-600 transition-colors">
              bosongomedical@yahoo.com
            </a>
          </span>
          <span className="flex items-center whitespace-nowrap">
            <FaPhone className="text-blue-600 mr-1 md:mr-2" size={12} />
            <a href="tel:+254111964576" className="hover:text-blue-600 transition-colors">
              011-196-4576
            </a>
          </span>
          <span className="flex items-center whitespace-nowrap">
            <FaClock className="text-blue-600 mr-1 md:mr-2" size={12} />
            Mon-Mon 24 hours
          </span>
        </div>
        <div className="flex space-x-2 md:space-x-3">
          {socialLinks.map((link, index) => (
            <a 
              key={index}
              href={link.href} 
              aria-label={link.label} 
              className={`text-gray-500 hover:text-blue-600 transition-colors ${link.label === 'Instagram' ? 'hover:text-pink-600' : ''} ${link.label === 'YouTube' ? 'hover:text-red-600' : ''} ${link.label === 'TikTok' ? 'hover:text-black' : ''}`}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-[#0047AB] shadow-md px-4 md:px-6 lg:px-10 flex justify-between items-center h-16 md:h-24">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <a href="/">
            <img 
              src={logo} 
              alt="BMC Logo" 
              className="h-12 md:h-20 w-auto object-contain" 
            />
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-4 lg:space-x-6">
          <Link to="/" className="text-white hover:text-blue-200 transition-colors font-medium">Home</Link>
          <Link to="/about" className="text-white hover:text-blue-200 transition-colors font-medium">About</Link>
          <Link to="/services" className="text-white hover:text-blue-200 transition-colors font-medium">Services</Link>
          <Link to="/contact" className="text-white hover:text-blue-200 transition-colors font-medium">Contact</Link>
          <Link to="/careers" className="text-white hover:text-blue-200 transition-colors font-medium">Careers</Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Appointment Button */}
        <button 
          onClick={() => navigate("/contact")}
          className="hidden md:block bg-white hover:bg-[#F0F0F0] text-[#0047AB] px-4 py-1 lg:px-6 lg:py-2 rounded-md font-medium transition-colors"
        >
          Request an Appointment
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#0047AB] w-full overflow-hidden"
          >
            <div className="flex flex-col space-y-4 p-4">
              <Link to="/" className="text-white hover:text-blue-200 transition-colors">Home</Link>
              <Link to="/about" className="text-white hover:text-blue-200 transition-colors">About</Link>
              <Link to="/services" className="text-white hover:text-blue-200 transition-colors">Services</Link>
              <Link to="/contact" className="text-white hover:text-blue-200 transition-colors">Contact</Link>
              <Link to="/careers" className="text-white hover:text-blue-200 transition-colors">Careers</Link>
              <button 
                onClick={() => navigate("/contact")}
                className="bg-white hover:bg-[#F0F0F0] text-[#0047AB] px-6 py-2 rounded-md font-medium transition-colors mt-2"
              >
                Request an Appointment
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;