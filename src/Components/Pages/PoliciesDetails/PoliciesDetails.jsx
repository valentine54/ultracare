import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  Clock,
  DollarSign,
  FileText,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const PolicyDetails = () => {
  const navigate = useNavigate();

  const policy = {
    id: "POL-2024-001",
    name: "Premium Health Insurance",
    status: "Active",
    coverageAmount: 500000,
    monthlyPremium: 299,
    startDate: "2024-01-01",
    endDate: "2025-01-01",
    coverageDetails: [
      {
        id: "1",
        description: "24/7 Emergency Medical Coverage",
        included: true,
      },
      { id: "2", description: "Prescription Drug Coverage", included: true },
      { id: "3", description: "Specialist Consultations", included: true },
      { id: "4", description: "Hospital Room Coverage", included: true },
      { id: "5", description: "Dental and Vision Benefits", included: true },
    ],
    documents: [
      { id: "doc1", name: "Policy Document", type: "PDF" },
      { id: "doc2", name: "Terms & Conditions", type: "PDF" },
      { id: "doc3", name: "Coverage Schedule", type: "PDF" },
    ],
  };

  const handleActivateCoverage = () => {
    navigate("/activate-coverage/" + policy.id);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {policy.name}
            </h1>
            <p className="text-gray-500">Policy ID: {policy.id}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              <CheckCircle className="w-4 h-4 mr-1" />
              {policy.status}
            </span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Coverage Card */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <DollarSign className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-500">Coverage Amount</p>
                    <p className="text-xl font-semibold">
                      {formatCurrency(policy.coverageAmount)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Monthly Card */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-gray-500">Monthly Premium</p>
                    <p className="text-xl font-semibold">
                      {formatCurrency(policy.monthlyPremium)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Coverage Details */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Coverage Details
                </h2>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {policy.coverageDetails.map((detail) => (
                    <div key={detail.id} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">
                        {detail.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Coverage Period */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold">Coverage Period</h2>
              <div className="mt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <p className="text-gray-500">Start Date</p>
                  <p className="text-lg font-medium">{policy.startDate}</p>
                </div>
                <div className="hidden md:block flex-1 h-0.5 bg-gray-200 relative">
                  <div className="absolute inset-y-0 left-0 bg-blue-600 w-1/2"></div>
                </div>
                <div>
                  <p className="text-gray-500">End Date</p>
                  <p className="text-lg font-medium">{policy.endDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Documents Section */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Documents
                </h2>
                <div className="mt-4 space-y-3">
                  {policy.documents.map((doc) => (
                    <button
                      key={doc.id}
                      className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <span className="text-gray-700">{doc.name}</span>
                      <span className="text-sm text-gray-500">{doc.type}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Important Note</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Please review all policy documents carefully before
                    activating coverage. Contact our support team if you have
                    any questions.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleActivateCoverage}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 
                transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Activate Coverage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyDetails;
