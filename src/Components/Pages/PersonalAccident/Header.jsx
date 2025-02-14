import React from "react";
import { motion } from "framer-motion";

const Header = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="w-full bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-lg mb-8"
  >
    <h1 className="text-2xl md:text-4xl font-semibold text-blue-500 text-center">
      Get A Quote For Personal Accident Insurance
    </h1>
  </motion.div>
);

export default Header;
