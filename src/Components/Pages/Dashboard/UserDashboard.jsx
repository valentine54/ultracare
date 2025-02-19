import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Upload } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useProgress } from "./ProgressContext";

import { useSelector } from "react-redux";

import { CheckQyc } from "../../helper/insurances";
import firstAssurance from "../../../assets/FirstAssurance.png";

const UserDashboard = () => {
  const [error, setError] = useState("");
  const [kycStatus, setKycStatus] = useState({});

  const motorQuote = useSelector((state) => state.app.motorQuote);
  const { progress, setProgress } = useProgress();
  const navigate = useNavigate();

  // console.log(motorQuote);

  useEffect(() => {
    const checkKyc = async () => {
      try {
        const res = await CheckQyc(setProgress, setKycStatus);
        console.log(res.response?.data.error);
        setError(
          res.response?.data?.error ||
            "Failed to check KYC status. Please try again."
        );
      } catch (error) {
        console.error("Error checking KYC status:", error);
      }
    };
    checkKyc();
  }, []);

  // Sample data for the chart
  const coverStatisticsData = [
    { quarter: "Q1", value: 2000 },
    { quarter: "Q2", value: 5000 },
    { quarter: "Q3", value: 6000 },
    { quarter: "Q4", value: 8000 },
  ];

  const calculateTotalInsuranceCost = (insuranceData) => {
    if (!insuranceData || !insuranceData.selected_quote) return 0;

    const basePremium =
      parseFloat(insuranceData.selected_quote.base_premium) || 0;
    const selectedExcessList =
      insuranceData.selected_quote.selected_excess || [];
    let totalExcess = 0;

    selectedExcessList.forEach((excess) => {
      const excessRate = parseFloat(excess.excess_rate) || 0;
      const minPrice = parseFloat(excess.min_price) || 0;
      const excessAmount = Math.max((excessRate / 100) * basePremium, minPrice);
      totalExcess += excessAmount;
    });

    return basePremium + totalExcess;
  };

  const insuranceData2 = JSON.parse(localStorage.getItem("insurance")) || {};

  const totalCost = calculateTotalInsuranceCost(insuranceData2);
  // console.log("Total Insurance Cost:", insuranceData2);

  // Sample insurance data
  const insuranceData = {
    coverage: "Personal Accident",
    premiumSchedule: "Monthly",
    premiumAmount: "Ksh. 50,000",
    status: "Active",
    dueDate: "13 March, 2025",
  };

  return (
    <div className="space-y-6">
      {/* Insurance Progress Section */}
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-col lg:flex-row items-center">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 text-left">
            Car Insurance In Progress
          </h3>
          <div className="border-b border-gray-300 my-2 w-full"></div>

          <div className="flex flex-col lg:flex-row items-center">
            <img
              src={firstAssurance}
              alt="First Assurance"
              className="w-24 h-auto mr-4"
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/120x40?text=Insurance")
              }
            />

            <div className="flex-1">
              <div className="mt-4 w-full flex items-center space-x-2">
                <div className="w-full bg-gray-200 h-4 rounded-full">
                  <div
                    className="bg-blue-500 h-4 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-gray-700 font-medium">
                  {progress.toFixed(0)}% Complete
                </p>
              </div>
              <p className="mt-2 text-gray-700 text-center font-medium">
                Upload your Logbook and relevant documents
              </p>
            </div>
          </div>
        </div>

        {kycStatus?.status === "success" ? (
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 flex flex-col items-center  mt-4 lg:mt-0 transition-colors">
            <span className="text- -600 ">{kycStatus?.message}</span>
          </button>
        ) : (
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 flex flex-col items-center w-32 h-24 mt-4 lg:mt-0 transition-colors"
            onClick={() => navigate("/user-dashboard/upload")}
          >
            <Upload className="w-6 h-6 mt-2" />
            <span className="text-sm mt-2">Upload Documents</span>
          </button>
        )}
      </div>
      {console.log(insuranceData2)}
      {/* Insurance Summary & Cover Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Insurance Summary & Cover Statistics */}
        {/* Insurance Summary */}
        {!insuranceData2 || Object.keys(insuranceData2).length === 0 ? (
          <div className="bg-white p-5 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold mb-4">No Insurance Found</h3>
            <p className="text-gray-600 mb-4">
              You currently have no active insurance.
            </p>
            <Link
              className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg mx-auto block w-fit hover:bg-blue-700 transition-colors"
              to="/car-insurance"
            >
              Buy New Insurance
            </Link>
          </div>
        ) : (
          <div className="bg-white p-5 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Insurance Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-600">Cover Type:</span>
                <span className="font-medium">
                  {insuranceData2.selected_quote?.cover_type}
                </span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-600">Vehicle Type:</span>
                <span className="font-medium">
                  {insuranceData2.selected_quote?.vehicle_type}
                </span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-600">Premium Amount:</span>
                <span className="font-medium">
                  {totalCost || insuranceData2.selected_quote?.base_premium}
                </span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-600">Risk Type:</span>
                <span className="text-green-600 font-medium">
                  {insuranceData2.selected_quote?.risk_type}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Start Date:</span>
                <span className="font-medium">
                  {insuranceData2.quoteData?.cover_start_date}
                </span>
              </div>
            </div>

            {kycStatus?.status === "success" ? (
              <Link
                className="mt-6 bg-blue-100 text-green-500 px-4 py-2 rounded-lg mx-auto block w-fit hover:bg-blue-200 transition-colors"
                to="/user-dashboard/payments/payment"
              >
                Proceed to Payment
              </Link>
            ) : (
              <Link
                className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg mx-auto block w-48 hover:bg-blue-700 transition-colors"
                to="/user-dashboard/upload"
              >
                {kycStatus?.message}
              </Link>
            )}
          </div>
        )}

        {/* Cover Statistics */}
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Cover Statistics
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            Average Policy Size vs. Time
          </p>
          <p className="text-xs text-gray-500 mb-4">
            Tracking changes in average policy size over time
          </p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={coverStatisticsData} layout="vertical">
              <YAxis
                type="category"
                dataKey="quarter"
                width={80}
                tick={{ fill: "#555", fontSize: 12 }}
                axisLine={{ stroke: "#ccc" }}
                tickLine={{ stroke: "#ccc" }}
                label={{
                  value: "Time (Quarters)",
                  angle: -90,
                  position: "insideLeft",
                  fontSize: 12,
                  fill: "#555",
                  offset: 10,
                }}
              />
              <XAxis
                type="number"
                tickFormatter={(value) => `${value / 1000}K`}
                tick={{ fill: "#555", fontSize: 12 }}
                axisLine={{ stroke: "#ccc" }}
                tickLine={{ stroke: "#ccc" }}
                label={{
                  position: "insideBottom",
                  fontSize: 12,
                  fill: "#555",
                  offset: -10,
                }}
              />
              <Tooltip
                formatter={(value) => `${value / 1000}K`}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: "8px",
                }}
              />
              <Bar
                dataKey="value"
                fill="#4285F4"
                barSize={20}
                name="Avg Policy Size (Premium Amount)"
                radius={[4, 4, 0, 0]}
              />
              <Legend
                verticalAlign="bottom"
                wrapperStyle={{ paddingTop: 10, fontSize: 12 }}
                iconSize={12}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
