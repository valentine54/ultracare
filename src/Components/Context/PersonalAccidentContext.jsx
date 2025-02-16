import React, { createContext, useContext, useState, useCallback } from "react";

const PersonalAccidentContext = createContext();

export function PersonalAccidentProvider({ children }) {
  const [formData, setFormData] = useState({
    basicInfo: {},
    healthInfo: {},
    quoteInfo: {},
    paymentInfo: {},
  });

  const updateFormData = useCallback((section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  }, []);

  return (
    <PersonalAccidentContext.Provider value={{ formData, updateFormData }}>
      {children}
    </PersonalAccidentContext.Provider>
  );
}

export const usePersonalAccident = () => {
  const context = useContext(PersonalAccidentContext);
  if (!context) {
    throw new Error(
      "usePersonalAccident must be used within a PersonalAccidentProvider"
    );
  }
  return context;
};
