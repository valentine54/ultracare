import React from "react";
import { motion } from "framer-motion";
import CoverTypeCard from "./CoverTypeCard";
import { useMotorForm } from "../../context/MotorFormContext";

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
    description: "Third-party coverage plus protection against fire and theft",
  },
];

const CoverSelection = () => {
  const { formData, updateFormData } = useMotorForm();

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Policy Name
        </label>
        <input
          type="text"
          value={formData.policyName || ""}
          onChange={(e) => updateFormData({ policyName: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter policy name"
        />
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Select Cover Type
        </label>
        <div className="space-y-3">
          {coverTypes.map((coverType) => (
            <CoverTypeCard
              key={coverType.id}
              coverType={coverType}
              isSelected={formData.coverType === coverType.id}
              onSelect={() => updateFormData({ coverType: coverType.id })}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoverSelection;
