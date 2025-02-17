import React from "react";
import { useLocation } from "react-router-dom";

const QuoteSummary = () => {
  const location = useLocation();
  const quoteData = location.state?.quoteData 
// console.log(location.state)
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="text-sm text-gray-500">First Name:</label>
          <p className="font-medium text-gray-900">{quoteData.first_name.toUpperCase()}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500">Last Name:</label>
          <p className="font-medium text-gray-900">{quoteData.last_name.toUpperCase()}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500">Coverage Type:</label>
          <p className="font-medium text-gray-900">{quoteData.cover_type.toUpperCase()}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500">Vehicle Value:</label>
          <p className="font-medium text-gray-900">
            Ksh. {quoteData.vehicle_value}
          </p>
        </div>
        <div>
          <label className="text-sm text-gray-500">Number plate:</label>
          <p className="font-medium text-gray-900">
            {quoteData.vehicle_registration_number.toUpperCase()}
          </p>
        </div>
        <div>
          <label className="text-sm text-gray-500">Vehicle Type:</label>
          <p className="font-medium text-gray-900">{quoteData.vehicle_type.toUpperCase()}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500">Vehicle Make:</label>
          <p className="font-medium text-gray-900">{quoteData.vehicle_make.toUpperCase()}</p>
        </div>
      </div>
    </div>
  );
};

export default QuoteSummary;
