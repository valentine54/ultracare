import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Check } from "lucide-react";
import { useMotorForm } from "../../context/MotorFormContext";

const riskClasses = {
  Private: [{ id: "Motor_Private", label: "Motor Private" }],
  Commercial: [
    { id: "generalCartage", label: "General Cartage" },
    { id: "institutional", label: "Institutional Vehicles" },
    { id: "onlineTaxis", label: "Online Taxis" },
    { id: "ownGoods", label: "Own Goods" },
    {
      id: "other",
      label: "Other",
      subTypes: [
        { id: "agricultural", label: "Agricultural and Forestry Vehicles" },
        { id: "emergency", label: "Ambulance, Hearse and Firefighters" },
        { id: "chauffeur", label: "Chauffeur Driven" },
        { id: "construction", label: "Construction Vehicles" },
        { id: "drivingSchool", label: "Driving Schools" },
        { id: "primeMover", label: "Prime Mover and Tractors" },
      ],
    },
  ],
  Public_Service: [
    { id: "motorPsv", label: "Motor PSV" },
    { id: "chauffeurTaxi", label: "Chauffeur Driven-Taxis" },
    { id: "chauffeurDriven", label: "Chauffeur Driven" },
  ],
};

const tonnageRanges = [
  { id: "1-3", label: "1-3 Tons" },
  { id: "3-8", label: "3-8 Tons" },
  { id: "12-15", label: "12-15 Tons" },
  { id: "15-20", label: "15-20 Tons" },
  { id: "20-25", label: "20-25 Tons" },
  { id: "30+", label: "30+ Tons" },
];

const capacityRanges = [
  { id: "1-7", label: "1-7 Seats" },
  { id: "8-14", label: "8-14 Seats" },
  { id: "15-25", label: "15-25 Seats" },
  { id: "26-35", label: "26-35 Seats" },
  { id: "36+", label: "36+ Seats" },
];

const useCategories = [
  { id: "fleet", label: "Fleet" },
  { id: "standard", label: "Standard" },
];

const PremiumSetupModal = ({ isOpen, onClose, onSubmit }) => {
  const { formData } = useMotorForm();
  const [modalData, setModalData] = useState({
    minValue: "",
    maxValue: "",
    rate: "",
    minPremium: "",
    selectedRanges: [], // tonnage & capacity
    useCategories: [],
    risk_type: "", // risk class
    riskClassSubType: "", // commercial, other
  });

  const isCommercial = formData.category === "Commercial";
  const isPSV = formData.category === "Public_Service";
  const ranges = isPSV ? capacityRanges : tonnageRanges;
  const availableRiskClasses = riskClasses[formData.category] || [];

  const handleRangeToggle = (rangeId) => {
    setModalData((prev) => ({
      ...prev,
      selectedRanges: prev.selectedRanges.includes(rangeId)
        ? prev.selectedRanges.filter((id) => id !== rangeId)
        : [...prev.selectedRanges, rangeId],
    }));
  };

  const handleUseCategoryToggle = (categoryId) => {
    setModalData((prev) => ({
      ...prev,
      useCategories: prev.useCategories.includes(categoryId)
        ? prev.useCategories.filter((id) => id !== categoryId)
        : [...prev.useCategories, categoryId],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      modalData.minValue &&
      modalData.maxValue &&
      modalData.rate &&
      modalData.risk_type
    ) {
      const selectedRiskClass = availableRiskClasses.find(
        (rc) => rc.id === modalData.risk_type
      );
      const riskClassSubType = selectedRiskClass?.subTypes?.find(
        (st) => st.id === modalData.riskClassSubType
      );
 
  
      onSubmit({
        ...modalData,
        minValue: parseFloat(modalData.minValue),
        maxValue: parseFloat(modalData.maxValue),
        rate: parseFloat(modalData.rate),
        minPremium: modalData.minPremium ? parseFloat(modalData.minPremium) : 0,
        riskClassName: selectedRiskClass?.label,
        riskClassSubTypeName: riskClassSubType?.label,
      });

      setModalData({
        minValue: "",
        maxValue: "",
        rate: "",
        minPremium: "",
        selectedRanges: [],
        useCategories: [],
        risk_type: "",
        riskClassSubType: "",
      });
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative w-full max-w-2xl transform overflow-hidden rounded-lg bg-white shadow-xl transition-all"
                >
                  <form
                    onSubmit={handleSubmit}
                    className="divide-y divide-gray-200"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Add Premium Range
                        </h3>
                        <button
                          type="button"
                          onClick={onClose}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <X size={20} />
                        </button>
                      </div>

                      {/* Risk Class Selection */}
                      <div className="space-y-4 mb-6">
                        <h4 className="text-sm font-medium text-gray-700">
                          Risk Type
                        </h4>
                        <div className="space-y-4">
                          <select
                            value={modalData.risk_type}
                            onChange={(e) => {
                              setModalData({
                                ...modalData,
                                risk_type: e.target.value,
                                riskClassSubType: "",
                              });
                            }}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                          >
                            <option value="">Select Risk Type</option>
                            {availableRiskClasses.map((risk_type) => (
                              <option key={risk_type.id} value={risk_type.id}>
                                {risk_type.label}
                              </option>
                            ))}
                          </select>

                          {modalData.risk_type === "other" && (
                            <select
                              value={modalData.riskClassSubType}
                              onChange={(e) =>
                                setModalData({
                                  ...modalData,
                                  riskClassSubType: e.target.value,
                                })
                              }
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              required
                            >
                              <option value="">Select Specific Type</option>
                              {availableRiskClasses
                                .find((rc) => rc.id === "other")
                                ?.subTypes.map((subType) => (
                                  <option key={subType.id} value={subType.id}>
                                    {subType.label}
                                  </option>
                                ))}
                            </select>
                          )}
                        </div>
                      </div>

                      {/* Value Range Section */}
                      <div className="space-y-4 mb-6">
                        <h4 className="text-sm font-medium text-gray-700">
                          Value Range
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Minimum Value (KSH)
                            </label>
                            <input
                              type="number"
                              value={modalData.minValue}
                              onChange={(e) =>
                                setModalData({
                                  ...modalData,
                                  minValue: e.target.value,
                                })
                              }
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Maximum Value (KSH)
                            </label>
                            <input
                              type="number"
                              value={modalData.maxValue}
                              onChange={(e) =>
                                setModalData({
                                  ...modalData,
                                  maxValue: e.target.value,
                                })
                              }
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Rate and Premium Section */}
                      <div className="space-y-4 mb-6">
                        <h4 className="text-sm font-medium text-gray-700">
                          Rate & Premium
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Rate (%)
                            </label>
                            <input
                              type="number"
                              value={modalData.rate}
                              onChange={(e) =>
                                setModalData({
                                  ...modalData,
                                  rate: e.target.value,
                                })
                              }
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                              value={modalData.minPremium}
                              onChange={(e) =>
                                setModalData({
                                  ...modalData,
                                  minPremium: e.target.value,
                                })
                              }
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Vehicle Specifications Section */}
                      {(isCommercial || isPSV) && (
                        <div className="space-y-4 mb-6">
                          <h4 className="text-sm font-medium text-gray-700">
                            {isPSV ? "Capacity Ranges" : "Tonnage Ranges"}
                          </h4>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {ranges.map((range) => (
                              <button
                                key={range.id}
                                type="button"
                                onClick={() => handleRangeToggle(range.id)}
                                className={`
                                  p-3 rounded-lg border text-sm font-medium
                                  ${
                                    modalData.selectedRanges.includes(range.id)
                                      ? "bg-blue-50 border-blue-500 text-blue-700"
                                      : "border-gray-200 hover:border-blue-500"
                                  }
                                `}
                              >
                                <div className="flex items-center justify-between">
                                  <span>{range.label}</span>
                                  {modalData.selectedRanges.includes(
                                    range.id
                                  ) && (
                                    <Check
                                      size={16}
                                      className="text-blue-500"
                                    />
                                  )}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Use Categories Section */}
                      {isCommercial && (
                        <div className="space-y-4 mb-6">
                          <h4 className="text-sm font-medium text-gray-700">
                            Use Categories
                          </h4>
                          <div className="flex gap-3">
                            {useCategories.map((category) => (
                              <button
                                key={category.id}
                                type="button"
                                onClick={() =>
                                  handleUseCategoryToggle(category.id)
                                }
                                className={`
                                  px-4 py-2 rounded-lg border text-sm font-medium
                                  ${
                                    modalData.useCategories.includes(
                                      category.id
                                    )
                                      ? "bg-blue-50 border-blue-500 text-blue-700"
                                      : "border-gray-200 hover:border-blue-500"
                                  }
                                `}
                              >
                                {category.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Summary */}
                      <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                        <h4 className="font-medium text-gray-700">
                          Configuration Summary
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-gray-600">Risk Class:</span>
                            <span className="ml-2 font-medium">
                              {modalData.risk_type
                                ? riskClasses[formData.category]?.find(
                                    (rc) => rc.id === modalData.risk_type
                                  )?.label
                                : "Not set"}
                              {modalData.riskClassSubType &&
                                ` - ${
                                  riskClasses.commercial
                                    .find((rc) => rc.id === "other")
                                    ?.subTypes.find(
                                      (st) =>
                                        st.id === modalData.riskClassSubType
                                    )?.label
                                }`}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Value Range:</span>
                            <span className="ml-2 font-medium">
                              {modalData.minValue && modalData.maxValue
                                ? `${Number(
                                    modalData.minValue
                                  ).toLocaleString()} - ${Number(
                                    modalData.maxValue
                                  ).toLocaleString()} KSH`
                                : "Not set"}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Rate:</span>
                            <span className="ml-2 font-medium">
                              {modalData.rate
                                ? `${modalData.rate}%`
                                : "Not set"}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Min Premium:</span>
                            <span className="ml-2 font-medium">
                              {modalData.minPremium
                                ? `${Number(
                                    modalData.minPremium
                                  ).toLocaleString()} KSH`
                                : "Not set"}
                            </span>
                          </div>
                          {(isCommercial || isPSV) && (
                            <div>
                              <span className="text-gray-600">
                                {isPSV ? "Capacity" : "Tonnage"} Ranges:
                              </span>
                              <span className="ml-2 font-medium">
                                {modalData.selectedRanges.length > 0
                                  ? modalData.selectedRanges.length +
                                    " selected"
                                  : "None selected"}
                              </span>
                            </div>
                          )}
                          {isCommercial && (
                            <div>
                              <span className="text-gray-600">
                                Use Categories:
                              </span>
                              <span className="ml-2 font-medium">
                                {modalData.useCategories.length > 0
                                  ? modalData.useCategories
                                      .map(
                                        (c) =>
                                          useCategories.find(
                                            (uc) => uc.id === c
                                          )?.label
                                      )
                                      .join(", ")
                                  : "None selected"}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="px-6 py-3 bg-gray-50 flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                      >
                        Add Range
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PremiumSetupModal;
