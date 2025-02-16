import React from "react";
import { motion } from "framer-motion";
import { X, Edit2 } from "lucide-react";

const BenefitTag = ({ benefit, onDelete, onEdit }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={`
        flex items-center gap-2 px-3 py-2 rounded-lg text-sm
        ${
          benefit.isActive
            ? "bg-blue-50 text-blue-700 border border-blue-200"
            : "bg-gray-50 text-gray-700 border border-gray-200"
        }
      `}
    >
      <span>{benefit.text}</span>
      <div className="flex items-center gap-1">
        <button
          onClick={onEdit}
          className="p-1 hover:bg-blue-100 rounded-md transition-colors"
        >
          <Edit2 size={14} className="text-blue-500" />
        </button>
        <button
          onClick={onDelete}
          className="p-1 hover:bg-red-100 rounded-md transition-colors"
        >
          <X size={14} className="text-red-500" />
        </button>
      </div>
    </motion.div>
  );
};

export default BenefitTag;
