import React from "react";
import { Phone, Clock, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import logo from "../assets/logo.jpg";
import {  FaFacebookF, 
  FaLinkedinIn, 

  FaInstagram, FaYoutube, FaTiktok, FaXTwitter } from "react-icons/fa6";

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
      className="bg-gradient-to-r bg-[#0047AB]
       text-blue-100"
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Brand Info (Left) */}
          <div className="flex flex-col items-start space-y-4">
          <a href="/">
          <img src={logo} alt="BMC Logo" className="h-[100px] w-auto max-w-[220px]" /> {/* Adjust size as needed */}
          </a>
            <h3 className="text-xl font-bold text-white">BOSONGO HOSPITAL</h3>
            {/* <p className="text-gray-200"><i>Committed to quality healthcare with compassion.</i></p> */}
            <motion.a
              variants={linkVariants}
              whileHover="hover"
              whileTap="tap"
              href="/contact"
              className="bg-white text-blue-900 px-6 py-3 rounded-lg font-medium"
            >
              Request an Appointment
            </motion.a>
            <div className="flex gap-3 mt-4">
  {[
    { icon: FaFacebookF, link: "https://www.facebook.com/bosongohospital", color: "hover:bg-blue-600" },
    // { icon: FaLinkedinIn, link: "#", color: "hover:bg-blue-700" },
    { icon: FaInstagram, link: "https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.instagram.com%2Fbosongohospital%3Ffbclid%3DIwZXh0bgNhZW0CMTAAAR1I2RWxgJXkogSWcJcKS7eisKcF0LLoQoYhwhNVypnDlSviu4frf0T0LmI_aem_jzDjhdAvlFnnPYi6-FyOYQ&h=AT0Lauqi0Z0ZGVSYKZCfUWudLFi0e2S9J33V_yMhgC5_2wjAhuEQ3eonSxRFzA51v8W5qdxhOUzvIfA6TVdvSLJN9p8pk6CFDE74FgqV5Fa_tNJHN8-UMUpjD81qYqLjmWt3", color: "hover:bg-pink-600" },
    { icon: FaYoutube, link: "https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutube.com%2F%40Bosongohospittal%3Ffbclid%3DIwZXh0bgNhZW0CMTAAAR1I2RWxgJXkogSWcJcKS7eisKcF0L", color: "hover:bg-red-600" },
    { icon: FaTiktok, link: "https://l.facebook.com/l.php?u=https%3A%2F%2Ftiktok.com%2F%40bosongohospital%3Ffbclid%3DIwZXh0bgNhZW0CMTAAAR14K4z0IgJSdd1F7-UN3E9p30kqkkxbz6XK3yHG7soeueQBOKZLWL3_oDA_aem_HTwH1FqIlYCBjvDRHohgdg&h=AT2iMJ53EpVBG5XWKfqHF_g2xA-W8Oqcr1MfiAPE1jBF3rYGwtKgxHi1XMGK6rfF_IATB8i6hIFrW0igj5xjxRo19eI-NONFGkBKpoGUV07ZJVWbS4sPOsiOD8WlH9Ri9fA5", color: "hover:bg-gray-800" },
    { icon: FaXTwitter, link: "https://x.com/Bosongohospital", color: "hover:bg-gray-800" }
  ].map(({ icon: Icon, link, color }, index) => (
    <motion.a
      key={index}
      href={link}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`w-8 h-8 flex items-center justify-center border-2 border-white rounded-full transition duration-300 ${color}`}
    >
      <Icon className="text-white text-lg" />
    </motion.a>
  ))}
</div>

          </div>

          {/* Quick Links (Center) */}
        
<div className="flex flex-col items-center">
  <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
  <nav className="grid grid-cols-1 gap-x-12 gap-y-3 text-center">
    {[
      { name: "Home", url: "/" },
      { name: "About", url: "/about" },
      { name: "Services", url: "/services" },
      { name: "Contact Us", url: "/contact" },
      { name: "Careers", url: "/careers" }
    ].map(({ name, url }) => (
      <motion.a
        key={name}
        variants={linkVariants}
        whileHover="hover"
        href={url}
        className="hover:text-white transition"
      >
        {name}
      </motion.a>
    ))}
  </nav>
</div>


          {/* Contact (Right) */}
          <div className="lg:text-left">
            <h3 className="text-lg font-semibold text-white  text-center mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="flex  items-center gap-3">
             
             
                <MapPin size={18} className="flex-shrink-0" />
                <span>Bosongo Hospital, Kisii, Kenya</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="flex-shrink-0" />
                <span>
                011-196-4576</span>
              </div>
              <div className="flex  items-center gap-3">
                <Mail size={18} className="flex-shrink-0" />
                <motion.a
                  variants={linkVariants}
                  whileHover="hover"
                  href="mailto:
bosongomedical@yahoo.com"
                  className="hover:text-white"
                >
                  
                  bosongomedical@yahoo.com
                </motion.a>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock size={18} className="flex-shrink-0" />
                <span>Mon-Mon: 24 Hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="from-slate-800 to-blue-900 py-6">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center hidden text-gray-400 text-sm">
          © {new Date().getFullYear()} BOSONGO Hospital. All rights reserved.
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
