// src/pages/customers/index.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Filter, Users, ChevronDown } from "lucide-react";
import DashboardLayout from "../../common/layout/DashboardLayout";

const CustomerPage = () => {
  const [activeTab, setActiveTab] = useState("new");
  const [showFilters, setShowFilters] = useState(false);

  const customers = [
    {
      id: 1,
      name: "Cynthia Sara",
      type: "Personal Accident",
      logo: "/assets/ck-group.png",
      startDate: "10 Dec, 2024",
      premium: "ksh. 20,000/M",
      status: "Active",
      dueDate: "23 Jan, 2025",
    },
    {
      id: 2,
      name: "Victor Odiwuor",
      type: "Motor Car Insurance",
      logo: "/assets/ck-group.png",
      startDate: "12 Dec, 2024",
      premium: "ksh. 20,000/M",
      status: "Active",
      dueDate: "23 Jan, 2025",
    },
    {
      id: 3,
      name: "David Munuhe",
      type: "Vehicle Insurance",
      logo: "/assets/ck-group.png",
      startDate: "13 Dec, 2024",
      premium: "ksh. 20,000/M",
      status: "Expired",
      dueDate: "23 Jan, 2025",
    },
    {
      id: 4,
      name: "Clement Macharia",
      type: "Health&Family Insurance",
      logo: "/assets/ck-group.png",
      startDate: "17 Dec, 2024",
      premium: "ksh. 20,000/M",
      status: "Active",
      dueDate: "23 Jan, 2025",
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-1"
          >
            <h1 className="text-xl font-semibold text-gray-900">
              Customers Insurance Details
            </h1>
            <p className="text-sm text-gray-500">
              Take a look at the policies to see what is covered
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition-colors"
          >
            <Plus size={20} />
            <span>Add New Customer</span>
          </motion.button>
        </div>

        {/* Tabs & Filters */}
        <div className="flex justify-between items-center border-b">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("new")}
              className={`py-4 relative ${
                activeTab === "new"
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              New Customers(34)
              {activeTab === "new" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab("old")}
              className={`py-4 relative ${
                activeTab === "old"
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Old Customers(146)
              {activeTab === "old" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                />
              )}
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50"
          >
            <Filter size={18} />
            <span>Filters</span>
            <ChevronDown
              className={`transform transition-transform ${
                showFilters ? "rotate-180" : ""
              }`}
              size={16}
            />
          </motion.button>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-lg shadow-sm p-4 space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select className="w-full p-2 border rounded-lg">
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Expired</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Insurance Type
                  </label>
                  <select className="w-full p-2 border rounded-lg">
                    <option>All Types</option>
                    <option>Personal Accident</option>
                    <option>Motor Insurance</option>
                    <option>Health Insurance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date Range
                  </label>
                  <select className="w-full p-2 border rounded-lg">
                    <option>All Time</option>
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>Last 3 Months</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Customers Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Policy Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Premium
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {customers.map((customer, index) => (
                <motion.tr
                  key={customer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-lg"
                          src={customer.logo}
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">
                          {customer.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {customer.type}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.startDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.premium}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        customer.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.dueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      •••
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerPage;
