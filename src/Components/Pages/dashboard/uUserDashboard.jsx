import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { uploadedDocuments, setUploadedDocuments, progress, setProgress } =
    useProgress();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`w-64 bg-white p-5 shadow-lg fixed h-full transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <img src={logo} alt="Logo" className="h-10" />
        <nav className="mt-5">
          <a
            href="#"
            className="flex items-center p-2 text-blue-600 bg-blue-100 rounded"
          >
            <MdDashboard className="mr-2" />
            <span>Dashboard</span>
          </a>
          <a
            href="#"
            className="flex items-center p-2 hover:bg-gray-200 rounded"
          >
            <MdPolicy className="mr-2" />
            <span>Policy</span>
          </a>
          <a
            href="#"
            className="flex items-center p-2 hover:bg-gray-200 rounded"
          >
            <MdPayment className="mr-2" />
            <span>Payments</span>
          </a>
          <a
            href="#"
            className="flex items-center p-2 hover:bg-gray-200 rounded"
          >
            <MdSettings className="mr-2" />
            <span>Settings</span>
          </a>
          <a
            href="#"
            className="flex items-center p-2 hover:bg-gray-200 rounded"
          >
            <MdNotifications className="mr-2" />
            <span>Notifications</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Top Navigation Bar */}
        <div className="bg-white p-4 shadow-md flex justify-between items-center sticky top-0 z-50">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-xl"
            >
              <FiMenu />
            </button>
            <div className="flex items-center border p-2 rounded-md bg-gray-100 w-48 lg:w-96">
              <BiSearch className="text-gray-600" />
              <input
                type="text"
                placeholder="Search here..."
                className="ml-2 outline-none bg-transparent w-full"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <FaBell className="text-gray-600 text-xl" />
            <FaUserCircle className="text-gray-600 text-xl" />
          </div>
        </div>

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

            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 flex flex-col items-center w-13 h-20 mt-4 lg:mt-0"
              onClick={() => navigate("/upload-documents")}
            >
              <Upload className="w-6 h-6" />
              <span className="text-sm">Upload Documents</span>
            </button>
          </div>

          {/* Insurance Summary & Cover Statistics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Insurance Summary */}
            <div className="bg-white p-5 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Insurance Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-600">Coverage:</span>
                  <span className="font-medium">{insuranceData.coverage}</span>
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
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-6 mx-auto block w-48 hover:bg-blue-700 transition-colors">
                View More Details
              </button>
            </div>

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
