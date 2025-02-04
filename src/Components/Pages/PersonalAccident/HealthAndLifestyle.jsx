import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../PersonalAccident/Header";
import Stepper from "../PersonalAccident/Stepper";
import { ChevronDown, X } from "lucide-react";
import { usePersonalAccident } from "../../Context/PersonalAccidentContext";

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
  const navigate = useNavigate();
  const { formData, updateFormData } = usePersonalAccident();

  // Initialize form with saved data or defaults
  const [form, setForm] = useState({
    medicalConditions: formData.healthInfo?.medicalConditions || [],
    medications: formData.healthInfo?.medications || [],
    tobaccoUse: formData.healthInfo?.tobaccoUse || "",
    stressLevel: formData.healthInfo?.stressLevel || "",
    allergies: formData.healthInfo?.allergies || [],
    highRiskActivities: formData.healthInfo?.highRiskActivities || [],
    transportation: formData.healthInfo?.transportation || "",
    customTransportation: formData.healthInfo?.customTransportation || "",
    pastClaims: formData.healthInfo?.pastClaims || "",
    familyHistory: formData.healthInfo?.familyHistory || "",
    customFamilyHistory: formData.healthInfo?.customFamilyHistory || "",
    mentalHealth: formData.healthInfo?.mentalHealth || "",
  });

  const [errors, setErrors] = useState({});
  const [tempInput, setTempInput] = useState("");
  const [activeField, setActiveField] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTagInput = (e, fieldName) => {
    if (e.key === "Enter" && tempInput.trim()) {
      e.preventDefault();
      setForm((prev) => ({
        ...prev,
        [fieldName]: [...prev[fieldName], tempInput.trim()],
      }));
      setTempInput("");
    }
  };

  const removeTag = (fieldName, index) => {
    setForm((prev) => ({
      ...prev,
      [fieldName]: prev[fieldName].filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Check array fields have at least one item
    if (form.medicalConditions.length === 0)
      newErrors.medicalConditions = "Required";
    if (form.medications.length === 0) newErrors.medications = "Required";
    if (form.allergies.length === 0) newErrors.allergies = "Required";
    if (form.highRiskActivities.length === 0)
      newErrors.highRiskActivities = "Required";

    // Check regular fields
    if (!form.transportation) newErrors.transportation = "Required";
    if (!form.tobaccoUse) newErrors.tobaccoUse = "Required";
    if (!form.pastClaims) newErrors.pastClaims = "Required";
    if (!form.stressLevel) newErrors.stressLevel = "Required";
    if (!form.familyHistory) newErrors.familyHistory = "Required";
    if (!form.mentalHealth) newErrors.mentalHealth = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      updateFormData("healthInfo", form);
      navigate("/personal-accident/quote");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <Stepper currentStep={2} />

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-6 md:p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Health and Lifestyle
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            {/* Medical Conditions */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Pre-existing medical conditions{" "}
                <span className="text-red-500">*</span>
              </label>
              <div>
                <input
                  type="text"
                  value={activeField === "medicalConditions" ? tempInput : ""}
                  onChange={(e) => setTempInput(e.target.value)}
                  onKeyDown={(e) => handleTagInput(e, "medicalConditions")}
                  onFocus={() => setActiveField("medicalConditions")}
                  placeholder="Type and press Enter to add"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.medicalConditions
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.medicalConditions.map((condition, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                      {condition}
                      <button
                        type="button"
                        onClick={() => removeTag("medicalConditions", index)}
                        className="ml-2 focus:outline-none"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              {errors.medicalConditions && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.medicalConditions}
                </p>
              )}
            </div>

            {/* Medications */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Current medications <span className="text-red-500">*</span>
              </label>
              <div>
                <input
                  type="text"
                  value={activeField === "medications" ? tempInput : ""}
                  onChange={(e) => setTempInput(e.target.value)}
                  onKeyDown={(e) => handleTagInput(e, "medications")}
                  onFocus={() => setActiveField("medications")}
                  placeholder="Type and press Enter to add"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.medications ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.medications.map((medication, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                      {medication}
                      <button
                        type="button"
                        onClick={() => removeTag("medications", index)}
                        className="ml-2 focus:outline-none"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              {errors.medications && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.medications}
                </p>
              )}
            </div>

            {/* Transportation */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Primary mode of transportation{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="transportation"
                  value={form.transportation}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.transportation ? "border-red-500" : "border-gray-300"
                  } appearance-none`}
                >
                  <option value="">Select mode of transportation</option>
                  {transportModes.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              {form.transportation === "Other" && (
                <input
                  name="customTransportation"
                  type="text"
                  value={form.customTransportation}
                  onChange={handleChange}
                  placeholder="Please specify"
                  className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-300"
                />
              )}
              {errors.transportation && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.transportation}
                </p>
              )}
            </div>

            {/* Tobacco Use */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Tobacco use <span className="text-red-500">*</span>
              </label>
              <select
                name="tobaccoUse"
                value={form.tobaccoUse}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.tobaccoUse ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select tobacco use status</option>
                <option value="Never Used">Never Used</option>
                <option value="Former User">Former User</option>
                <option value="Occasional User">Occasional User</option>
                <option value="Regular User">Regular User</option>
              </select>
              {errors.tobaccoUse && (
                <p className="mt-1 text-sm text-red-500">{errors.tobaccoUse}</p>
              )}
            </div>

            {/* Past Claims */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Filed claims in past 5 years{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                {["Yes", "No"].map((option) => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="pastClaims"
                      value={option}
                      checked={form.pastClaims === option}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                ))}
              </div>
              {errors.pastClaims && (
                <p className="mt-1 text-sm text-red-500">{errors.pastClaims}</p>
              )}
            </div>

            {/* Stress Level */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Typical stress level <span className="text-red-500">*</span>
              </label>
              <select
                name="stressLevel"
                value={form.stressLevel}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.stressLevel ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select stress level</option>
                {stressLevels.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.stressLevel && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.stressLevel}
                </p>
              )}
            </div>

            {/* Family History */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Family history of health conditions{" "}
                <span className="text-red-500">*</span>
              </label>
              <select
                name="familyHistory"
                value={form.familyHistory}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.familyHistory ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select condition</option>
                {healthConditions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {form.familyHistory === "Other" && (
                <input
                  name="customFamilyHistory"
                  type="text"
                  value={form.customFamilyHistory}
                  onChange={handleChange}
                  placeholder="Please specify"
                  className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-300"
                />
              )}
              {errors.familyHistory && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.familyHistory}
                </p>
              )}
            </div>

            {/* High Risk Activities */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                High-risk activities <span className="text-red-500">*</span>
              </label>
              <div>
                <input
                  type="text"
                  value={activeField === "highRiskActivities" ? tempInput : ""}
                  onChange={(e) => setTempInput(e.target.value)}
                  onKeyDown={(e) => handleTagInput(e, "highRiskActivities")}
                  onFocus={() => setActiveField("highRiskActivities")}
                  placeholder="Type and press Enter to add"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.highRiskActivities
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.highRiskActivities.map((activity, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                      {activity}
                      <button
                        type="button"
                        onClick={() => removeTag("highRiskActivities", index)}
                        className="ml-2 focus:outline-none"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              {errors.highRiskActivities && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.highRiskActivities}
                </p>
              )}
            </div>

            {/* Allergies */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Allergies <span className="text-red-500">*</span>
              </label>
              <div>
                <input
                  type="text"
                  value={activeField === "allergies" ? tempInput : ""}
                  onChange={(e) => setTempInput(e.target.value)}
                  onKeyDown={(e) => handleTagInput(e, "allergies")}
                  onFocus={() => setActiveField("allergies")}
                  placeholder="Type and press Enter to add"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.allergies ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.allergies.map((allergy, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                      {allergy}
                      <button
                        type="button"
                        onClick={() => removeTag("allergies", index)}
                        className="ml-2 focus:outline-none"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              {errors.allergies && (
                <p className="mt-1 text-sm text-red-500">{errors.allergies}</p>
              )}
            </div>

            {/* Mental Health */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Mental health diagnosis <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                {["Yes", "No"].map((option) => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="mentalHealth"
                      value={option}
                      checked={form.mentalHealth === option}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                ))}
              </div>
              {errors.mentalHealth && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.mentalHealth}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={() => navigate("/personal-accident/basic-information")}
              className="bg-white text-blue-500 font-semibold py-3 px-8 rounded-lg border-2 border-blue-500 
              hover:bg-gray-50 transition-colors duration-200"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-600 
              transition-colors duration-200"
            >
              Proceed to Quote
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HealthAndLifestyle;
