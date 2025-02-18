import React from "react";
import { useNavigate } from "react-router-dom";
import { useProgress } from "./ProgressContext";
import { ShieldCheck } from "lucide-react";

const PaymentsSection = () => {
  const navigate = useNavigate();
  const { progress } = useProgress();

  // Sample insurance data
  const insuranceData = {
    premium: 25000,
    tax: 4000,
    total: 29000,
    dueDate: "March 20, 2024",
  };

  if (progress < 100) {
    return (
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-bold mb-6">Payment Required</h2>
        <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-yellow-100 p-2 rounded-full">
              <ShieldCheck className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-yellow-800">
              Documents Required
            </h3>
          </div>
          <p className="text-yellow-700 mb-6">
            Please complete document uploads before proceeding to payment. All
            required documents must be verified to generate your final premium.
          </p>
          <button
            onClick={() => navigate("/user-dashboard/upload")}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg 
              hover:bg-blue-700 transition-all duration-200 flex items-center justify-center mx-auto"
          >
            Complete Document Upload
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-6">Payment Required</h2>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
          <h2 className="text-lg font-semibold text-white">
            Car Insurance Premium
          </h2>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <p className="text-3xl font-bold text-blue-900">
                KES {insuranceData.total.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Due by {insuranceData.dueDate}
              </p>
            </div>

            <button
              onClick={() => navigate("/user-dashboard/payments/payment")}
              className="mt-4 md:mt-0 bg-blue-600 text-white px-6 py-3 rounded-lg 
                hover:bg-blue-700 transition-colors duration-200"
            >
              Pay Now
            </button>
          </div>

          <div className="border-t pt-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Premium:</span>
                <span className="font-medium">
                  KES {insuranceData.premium.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (16%):</span>
                <span className="font-medium">
                  KES {insuranceData.tax.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-5">
        <h3 className="font-semibold text-gray-700 mb-3">Payment Options</h3>
        <p className="text-gray-600 text-sm">
          Choose your preferred payment method on the next screen. We accept
          M-Pesa, credit/debit cards, and bank transfers.
        </p>
      </div>
    </div>
  );
};

export default PaymentsSection;
