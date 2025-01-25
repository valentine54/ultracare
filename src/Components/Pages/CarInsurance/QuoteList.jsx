import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const QuoteList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState([]);
  const [sortBy, setSortBy] = useState("relevance");
  const [isLoading, setIsLoading] = useState(true);

  // API
  const fetchQuotes = async () => {
    setIsLoading(true);
    try {
      // API Call
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(location.state),
      });
      const data = await response.json();
      setQuotes(data);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const QuoteCard = ({ company, price, benefits, logo }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
    >
      <div className="p-6 flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="flex items-center gap-4 w-full md:w-48">
          <img
            src={logo}
            alt={`${company} logo`}
            className="w-16 h-16 object-contain"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{company}</h3>
            <p className="text-blue-600 font-bold text-xl">
              Ksh. {price.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex-grow">
          <div className="space-y-2">
            <h4 className="font-medium text-gray-700">Key Benefits:</h4>
            <p className="text-gray-600 text-sm leading-relaxed">{benefits}</p>
          </div>
          <div className="mt-4 flex gap-4">
            <button
              onClick={() => {}} 
              className="text-blue-600 text-sm hover:text-blue-700 flex items-center gap-1"
            >
              <span>Add/View Benefits</span>
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="w-full md:w-auto">
          <button
            onClick={() => {}} 
            className="w-full md:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2 font-medium"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Buy Plan
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Quote */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h1 className="text-2xl font-semibold text-blue-600 mb-6">
            Get A Quote For Car Insurance
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="text-sm text-gray-500">Full Name:</label>
              <p className="font-medium text-gray-900">
                {location.state?.fullName || "Sara Cynthia Awuor"}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Coverage Type:</label>
              <p className="font-medium text-gray-900">
                {location.state?.coverType || "Comprehensive"}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Vehicle Value:</label>
              <p className="font-medium text-gray-900">
                Ksh.{" "}
                {location.state?.vehicleValue?.toLocaleString() || "7,000,000"}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Number plate:</label>
              <p className="font-medium text-gray-900">
                {location.state?.vehicleRegistration || "KDA 569B"}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Vehicle Type:</label>
              <p className="font-medium text-gray-900">
                {location.state?.vehicleType || "Station Wagon"}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Vehicle Make:</label>
              <p className="font-medium text-gray-900">
                {location.state?.vehicleMake || "2020"}
              </p>
            </div>
          </div>
        </div>

        {/* Quotes List Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-medium text-gray-900">
              All Companies
              <span className="text-sm text-gray-500 ml-2">
                Showing {quotes.length} results
              </span>
            </h2>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="relevance">Most relevant</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading insurance quotes...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* API Data */}
              <QuoteCard
                company="GA Insurance Kenya"
                price={50000}
                benefits="Comprehensive global coverage, 24/7 customer support, extensive network of providers."
                logo="/path-to-ga-insurance-logo.png"
              />
              <QuoteCard
                company="First Assurance"
                price={50000}
                benefits="Comprehensive global coverage, 24/7 customer support, extensive network of providers."
                logo="/path-to-first-assurance-logo.png"
              />
              <QuoteCard
                company="CIC General Insurance"
                price={50000}
                benefits="Comprehensive global coverage, 24/7 customer support, extensive network of providers."
                logo="/path-to-cic-logo.png"
              />
            </div>
          )}
        </div>

        <div className="mt-8">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteList;
