import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useMotorForm } from "../../context/MotorFormContext";

const BenefitsStep = () => {
  const { formData, updateFormData } = useMotorForm();
  const [newBenefit, setNewBenefit] = useState("");

  const handleAddBenefit = (e) => {
    e.preventDefault();
    if (newBenefit.trim()) {
      const currentBenefits = formData.benefits || [];
      updateFormData({
        benefits: [
          ...currentBenefits,
          {
            id: Date.now(),
            text: newBenefit.trim(),
          },
        ],
      });
      setNewBenefit("");
    }
  };

  const handleDeleteBenefit = (benefitId) => {
    const updatedBenefits = (formData.benefits || []).filter(
      (benefit) => benefit.id !== benefitId
    );
    updateFormData({ benefits: updatedBenefits });
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleAddBenefit}
        className="bg-white rounded-lg shadow p-6"
      >
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            Add Policy Benefits
          </h3>
        </div>

        <div className="flex gap-4">
          <input
            type="text"
            value={newBenefit}
            onChange={(e) => setNewBenefit(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a benefit..."
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add Benefit
          </button>
        </div>
      </form>

      {/* Benefits List */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-2">
          {(formData.benefits || []).map((benefit) => (
            <div
              key={benefit.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <span>{benefit.text}</span>
              <button
                onClick={() => handleDeleteBenefit(benefit.id)}
                className="text-red-500 hover:text-red-600"
              >
                <X size={16} />
              </button>
            </div>
          ))}
          {(!formData.benefits || formData.benefits.length === 0) && (
            <p className="text-center text-gray-500 py-4">
              No benefits added yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BenefitsStep;
