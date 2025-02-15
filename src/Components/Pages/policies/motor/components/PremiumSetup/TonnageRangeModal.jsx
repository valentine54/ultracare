import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const TonnageRangeModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    minTonnage: "",
    maxTonnage: "",
    rate: "",
    minPremium: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.minTonnage && formData.maxTonnage && formData.rate) {
      onSubmit({
        ...formData,
        id: Date.now(),
      });
      setFormData({
        minTonnage: "",
        maxTonnage: "",
        rate: "",
        minPremium: "",
        description: "",
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
                  className="relative w-full max-w-lg transform overflow-hidden rounded-lg bg-white shadow-xl transition-all"
                >
                  <form onSubmit={handleSubmit}>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Add Tonnage Range
                        </h3>
                        <button
                          type="button"
                          onClick={onClose}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <X size={20} />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Minimum Tonnage
                          </label>
                          <input
                            type="number"
                            value={formData.minTonnage}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                minTonnage: e.target.value,
                              })
                            }
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter min tonnage"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Maximum Tonnage
                          </label>
                          <input
                            type="number"
                            value={formData.maxTonnage}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                maxTonnage: e.target.value,
                              })
                            }
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter max tonnage"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Rate (%)
                          </label>
                          <input
                            type="number"
                            value={formData.rate}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                rate: e.target.value,
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
                            Minimum Premium
                          </label>
                          <input
                            type="number"
                            value={formData.minPremium}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                minPremium: e.target.value,
                              })
                            }
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter min premium"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
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
                          placeholder="Enter description for this range..."
                          rows={2}
                        />
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

export default TonnageRangeModal;
