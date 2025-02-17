import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { FiMenu, FiX } from "react-icons/fi";
import { MdPolicy, MdPayment, MdSettings, MdNotifications, MdDashboard } from "react-icons/md";
import logo from "../../../assets/logo.png";

const Navigation = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation(); // Get current route

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar (Starts from Dashboard) */}
      <aside
        className={`fixed top-16 left-0 w-64 bg-white p-5 shadow-lg h-full z-50 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static transition-transform duration-300 ease-in-out`}
      >
        {/* Sidebar Navigation */}
        <nav className="space-y-2 mt-4">
          {[
            { to: "/dashboard", icon: <MdDashboard />, label: "Dashboard" },
            { to: "/policy", icon: <MdPolicy />, label: "Policy" },
            { to: "/payments", icon: <MdPayment />, label: "Payments" },
            { to: "/settings", icon: <MdSettings />, label: "Settings" },
            { to: "/notifications", icon: <MdNotifications />, label: "Notifications" }
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center p-2 rounded transition ${
                location.pathname === item.to
                  ? "text-blue-600 bg-blue-100"
                  : "hover:bg-gray-200"
              }`}
            >
              {item.icon} <span className="ml-2">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Top Navbar (Full Width) */}
        <div className="bg-white p-4 shadow-md flex justify-between items-center fixed top-0 left-0 w-full z-50">
          {/* Left Side: Logo & Search */}
          <div className="flex items-center space-x-4">
            {/* Sidebar Toggle for Mobile */}
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-2xl">
              <FiMenu />
            </button>
            
            {/* Logo */}
            <img src={logo} alt="Logo" className="h-10" />

            {/* Search Bar */}
            <div className="hidden md:flex items-center border p-2 rounded-md bg-gray-100 w-96">
              <BiSearch className="text-gray-600" />
              <input
                type="text"
                placeholder="Search here..."
                className="ml-2 outline-none bg-transparent w-full"
              />
            </div>
          </div>

          {/* Right Side: Notifications & User Info */}
          <div className="flex items-center space-x-6">
            <FaBell className="text-gray-600 text-xl cursor-pointer" />
            <div className="flex items-center space-x-3">
              <img
                src="https://via.placeholder.com/40" // Replace with real user profile image
                alt="User"
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="text-sm font-semibold">Sara Cynthia</p>
                <p className="text-xs text-gray-500">Saracynthia5@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content (Push Down) */}
        <div className="pt-20 p-4">
          {/* Your page content will be placed here */}
          <h1 className="text-xl font-semibold">Car Insurance Quote In Progress</h1>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
