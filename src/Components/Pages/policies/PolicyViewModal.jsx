import React from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";

const PolicyViewModal = ({ policy, onClose }) => {
  if (!policy) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg w-full max-w-2xl p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Policy Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Policy Name</h3>
            <p className="text-gray-900">{policy.name}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Description</h3>
            <p className="text-gray-900">{policy.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Type</h3>
              <p className="text-gray-900">{policy.type}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Premium</h3>
              <p className="text-gray-900">{policy.premium}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Status</h3>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  policy.status === "active"
                    ? "bg-green-100 text-green-800"
                    : policy.status === "expired"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {policy.status.charAt(0).toUpperCase() + policy.status.slice(1)}
              </span>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Beneficiaries
              </h3>
              <p className="text-gray-900">{policy.beneficiaries}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Created At</h3>
              <p className="text-gray-900">
                {new Date(policy.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Last Updated
              </h3>
              <p className="text-gray-900">
                {new Date(policy.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PolicyViewModal;