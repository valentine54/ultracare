import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Trash2 } from "lucide-react";

const PremiumRangeModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [ranges, setRanges] = useState(initialData?.ranges || []);
  const [currentRange, setCurrentRange] = useState({
    minValue: "",
    maxValue: "",
    rate: "",
    minPremium: "",
  });

  const addRange = () => {
    if (currentRange.minValue && currentRange.maxValue && currentRange.rate) {
      setRanges([...ranges, { ...currentRange, id: Date.now() }]);
      setCurrentRange({ minValue: "", maxValue: "", rate: "", minPremium: "" });
    }
  };

  const deleteRange = (id) => {
    setRanges(ranges.filter((range) => range.id !== id));
  };

  const handleSave = () => {
    onSave(ranges);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-25"
              onClick={onClose}
            />

            {/* Modal */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white rounded-xl shadow-lg max-w-2xl w-full p-6"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">
                  Premium Range Configuration
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Min Value (KSH)
                    </label>
                    <input
                      type="number"
                      value={currentRange.minValue}
                      onChange={(e) =>
                        setCurrentRange({
                          ...currentRange,
                          minValue: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Max Value (KSH)
                    </label>
                    <input
                      type="number"
                      value={currentRange.maxValue}
                      onChange={(e) =>
                        setCurrentRange({
                          ...currentRange,
                          maxValue: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="1,000,000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rate (%)
                    </label>
                    <input
                      type="number"
                      value={currentRange.rate}
                      onChange={(e) =>
                        setCurrentRange({
                          ...currentRange,
                          rate: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="3.5"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Min Premium
                    </label>
                    <input
                      type="number"
                      value={currentRange.minPremium}
                      onChange={(e) =>
                        setCurrentRange({
                          ...currentRange,
                          minPremium: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="15,000"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={addRange}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    <Plus size={16} />
                    Add Range
                  </button>
                </div>

                {/* Summary Table */}
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Configured Ranges
                  </h4>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Range
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Rate
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Min Premium
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {ranges.map((range) => (
                          <motion.tr
                            key={range.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              {Number(range.minValue).toLocaleString()} -{" "}
                              {Number(range.maxValue).toLocaleString()} KSH
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {range.rate}%
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {Number(range.minPremium).toLocaleString()} KSH
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <button
                                onClick={() => deleteRange(range.id)}
                                className="text-red-500 hover:text-red-600"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Save Configuration
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PremiumRangeModal;
