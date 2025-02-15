import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import DashboardLayout from "../../../common/layout/DashboardLayout";
import { useMotorForm } from "./context/MotorFormContext";

import BasicInformationStep from "./components/BasicInformation";
import CoverTypeStep from "./components/CoverType"; // New import
import PremiumSetupStep from "./components/PremiumSetup";
import ExcessChargesStep from "./components/ExcessCharges";
import AgeExperienceStep from "./components/AgeExperience";

const steps = [
  { id: 1, name: "Basic Information" },
  { id: 2, name: "Cover Type" }, // New step
  { id: 3, name: "Premium Setup" },
  { id: 4, name: "Excess Charges" },
  { id: 5, name: "Age & Experience" },
];

const MotorPolicyForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const { formData } = useMotorForm();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInformationStep />;
      case 2:
        return <CoverTypeStep />; // New case
      case 3:
        return <PremiumSetupStep />;
      case 4:
        return <ExcessChargesStep />;
      case 5:
        return <AgeExperienceStep />;
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      console.log("Final form data:", formData);
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      navigate("/policies/motor");
    } else {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Create{" "}
            {formData.category
              ? `${
                  formData.category.charAt(0).toUpperCase() +
                  formData.category.slice(1)
                } `
              : ""}
            Motor Insurance Policy
          </h1>
        </div>

        {/* Stepper */}
        <div className="mb-8 bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 sm:p-6">
            <div className="relative flex flex-wrap sm:flex-nowrap justify-between">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`
                        w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center
                        text-sm sm:text-base font-medium transition-all duration-300
                        ${
                          currentStep >= step.id
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 text-gray-500"
                        }
                      `}
                    >
                      {step.id}
                    </div>
                    <span
                      className={`
                        mt-2 text-xs sm:text-sm font-medium text-center
                        ${
                          currentStep >= step.id
                            ? "text-blue-500"
                            : "text-gray-500"
                        }
                      `}
                    >
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden sm:block w-full sm:w-auto flex-grow mx-2 sm:mx-4 my-4 sm:my-0">
                      <div className="relative top-4 h-0.5 bg-gray-200">
                        <div
                          className="absolute inset-0 bg-blue-500 transition-all duration-300"
                          style={{
                            width: currentStep > step.id ? "100%" : "0%",
                          }}
                        />
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="mb-8"
        >
          {renderStep()}
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between mt-6 bg-white p-4 rounded-lg shadow-sm sticky bottom-6">
          <button
            onClick={handleBack}
            className="px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
          >
            {currentStep === steps.length ? "Submit Policy" : "Continue"}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MotorPolicyForm;
