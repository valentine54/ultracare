import React from "react";

const PensionFeatures = () => {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Guidance Section */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Expert Guidance Tailored to You
          </h2>
          <p className="text-gray-600 mb-12 leading-relaxed">
            Receive personalized advice with no separate fee when you come to us
            directly. Our team will walk you through the benefits and
            considerations of a long-term loan secured against your home,
            helping you make informed decisions.
          </p>

          {/* Why Us Section */}
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Why Choose Insure for Pension Release?
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start space-x-2">
              <span className="text-gray-400 mt-2">•</span>
              <span className="text-gray-600">
                Flexible Options: Choose how much cash you want to unlock and
                when.
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-gray-400 mt-2">•</span>
              <span className="text-gray-600">
                No Monthly Payments Required: Pay back the loan only when you
                choose to move or sell your home.
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-gray-400 mt-2">•</span>
              <span className="text-gray-600">
                Retain Ownership: You stay in your home for as long as you wish.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PensionFeatures;
