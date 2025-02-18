import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Download, MoreVertical, ArrowRight, FileText } from "lucide-react";
import CICLogo from "../../../assets/CICLogo.png";
import { useProgress } from "./ProgressContext";

const PaymentsHistory = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const urlFilter = searchParams.get("filter");
  const { progress } = useProgress();

  const [activeTab, setActiveTab] = useState(urlFilter || "all");
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [justUploaded, setJustUploaded] = useState(false);

  // Document Upload
  useEffect(() => {
    if (progress === 100 && urlFilter === "pending") {
      setJustUploaded(true);
      // Nav to payment
      const timer = setTimeout(() => {
        navigate("/user-dashboard/payments/payment");
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [progress, urlFilter]);

  // Sample
  const samplePayments = [
    {
      id: 1,
      policyName: "Motor Car Policy",
      provider: "CIC Group Insurance",
      providerLogo: CICLogo,
      paymentDate: "10 Jan, 2025",
      amount: "ksh. 20,000",
      status: "paid",
    },
    {
      id: 2,
      policyName: "Personal Accident",
      provider: "First Assurance",
      providerLogo: CICLogo,
      paymentDate: "10 Dec, 2024",
      amount: "ksh. 20,000",
      status: "paid",
    },
    {
      id: 3,
      policyName: "Health&Family",
      provider: "First Assurance",
      providerLogo: CICLogo,
      paymentDate: "10 Dec, 2024",
      amount: "ksh. 20,000",
      status: "pending",
      highlight: justUploaded,
    },
    {
      id: 4,
      policyName: "Motor Car Policy",
      provider: "First Assurance",
      providerLogo: CICLogo,
      paymentDate: "10 Dec, 2024",
      amount: "ksh. 20,000",
      status: "failed",
    },
  ];

  useEffect(() => {
    setPayments(samplePayments);

    if (urlFilter) {
      setActiveTab(urlFilter);
    }
  }, []);

  const filterPayments = (filter) => {
    setActiveTab(filter);
    setSearchParams({ filter: filter });

    if (filter === "all") {
      setFilteredPayments(payments);
    } else {
      const filtered = payments.filter(
        (payment) => payment.status === filter.toLowerCase().replace(" ", "")
      );
      setFilteredPayments(filtered);
    }
  };

  useEffect(() => {
    filterPayments(activeTab);
  }, [payments, activeTab]);

  const handlePayNow = (payment) => {
    if (payment.status === "pending") {
      navigate("/user-dashboard/payments/payment");
    }
  };

  const handleDownloadReceipt = () => {
    alert("Downloading receipt...");
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "paid":
        return (
          <span className="py-1 px-3 bg-green-500 text-white text-sm font-medium rounded-full">
            Paid
          </span>
        );
      case "pending":
        return (
          <span className="py-1 px-3 bg-yellow-500 text-white text-sm font-medium rounded-full">
            Pending
          </span>
        );
      case "failed":
        return (
          <span className="py-1 px-3 bg-red-500 text-white text-sm font-medium rounded-full">
            Failed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full mx-auto max-w-[1200px]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5">
        <div>
          <h1 className="text-xl font-bold text-gray-800">
            Your Payment History
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Track all your payment and pending payments
          </p>
        </div>

        <button
          onClick={handleDownloadReceipt}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center transition-colors self-end sm:self-auto"
        >
          <Download size={18} className="mr-2" />
          Download Receipt
        </button>
      </div>

      {/* Filter tabs */}
      <div className="border-b border-gray-200 mb-5">
        <div className="flex flex-nowrap overflow-x-auto hide-scrollbar">
          {["All", "Paid", "Pending", "Failed"].map((tab) => {
            const tabValue = tab.toLowerCase();
            return (
              <button
                key={tab}
                className={`py-3 px-2 whitespace-nowrap mr-8 ${
                  activeTab === tabValue
                    ? "text-blue-600 border-b-2 border-blue-500 font-medium"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => filterPayments(tabValue)}
              >
                {tab === "Pending" ? "Pending Payments" : tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Payments table */}
      <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-sm font-medium text-gray-500"
                >
                  Policy Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-sm font-medium text-gray-500"
                >
                  Payment Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-sm font-medium text-gray-500"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-sm font-medium text-gray-500"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-right text-sm font-medium text-gray-500"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPayments.map((payment) => (
                <tr
                  key={payment.id}
                  className={`${
                    payment.status === "pending"
                      ? "cursor-pointer hover:bg-blue-50"
                      : ""
                  } 
                    ${payment.highlight ? "bg-blue-50 animate-pulse" : ""}`}
                  onClick={() =>
                    payment.status === "pending" && handlePayNow(payment)
                  }
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-9 w-9 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
                        <img
                          src={payment.providerLogo}
                          alt={payment.provider}
                          className="h-8 w-8 object-contain"
                        />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {payment.policyName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {payment.provider}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {payment.paymentDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {payment.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(payment.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    {payment.status === "pending" ? (
                      <button
                        className="text-blue-600 hover:text-blue-800 flex items-center justify-end w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePayNow(payment);
                        }}
                      >
                        Pay Now <ArrowRight size={16} className="ml-1" />
                      </button>
                    ) : payment.status === "paid" ? (
                      <button
                        className="text-gray-600 hover:text-gray-800 flex items-center justify-end w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadReceipt();
                        }}
                      >
                        Receipt <FileText size={16} className="ml-1" />
                      </button>
                    ) : (
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredPayments.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-gray-500">
                No payments found for the selected filter
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default PaymentsHistory;
