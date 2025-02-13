import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInputField from "../../PhoneInputField";
import { useAlertModal } from "../../AlertModal";
import axios from "axios";

const CarInsurance = () => {
  const navigate = useNavigate();
  const { showModal } = useAlertModal();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!selectedCategory) {
      newErrors.category = "Please select a vehicle category";
    }

    if (!phoneNumber || phoneNumber.length < 10) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Routes - Types
      const routes = {
        Private: "/get-quote",
        Commercial: "/get-quote-commercial",
        PSV: "/get-quote-psv",
      };

      navigate(routes[selectedCategory], {
        state: {
          vehicle_type: selectedCategory,
          phoneNumber: phoneNumber,
        },
      });
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-center text-3xl font-semibold text-blue-500 mb-8">
          Get A Quote For Car Insurance
        </h1>

        <p className="text-gray-600 text-center mb-12 text-base max-w-2xl mx-auto">
          Get insured instantly with Insure! Your digital insurance certificate
          arrives immediately, providing comprehensive coverage at the click of
          a button.
        </p>

        <div className="mb-12">
          <h2 className="text-2xl font-medium text-gray-900 mb-6">
            Select Your Vehicle Category
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                id: "Private",
                icon: "🚗",
                label: "Private",
                description: "Personal use vehicles",
              },
              {
                id: "Commercial",
                icon: "🚛",
                label: "Commercial",
                description: "Business use vehicles",
              },
              {
                id: "PSV",
                icon: "🚌",
                label: "Public Service",
                description: "Transport service vehicles",
              },
            ].map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-8 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center min-h-[200px] group ${
                  selectedCategory === category.id
                    ? "border-blue-500 bg-blue-50 shadow-lg transform scale-105"
                    : "border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md"
                }`}
              >
                <span className="text-7xl mb-4 group-hover:scale-110 transition-transform duration-200">
                  {category.icon}
                </span>
                <span className="text-xl font-medium text-gray-900 mb-2">
                  {category.label}
                </span>
                <span className="text-sm text-gray-500">
                  {category.description}
                </span>
              </button>
            ))}
          </div>
          {errors.category && (
            <p className="mt-4 text-sm text-red-600 text-center">
              {errors.category}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-medium text-gray-900 mb-6">
            Enter Your Mobile Number
          </h2>

          <div className="space-y-4">
            <PhoneInputField
              value={phoneNumber}
              onChange={setPhoneNumber}
              error={errors.phone}
            />

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium text-base"
              >
                Get Started
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarInsurance;


