import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../PersonalAccident/Header";
import Stepper from "../PersonalAccident/Stepper";
import { NavigationButtons } from "../PersonalAccident/NavigationButtons";
import { ChevronDown, X } from "lucide-react";

const transportModes = [
  "Personal Car",
  "Public Transport",
  "Motorcycle",
  "Bicycle",
  "Walking",
  "Ride-sharing Services",
  "Company Vehicle",
  "Other",
];

const stressLevels = [
  "Low - Rarely feel stressed",
  "Moderate - Occasional stress",
  "High - Frequently stressed",
  "Severe - Constant stress",
];

const healthConditions = [
  "Heart Disease",
  "Diabetes",
  "Cancer",
  "Respiratory Conditions",
  "Autoimmune Disorders",
  "None",
  "Other",
];

const HealthAndLifestyle = () => {
  const [formData, setFormData] = useState({
    medicalConditions: [],
    medications: [],
    tobaccoUse: "",
    stressLevel: "",
    allergies: [],
    highRiskActivities: [],
    transportation: "",
    customTransportation: "",
    pastClaims: "",
    familyHistory: "",
    customFamilyHistory: "",
    mentalHealth: "",
  });

  const [tempInput, setTempInput] = useState("");
  const [activeField, setActiveField] = useState("");

  const handleTagInput = (e, field) => {
    if (e.key === "Enter" && tempInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], tempInput.trim()],
      }));
      setTempInput("");
      e.preventDefault();
    }
  };

  const removeTag = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const TagInput = ({ label, name, required = false }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <label className="block text-gray-700 text-sm font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        value={tempInput}
        onChange={(e) => setTempInput(e.target.value)}
        onKeyDown={(e) => handleTagInput(e, name)}
        onFocus={() => setActiveField(name)}
        placeholder="Type and press Enter to add"
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 
        focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white"
      />
      <div className="flex flex-wrap gap-2 mt-2">
        <AnimatePresence>
          {formData[name].map((item, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="inline-flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
            >
              {item}
              <button
                onClick={() => removeTag(name, index)}
                className="ml-2 focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );

  const SelectField = ({ label, name, options, required = false }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <label className="block text-gray-700 text-sm font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          name={name}
          value={formData[name]}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, [name]: e.target.value }))
          }
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 
          focus:ring-2 focus:ring-blue-200 transition-all duration-200 appearance-none bg-white"
        >
          <option value="">Please select...</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      {formData[name] === "Other" && (
        <input
          type="text"
          value={
            formData[`custom${name.charAt(0).toUpperCase() + name.slice(1)}`]
          }
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              [`custom${name.charAt(0).toUpperCase() + name.slice(1)}`]:
                e.target.value,
            }))
          }
          placeholder="Please specify"
          className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 
          focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white"
        />
      )}
    </motion.div>
  );

  const RadioGroup = ({ label, name, options, required = false }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <label className="block text-gray-700 text-sm font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex gap-6">
        {options.map((option) => (
          <label key={option} className="flex items-center">
            <input
              type="radio"
              name={name}
              value={option}
              checked={formData[name] === option}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, [name]: e.target.value }))
              }
              className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-2">{option}</span>
          </label>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <Stepper currentStep={2} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-lg shadow-lg p-6 md:p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Health and Lifestyle
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <TagInput
              label="Do you have any pre-existing medical conditions?"
              name="medicalConditions"
              required
            />

            <TagInput
              label="Do you engage in any high-risk activities?"
              name="highRiskActivities"
              required
            />

            <TagInput
              label="Please list any medications you are currently taking"
              name="medications"
              required
            />

            <SelectField
              label="What is your primary mode of transportation?"
              name="transportation"
              options={transportModes}
              required
            />

            <SelectField
              label="Do you smoke or use tobacco products?"
              name="tobaccoUse"
              options={[
                "Yes - Regular",
                "Yes - Occasional",
                "Former User",
                "Never Used",
              ]}
              required
            />

            <RadioGroup
              label="Have you filed any claims in the past 5 years?"
              name="pastClaims"
              options={["Yes", "No"]}
              required
            />

            <SelectField
              label="What is your typical stress level?"
              name="stressLevel"
              options={stressLevels}
              required
            />

            <SelectField
              label="Do you have a family history of serious health conditions?"
              name="familyHistory"
              options={healthConditions}
              required
            />

            <TagInput
              label="Do you have any allergies?"
              name="allergies"
              required
            />

            <RadioGroup
              label="Have you ever been diagnosed with a mental health condition?"
              name="mentalHealth"
              options={["Yes", "No"]}
              required
            />
          </div>

          <NavigationButtons step={2} />
        </motion.div>
      </div>
    </div>
  );
};

export default HealthAndLifestyle;
