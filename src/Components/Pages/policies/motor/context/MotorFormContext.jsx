import React, { createContext, useContext, useState } from "react";

const MotorFormContext = createContext();

export const MotorFormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    // Category Selection
    category: "", // private, commercial, psv
    cover_type:"",

    // Basic Information
    company_name: "",
    companyLogo: null,
    title: "",
    description: "",

    // Premium Setup
    riskClasses: [], // Selected risk classes
    useCategory: [], // Fleet, Standard
    rate_ranges: [], // premium ranges
    selectedTonnageRanges: [], // predefined ranges

    // Excess Charges
    excessCharges: [],

    // Driver Requirements
    driverRequirements: {
      minimumAge: "",
      minimumExperience: "",
      loadings: {
        youngDriver: "",
        inexperienced: "",
      },
    },
  });

  const updateFormData = (updates) => {
    setFormData((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const addPremiumRange = (range) => {
    setFormData((prev) => ({
      ...prev,
      rate_ranges: [...prev.rate_ranges, { ...range, id: Date.now() }],
    }));
  };

  const removePremiumRange = (rangeId) => {
    setFormData((prev) => ({
      ...prev,
      rate_ranges: prev.rate_ranges.filter((r) => r.id !== rangeId),
    }));
  };

  const addExcessCharge = (charge) => {
    setFormData((prev) => ({
      ...prev,
      excessCharges: [...prev.excessCharges, { ...charge, id: Date.now() }],
    }));
  };

  const removeExcessCharge = (chargeId) => {
    setFormData((prev) => ({
      ...prev,
      excessCharges: prev.excessCharges.filter((c) => c.id !== chargeId),
    }));
  };

  const updateTonnageRanges = (ranges) => {
    setFormData((prev) => ({
      ...prev,
      selectedTonnageRanges: ranges,
    }));
  };

  const updateUseCategories = (categories) => {
    setFormData((prev) => ({
      ...prev,
      useCategory: categories,
    }));
  };

  return (
    <MotorFormContext.Provider
      value={{
        formData,
        updateFormData,
        addPremiumRange,
        removePremiumRange,
        addExcessCharge,
        removeExcessCharge,
        updateTonnageRanges,
        updateUseCategories,
      }}
    >
      {children}
    </MotorFormContext.Provider>
  );
};

export const useMotorForm = () => {
  const context = useContext(MotorFormContext);
  if (!context) {
    throw new Error("useMotorForm must be used within a MotorFormProvider");
  }
  return context;
};

export default MotorFormContext;
