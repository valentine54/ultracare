import React, { useState } from "react";
import { motion } from "framer-motion";

const CustomerTabs = ({ newCount = 34, oldCount = 146 }) => {
  const [activeTab, setActiveTab] = useState("new");

  return (
    <div className="border-b border-gray-200">
      <div className="flex space-x-8">
        <button
          onClick={() => setActiveTab("new")}
          className={`py-4 px-1 relative ${
            activeTab === "new"
              ? "text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          New Customers({newCount})
          {activeTab === "new" && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab("old")}
          className={`py-4 px-1 relative ${
            activeTab === "old"
              ? "text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Old Customers({oldCount})
          {activeTab === "old" && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default CustomerTabs;
