import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const steps = [
  {
    id: 1,
    name: "Basic Information",
    path: "/personal-accident/basic-information",
  },
  {
    id: 2,
    name: "Health & Lifestyle",
    path: "/personal-accident/health-lifestyle",
  },
  { id: 3, name: "Quote", path: "/personal-accident/quote" },
  { id: 4, name: "Payment", path: "/personal-accident/payment" },
];

const Stepper = ({ currentStep }) => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="relative flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <motion.div
              className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full 
                ${currentStep >= step.id ? "bg-blue-600" : "bg-gray-200"}`}
              initial={{ scale: 0.8 }}
              animate={{ scale: currentStep === step.id ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep > step.id ? (
                <CheckCircle className="w-6 h-6 text-white" />
              ) : (
                <span
                  className={`text-sm ${
                    currentStep >= step.id ? "text-white" : "text-gray-600"
                  }`}
                >
                  {step.id}
                </span>
              )}
            </motion.div>

            {index < steps.length - 1 && (
              <div className="flex-1 mx-4">
                <motion.div
                  className="h-1 rounded"
                  initial={{ backgroundColor: "#E5E7EB" }}
                  animate={{
                    backgroundColor:
                      currentStep > step.id ? "#2563EB" : "#E5E7EB",
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="relative flex items-center justify-between mt-2">
        {steps.map((step) => (
          <div key={`label-${step.id}`} className="flex-1 text-center">
            <motion.span
              className={`text-sm ${
                currentStep >= step.id
                  ? "text-blue-600 font-medium"
                  : "text-gray-500"
              }`}
              initial={{ opacity: 0.6 }}
              animate={{ opacity: currentStep >= step.id ? 1 : 0.6 }}
              transition={{ duration: 0.3 }}
            >
              {step.name}
            </motion.span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
