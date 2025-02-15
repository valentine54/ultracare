import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

const Toast = ({ message, type = "success", onClose }) => {
  // Define toast styles for different types
  const toastStyles = {
    success: {
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      bgColor: "bg-green-100 border border-green-300",
      textColor: "text-green-800",
    },
    error: {
      icon: <XCircle className="w-5 h-5 text-red-500" />,
      bgColor: "bg-red-100 border border-red-300",
      textColor: "text-red-800",
    },
    warning: {
      icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
      bgColor: "bg-yellow-100 border border-yellow-300",
      textColor: "text-yellow-800",
    },
    info: {
      icon: <Info className="w-5 h-5 text-blue-500" />,
      bgColor: "bg-blue-100 border border-blue-300",
      textColor: "text-blue-800",
    },
  };

  const { icon, bgColor, textColor } = toastStyles[type] || toastStyles.success; // Default to success

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className={`fixed bottom-4 right-4 ${bgColor} rounded-lg shadow-lg p-4 flex items-center space-x-3 z-50`}
    >
      {icon}
      <span className={`text-sm ${textColor}`}>{message}</span>
      <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full">
        <X className="w-4 h-4 text-gray-500" />
      </button>
    </motion.div>
  );
};

export default Toast;
