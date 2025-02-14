import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Clock, Menu, X, ChevronDown } from 'lucide-react';
import { 
  FaXTwitter, 
  FaLinkedinIn, 
  FaFacebookF, 
  FaInstagram, 
  FaTiktok, 
  FaWhatsapp 
} from "react-icons/fa6";
import logo from "../assets/logo.png";
// import LoginPage from "./Pages/Registration/LoginPage";

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  // const location = useLocation();

  if (location.pathname === "/login") {
    return null; // Do not render the header on the login page
  }

  // Navigation Links Configuration
  const navigationLinks = {
    insurance: {
      title: "Insurance",
      path: "/car-insurance",
      content: {
        VEHICLE: [
          { title: "Car Insurance", path: "/car-insurance" },
          { title: "Van Insurance", path: "/van-insurance" },
          { title: "Motorbike Insurance", path: "/motorbike-insurance" },
          { title: "Fleet Insurance", path: "/car-insurance" },
        ],
        "LIFE & HEALTH": [
          { title: "Life Insurance", path: "/personal-accident" },
          { title: "Health Insurance", path: "/health-insurance" },
          { title: "Critical Illness Cover", path: "/critical-illness" },
        ],
      },
    },
    pension: {
      title: "Pension",
      path: "/pension",
      content: {
        "PENSION PLANS": [
          { title: "Personal Pension", path: "/pension/personal" },
          { title: "Workplace Pension", path: "/pension/workplace" },
        ],
        PLANNING: [
          { title: "Pension Calculator", path: "/pension/calculator" },
          { title: "Retirement Planning", path: "/pension/planning" },
        ],
      },
    },
    money: {
      title: "Money",
      path: "/money",
      content: {
        SAVINGS: [
          { title: "Savings Accounts", path: "/money/savings" },
          { title: "Investment ISAs", path: "/money/isas" },
        ],
        INVESTMENTS: [
          { title: "Stocks & Shares", path: "/money/stocks" },
          { title: "Investment Advice", path: "/money/advice" },
        ],
      },
    },
    utility: {
      title: "Utility",
      path: "/utility",
      content: {
        ENERGY: [
          { title: "Gas & Electric", path: "/utility/energy" },
          { title: "Green Energy", path: "/utility/green" },
        ],
        COMMUNICATIONS: [
          { title: "Broadband", path: "/utility/broadband" },
          { title: "Mobile Plans", path: "/utility/mobile" },
        ],
      },
    },
  };

  const socialLinks = [
    { icon: <FaXTwitter size={16} />, href: "#", label: "Twitter" },
    { icon: <FaLinkedinIn size={16} />, href: "#", label: "LinkedIn" },
    { icon: <FaFacebookF size={16} />, href: "#", label: "Facebook" },
    { icon: <FaInstagram size={16} />, href: "#", label: "Instagram" },
    { icon: <FaTiktok size={16} />, href: "#", label: "TikTok" },
    { icon: <FaWhatsapp size={16} />, href: "#", label: "WhatsApp" },
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

  // Desktop Dropdown Component
  const DropdownMenu = ({ content }) => (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 5 }}
      transition={{ duration: 0.2 }}
      className="absolute left-0 w-64 bg-white shadow-lg rounded-lg py-3 z-50"
    >
      {Object.entries(content).map(([category, items]) => (
        <div key={category} className="px-4 py-2">
          <h3 className="text-xs font-bold text-gray-900 mb-2">{category}</h3>
          <ul className="space-y-1">
            {items.map((item) => (
              <motion.li
                key={item.title}
                whileHover={{ x: 2 }}
                className="text-sm"
              >
                <Link
                  to={item.path}
                  className="block text-gray-600 hover:text-blue-600 py-1"
                  onClick={() => setActiveDropdown(null)}
                >
                  {item.title}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      ))}
    </motion.div>
  );

  // Mobile Dropdown Component
  const MobileDropdownItem = ({ title, content }) => (
    <motion.div
      initial={false}
      className="border-b border-gray-100 last:border-0"
    >
      <motion.button
        onClick={() =>
          setActiveMobileDropdown(activeMobileDropdown === title ? null : title)
        }
        className="flex items-center justify-between w-full py-4"
      >
        <span className="text-base font-bold text-gray-900">{title}</span>
        <motion.div
          animate={{ rotate: activeMobileDropdown === title ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {activeMobileDropdown === title && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden bg-gray-50 rounded-lg mx-2 mb-2"
          >
            {Object.entries(content).map(([category, items]) => (
              <div key={category} className="p-4">
                <h3 className="text-xs font-bold text-gray-900 mb-2">
                  {category}
                </h3>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <motion.li key={item.title} whileHover={{ x: 2 }}>
                      <Link
                        to={item.path}
                        className="block text-sm text-gray-600 hover:text-blue-600"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setActiveMobileDropdown(null);
                        }}
                      >
                        {item.title}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <header className="w-full bg-white">
      <div className="flex">
        {/* Logo Section - Full Height */}
        <div className="w-64 flex items-center justify-center border-r border-gray-200">
          <Link to="/" className="py-4">
            <img src={logo} alt="Insure Logo" className="h-8" />
          </Link>
        </div>

        <div className="flex-1">
          {/* Top Info Bar */}
          <div className="h-[52px] flex items-center justify-between px-6 border-b border-gray-200">
            {/* Contact Info */}
            <div className="hidden md:flex items-center">
              <a
                href="mailto:info@company.com"
                className="flex items-center gap-2 px-6 border-r border-gray-200 text-sm text-gray-600 hover:text-blue-600"
              >
                <Mail className="w-4 h-4" />
                <span>info@company.com</span>
              </a>
              <a
                href="tel:011-112-8596"
                className="flex items-center gap-2 px-6 border-r border-gray-200 text-sm text-gray-600 hover:text-blue-600"
              >
                <Phone className="w-4 h-4" />
                <span>011-112-8596</span>
              </a>
              <div className="flex items-center gap-2 px-6 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Mon-Fri 24 hours</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="hidden md:flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Main Navigation */}
          <div className="h-[52px] flex items-center justify-between px-6">
            {/* Desktop Navigation */}
            <nav
              ref={dropdownRef}
              className="hidden lg:flex items-center space-x-10 flex-1"
            >
              {Object.entries(navigationLinks).map(([key, item]) => (
                <div key={key} className="relative">
                  <button
                    onMouseEnter={() => setActiveDropdown(key)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    onClick={() => navigate(item.path)}
                    className="text-base font-bold text-gray-900 hover:text-blue-600 transition-colors"
                  >
                    {item.title}
                  </button>
                  <AnimatePresence>
                    {activeDropdown === key && (
                      <div
                        onMouseEnter={() => setActiveDropdown(key)}
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        <DropdownMenu content={item.content} />
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <Link
                to="/blogs"
                className="text-base font-bold text-gray-900 hover:text-blue-600 transition-colors"
              >
                Blog / News
              </Link>
              <Link
                to="/contact"
                className="text-base font-bold text-gray-900 hover:text-blue-600 transition-colors"
              >
                Contact us
              </Link>
            </nav>

            {/* Sign In & Mobile Menu */}
            <div className="flex items-center">
              <div className="border-l border-gray-200 pl-6">
                <Link
                  to="/signin"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors font-medium"
                >
                  Sign In
                </Link>
              </div>
              <button
                className="lg:hidden ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-600" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden border-t border-gray-200"
              >
                <div className="bg-white p-4">
                  {/* Mobile Contact Info */}
                  <div className="mb-6 space-y-4 lg:hidden">
                    <a
                      href="mailto:info@company.com"
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600"
                    >
                      <Mail className="w-4 h-4" />
                      <span>info@company.com</span>
                    </a>
                    <a
                      href="tel:011-112-8596"
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600"
                    >
                      <Phone className="w-4 h-4" />
                      <span>011-112-8596</span>
                    </a>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>Mon-Fri 24 hours</span>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="space-y-2">
                    {Object.entries(navigationLinks).map(([key, item]) => (
                      <MobileDropdownItem
                        key={key}
                        title={item.title}
                        content={item.content}
                      />
                    ))}
                  </div>

                  {/* Mobile Additional Links */}
                  <div className="mt-6 space-y-4 border-t border-gray-100 pt-4">
                    <Link
                      to="/blogs"
                      className="block text-base font-bold text-gray-900 hover:text-blue-600"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Blog / News
                    </Link>
                    <Link
                      to="/contact"
                      className="block text-base font-bold text-gray-900 hover:text-blue-600"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Contact us
                    </Link>
                  </div>

                  {/* Mobile Social Links */}
                  <div className="mt-6 flex items-center space-x-4 border-t border-gray-100 pt-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-gray-400 hover:text-blue-500 transition-colors"
                        aria-label={social.label}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Header;