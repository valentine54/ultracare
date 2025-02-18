import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { FiMenu, FiX } from "react-icons/fi";
import {
  MdPolicy,
  MdPayment,
  MdSettings,
  MdNotifications,
  MdDashboard,
} from "react-icons/md";
import logo from "../../../assets/logo.png";
import { Routes, Route } from "react-router-dom";


import UserDashboard from "./UserDashboard";
import UploadDocuments from "./UploadDocuments";
import PaymentsSection from "./PaymentsSection";
// import DashboardPaymentPage from '../Dashboard/DashboardPayment/'

import DashboardPaymentPage from "../Dashboard/DashboardPayment/PaymentPage";
import DashboardMpesaPayment from "../Dashboard/DashboardPayment/MpesaPayment";

const Navigation = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      to: "/user-dashboard",
      icon: <MdDashboard className="text-lg" />,
      label: "Dashboard",
    },
    {
      to: "/user-dashboard/payments",
      icon: <MdPayment className="text-lg" />,
      label: "Payments",
    },
    {
      to: "/settings",
      icon: <MdSettings className="text-lg" />,
      label: "Settings",
    },
    {
      to: "/notifications",
      icon: <MdNotifications className="text-lg" />,
      label: "Notifications",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 w-64 bg-white shadow-lg h-full z-50 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static transition-transform duration-300 ease-in-out overflow-y-auto`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b">
          <img src={logo} alt="Logo" className="h-10" />
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.to ||
              (location.pathname.startsWith(item.to) &&
                item.to !== "/user-dashboard") ||
              (item.to === "/user-dashboard" &&
                location.pathname === "/user-dashboard");

            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-100 text-blue-600 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="bg-white p-4 shadow-sm flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-2xl"
            >
              {sidebarOpen ? <FiX /> : <FiMenu />}
            </button>
            <div className="hidden md:flex items-center border rounded-md bg-gray-100 px-3 py-2">
              <BiSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none ml-2 w-64"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2">
              <FaBell className="text-gray-500" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3">
              <img
                src="https://via.placeholder.com/40"
                alt="User"
                className="w-8 h-8 rounded-full"
              />
              <div className="hidden md:block">
                <p className="text-sm font-medium">Sara Cynthia</p>
                <p className="text-xs text-gray-500">Saracynthia5@gmail.com</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default Navigation;
