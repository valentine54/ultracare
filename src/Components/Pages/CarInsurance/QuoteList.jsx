import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import QuoteSummary from "./QuoteSummary";
import { FaPlus, FaShoppingCart } from "react-icons/fa";
import GAInsurance from "../../../assets/GAInsurance.png";
import CIC from "../../../assets/CIC.png";
import FirstAssurance from "../../../assets/FirstAssurance.png";
import QuoteHeader from "./QuoteHeader";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { setMotorQuote } from "../../store/actions/appAction";

const API_KEY = "e4204b2c-3cf9-45e8-8837-db3a37121de5";
const API_URL = "http://127.0.0.1:8000/api/v1.0/";

const QuoteList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const motorQuote = useSelector((state) => state.app.motorQuote);
  const userData = useSelector((state) => state.user);
  const [insurances, setInsurance] = useState([]);
  const [sortBy, setSortBy] = useState("relevance");
// console.log(insurances)
  useEffect(() => {
    const insuranceFilter = async () => {
      try {
        const response_data = await axios.get(
          `${API_URL}motorinsurance/filter/`,
          {
            withCredentials: true, // Ensure cookies are sent and received
            headers: {
              "Content-Type": "application/json",
              "x-api-key": API_KEY,
            },
          }
        );

        if (response_data.status === 200) {
          // console.log("response data:", response_data.data);
          setInsurance(response_data.data.data);
        } else {
          console.error("Failed to filter:", response_data.data);
        }
      } catch (e) {
        console.log("error", e.response.data);
      } finally {
        // console.log("finally");
      }
    };
    insuranceFilter();
  }, []);

  // const handleViewBenefits = (companyId) => {
  //   // Handle benefits
  //   console.log("Viewing benefits for:", companyId);
  // };

  const handleBuyPlan = (quote) => {
    const setDta = {
      selected_quote: quote,
      quoteData: location.state?.quoteData, // Ensure location.state exists
      expiry: Date.now() + 3600000, // 1 hour in milliseconds
    };

    // Store data as JSON string in localStorage
    localStorage.setItem("insurance", JSON.stringify(setDta));

    // Dispatch to Redux
    dispatch(setMotorQuote(setDta));


    // Navigate based on user login status
    if (userData.loggedIn) {
      navigate("/login");
    } else {
      navigate("/user-dashboard");
    }
  };

  const QuoteCard = ({ quote }) => (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="grid grid-cols-12 gap-0">
        {/* Company Info */}
        <div className="col-span-4 p-6 border-r border-gray-100 flex flex-col items-center text-center">
          <img
            src={quote?.logo || CIC}
            alt={`${quote.company} logo`}
            className="w-18 h-16 object-cover mb-3"
          />
          <h3 className="text-[#1e3a8a] font-semibold text-lg mb-2">
            {quote.company_name}
          </h3>
          <p className="text-blue-500 font-bold text-xl mb-4">
            Ksh. {quote.base_premium?.toLocaleString()}
          </p>{" "}
          <button
            onClick={() => {
              navigate("/addbenefits", {
                state: {
                  insurances: insurances,
                  quote: quote,
                },
              });
            }}
            className="w-1/2 mb-3 bg-blue-500 text-white py-2.5 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <FaPlus />
            Add Benefits
          </button>
          <button
            onClick={() => handleBuyPlan(quote)}
            className="w-1/2 bg-blue-500 text-white py-2.5 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <FaShoppingCart />
            Buy Plan
          </button>
        </div>

        {/* Benefits */}
        <div className="col-span-8 p-6">
          <div className="flex flex-col h-full">
            <div className="mb-4">
              <span className="text-gray-700 font-medium">Descriptions</span>
              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                {quote?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto bg-[#F8FAFC] rounded-lg shadow-sm px-4 py-6 mt-8 mb-6">
          <h1 className="text-center text-[#3B82F6] text-2xl sm:text-3xl font-medium">
            Get A Quote For Car Insurance
          </h1>
        </div>
        <QuoteSummary />

        {/* Companies Header */}
        <div className="bg-[#F8FAFC] rounded-lg px-6 py-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-gray-900 font-medium">
                All Companies
                <span className="text-sm text-gray-500 ml-2">
                  Showing {insurances.length} results
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
          {insurances?.map((quote) => (
            <motion.div
              key={quote.insurance_id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <QuoteCard quote={quote} />
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
