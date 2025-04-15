import React from "react";
import { Phone, Clock, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import logo from "../assets/logo.jpg";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube, FaTiktok, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const linkVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-[#0047AB] text-blue-100"
    >
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-12 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">

          {/* Brand Info */}
          <div className="flex flex-col items-center lg:items-start space-y-5">
            <a href="/">
              <img src={logo} alt="BMC Logo" className="h-16 md:h-20 lg:h-[100px] w-auto" />
            </a>
            <h3 className="text-lg md:text-xl font-bold text-white text-center lg:text-left">BOSONGO HOSPITAL</h3>
            <motion.a
              variants={linkVariants}
              whileHover="hover"
              whileTap="tap"
              href="/contact"
              className="bg-white text-blue-900 px-5 py-2 md:px-6 md:py-3 rounded-lg font-medium text-sm md:text-base"
            >
              Request an Appointment
            </motion.a>
            <div className="flex gap-3 mt-4">
              {[
                { icon: FaFacebookF, link: "https://www.facebook.com/bosongohospital", color: "hover:bg-blue-600" },
                { icon: FaInstagram, link: "https://www.instagram.com/bosongohospital", color: "hover:bg-pink-600" },
                { icon: FaYoutube, link: "https://youtube.com/Bosongohospital", color: "hover:bg-red-600" },
                { icon: FaTiktok, link: "https://tiktok.com/@bosongohospital", color: "hover:bg-gray-800" },
                { icon: FaXTwitter, link: "https://x.com/Bosongohospital", color: "hover:bg-gray-800" }
              ].map(({ icon: Icon, link, color }, index) => (
                <motion.a
                  key={index}
                  href={link}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-9 h-9 flex items-center justify-center border-2 border-white rounded-full transition duration-300 ${color}`}
                >
                  <Icon className="text-white text-lg" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center lg:items-center">
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <nav className="grid grid-cols-2 gap-x-10 gap-y-3 text-center lg:text-left">
              {[
                { name: "Home", url: "/" },
                { name: "About", url: "/about" },
                { name: "Services", url: "/services" },
                { name: "Contact Us", url: "/contact" },
                { name: "Careers", url: "/careers" },
              ].map(({ name, url }) => (
                <motion.a
                  key={name}
                  variants={linkVariants}
                  whileHover="hover"
                  href={url}
                  className="hover:text-white transition text-sm md:text-base"
                >
                  {name}
                </motion.a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center lg:items-center">
            <h3 className="text-lg font-semibold text-white mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="flex-shrink-0 mt-0.5" />
                <span className="text-sm md:text-base">Bosongo Hospital, Kisii, Kenya</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="flex-shrink-0" />
                <span className="text-sm md:text-base">011-196-4576</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={20} className="flex-shrink-0 mt-0.5" />
                <motion.a
                  variants={linkVariants}
                  whileHover="hover"
                  href="mailto:bosongomedical@yahoo.com"
                  className="hover:text-white text-sm md:text-base"
                >
                  bosongomedical@yahoo.com
                </motion.a>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={20} className="flex-shrink-0" />
                <span className="text-sm md:text-base">Mon-Sun: 24 Hours</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright */}
      <div className="bg-[#0047AB] py-4 md:py-6">
  <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[#007BFF] opacity-20 text-xs md:text-sm">
    © {new Date().getFullYear()} Insur. All rights reserved.
  </div>
</div>

    </motion.footer>
  );
};

export default Footer;
