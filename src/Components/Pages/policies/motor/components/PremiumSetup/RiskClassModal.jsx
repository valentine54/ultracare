import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const riskClassesByCategory = {
  private: [{ id: "motorPrivate", label: "Motor Private" }],
  commercial: [
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
  psv: [
    { id: "motorPsv", label: "Motor PSV" },
    { id: "chauffeurTaxi", label: "Chauffeur Driven-Taxis" },
    { id: "chauffeurDriven", label: "Chauffeur Driven" },
  ],
};

const RiskClassModal = ({ isOpen, onClose, onSubmit, category }) => {
  const [formData, setFormData] = useState({
    type: "",
    subType: "",
    requirements: "",
    description: "",
  });

  const [availableTypes, setAvailableTypes] = useState([]);
  const selectedMainType = availableTypes.find((t) => t.id === formData.type);

  useEffect(() => {
    if (category) {
      setAvailableTypes(riskClassesByCategory[category] || []);
    }
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.type) {
      onSubmit({
        ...formData,
        id: Date.now(),
        name: selectedMainType.label,
        subTypeName: selectedMainType.subTypes?.find(
          (st) => st.id === formData.subType
        )?.label,
      });
      setFormData({ type: "", subType: "", requirements: "", description: "" });
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
                  className="relative w-full max-w-lg transform overflow-hidden rounded-lg bg-white shadow-xl transition-all"
                >
                  <form onSubmit={handleSubmit}>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Add Risk Class
                        </h3>
                        <button
                          type="button"
                          onClick={onClose}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <X size={20} />
                        </button>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Risk Class Type
                          </label>
                          <select
                            value={formData.type}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                type: e.target.value,
                                subType: "", 
                              })
                            }
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                          >
                            <option value="">Select Risk Class Type</option>
                            {availableTypes.map((type) => (
                              <option key={type.id} value={type.id}>
                                {type.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        {selectedMainType?.subTypes && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Specific Type
                            </label>
                            <select
                              value={formData.subType}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  subType: e.target.value,
                                })
                              }
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              required
                            >
                              <option value="">Select Specific Type</option>
                              {selectedMainType.subTypes.map((subType) => (
                                <option key={subType.id} value={subType.id}>
                                  {subType.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                          </label>
                          <textarea
                            value={formData.description}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                description: e.target.value,
                              })
                            }
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            rows={3}
                            placeholder="Enter description for this risk class..."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Special Requirements
                          </label>
                          <textarea
                            value={formData.requirements}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                requirements: e.target.value,
                              })
                            }
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            rows={2}
                            placeholder="Enter any special requirements..."
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-3">
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
                        Add Risk Class
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

export default RiskClassModal;
