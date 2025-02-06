import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Settings, LogOut, ChevronDown } from "lucide-react";

const ProfileMenu = ({ userName, userEmail }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: User, label: "My Profile", action: () => {} },
    { icon: Settings, label: "Settings", action: () => {} },
    { icon: LogOut, label: "Sign Out", action: () => {} },
  ];

  return (
    <div className="relative">
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white font-medium">
          {userName.charAt(0)}
        </div>
        <div className="hidden md:block text-left">
          <div className="font-medium">{userName}</div>
          <div className="text-sm text-gray-500">{userEmail}</div>
        </div>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
          >
            {menuItems.map((item, index) => (
              <motion.button
                key={index}
                whileHover={{ x: 4 }}
                onClick={item.action}
                className="flex items-center space-x-3 w-full px-4 py-2 text-left hover:bg-gray-50"
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileMenu;
