import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Users,
  ClipboardList,
  Settings,
  Bell,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

const SidebarItem = ({ icon: Icon, label, active, onClick, isCollapsed }) => (
  <motion.button
    whileHover={{ x: 4 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex items-center ${
      isCollapsed ? "justify-center" : "space-x-3"
    } w-full p-3 rounded-lg transition-colors ${
      active ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-100"
    }`}
    title={isCollapsed ? label : ""}
  >
    <Icon size={20} />
    {!isCollapsed && <span className="font-medium">{label}</span>}
  </motion.button>
);

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile && !isOpen) {
        setIsOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsOpen, isOpen]);

  const menuItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/policies", icon: FileText, label: "All Policies" },
    { path: "/customers", icon: Users, label: "Customers" },
    { path: "/claims", icon: ClipboardList, label: "Claims & Payment" },
    { path: "/settings", icon: Settings, label: "Settings" },
    { path: "/notifications", icon: Bell, label: "Notifications" },
  ];

  const sidebarWidth = isCollapsed ? "w-20" : "w-64";

  return (
    <>
      {/* Mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          width: isCollapsed ? 80 : 256,
          x: !isMobile || isOpen ? 0 : -256,
        }}
        className={`fixed lg:static left-0 top-0 h-full bg-white shadow-lg z-50 transition-all duration-300`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
              <span className="text-xl font-bold">Insurē</span>
            </div>
          )}

          {/* Mobile close button */}
          {isMobile ? (
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X size={20} />
            </button>
          ) : (
            /* Desktop collapse button */
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 hover:bg-gray-100 rounded-lg mx-auto"
            >
              {isCollapsed ? (
                <ChevronRight size={20} />
              ) : (
                <ChevronLeft size={20} />
              )}
            </button>
          )}
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              active={location.pathname === item.path}
              isCollapsed={isCollapsed}
              onClick={() => {
                navigate(item.path);
                if (isMobile) {
                  setIsOpen(false);
                }
              }}
            />
          ))}
        </nav>
      </motion.div>
    </>
  );
};

export default Sidebar;
