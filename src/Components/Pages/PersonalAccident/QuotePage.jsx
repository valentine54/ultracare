import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "../PersonalAccident/Header";
import Stepper from "../PersonalAccident/Stepper";
import { Shield, AlertTriangle } from "lucide-react";
import { usePersonalAccident } from "../../Context/PersonalAccidentContext";

const QuotePage = () => {
  const navigate = useNavigate();
  const { formData } = usePersonalAccident();
  const { basicInfo = {}, healthInfo = {} } = formData;

  const displayValue = (value, customValueKey) => {
    if (value === undefined || value === null || value === "") return "None";
    if (Array.isArray(value)) {
      return value.length > 0 ? value.join(", ") : "None";
    }
    if (value === "Other" && customValueKey && basicInfo[customValueKey]) {
      return basicInfo[customValueKey];
    }
    return value;
  };

  // Prepare user data with all form fields
  const userData = {
    name: basicInfo.fullName || "None",
    premium: {
      yearly: 3379,
      monthly: 320,
    },
    details: {
      "Date of Birth": displayValue(basicInfo.dateOfBirth),
      Gender: displayValue(basicInfo.gender, "customGender"),
      Occupation: displayValue(basicInfo.occupation, "customOccupation"),
      "Contact Number": displayValue(basicInfo.contactNumber),
      "Desired Coverage Amount": displayValue(basicInfo.desiredCoverage),
      "Type of Coverage": displayValue(
        basicInfo.typeOfCoverage,
        "customCoverage"
      ),
      "Travel Coverage Required": displayValue(basicInfo.travelCoverage),
      "Existing Coverage": displayValue(basicInfo.existingCoverage),
      "Pre-existing Medical Conditions": displayValue(
        healthInfo.medicalConditions
      ),
      "Current Medications": displayValue(healthInfo.medications),
      "High-Risk Activities": displayValue(healthInfo.highRiskActivities),
      "Claims Filed in Past 5 Years": displayValue(healthInfo.pastClaims),
      "Family History": displayValue(
        healthInfo.familyHistory,
        "customFamilyHistory"
      ),
      "Primary Mode of Transportation": displayValue(
        healthInfo.transportation,
        "customTransportation"
      ),
      "Tobacco Use": displayValue(healthInfo.tobaccoUse),
      "Stress Level": displayValue(healthInfo.stressLevel),
      Allergies: displayValue(healthInfo.allergies),
      "Mental Health Condition": displayValue(healthInfo.mentalHealth),
    },
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <Stepper currentStep={3} />

        <div className="space-y-6">
          {/* Premium Summary Card */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-6 flex items-start space-x-4">
              <div className="bg-blue-900 p-4 rounded-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>

              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {userData.name}
                    </h2>
                    <p className="text-2xl font-semibold text-blue-600">
                      ${userData.premium.yearly}/Year or $
                      {userData.premium.monthly}/Month
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600">
                      Paying{" "}
                      <span className="font-semibold">
                        ${userData.premium.monthly}
                      </span>{" "}
                      per month which is more expensive.
                    </p>
                    <p className="text-gray-500 text-sm">
                      Insurance tax is included
                    </p>
                    <p className="text-blue-500 text-sm">
                      Price is automatically generated
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Details Summary Card */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="bg-blue-900 p-4">
              <h3 className="text-xl font-semibold text-white">Summary</h3>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(userData.details).map(([key, value], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-gray-100 pb-4"
                >
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    {key}:
                  </h4>
                  <p className="text-gray-900 font-medium">{value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Disclaimer */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="p-4 bg-blue-50 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-blue-600" />
              <p className="text-blue-600 text-sm">
                This quote is based on the information provided and is subject
                to verification. Coverage details and exclusions will be
                outlined in your policy document.
              </p>
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <motion.button
              onClick={() => navigate("/personal-accident/health-lifestyle")}
              className="bg-white text-blue-500 font-semibold py-3 px-8 rounded-lg
              border-2 border-blue-500 hover:bg-gray-50 transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Back
            </motion.button>

            <motion.button
              onClick={() => navigate("/personal-accident/payment")}
              className="bg-blue-500 text-white font-semibold py-3 px-8 rounded-lg
              hover:bg-blue-600 transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Proceed to Payment
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotePage;
