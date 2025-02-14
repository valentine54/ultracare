import React from "react";
import { Phone, Clock, Mail, MapPin } from "lucide-react";
import Logo from "../assets/logo.png";
import { motion } from "framer-motion";

const Footer = () => {
  const linkVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  const socialVariants = {
    hover: { y: -5, transition: { duration: 0.3 } },
  };

  // Get the current year
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-r from-blue-900 to-blue-900 text-blue-100"
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & CTA */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col items-start">
            <motion.img
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              src={Logo}
              alt="Insure Logo"
              className="h-12 w-auto mb-6"
            />
            <motion.a
              variants={linkVariants}
              whileHover="hover"
              whileTap="tap"
              href="#"
              className="bg-white text-blue-900 px-6 py-2 rounded-full font-semibold tracking-wide hover:bg-opacity-90 transition"
            >
              Get a Quote
            </motion.a>
          </div>

          {/* Links & Contact */}
          <div className="sm:col-span-2 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-200 tracking-wider">
                Quick Links
              </h3>
              <nav className="flex flex-col space-y-2">
                <motion.a
                  variants={linkVariants}
                  whileHover="hover"
                  href="#"
                  className="hover:text-white transition"
                >
                  About
                </motion.a>
                <motion.a
                  variants={linkVariants}
                  whileHover="hover"
                  href="#"
                  className="hover:text-white transition"
                >
                  Team
                </motion.a>
                <motion.a
                  variants={linkVariants}
                  whileHover="hover"
                  href="#"
                  className="hover:text-white transition"
                >
                  Pricing
                </motion.a>
                <motion.a
                  variants={linkVariants}
                  whileHover="hover"
                  href="#"
                  className="hover:text-white transition"
                >
                  FAQs
                </motion.a>
                <motion.a
                  variants={linkVariants}
                  whileHover="hover"
                  href="#"
                  className="hover:text-white transition"
                >
                  Blog
                </motion.a>
                <motion.a
                  variants={linkVariants}
                  whileHover="hover"
                  href="/Blogs"
                  className="hover:text-white transition"
                >
                  Contact
                </motion.a>
              </nav>
            </div>

            {/* Contact */}
            <div className="space-y-5">
              <h3 className="text-lg font-semibold text-blue-200 tracking-wider">
                Contact
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <Mail size={20} className="flex-shrink-0" />
                  <motion.a
                    variants={linkVariants}
                    whileHover="hover"
                    href="mailto:info@insure.com"
                    className="hover:text-white"
                  >
                    info@insure.com
                  </motion.a>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone size={20} className="flex-shrink-0" />
                  <span>844-433-7646</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin size={20} className="flex-shrink-0 mt-0.5" />
                  <span>123 Insurance St, Insuranceville, PA 12345</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Clock size={20} className="flex-shrink-0" />
                  <span>Mon-Fri: 9am-5pm</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social & Newsletter */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-16">
            <div className="flex space-x-4">
              <motion.a
                variants={socialVariants}
                whileHover="hover"
                href="#"
                aria-label="Facebook"
              >
                <svg
                  className="h-7 w-7 fill-current text-blue-400 hover:text-white"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </motion.a>
              <motion.a
                variants={socialVariants}
                whileHover="hover"
                href="#"
                aria-label="Twitter"
              >
                <svg
                  className="h-7 w-7 fill-current text-blue-400 hover:text-white"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124-4.09-.193-7.715-2.157-10.141-5.126-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
                </svg>
              </motion.a>
              <motion.a
                variants={socialVariants}
                whileHover="hover"
                href="#"
                aria-label="LinkedIn"
              >
                <svg
                  className="h-7 w-7 fill-current text-blue-400 hover:text-white"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </motion.a>
            </div>
            <form>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="mt-1 flex rounded-full shadow-sm">
                <div className="relative flex items-stretch flex-grow focus-within:z-10">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full rounded-l-full sm:text-sm border-gray-300 px-4 py-2"
                    placeholder="Enter your email"
                  />
                </div>
                <button
                  type="submit"
                  className="relative inline-flex items-center space-x-2 px-4 py-2 border border-transparent text-sm font-medium rounded-r-full text-white bg-blue-600 hover:bg-blue-700"
                >
                  <span>Subscribe</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-600">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              <motion.a
                variants={linkVariants}
                whileHover="hover"
                href="#"
                className="text-gray-300 hover:text-white"
              >
                Privacy
              </motion.a>
              <motion.a
                variants={linkVariants}
                whileHover="hover"
                href="#"
                className="text-gray-300 hover:text-white"
              >
                Terms
              </motion.a>
            </div>
            <p className="mt-8 text-sm text-gray-400 md:mt-0 md:order-1">
              &copy; {currentYear} Insure. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
