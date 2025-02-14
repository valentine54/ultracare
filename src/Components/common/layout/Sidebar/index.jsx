import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
  ChevronDown,
  Shield,
  Heart,
  Car,
  UserCheck,
} from "lucide-react";

const SidebarItem = ({
  icon: Icon,
  label,
  active,
  onClick,
  isCollapsed,
  hasDropdown,
  isOpen,
  onToggle,
  children,
}) => {
  const itemContent = (
    <motion.button
      whileHover={{ x: 2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        flex items-center justify-between w-full p-3 
        ${hasDropdown ? "rounded-t-lg" : "rounded-lg"} 
        transition-colors
        ${
          active || (hasDropdown && isOpen)
            ? "bg-blue-500 text-white"
            : "text-gray-600 hover:bg-gray-100"
        }
      `}
      title={isCollapsed ? label : ""}
    >
      <div className="flex items-center space-x-3">
        <Icon size={20} className="flex-shrink-0" />
        {!isCollapsed && <span className="font-medium">{label}</span>}
      </div>
      {hasDropdown && !isCollapsed && (
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      )}
    </motion.button>
  );

  return (
    <div className="relative">
      {itemContent}
      {hasDropdown && !isCollapsed && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-1 mt-1">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

const PolicyCategory = ({ icon: Icon, label, active, onClick }) => (
  <motion.button
    whileHover={{ x: 2 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`
      flex items-center w-full p-3 rounded-lg
      border border-gray-200 
      transition-colors
      ${
        active
          ? "bg-blue-500 text-white border-transparent"
          : "bg-gray-50 text-gray-600 hover:bg-gray-100"
      }
    `}
  >
    <div className="flex items-center space-x-3">
      <Icon
        size={20}
        className={`flex-shrink-0 ${active ? "text-white" : "text-gray-500"}`}
      />
      <span
        className={`font-medium ${active ? "text-white" : "text-gray-600"}`}
      >
        {label}
      </span>
    </div>
  </motion.button>
);

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isPoliciesOpen, setIsPoliciesOpen] = useState(
    location.pathname.includes("policies")
  );

  const policyCategories = [
    { path: "/policies/health", icon: Heart, label: "Health" },
    { path: "/policies/personal", icon: UserCheck, label: "Personal" },
    { path: "/policies/motor", icon: Car, label: "Motor" },
  ];

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile && !isOpen) setIsOpen(true);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsOpen, isOpen]);

  const handlePolicyClick = (categoryPath) => {
    navigate(categoryPath);
    if (isMobile) setIsOpen(false);
  };

  const baseMenuItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    {
      path: "/policies",
      icon: FileText,
      label: "Policies",
      hasDropdown: true,
      categories: policyCategories,
    },
    { path: "/customers", icon: Users, label: "Customers" },
    { path: "/claims", icon: ClipboardList, label: "Claims & Payment" },
    { path: "/settings", icon: Settings, label: "Settings" },
    { path: "/notifications", icon: Bell, label: "Notifications" },
  ];

  return (
    <>
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <motion.div
        initial={false}
        animate={{
          width: isCollapsed ? 80 : 256,
          x: !isMobile || isOpen ? 0 : -256,
        }}
        className="fixed lg:static left-0 top-0 h-full bg-white shadow-lg z-50 transition-all duration-300"
      >
        <div className="flex items-center justify-between p-6 border-b">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
              <span className="text-xl font-bold">Insure</span>
            </div>
          )}

          {isMobile ? (
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X size={20} />
            </button>
          ) : (
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

        <nav className="p-4 space-y-2">
          {baseMenuItems.map((item) => (
            <SidebarItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              active={location.pathname === item.path}
              isCollapsed={isCollapsed}
              hasDropdown={item.hasDropdown}
              isOpen={isPoliciesOpen && item.hasDropdown}
              onClick={() => {
                if (item.hasDropdown) {
                  setIsPoliciesOpen(!isPoliciesOpen);
                  if (!isPoliciesOpen) {
                    navigate("/policies");
                  }
                } else {
                  navigate(item.path);
                  if (isMobile) setIsOpen(false);
                }
              }}
            >
              {item.categories?.map((category) => (
                <PolicyCategory
                  key={category.path}
                  icon={category.icon}
                  label={category.label}
                  active={location.pathname === category.path}
                  onClick={() => handlePolicyClick(category.path)}
                />
              ))}
            </SidebarItem>
          ))}
        </nav>
      </motion.div>
    </>
  );
};

export default Sidebar;
