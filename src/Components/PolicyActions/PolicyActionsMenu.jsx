import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MoreVertical,
  Eye,
  FileEdit,
  Download,
  Share2,
  Trash2,
  Ban,
} from "lucide-react";

const PolicyActionsMenu = ({ policy, onShare }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleAction = (action) => {
    switch (action) {
      case "view":
        // Navigate to policy details
        console.log("Viewing policy:", policy.name);
        break;
      case "edit":
        // Navigate to edit policy
        console.log("Editing policy:", policy.name);
        break;
      case "download":
        // Download policy document
        console.log("Downloading policy:", policy.name);
        break;
      case "share":
        onShare(policy);
        break;
      case "suspend":
        // Suspend policy
        console.log("Suspending policy:", policy.name);
        break;
      case "delete":
        // Delete policy
        console.log("Deleting policy:", policy.name);
        break;
      default:
        break;
    }
    setShowMenu(false);
  };

  const actions = [
    { icon: Eye, label: "View Details", action: "view" },
    { icon: FileEdit, label: "Edit Policy", action: "edit" },
    { icon: Download, label: "Download PDF", action: "download" },
    { icon: Share2, label: "Share Policy", action: "share" },
    { icon: Ban, label: "Suspend Policy", action: "suspend" },
    {
      icon: Trash2,
      label: "Delete Policy",
      action: "delete",
      className: "text-red-500 hover:bg-red-50",
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <MoreVertical className="w-5 h-5 text-gray-400" />
      </button>

      <AnimatePresence>
        {showMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMenu(false)}
              className="fixed inset-0 z-40"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg z-50 overflow-hidden"
            >
              <div className="py-2">
                {actions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => handleAction(action.action)}
                      className={`w-full px-4 py-2 text-sm text-left flex items-center space-x-2 hover:bg-gray-50 transition-colors ${
                        action.className || "text-gray-700"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{action.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PolicyActionsMenu;
