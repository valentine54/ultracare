import React from "react";
import { motion } from "framer-motion";

const CategoryCard = ({ category, onSelect }) => {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden"
    >
      <div className="p-6 flex flex-col items-center text-center space-y-4">
        <div className="text-4xl bg-blue-50 p-4 rounded-full">
          {category.icon}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {category.title}
          </h3>
          <p className="text-gray-600 text-sm">{category.description}</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 inline-flex items-center px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
        >
          Select Category
        </motion.button>
      </div>

      {/* accent bar */}
      <div className="h-1 w-full bg-blue-500" />
    </motion.div>
  );
};

export default CategoryCard;
