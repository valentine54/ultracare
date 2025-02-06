import React from "react";
import { motion } from "framer-motion";

const StatCard = ({ label, value, icon: Icon, color = "blue", delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white p-6 rounded-xl shadow-sm"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-gray-500">{label}</h3>
        <div
          className={`w-10 h-10 rounded-full bg-${color}-100 flex items-center justify-center`}
        >
          <Icon className={`text-${color}-500`} size={20} />
        </div>
      </div>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </motion.div>
  );
};

export default StatCard;
