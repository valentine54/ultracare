import React, { useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { motion } from "framer-motion";
import { Plus, Share2, Phone, Users, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SharePolicyModal from "../../Modals/SharePolicyModal";
import PolicyActionsMenu from "../../PolicyActions/PolicyActionsMenu";

const DashboardStatsSection = () => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const navigate = useNavigate();

  const satisfactionData = [
    { name: "Very satisfied", value: 50, color: "#4C1D95" },
    { name: "Satisfied", value: 20, color: "#5B21B6" },
    { name: "Somewhat satisfied", value: 21, color: "#8B5CF6" },
    { name: "A little satisfied", value: 7, color: "#A78BFA" },
    { name: "Not satisfied", value: 2, color: "#EDE9FE" },
  ];

  const policyData = [
    {
      name: "Vivian Okwara",
      type: "Personal Accident Policy",
      startDate: "10 Dec, 2024",
      premium: "ksh. 20,000/M",
      status: "Active",
    },
    {
      name: "Simon Ojoo",
      type: "Car Insurance",
      startDate: "10 Dec, 2024",
      premium: "ksh. 20,000/M",
      status: "Active",
    },
    {
      name: "Emily Wahome",
      type: "Marine Insurance",
      startDate: "10 Dec, 2024",
      premium: "ksh. 20,000/M",
      status: "Active",
    },
  ];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    index,
  }) => {
    if (index !== 0) return null;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 1.4;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <g>
        <text
          x={x + 5}
          y={y - 10}
          fill="#111827"
          textAnchor="start"
          className="text-2xl font-bold"
        >
          70%
        </text>
        <text
          x={x + 5}
          y={y + 10}
          fill="#6B7280"
          textAnchor="start"
          className="text-sm"
        >
          satisfied
        </text>
        <line
          x1={cx + outerRadius * Math.cos(-midAngle * RADIAN)}
          y1={cy + outerRadius * Math.sin(-midAngle * RADIAN)}
          x2={x}
          y2={y}
          stroke="#6B7280"
          strokeWidth={1}
        />
      </g>
    );
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Section - Action Buttons */}
        <div className="flex md:flex-col gap-4 md:gap-6 md:w-[120px]">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/form")}
            className="flex-1 md:flex-none bg-blue-500 aspect-square rounded-xl p-4 flex flex-col items-center justify-center gap-2 shadow-sm hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-6 h-6 text-white" />
            <span className="text-sm font-medium text-white text-center">
              Create New Policy
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsShareModalOpen(true)}
            className="flex-1 md:flex-none bg-blue-500 aspect-square rounded-xl p-4 flex flex-col items-center justify-center gap-2 shadow-sm hover:bg-blue-600 transition-colors"
          >
            <Share2 className="w-6 h-6 text-white" />
            <span className="text-sm font-medium text-white text-center">
              Share Policy
            </span>
          </motion.button>
        </div>

        {/* Center Section - Chart */}
        <div className="flex-1 bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-700 mb-6">
            How satisfied were you with how the insurance company/agent handled
            the claim?
          </h3>

          <div className="flex flex-col md:flex-row h-[300px] md:h-[280px]">
            <div className="w-full md:w-8/12 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={satisfactionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={100}
                    startAngle={90}
                    endAngle={-270}
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

            <div className="w-full md:w-4/12 flex flex-row md:flex-col flex-wrap justify-center items-start gap-3 mt-4 md:mt-0 md:pl-6">
              {satisfactionData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
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

        {/* Right Section - Stats Cards */}
        <div className="flex flex-col md:w-[300px] gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">New Claims</p>
                  <p className="text-2xl font-bold text-gray-900">32</p>
                </div>
              </div>
              <button
                onClick={() => navigate("/claims")}
                className="text-sm text-blue-500 hover:text-blue-600"
              >
                View all
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Clients</p>
                  <p className="text-2xl font-bold text-gray-900">167</p>
                </div>
              </div>
              <button
                onClick={() => navigate("/customers")}
                className="text-sm text-blue-500 hover:text-blue-600"
              >
                View all
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Policy Table */}
      <div className="bg-white rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                POLICY NAME
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                START DATE
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                PREMIUM
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                STATUS
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {policyData.map((policy, index) => (
              <tr key={index}>
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-gray-900">
                      {policy.name}
                    </div>
                    <div className="text-sm text-gray-500">{policy.type}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500">{policy.startDate}</td>
                <td className="px-6 py-4 text-gray-500">{policy.premium}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-green-700 text-sm bg-green-100 rounded-full">
                    {policy.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SharePolicyModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)}
        policy={selectedPolicy}
      />
    </div>
  );
};

export default DashboardStatsSection;
