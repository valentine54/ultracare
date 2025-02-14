import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const CoverTypeCard = ({ coverType, isSelected, onSelect }) => {
  return (
    <motion.div
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.99 }}
      onClick={onSelect}
      className={`
        relative flex items-center p-4 border rounded-lg cursor-pointer
        transition-all duration-200
        ${
          isSelected
            ? "border-blue-500 bg-blue-50"
            : "border-gray-200 hover:bg-gray-50"
        }
      `}
    >
      <div className="flex-1">
        <h3
          className={`font-medium ${
            isSelected ? "text-blue-700" : "text-gray-900"
          }`}
        >
          {coverType.title}
        </h3>
        <p className="mt-1 text-sm text-gray-500">{coverType.description}</p>
      </div>

      <div
        className={`
        ml-4 w-5 h-5 border-2 rounded-full flex items-center justify-center
        ${isSelected ? "border-blue-500 bg-blue-500" : "border-gray-300"}
      `}
      >
        {isSelected && <Check size={12} className="text-white" />}
      </div>
    </motion.div>
  );
};

export default CoverTypeCard;
