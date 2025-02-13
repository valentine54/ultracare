// components/Modals/SharePolicyModal.jsx
import React, { useState } from "react";
import {
  X,
  Link as LinkIcon,
  Mail,
  Copy,
  MessageCircle,
  Phone,
  Share2,
  QrCode,
  MessageSquare,
  Download,
  FileText,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import Toast from "../Toast/Toast";

const SharePolicyModal = ({ isOpen, onClose, policy }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [activeTab, setActiveTab] = useState("share"); // 'share' or 'download'

  const handleToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const shareOptions = [
    {
      icon: LinkIcon,
      label: "Copy Link",
      description: "Copy policy link to clipboard",
      action: async () => {
        try {
          await navigator.clipboard.writeText(window.location.href);
          handleToast("Link copied to clipboard!");
        } catch (err) {
          handleToast("Failed to copy link");
        }
      },
    },
    {
      icon: Mail,
      label: "Email",
      description: "Share via email",
      action: () => {
        const subject = "Insurance Policy Details";
        const body = `Check out this insurance policy: ${window.location.href}`;
        window.location.href = `mailto:?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(body)}`;
      },
    },
    {
      icon: MessageSquare,
      label: "WhatsApp",
      description: "Share via WhatsApp",
      action: () => {
        const message = `Check out this insurance policy: ${window.location.href}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`);
      },
    },
    {
      icon: QrCode,
      label: "QR Code",
      description: "Generate QR code",
      action: () => setShowQR(true),
    },
  ];

  const downloadOptions = [
    {
      icon: FileText,
      label: "PDF Format",
      description: "Download as PDF document",
      action: () => {
        handleToast("Downloading PDF...");
        // Implement PDF download
      },
    },
    {
      icon: Download,
      label: "Policy Document",
      description: "Original policy document",
      action: () => {
        handleToast("Downloading document...");
        // Implement document download
      },
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-xl bg-white rounded-2xl shadow-xl z-50"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Share Policy
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {policy ? policy.name : "Share this policy with others"}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Tabs */}
              <div className="flex space-x-4 mb-6 border-b">
                <button
                  onClick={() => setActiveTab("share")}
                  className={`pb-3 px-2 text-sm font-medium transition-colors relative ${
                    activeTab === "share"
                      ? "text-blue-500"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Share Options
                  {activeTab === "share" && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                    />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("download")}
                  className={`pb-3 px-2 text-sm font-medium transition-colors relative ${
                    activeTab === "download"
                      ? "text-blue-500"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Download Options
                  {activeTab === "download" && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                    />
                  )}
                </button>
              </div>

              {/* Content */}
              {!showQR ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(activeTab === "share" ? shareOptions : downloadOptions).map(
                    (option, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={option.action}
                        className="flex flex-col items-center p-6 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100 group"
                      >
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-blue-100 transition-colors">
                          <option.icon className="w-6 h-6 text-blue-500" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {option.label}
                        </span>
                        <span className="text-xs text-gray-500 mt-1">
                          {option.description}
                        </span>
                      </motion.button>
                    )
                  )}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="flex flex-col items-center space-y-4 p-6"
                >
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <QRCodeSVG
                      value={window.location.href}
                      size={200}
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    Scan this QR code to view the policy
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowQR(false)}
                    className="text-blue-500 hover:text-blue-600 font-medium text-sm"
                  >
                    Back to sharing options
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}

      <AnimatePresence>
        {showToast && (
          <Toast message={toastMessage} onClose={() => setShowToast(false)} />
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};

export default SharePolicyModal;
