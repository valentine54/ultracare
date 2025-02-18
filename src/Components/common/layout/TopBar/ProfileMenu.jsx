import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Settings, LogOut, ChevronDown } from "lucide-react";
import { useDispatch } from "react-redux";

import { ServerLogout } from "../../../helper/insurances";

const ProfileMenu = ({ userName, userEmail }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const menuItems = [
    { icon: User, label: "My Profile", action: () => {} },
    { icon: Settings, label: "Settings", action: () => {} },
    {
      icon: LogOut,
      label: "Sign Out",
      action: () => { ServerLogout(dispatch);},
      className: "text-red-600",
    },
  ];

  return (
    <div className="relative">
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white font-medium">
              {userName.charAt(0)}
            </div>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div className="hidden md:block text-left">
            <div className="font-medium text-gray-900">{userName}</div>
            <div className="text-sm text-gray-500">{userEmail}</div>
          </div>
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50"
          >
            <div className="px-4 py-2 border-b border-gray-100 md:hidden">
              <div className="font-medium text-gray-900">{userName}</div>
              <div className="text-sm text-gray-500">{userEmail}</div>
            </div>

            {menuItems.map((item, index) => (
              <motion.button
                key={index}
                onClick={item.action}
                whileHover={{ x: 4 }}
                className={`flex items-center space-x-3 w-full px-4 py-2 text-left hover:bg-gray-50 ${
                  item.className || "text-gray-700"
                }`}
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
