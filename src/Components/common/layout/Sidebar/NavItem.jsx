import React from "react";
import { motion } from "framer-motion";

const NavItem = ({ icon: Icon, label, active, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.02, x: 4 }}
    whileTap={{ scale: 0.98 }}
    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors duration-200
      ${active ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}
    onClick={onClick}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
    {active && (
      <motion.div
        layoutId="activeIndicator"
        className="absolute left-0 w-1 h-8 bg-blue-600 rounded-r"
      />
    )}
  </motion.div>
);

export default NavItem;
