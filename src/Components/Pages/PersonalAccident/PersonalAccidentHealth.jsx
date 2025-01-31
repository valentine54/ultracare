import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useInsuranceForm } from "../../Context/InsuranceFormContext";
import PersonalAccidentHeader from "../../PersonalAccidentHeader";
import ProgressStepper from "../../ProgressStepper";
import { FORM_STEPS } from "../../Constants/insuranceFormConfig";

const PersonalAccidentHealth = () => {
  const navigate = useNavigate();
  const { updateStepData, setStepCompleted, getStepData } = useInsuranceForm();
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(
    getStepData(FORM_STEPS.HEALTH_LIFESTYLE) || {
      medicalConditions: "",
      medications: [],
      tempMedication: "",
      tobacco: "",
      stressLevel: "",
      allergies: "",
      highRiskActivities: "",
      transportation: "",
      insuranceClaims: "",
      familyHistory: "",
      mentalHealth: "",
    }
  );

  const transportationOptions = [
    "Personal Vehicle",
    "Public Transportation",
    "Walking/Cycling",
    "Company Vehicle",
    "Motorcycle/Scooter",
    "Combination of Methods",
    "Other",
  ];

  const stressLevelOptions = [
    "Low - Rarely feel stressed",
    "Moderate - Occasional stress",
    "High - Frequent stress",
    "Very High - Constant stress",
  ];

  const highRiskActivities = [
    "Extreme Sports",
    "Scuba Diving",
    "Rock Climbing",
    "Skydiving",
    "Racing",
    "Aviation",
    "Other Adventure Sports",
  ];

  const validateField = (field, value) => {
    if (field === "medications") {
      return !value || !Array.isArray(value) || value.length === 0
        ? "Please add at least one medication"
        : null;
    }
    if (!value || value === "") return "This field is required";
    return null;
  };
  const handleMedicationInput = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (formData.tempMedication.trim()) {
        setFormData({
          ...formData,
          medications: [
            ...formData.medications,
            formData.tempMedication.trim(),
          ],
          tempMedication: "",
        });
      }
    }
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    const error = validateField(field, formData[field]);
    setErrors({ ...errors, [field]: error });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allFields = Object.keys(formData);
    const touchedFields = {};
    allFields.forEach((field) => (touchedFields[field] = true));
    setTouched(touchedFields);

    const formErrors = {};
    allFields.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) formErrors[field] = error;
    });
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        updateStepData(FORM_STEPS.HEALTH_LIFESTYLE, formData);
        setStepCompleted(FORM_STEPS.HEALTH_LIFESTYLE);
        navigate("/personal-accident/quote");
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  const inputClasses =
    "w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 text-sm";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";
  const selectClasses =
    "w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 text-sm appearance-none cursor-pointer bg-white";
  const errorClasses = "text-red-500 text-xs mt-1";

  return (
    <div className="min-h-screen bg-gray-50">
      <PersonalAccidentHeader />
      <ProgressStepper currentStep={2} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto p-6"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className={labelClasses}>
                Do you have any pre-existing medical conditions?*
              </label>
              <textarea
                required
                className={`${inputClasses} min-h-[80px] resize-none ${
                  touched.medicalConditions && errors.medicalConditions
                    ? "border-red-500"
                    : ""
                }`}
                value={formData.medicalConditions}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    medicalConditions: e.target.value,
                  })
                }
                onBlur={() => handleBlur("medicalConditions")}
                placeholder="Please specify any conditions..."
              />
              {touched.medicalConditions && errors.medicalConditions && (
                <p className={errorClasses}>{errors.medicalConditions}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className={labelClasses}>
                Do you engage in any high-risk activities?*
              </label>
              <select
                required
                className={`${selectClasses} ${
                  touched.highRiskActivities && errors.highRiskActivities
                    ? "border-red-500"
                    : ""
                }`}
                value={formData.highRiskActivities}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    highRiskActivities: e.target.value,
                  })
                }
                onBlur={() => handleBlur("highRiskActivities")}
              >
                <option value="">Select activities...</option>
                {highRiskActivities.map((activity) => (
                  <option key={activity} value={activity}>
                    {activity}
                  </option>
                ))}
              </select>
              {touched.highRiskActivities && errors.highRiskActivities && (
                <p className={errorClasses}>{errors.highRiskActivities}</p>
              )}
              <ChevronDown className="absolute right-3 top-[45px] text-gray-400 pointer-events-none" />
            </div>

            <div className="space-y-1 relative">
              <label className={labelClasses}>
                Please list medications you are currently taking*
              </label>
              <input
                type="text"
                className={`${inputClasses} ${
                  touched.medications && errors.medications
                    ? "border-red-500"
                    : ""
                }`}
                value={formData.tempMedication}
                onChange={(e) =>
                  setFormData({ ...formData, tempMedication: e.target.value })
                }
                onKeyDown={handleMedicationInput}
                onBlur={() => handleBlur("medications")}
                placeholder="Type and press Enter to add..."
              />
              {formData.medications.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.medications.map((med, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                    >
                      {med}
                      <button
                        type="button"
                        onClick={() => {
                          const newMeds = [...formData.medications];
                          newMeds.splice(idx, 1);
                          setFormData({ ...formData, medications: newMeds });
                        }}
                        className="ml-2 hover:text-blue-900"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
              {touched.medications && errors.medications && (
                <p className={errorClasses}>{errors.medications}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className={labelClasses}>
                What is your primary mode of transportation?*
              </label>
              <div className="relative">
                <select
                  required
                  className={`${selectClasses} ${
                    touched.transportation && errors.transportation
                      ? "border-red-500"
                      : ""
                  }`}
                  value={formData.transportation}
                  onChange={(e) =>
                    setFormData({ ...formData, transportation: e.target.value })
                  }
                  onBlur={() => handleBlur("transportation")}
                >
                  <option value="">Select transportation...</option>
                  {transportationOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              {touched.transportation && errors.transportation && (
                <p className={errorClasses}>{errors.transportation}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className={labelClasses}>
                Do you smoke or use tobacco products?*
              </label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    className="w-4 h-4 text-blue-500 focus:ring-blue-400"
                    checked={formData.tobacco === "yes"}
                    onChange={() =>
                      setFormData({ ...formData, tobacco: "yes" })
                    }
                    onBlur={() => handleBlur("tobacco")}
                    required
                  />
                  <span className="ml-2 text-sm">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    className="w-4 h-4 text-blue-500 focus:ring-blue-400"
                    checked={formData.tobacco === "no"}
                    onChange={() => setFormData({ ...formData, tobacco: "no" })}
                    onBlur={() => handleBlur("tobacco")}
                  />
                  <span className="ml-2 text-sm">No</span>
                </label>
              </div>
              {touched.tobacco && errors.tobacco && (
                <p className={errorClasses}>{errors.tobacco}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className={labelClasses}>
                What is your typical stress level?*
              </label>
              <div className="relative">
                <select
                  required
                  className={`${selectClasses} ${
                    touched.stressLevel && errors.stressLevel
                      ? "border-red-500"
                      : ""
                  }`}
                  value={formData.stressLevel}
                  onChange={(e) =>
                    setFormData({ ...formData, stressLevel: e.target.value })
                  }
                  onBlur={() => handleBlur("stressLevel")}
                >
                  <option value="">Select stress level...</option>
                  {stressLevelOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              {touched.stressLevel && errors.stressLevel && (
                <p className={errorClasses}>{errors.stressLevel}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className={labelClasses}>
                Do you have any allergies?*
              </label>
              <textarea
                required
                className={`${inputClasses} min-h-[80px] resize-none ${
                  touched.allergies && errors.allergies ? "border-red-500" : ""
                }`}
                value={formData.allergies}
                onChange={(e) =>
                  setFormData({ ...formData, allergies: e.target.value })
                }
                onBlur={() => handleBlur("allergies")}
                placeholder="Please specify any allergies..."
              />
              {touched.allergies && errors.allergies && (
                <p className={errorClasses}>{errors.allergies}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className={labelClasses}>
                Have you filed any claims in the past 5 years?*
              </label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    className="w-4 h-4 text-blue-500 focus:ring-blue-400"
                    checked={formData.insuranceClaims === "yes"}
                    onChange={() =>
                      setFormData({ ...formData, insuranceClaims: "yes" })
                    }
                    onBlur={() => handleBlur("insuranceClaims")}
                    required
                  />
                  <span className="ml-2 text-sm">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    className="w-4 h-4 text-blue-500 focus:ring-blue-400"
                    checked={formData.insuranceClaims === "no"}
                    onChange={() =>
                      setFormData({ ...formData, insuranceClaims: "no" })
                    }
                    onBlur={() => handleBlur("insuranceClaims")}
                  />
                  <span className="ml-2 text-sm">No</span>
                </label>
              </div>
              {touched.insuranceClaims && errors.insuranceClaims && (
                <p className={errorClasses}>{errors.insuranceClaims}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className={labelClasses}>
                Do you have a family history of serious health conditions?*
              </label>
              <textarea
                required
                className={`${inputClasses} min-h-[80px] resize-none ${
                  touched.familyHistory && errors.familyHistory
                    ? "border-red-500"
                    : ""
                }`}
                value={formData.familyHistory}
                onChange={(e) =>
                  setFormData({ ...formData, familyHistory: e.target.value })
                }
                onBlur={() => handleBlur("familyHistory")}
                placeholder="Please specify any conditions..."
              />
              {touched.familyHistory && errors.familyHistory && (
                <p className={errorClasses}>{errors.familyHistory}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className={labelClasses}>
                Have you ever been diagnosed with a mental health condition?*
              </label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    className="w-4 h-4 text-blue-500 focus:ring-blue-400"
                    checked={formData.mentalHealth === "yes"}
                    onChange={() =>
                      setFormData({ ...formData, mentalHealth: "yes" })
                    }
                    onBlur={() => handleBlur("mentalHealth")}
                    required
                  />
                  <span className="ml-2 text-sm">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    className="w-4 h-4 text-blue-500 focus:ring-blue-400"
                    checked={formData.mentalHealth === "no"}
                    onChange={() =>
                      setFormData({ ...formData, mentalHealth: "no" })
                    }
                    onBlur={() => handleBlur("mentalHealth")}
                  />
                  <span className="ml-2 text-sm">No</span>
                </label>
              </div>
              {touched.mentalHealth && errors.mentalHealth && (
                <p className={errorClasses}>{errors.mentalHealth}</p>
              )}
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => navigate("/personal-accident/basic-info")}
              className="px-6 py-2.5 bg-white text-blue-500 border border-blue-500 rounded hover:bg-blue-50 text-sm font-medium transition-colors"
              type="button"
            >
              Back
            </button>

            <button
              className="px-6 py-2.5 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm font-medium transition-colors"
              type="submit"
            >
              Proceed to Quote
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default PersonalAccidentHealth;