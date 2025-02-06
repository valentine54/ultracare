import React from "react";
import { motion } from "framer-motion";
import { ChartPie, Users, FileText, Settings, Bell, X } from "lucide-react";
import NavItem from "./NavItem";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const menuItems = [
    { icon: ChartPie, label: "Dashboard", active: true },
    { icon: FileText, label: "All Policies" },
    { icon: Users, label: "Customers" },
    { icon: Bell, label: "Claims & Payment" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: isOpen ? 0 : -250 }}
      className="fixed lg:static w-64 h-full bg-white shadow-lg z-50"
    >
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
          <span className="text-xl font-bold">Insurē</span>
        </div>
        <button onClick={() => setIsOpen(false)} className="lg:hidden">
          <X size={20} />
        </button>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item, index) => (
          <NavItem key={index} {...item} onClick={() => {}} />
        ))}
      </nav>
    </motion.div>
  );
};

export default Sidebar;
