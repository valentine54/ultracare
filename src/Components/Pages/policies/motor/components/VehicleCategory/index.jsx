import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useMotorForm } from "../../context/MotorFormContext";
import DashboardLayout from "../../../../../common/layout/DashboardLayout";

const VehicleCategory = () => {
  const navigate = useNavigate();
  const { updateFormData } = useMotorForm();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      id: "Private",
      title: "Private",
      icon: "🚗",
      description: "Personal use vehicles",
    },
    {
      id: "Commercial",
      title: "Commercial",
      icon: "🚛",
      description: "Business use vehicles",
    },
    {
      id: "Public_Service",
      title: "Public Service",
      icon: "🚌",
      description: "Transport service vehicles",
    },
  ];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.id);
    updateFormData({ vehicle_type: category.id });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleContinue = () => {
    if (selectedCategory) {
      navigate("/policies/motor/form");
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-3xl font-semibold text-blue-500 mb-4">
              Create Policy For{" "}
              {selectedCategory
                ? categories.find((c) => c.id === selectedCategory)?.title
                : ""}{" "}
              Motor Insurance
            </h1>
            <h2 className="text-xl text-gray-700">
              Choose a motor to create new policy
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category)}
                className={`p-8 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center min-h-[180px] group ${
                  selectedCategory === category.id
                    ? "border-blue-500 bg-blue-50 shadow-lg transform scale-105"
                    : "border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md"
                }`}
              >
                <span className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-200">
                  {category.icon}
                </span>
                <span className="text-lg font-medium text-gray-900 mb-2">
                  {category.title}
                </span>
                <span className="text-sm text-gray-500">
                  {category.description}
                </span>
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center mt-8 max-w-4xl mx-auto">
            <button
              onClick={handleBack}
              className="px-8 py-3 rounded-xl border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 transition-all duration-200"
            >
              Back
            </button>
            <button
              onClick={handleContinue}
              disabled={!selectedCategory}
              className={`
                px-8 py-3 rounded-xl text-white font-medium transition-all duration-200
                ${
                  selectedCategory
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-gray-300 cursor-not-allowed"
                }
              `}
            >
              Save & Continue
            </button>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default VehicleCategory;
