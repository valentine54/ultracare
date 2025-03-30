import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Clock, ChevronDown } from "lucide-react";
import { 
  FaFacebookF, 
  FaLinkedinIn, 

  FaInstagram, FaYoutube, FaTiktok
} from "react-icons/fa6";
import { FaEnvelope, FaPhone, FaClock, FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
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
    { icon: <FaXTwitter size={16} />, href: "https://l.facebook.com/l.php?u=https%3A%2F%2Fx.com%2FBosongohospital%3Ffbclid%3DIwZXh0bgNhZW0CMTAAAR0wTYRWN4aTzj9jShNKmjceJOIxF6_z116m_sy_0GNvSCqiPGazrc1nUsg_aem_fVRagsGkKFyZ45cPiX1noQ&h=AT3udQqdQQvhZQi6LDNdCo4mZBmm94SNMmmGa9b8Vbr1R67zNRhIzicQdI96Gyoe63xpzW8wrw6VGi5T0jPrEuSjHV1vEmdrb6x7dHBqOnPTnCOEtrmUauOakDi9EMmKqJbi", label: "Twitter" },
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

  return (
    <header className="w-full bg-white fixed top-0 left-0 z-50">
      {/* Top Bar */}
      <div className="from-white-900 to-gray-50  text-gray-600 py-2 px-4 md:px-10 flex flex-col md:flex-row justify-between items-center text-xs md:text-sm border-b border-gray-200 h-10"> {/* Changed to h-10 */}
        <div className="flex flex-wrap justify-center text-[12px] gap-x-4 gap-y-1 mb-1 md:mb-0"> {/* Better mobile wrapping */}
          <span className="flex items-center">
            <FaEnvelope className="text-blue-600 mr-2" />
            <a href="mailto:
donbettermusa@bosongohospital.com" className="hover:text-blue-600 transition-colors">
              
donbettermusa@bosongohospital.com
            </a>
          </span>
          <span className="flex items-center">
            <FaPhone className="text-blue-600 mr-2" />
            <a href="tel:+254743444900" className="hover:text-blue-600 transition-colors">
            0743-444-900
            </a>
          </span>
          <span className="flex items-center">
            <FaClock className="text-blue-600 mr-2" />
            Mon-Mon 24 hours
          </span>
        </div>
        <div className="flex space-x-3">
          <a href="https://www.facebook.com/bosongohospital" aria-label="Facebook" className="text-gray-500 hover:text-blue-600 transition-colors">
            <FaFacebook />
          </a>
          {/* <a href="#" aria-label="LinkedIn" className="text-gray-500 hover:text-blue-600 transition-colors">
            <FaLinkedin />
          </a> */}
          
          <a href="https://x.com/Bosongohospital" aria-label="X (Twitter)" className="text-gray-500 hover:text-blue-600 transition-colors">
  <FaXTwitter />
</a>
<a href="https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.instagram.com%2Fbosongohospital%3Ffbclid%3DIwZXh0bgNhZW0CMTAAAR1I2RWxgJXkogSWcJcKS7eisKcF0LLoQoYhwhNVypnDlSviu4frf0T0LmI_aem_jzDjhdAvlFnnPYi6-FyOYQ&h=AT0Lauqi0Z0ZGVSYKZCfUWudLFi0e2S9J33V_yMhgC5_2wjAhuEQ3eonSxRFzA51v8W5qdxhOUzvIfA6TVdvSLJN9p8pk6CFDE74FgqV5Fa_tNJHN8-UMUpjD81qYqLjmWt3" aria-label="Instagram" className="text-gray-500 hover:text-pink-600 transition-colors">
  <FaInstagram />
</a>
<a href="https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutube.com%2F%40Bosongohospital%3Ffbclid%3DIwZXh0bgNhZW0CMTAAAR1I2RWxgJXkogSWcJcKS7eisKcF0LLoQoYhwhNVypnDlSviu4frf0T0LmI_aem_jzDjhdAvlFnnPYi6-FyOYQ&h=AT0exYMm_tXDDQ4o-_TBucsM22SOrvccV8rpxaVJR_H4y6ySTme9EfmS7Ufmq96RWoJtbGc3fIc-aR-3hpIBBsV1RaRNsjmXJPnQGFRji1bj6bQb8C3FmTI8VqCvLtHb1hw8" aria-label="YouTube" className="text-gray-500 hover:text-red-600 transition-colors">
  <FaYoutube />
</a>
<a href="https://l.facebook.com/l.php?u=https%3A%2F%2Ftiktok.com%2F%40bosongohospital%3Ffbclid%3DIwZXh0bgNhZW0CMTAAAR0iu97jr3mk4ybGbVyhaSurLUGJly7QQiwiULsC24qqC9rIjXlmxsHoLeE_aem_FOSxhaJkMKTYXmkPyEHxLw&h=AT2yyzH_CX21CPD2CMFC4bI29HuT-D-alqwlXTD1EmiQ8Tw9vuEqVrMRZoUqQHtKbWrswezxCIuTR_g4junUBaeURtMx0CnTaRe7wXL86E7RLak5DOtycwSvCl5sX9M-tWan" aria-label="TikTok" className="text-gray-500 hover:text-black transition-colors">
  <FaTiktok />
</a>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white shadow-md px-4 md:px-10 flex justify-between items-center h-24"> {/* Increased height */}
  {/* Logo */}
  <div className="flex items-center flex-shrink-0 pl-9"> {/* Prevents logo from shrinking */}
    <a href="/">
      <img 
        src={logo} 
        alt="BMC Logo" 
        className="h-[100px] w-auto max-w-[220px] object-contain" 
      />
    </a>
  </div>
  

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About</Link>
          <Link to="/services" className="text-gray-700 hover:text-blue-600 transition-colors">Services</Link>
          {/* <Link to="/doctors" className="text-gray-700 hover:text-blue-600 transition-colors">Doctors</Link> */}
          
          <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</Link>
          <Link to="/careers" className="text-gray-700 hover:text-blue-600 transition-colors">Careers</Link>
        </div>

        {/* Appointment Button */}
        <button 
        onClick={() => navigate("/contact")}
         className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors">
          Request an Appointment
        </button>
      </nav>
    </header>
  );
};

export default Header;
