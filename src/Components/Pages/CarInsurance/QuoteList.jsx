import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import QuoteSummary from "./QuoteSummary";
import GAInsurance from "../../../assets/GAInsurance.png";
import CIC from "../../../assets/CIC.png";
import FirstAssurance from "../../../assets/FirstAssurance.png";
import QuoteHeader from "./QuoteHeader";

// Mock data 
const mockInsuranceCompanies = [
  {
    id: 1,
    name: "GA Insurance Kenya",
    logo: GAInsurance,
    price: 50000,
    benefits:
      "Comprehensive global coverage, 24/7 customer support, extensive network of providers.",
  },
  {
    id: 2,
    name: "First Assurance",
    logo: FirstAssurance,
    price: 50000,
    benefits:
      "Comprehensive global coverage, 24/7 customer support, extensive network of providers.",
  },
  {
    id: 3,
    name: "CIC General Insurance",
    logo: CIC,
    price: 50000,
    benefits:
      "Comprehensive global coverage, 24/7 customer support, extensive network of providers.",
  },
];

const QuoteList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState(mockInsuranceCompanies);
  const [sortBy, setSortBy] = useState("relevance");

  // API integration
  const fetchQuotes = async (userData) => {
    try {
      // API 
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      setQuotes(data);
    } catch (error) {
      console.error("Error fetching quotes:", error);
      setQuotes(mockInsuranceCompanies); // Fallback 
    }
  };

  const handleViewBenefits = (companyId) => {
    // Handle benefits
    console.log("Viewing benefits for:", companyId);
  };

  const handleBuyPlan = (price, companyName) => {
    navigate("/payment-success", {
      state: {
        amount: price,
        email: location.state?.quoteData?.email,
        company: companyName,
      },
    });
  };

  const QuoteCard = ({ company, price, benefits, logo }) => (
    
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
  
      <div className="grid grid-cols-12 gap-0">
        {/* Company Info */}
        <div className="col-span-4 p-6 border-r border-gray-100 flex flex-col items-center text-center">
          <img
            src={logo}
            alt={`${company} logo`}
            className="w-18 h-16 object-cover mb-3"
          />
          <h3 className="text-[#1e3a8a] font-semibold text-lg mb-2">
            {company}
          </h3>
          <p className="text-blue-500 font-bold text-xl mb-4">
            Ksh. {price.toLocaleString()}
          </p>
          <button
            onClick={() => handleBuyPlan(price, company)}
            className="w-1/2 bg-blue-500 text-white py-2.5 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            Buy Plan
          </button>
        </div>

        {/* Benefits */}
        <div className="col-span-8 p-6">
          <div className="flex flex-col h-full">
            <div className="mb-4">
              <span className="text-gray-700 font-medium">Key Benefits:</span>
              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                {benefits}
              </p>
            </div>
            <button
              onClick={() => handleViewBenefits(company)}
              className="text-blue-500 hover:text-blue-600 text-sm self-end mt-auto flex items-center gap-1"
            >
              <span className="text-[15px]">Add/View Benefits</span>
              <span className="text-lg ml-1">+</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <QuoteHeader />
        <QuoteSummary />

        {/* Companies Header */}
        <div className="bg-[#F8FAFC] rounded-lg px-6 py-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-gray-900 font-medium">
                All Companies
                <span className="text-sm text-gray-500 ml-2">
                  Showing {quotes.length} results
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border-gray-200 rounded-lg p-1.5 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer"
              >
                <option value="relevance">Most relevant</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quote Cards */}
        <div className="space-y-4">
          {quotes.map((quote) => (
            <motion.div
              key={quote.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <QuoteCard
                company={quote.name}
                price={quote.price}
                benefits={quote.benefits}
                logo={quote.logo}
              />
            </motion.div>
          ))}
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-500 hover:text-blue-600 flex items-center gap-2 text-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
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
