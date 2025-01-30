import React from "react";
import { motion } from "framer-motion";

const PersonalAccidentHeader = ({ title }) => {
  return (
    <header className="w-full py-6 px-4 md:px-8 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <motion.h1
          className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {title || "Get A Quote For Personal Accident Insurance"}
        </motion.h1>

        <div className="mt-4 w-24 h-1 bg-blue-500 mx-auto rounded-full opacity-75" />

        <motion.div
          className="mt-6 text-center text-gray-600 text-sm md:text-base max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="leading-relaxed">
            Protect yourself and your loved ones with our comprehensive personal
            accident coverage. Get your personalized quote in minutes.
          </p>
        </motion.div>
      </motion.div>
    </header>
  );
};

export default PersonalAccidentHeader;
