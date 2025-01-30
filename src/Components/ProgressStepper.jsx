import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useInsuranceForm } from "./Context/InsuranceFormContext";
import { STEP_CONFIG } from "./Constants/insuranceFormConfig";

const ProgressStepper = ({ currentStep }) => {
  const navigate = useNavigate();
  const { isStepCompleted, canAccessStep } = useInsuranceForm();

  const handleStepClick = (stepPath, stepId) => {
    if (canAccessStep(stepId)) {
      navigate(stepPath);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-between relative">
        {/* Dotted Connection Lines */}
        <div
          className="absolute top-4 left-0 w-full"
          style={{
            height: "1.5px",
            background:
              "repeating-linear-gradient(to right, #D1D5DB 0, #D1D5DB 4px, transparent 4px, transparent 8px)",
          }}
        />

        {/* Steps */}
        {STEP_CONFIG.map((step) => (
          <div
            key={step.id}
            className="flex flex-col items-center relative z-10"
          >
            <motion.div
              onClick={() => handleStepClick(step.path, step.id)}
              className={`w-8 h-8 rounded-full flex items-center justify-center
    ${
      step.id === currentStep
        ? "bg-blue-500 text-white"
        : step.id < currentStep
        ? "bg-blue-500 text-white"
        : "bg-white text-gray-500"
    }
    ${step.id <= currentStep ? "ring-2 ring-blue-500" : "ring-2 ring-gray-300"}
    cursor-pointer transition-all duration-300`}
              whileHover={step.id <= currentStep ? { scale: 1.1 } : {}}
            >
              <span className="text-sm font-medium">{step.id}</span>
            </motion.div>
            <span
              className={`mt-2 text-sm whitespace-nowrap
                ${
                  step.id === currentStep
                    ? "text-blue-500 font-medium"
                    : step.id < currentStep
                    ? "text-blue-500"
                    : "text-gray-500"
                }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressStepper;
