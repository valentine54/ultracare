import React from "react";
import { motion } from "framer-motion";
import { useMotorForm } from "../../context/MotorFormContext";
import CoverTypeCard from "../CoverSelection/CoverTypeCard";

const CoverDetailsStep = () => {
  const { formData, updateFormData } = useMotorForm();

  const coverTypes = [
    {
      id: "comprehensive",
      title: "Comprehensive Insurance Cover",
      description: "Full coverage for your vehicle and third-party damages",
    },
    {
      id: "thirdParty",
      title: "Third-Party Insurance Cover",
      description: "Basic coverage for third-party damages only",
    },
    {
      id: "thirdPartyFireTheft",
      title: "Third-Party Fire and Theft Insurance Cover",
      description:
        "Third-party coverage plus protection against fire and theft",
    },
  ];

  const handlePolicyNameChange = (e) => {
    updateFormData({ policyName: e.target.value });
  };

  const handleCoverTypeSelect = (coverTypeId) => {
    updateFormData({ coverType: coverTypeId });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Policy Name Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Policy Name
        </label>
        <input
          type="text"
          value={formData.policyName || ""}
          onChange={handlePolicyNameChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter policy name"
        />
      </div>

      {/* Cover Type Selection */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Select Cover Type
        </label>
        {coverTypes.map((coverType) => (
          <CoverTypeCard
            key={coverType.id}
            coverType={coverType}
            isSelected={formData.coverType === coverType.id}
            onSelect={() => handleCoverTypeSelect(coverType.id)}
          />
        ))}
      </div>

      {/* Summary Section */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-900 mb-4">
          Selection Summary
        </h4>
        <div className="space-y-2 text-sm text-gray-600">
          <p>Policy Name: {formData.policyName || "Not set"}</p>
          <p>
            Cover Type:{" "}
            {coverTypes.find((c) => c.id === formData.coverType)?.title ||
              "Not selected"}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CoverDetailsStep;
