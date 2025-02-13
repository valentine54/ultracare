import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Heart, Shield, Car } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const PolicyCategories = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();

  const categories = [
    {
      name: "Health",
      icon: Heart,
      path: "/policies/health",
      description: "Health insurance policies",
    },
    {
      name: "Personal",
      icon: Shield,
      path: "/policies/personal",
      description: "Personal accident policies",
    },
    {
      name: "Motor",
      icon: Car,
      path: "/policies/motor",
      description: "Motor vehicle insurance",
    },
  ];

  return (
    <div className="py-1">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
          location.pathname.includes("/policies")
            ? "bg-blue-50 text-blue-600"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <div className="flex items-center space-x-3">
          <Shield className="h-5 w-5" />
          <span>Policies</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-2 pl-11">
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = location.pathname === category.path;

                return (
                  <Link
                    key={category.name}
                    to={category.path}
                    className={`flex items-center space-x-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                      isActive
                        ? "bg-blue-500 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{category.name}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PolicyCategories;
