import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Upload } from "lucide-react";
import firstAssurance from "../../../assets/FirstAssurance.png";
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
import logo from "../../../assets/logo.png";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { FiMenu } from "react-icons/fi";
import {
  MdDashboard,
  MdPolicy,
  MdPayment,
  MdSettings,
  MdNotifications,
} from "react-icons/md";
import { useSelector } from "react-redux";

import { CheckQyc } from "../../helper/insurances";

const insuranceData = {
  coverage: "Personal Accident",
  premiumSchedule: "Monthly",
  premiumAmount: "Ksh. 50,000",
  status: "Active",
  dueDate: "13 March, 2025",
};

const coverStatisticsData = [
  { quarter: "Q1", value: 2000 },
  { quarter: "Q2", value: 5000 },
  { quarter: "Q3", value: 6000 },
  { quarter: "Q4", value: 8000 },
];

const UserDashboard = () => {
  const [error, setError] = useState('');


  const motorQuote = useSelector((state) => state.app.motorQuote);
  const { uploadedDocuments, setUploadedDocuments, progress, setProgress } =
    useProgress();
  const navigate = useNavigate();

  console.log(motorQuote);

  useEffect(() => {
    CheckQyc(navigate,setError);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
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
                />

                <div className="flex-1">
                  <div className="mt-4 w-full flex items-center space-x-2">
                    <div className="w-full bg-gray-200 h-4  rounded-full">
                      <div
                        className="bg-blue-500 h-4 rounded-full  "
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-gray-700 font-medium">
                      {progress.toFixed(0)}% Complete
                    </p>
                  </div>
                  <p className="mt-2 text-gray-700 text-center  font-medium">
                    Upload your Logbook and relevant documents
                  </p>
                </div>
              </div>
            </div>



            <Link
              className="mt-6 items-center flex flex-col bg-blue-100 text-red-500 px-4 py-2 rounded-lg mx-auto w-fit hover:bg-blue-200 transition-colors"
              to="upload"
            >
            <Upload className="w-6 h-6" />
              {error || error.message }
            </Link>


          </div>

          {/* Insurance Summary & Cover Statistics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Insurance Summary */}
            {!motorQuote && (
              <div className="bg-white p-5 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">
                  Insurance Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-600">Coverage:</span>
                    <span className="font-medium">
                      {insuranceData.coverage}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-600">Premium Schedule:</span>
                    <span className="font-medium">
                      {insuranceData.premiumSchedule}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-600">Premium Amount:</span>
                    <span className="font-medium">
                      {insuranceData.premiumAmount}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-600">Status:</span>
                    <span className="text-green-600 font-medium">
                      {insuranceData.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Due Date:</span>
                    <span className="font-medium">{insuranceData.dueDate}</span>
                  </div>
                </div>
                {console.log(error)}

                {error ? (
                  <Link
                    className="mt-6 bg-blue-100 text-red-500 px-4 py-2 rounded-lg mx-auto block w-fit hover:bg-blue-200 transition-colors"
                    to="upload"
                  >
                    {error}
                  </Link>
                ) : (
                  <Link
                    className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg mx-auto block w-48 hover:bg-blue-700 transition-colors"
                    to="/user-dashboard/payments"
                  >
                    Proceed to Payment
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
                    name="Avg Policy Size( Premium Amount)"
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
      </div>
    </div>
  );
};

export default UserDashboard;
