import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  AlertCircle,
  ChevronDown,
  X,
  Calendar,
  DollarSign,
} from "lucide-react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../../Components/common/layout/DashboardLayout";
import { demoPolicies } from "../../../data/demoData";

const PoliciesPage = () => {
  const { category } = useParams();
  const [policies, setPolicies] = useState([]);
  const [filteredPolicies, setFilteredPolicies] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    status: "all",
    type: "all",
    premium: "all",
    date: "all",
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const itemsPerPage = 10;

  // demo data
  useEffect(() => {
    setPolicies(demoPolicies);
    setFilteredPolicies(demoPolicies);
  }, []);

    useEffect(() => {
      if (category) {
        setFilters((prev) => ({
          ...prev,
          type: category.charAt(0).toUpperCase() + category.slice(1),
        }));
      }
    }, [category]);

  // Search and filter 
  useEffect(() => {
    let result = [...policies];

    if (search) {
      result = result.filter(
        (policy) =>
          policy.name.toLowerCase().includes(search.toLowerCase()) ||
          policy.type.toLowerCase().includes(search.toLowerCase()) ||
          policy.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filters.status !== "all") {
      result = result.filter((policy) => policy.status === filters.status);
    }

    if (filters.type !== "all") {
      result = result.filter((policy) => policy.type === filters.type);
    }

    if (filters.premium !== "all") {
      const amount = parseInt(policy.premium.match(/\d+/)[0]);
      switch (filters.premium) {
        case "low":
          result = result.filter((policy) => amount < 20000);
          break;
        case "medium":
          result = result.filter((policy) => amount >= 20000 && amount < 40000);
          break;
        case "high":
          result = result.filter((policy) => amount >= 40000);
          break;
      }
    }

    setFilteredPolicies(result);
    setCurrentPage(1);
  }, [search, filters, policies]);

  const paginatedPolicies = filteredPolicies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredPolicies.length / itemsPerPage);

  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = (policy) => {
    setSelectedPolicy(policy);
    setIsEditModalOpen(true);
  };

  const handleView = (policy) => {
    setSelectedPolicy(policy);
    setIsViewModalOpen(true);
  };

  const handleDelete = (policyId) => {
    if (window.confirm("Are you sure you want to delete this policy?")) {
      setPolicies(policies.filter((p) => p.id !== policyId));
    }
  };

  const handleSaveEdit = (updatedPolicy) => {
    setPolicies(
      policies.map((p) => (p.id === updatedPolicy.id ? updatedPolicy : p))
    );
    setIsEditModalOpen(false);
  };
  
  const handleExport = async () => {
    setIsExporting(true);
    // Simulate export 
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const csv = [
      [
        "Policy Name",
        "Type",
        "Premium",
        "Status",
        "Beneficiaries",
        "Last Updated",
      ],
      ...filteredPolicies.map((policy) => [
        policy.name,
        policy.type,
        policy.premium,
        policy.status,
        policy.beneficiaries,
        new Date(policy.updatedAt).toLocaleDateString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "policies.csv";
    a.click();
    window.URL.revokeObjectURL(url);
    setIsExporting(false);
  };

  const AdvancedFilters = () => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg p-4 z-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Premium Range
          </label>
          <select
            className="w-full p-2 border rounded-lg"
            value={filters.premium}
            onChange={(e) =>
              setFilters({ ...filters, premium: e.target.value })
            }
          >
            <option value="all">All Ranges</option>
            <option value="low">&lt; 20,000</option>
            <option value="medium">20,000 - 40,000</option>
            <option value="high">&gt; 40,000</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Risk Level
          </label>
          <select
            className="w-full p-2 border rounded-lg"
            value={filters.risk}
            onChange={(e) => setFilters({ ...filters, risk: e.target.value })}
          >
            <option value="all">All Levels</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date Range
          </label>
          <select
            className="w-full p-2 border rounded-lg"
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>
    </motion.div>
  );

  return (
    <DashboardLayout>
      <div className="p-6">

        {/* Enhanced Filters Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 relative">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search policies..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <select
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500"
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
                <option value="pending">Pending</option>
              </select>
              <select
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500"
                value={filters.type}
                onChange={(e) =>
                  setFilters({ ...filters, type: e.target.value })
                }
              >
                <option value="all">All Types</option>
                <option value="Personal Accident">Personal Accident</option>
                <option value="Health">Health</option>
                <option value="Motor">Motor</option>
                <option value="Property">Property</option>
              </select>
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="px-4 py-2 border border-gray-200 rounded-lg flex items-center space-x-2 hover:bg-gray-50"
              >
                <Filter size={18} />
                <span>More Filters</span>
                <ChevronDown
                  size={16}
                  className={`transform transition-transform ${
                    showAdvancedFilters ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {showAdvancedFilters && <AdvancedFilters />}
          </AnimatePresence>
        </div>

        {/* Policies Table */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                    Policy Name
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                    Type
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                    Premium
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                    Beneficiaries
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                    Last Updated
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedPolicies.map((policy) => (
                  <motion.tr
                    key={policy.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                          <AlertCircle className="text-blue-500" size={20} />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {policy.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {policy.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{policy.type}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {policy.premium}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          policy.status === "active"
                            ? "bg-green-100 text-green-800"
                            : policy.status === "expired"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {policy.status.charAt(0).toUpperCase() +
                          policy.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {policy.beneficiaries}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(policy.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleView(policy)}
                          className="text-gray-400 hover:text-blue-500"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleEdit(policy)}
                          className="text-gray-400 hover:text-blue-500"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(policy.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Enhanced Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredPolicies.length)} of{" "}
            {filteredPolicies.length} policies
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PoliciesPage;
