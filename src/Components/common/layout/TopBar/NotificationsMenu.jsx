import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell } from "lucide-react";

const NotificationMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const notifications = [
    {
      title: "New Policy Request",
      message: "John Doe requested a new policy",
      time: "5m ago",
    },
    {
      title: "Claim Update",
      message: "Claim #1234 has been processed",
      time: "1h ago",
    },
    {
      title: "Payment Received",
      message: "Payment received for Policy #5678",
      time: "2h ago",
    },
  ];

  return (
    <div className="relative">
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-gray-100"
      >
        <Bell size={20} />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
          {notifications.length}
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-50"
          >
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-semibold">Notifications</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                >
                  <div className="font-medium">{notification.title}</div>
                  <div className="text-sm text-gray-500">
                    {notification.message}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {notification.time}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="p-4 text-center border-t border-gray-100">
              <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                View All Notifications
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationMenu;
