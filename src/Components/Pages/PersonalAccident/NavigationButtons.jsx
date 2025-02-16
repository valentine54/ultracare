import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

export const PrimaryButton = ({ children, onClick, className = "" }) => (
  <motion.button
    variants={buttonVariants}
    initial="initial"
    whileHover="hover"
    whileTap="tap"
    className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg 
    shadow-lg transition-colors duration-200 ${className}`}
    onClick={onClick}
  >
    {children}
  </motion.button>
);

export const SecondaryButton = ({ children, onClick, className = "" }) => (
  <motion.button
    variants={buttonVariants}
    initial="initial"
    whileHover="hover"
    whileTap="tap"
    className={`bg-white hover:bg-gray-50 text-blue-500 font-semibold py-3 px-8 
    rounded-lg border-2 border-blue-500 transition-colors duration-200 ${className}`}
    onClick={onClick}
  >
    {children}
  </motion.button>
);

export const NavigationButtons = ({ step }) => {
  const navigate = useNavigate();

  const getButtonConfig = () => {
    switch (step) {
      case 1:
        return {
          container: "flex justify-center mt-8",
          buttons: [
            <PrimaryButton
              onClick={() => navigate("/personal-accident/health-lifestyle")}
              className="w-48"
            >
              Save & Continue
            </PrimaryButton>,
          ],
        };
      case 2:
        return {
          container: "flex justify-between mt-8",
          buttons: [
            <SecondaryButton
              onClick={() => navigate("/personal-accident/basic-information")}
            >
              Back
            </SecondaryButton>,
            <PrimaryButton onClick={() => navigate("/personal-accident/quote")}>
              Proceed to Quote
            </PrimaryButton>,
          ],
        };
      case 3:
        return {
          container: "flex justify-between mt-8",
          buttons: [
            <SecondaryButton
              onClick={() => navigate("/personal-accident/health-lifestyle")}
            >
              Back
            </SecondaryButton>,
            <PrimaryButton
              onClick={() => navigate("/personal-accident/payment")}
            >
              Proceed to Payment
            </PrimaryButton>,
          ],
        };
      default:
        return {
          container: "",
          buttons: [],
        };
    }
  };

  const { container, buttons } = getButtonConfig();

  return <div className={container}>{buttons}</div>;
};
