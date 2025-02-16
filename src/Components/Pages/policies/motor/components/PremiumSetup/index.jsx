import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Settings, AlertCircle, X } from "lucide-react";
import { useMotorForm } from "../../context/MotorFormContext";
import PremiumSetupModal from "./PremiumSetupModal";

const PremiumSetup = ({handleNext}) => {
  const { formData, updateFormData } = useMotorForm();
  const [showModal, setShowModal] = useState(false);

  const handleDeleteRange = (rangeId) => {
    const updatedRanges = formData.rate_ranges.filter(
      (range) => range.id !== rangeId
    );
    updateFormData({ rate_ranges: updatedRanges });
  };

  const handleAddPremiumRange = (newRateRange) => {
    updateFormData({
      rate_ranges: [...formData.rate_ranges, newRateRange],
    });

  };

  const handleSubmit = () => {
    if (formData.rate_ranges?.length>0) {
      
      handleNext();
    }
  }

  return (
    <div className="space-y-6">
      {/* Premium Configuration Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-medium">Premium Configuration</h3>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus size={16} />
            <span>Add Premium</span>
          </button>
        </div>

        {formData.rate_ranges?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Risk Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value Range (KSH)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rate (%)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Min Premium
                  </th>
                  {formData.category === "commercial" && (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tonnage Ranges
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Use Categories
                      </th>
                    </>
                  )}
                  {formData.category === "psv" && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Capacity Ranges
                    </th>
                  )}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {formData.rate_ranges.map((range) => (
                  <motion.tr
                    key={range.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">
                        {range.risk_type}
                        {range.riskClassSubTypeName && (
                          <span className="text-gray-500">
                            {" - "}
                            {range.riskClassSubTypeName}
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {Number(range.min_value).toLocaleString()} -{" "}
                      {Number(range.max_value).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {range.rate}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      KSH {Number(range.min_premium).toLocaleString()}
                    </td>
                    {formData.category === "commercial" && (
                      <>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {range.selectedRanges.map((tonnage) => (
                              <span
                                key={tonnage}
                                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                              >
                                {tonnage}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {range.useCategories.map((category) => (
                              <span
                                key={category}
                                className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full"
                              >
                                {category}
                              </span>
                            ))}
                          </div>
                        </td>
                      </>
                    )}
                    {formData.category === "psv" && (
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {range.selectedRanges.map((capacity) => (
                            <span
                              key={capacity}
                              className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                            >
                              {capacity}
                            </span>
                          ))}
                        </div>
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDeleteRange(range.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center font-medium py-12 text-gray-500">
            No premium ranges configured yet. Click the button above to add your
            first range.
          </div>
        )}
      </div>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
        >
          Continue
        </button>

      {/* Premium Setup Modal */}
      <PremiumSetupModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddPremiumRange}
      />
    </div>
  );
};

export default PremiumSetup;
