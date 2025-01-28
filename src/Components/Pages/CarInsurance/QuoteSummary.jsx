import React from "react";
import { useLocation } from "react-router-dom";

const QuoteSummary = () => {
  const location = useLocation();
  const quoteData = location.state?.quoteData || {};

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="text-sm text-gray-500">Full Name:</label>
          <p className="font-medium text-gray-900">{quoteData.fullName}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500">Coverage Type:</label>
          <p className="font-medium text-gray-900">{quoteData.coverType}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500">Vehicle Value:</label>
          <p className="font-medium text-gray-900">
            Ksh. {quoteData.vehicleValue?.toLocaleString()}
          </p>
        </div>
        <div>
          <label className="text-sm text-gray-500">Number plate:</label>
          <p className="font-medium text-gray-900">
            {quoteData.vehicleRegistration}
          </p>
        </div>
        <div>
          <label className="text-sm text-gray-500">Vehicle Type:</label>
          <p className="font-medium text-gray-900">{quoteData.vehicleType}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500">Vehicle Make:</label>
          <p className="font-medium text-gray-900">{quoteData.vehicleMake}</p>
        </div>
      </div>
    </div>
  );
};

export default QuoteSummary;
