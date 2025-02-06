import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { motion } from "framer-motion";
import { Plus, Share2 } from "lucide-react";

const DashboardStatsSection = () => {
  const satisfactionData = [
    { name: "Very satisfied", value: 50, color: "#4A1D96" },
    { name: "Satisfied", value: 20, color: "#5B21B6" },
    { name: "Somewhat satisfied", value: 21, color: "#8B5CF6" },
    { name: "A little satisfied", value: 7, color: "#A78BFA" },
    { name: "Not satisfied", value: 2, color: "#DDD6FE" },
  ];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    if (index !== 0) return null;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

    return (
      <g>
        <text
          x={x + 60}
          y={y - 10}
          fill="#111827"
          className="text-xl font-bold"
        >
          70%
        </text>
        <text x={x + 60} y={y + 10} fill="#6B7280" className="text-sm">
          satisfied
        </text>
        <line
          x1={x + 10}
          y1={y}
          x2={x + 50}
          y2={y}
          stroke="#6B7280"
          strokeWidth={1}
        />
      </g>
    );
  };

  return (
    <div className="grid grid-cols-12 gap-6 p-6">
      {/* Action Buttons */}
      <div className="col-span-2 space-y-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white rounded-2xl shadow-sm p-6 cursor-pointer group hover:bg-blue-500 transition-all duration-200"
        >
          <div className="flex flex-col items-center space-y-3">
            <Plus className="w-6 h-16 text-gray-600 group-hover:text-white" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-white text-center">
              Create New Policy
            </span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white rounded-2xl shadow-sm p-6 cursor-pointer group hover:bg-blue-500 transition-all duration-200"
        >
          <div className="flex flex-col items-center space-y-3">
            <Share2 className="w-6 h-16 text-gray-600 group-hover:text-white" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-white text-center">
              Share Policy
            </span>
          </div>
        </motion.div>
      </div>

      {/* Chart Section */}
      <div className="col-span-6 bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-700 mb-6">
          How satisfied were you with how the insurance company/agent handled
          the claim?
        </h3>

        <div className="flex h-[280px]">
          <div className="w-8/12 h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={satisfactionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {satisfactionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      strokeWidth={0}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="w-4/12 flex flex-col justify-center space-y-3 pl-4">
            {satisfactionData.map((entry, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-xs text-gray-600">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="col-span-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-sm p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-500"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 7V12L15 15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">New Claims</p>
                <p className="text-2xl font-bold text-gray-900">32</p>
              </div>
            </div>
            <button className="text-sm text-blue-500 hover:text-blue-600">
              View all
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-500"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M17 20H7C5.89543 20 5 19.1046 5 18V6C5 4.89543 5.89543 4 7 4H17C18.1046 4 19 4.89543 19 6V18C19 19.1046 18.1046 20 17 20Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle
                    cx="12"
                    cy="10"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M16 16C16 13.7909 14.2091 12 12 12C9.79086 12 8 13.7909 8 16"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Clients</p>
                <p className="text-2xl font-bold text-gray-900">167</p>
              </div>
            </div>
            <button className="text-sm text-blue-500 hover:text-blue-600">
              View all
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardStatsSection;
