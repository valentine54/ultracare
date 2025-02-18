import React, { useState, useEffect } from "react";
import {
  useLocation,
  useNavigate,
  Outlet,
  Link,
  useSearchParams,
} from "react-router-dom";
import {
  MdDashboard,
  MdPolicy,
  MdPayment,
  MdSettings,
  MdNotifications,
} from "react-icons/md";
import { FaBell } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../../assets/logo.png";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Mobile sidebar 
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Close Mobile
  useEffect(() => {
    if (sidebarOpen) {
      setSidebarOpen(false);
    }

    // Check filter params -> Nav
    if (
      location.pathname === "/user-dashboard/payments" &&
      searchParams.get("filter")
    ) {
    }
  }, [location.pathname, searchParams]);

  const navItems = [
    {
      to: "/user-dashboard",
      icon: <MdDashboard className="text-lg" />,
      label: "Dashboard",
      exact: true,
    },
    {
      to: "/user-dashboard/policy",
      icon: <MdPolicy className="text-lg" />,
      label: "Policy",
    },
    {
      to: "/user-dashboard/payments",
      icon: <MdPayment className="text-lg" />,
      label: "Payments",
      highlight: location.pathname.includes("/user-dashboard/payments"),
    },
    {
      to: "/user-dashboard/settings",
      icon: <MdSettings className="text-lg" />,
      label: "Settings",
    },
    {
      to: "/user-dashboard/notifications",
      icon: <MdNotifications className="text-lg" />,
      label: "Notifications",
    },
  ];

  // Nav Items Active
  const isActive = (item) => {
    if (item.highlight) {
      return item.highlight;
    }
    if (item.exact) {
      return location.pathname === item.to;
    }
    return location.pathname.startsWith(item.to);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Mobile sidebar */}
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
          <Link to="/">
            <img src={logo} alt="Insure" className="h-10" />
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center p-3 rounded-lg transition-colors ${
                isActive(item)
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="bg-white p-4 shadow-sm flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="lg:hidden mr-4 text-gray-500"
            >
              <FiMenu size={24} />
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
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
