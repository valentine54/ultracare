import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const Stepper = ({ steps, currentStep }) => {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="relative flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{
                  scale: currentStep >= index + 1 ? 1 : 0.8,
                  backgroundColor:
                    currentStep >= index + 1 ? "#3B82F6" : "#E5E7EB",
                }}
                className={`w-10 h-10 rounded-full flex items-center justify-center
                  ${currentStep >= index + 1 ? "bg-blue-500" : "bg-gray-200"}`}
              >
                {currentStep > index + 1 ? (
                  <Check className="w-6 h-6 text-white" />
                ) : (
                  <span
                    className={`text-sm ${
                      currentStep >= index + 1 ? "text-white" : "text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </span>
                )}
              </motion.div>
              <div className="absolute -bottom-6 w-max text-center">
                <span
                  className={`text-sm ${
                    currentStep >= index + 1
                      ? "text-blue-500 font-medium"
                      : "text-gray-500"
                  }`}
                >
                  {step.title}
                </span>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="w-20 h-[2px] mx-1">
                <div
                  className="h-full bg-gray-200"
                  style={{
                    background: `linear-gradient(to right, 
                      ${currentStep > index + 1 ? "#3B82F6" : "#E5E7EB"} 50%, 
                      ${currentStep > index + 1 ? "#3B82F6" : "#E5E7EB"} 50%
                    )`,
                  }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
