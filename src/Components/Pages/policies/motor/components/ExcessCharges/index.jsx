import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Shield } from "lucide-react";
import { useMotorForm } from "../../context/MotorFormContext";
import { MotorInsuranceDetails } from "../../../../../helper/insurances";

const LiabilityModal = ({ isOpen, onClose, onSelect }) => {
  const [selectedLimit, setSelectedLimit] = useState(null);
  const [customLimit, setCustomLimit] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const liabilityLimits = [
    "Third Party Property Damage",
    "Third Party Bodily Injury",
    "Third Party Death",
    "Own Damage",
    "Theft",
    "Fire",
    "Windscreen Damage",
    "Entertainment Equipment",
    "Natural Calamities",
    "Political Violence & Terrorism",
    "Passenger Liability",
    "Personal Accident Cover",
    "Medical Expenses",
    "Other",
  ];

  const handleSelect = () => {
    if (showCustomInput && customLimit) {
      onSelect(customLimit);
    } else if (selectedLimit && selectedLimit !== "Other") {
      onSelect(selectedLimit);
    }
    onClose();
    setSelectedLimit(null);
    setCustomLimit("");
    setShowCustomInput(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Select Limit of Liability</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {liabilityLimits.map((limit) => (
            <button
              key={limit}
              onClick={() => {
                setSelectedLimit(limit);
                setShowCustomInput(limit === "Other");
              }}
              className={`p-3 rounded-lg border transition-all duration-200 text-sm
                ${
                  selectedLimit === limit
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-blue-200 hover:bg-gray-50"
                }`}
            >
              {limit}
            </button>
          ))}
        </div>

        {showCustomInput && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Custom Limit
            </label>
            <input
              type="text"
              value={customLimit}
              onChange={(e) => setCustomLimit(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter custom limit"
            />
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSelect}
            disabled={!selectedLimit || (showCustomInput && !customLimit)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Select
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const ExcessChargesStep = ({ handleNext }) => {
  const { formData, updateFormData } = useMotorForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [newCharge, setNewCharge] = useState({
    limit_of_liability: "",
    excess_rate: "",
    min_price: "",
    description: "",
  });

  const handleAddCharge = (e) => {
    console.log(formData);
    e.preventDefault();
    if (newCharge.limit_of_liability && newCharge.excess_rate) {
      const updatedCharges = [
        ...(formData.excess_charges || []),
        { ...newCharge, id: Date.now() },
      ];
      updateFormData({ excess_charges: updatedCharges });
      setNewCharge({
        limit_of_liability: "",
        excess_rate: "",
        min_price: "",
        description: "",
      });
    }
  };

  const handleDeleteCharge = (chargeId) => {
    const updatedCharges = formData.excess_charges.filter(
      (charge) => charge.id !== chargeId
    );
    updateFormData({ excess_charges: updatedCharges });
  };

  // console.log(formData);
  const handleSubmit = async () => {
    let newErrors = {};

    // Check for missing fields
    if (!formData.title) {
      newErrors.title = "Policy title is required.";
    }

    // Update state with errors
    setErrors(newErrors);

    // Stop execution if there are validation errors
    if (Object.keys(newErrors).length > 0) {
      return false;
    }

    // Prepare form data for submission

    const formData2 = {
      cover_type: formData.cover_type,
      vehicle_type: formData.vehicle_type,

      risk_type: formData.risk_type || "Motor_Private",

      // Map rate_ranges properly
      rate_ranges: formData.rate_ranges.map((rate) => ({
        min_value: rate.min_value,

        max_value: rate.max_value,
        rate: rate.rate,
        min_premium: rate.min_premium,
        risk_type: rate.risk_type,
      })),

      // Map excess_charges properly
      excess_charges: formData.excess_charges.map((charge) => ({
        description: charge.description,
        excess_rate: charge.excess_rate,
        limit_of_liability: charge.limit_of_liability,
        min_price: charge.min_price,
      })),
    };

    try {
      const res = await MotorInsuranceDetails(formData2);
      if (formData.excess_charges?.length > 0&&res.status === 201) {
        handleNext();
      } else {
        alert("jaza kila kitu")
      }
      console.log("Data successfully sent to the backend!");
      return res;
    } catch (error) {
      console.error("Error sending data:", error);
      return false;
    }
  };

  return (
    <div className="space-y-4">
      {/* Add New Excess Charge */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-medium">Add Excess Charge</h3>
        </div>

        <form onSubmit={handleAddCharge} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Limit of Liability
              </label>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full p-2 border border-gray-300 rounded-lg text-left hover:border-blue-300 focus:ring-2 focus:ring-blue-500"
              >
                {newCharge.limit_of_liability || "Select limit of liability"}
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rate (%)
              </label>
              <input
                type="number"
                value={newCharge.excess_rate}
                onChange={(e) =>
                  setNewCharge({
                    ...newCharge,
                    excess_rate: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter rate"
                step="0.01"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Premium (KSH)
              </label>
              <input
                type="number"
                value={newCharge.min_price}
                onChange={(e) =>
                  setNewCharge({
                    ...newCharge,
                    min_price: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter minimum premium"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input
                type="text"
                value={newCharge.description}
                onChange={(e) =>
                  setNewCharge({
                    ...newCharge,
                    description: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter description"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <Plus size={16} />
              <span>Add Excess Charge</span>
            </button>
          </div>
        </form>
      </div>

      {/* Excess Charges List */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-medium mb-4">Configured Excess Charges</h3>
        {formData.excess_charges?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Limit of Liability
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Rate
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Min Premium
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Description
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {formData.excess_charges.map((charge) => (
                  <motion.tr
                    key={charge.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      {charge.limit_of_liability}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {charge.excess_rate}%
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      KSH {Number(charge.min_price).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">{charge.description}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleDeleteCharge(charge.id)}
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
          <div className="text-center py-8 text-gray-500">
            No excess charges configured yet
          </div>
        )}
      </div>

      <LiabilityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={(limit) => {
          setNewCharge({
            ...newCharge,
            limit_of_liability: limit,
          });
        }}
      />

      {/* Summary Section */}
      <div className="bg-white rounded-lg shadow p-4">
        <h4 className="font-medium text-gray-900 mb-3">
          Configuration Summary
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div className="flex justify-between border-b border-gray-100 py-2">
            <span className="text-gray-600">Total Charges:</span>
            <span className="font-medium">
              {formData.excess_charges?.length || 0}
            </span>
          </div>
          <div className="flex justify-between border-b border-gray-100 py-2">
            <span className="text-gray-600">Highest Rate:</span>
            <span className="font-medium">
              {formData.excess_charges?.length
                ? Math.max(
                    ...formData.excess_charges.map((c) => Number(c.excess_rate))
                  )
                : 0}
              %
            </span>
          </div>
          <div className="flex justify-between border-b border-gray-100 py-2">
            <span className="text-gray-600">Lowest Rate:</span>
            <span className="font-medium">
              {formData.excess_charges?.length
                ? Math.min(
                    ...formData.excess_charges.map((c) => Number(c.excess_rate))
                  )
                : 0}
              %
            </span>
          </div>
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
      >
        Continue
      </button>
    </div>
  );
};

export default ExcessChargesStep;
