import React, { useState } from "react";
import Sidebar from "../layout/Sidebar/index";
import TopBar from "../layout/TopBar/index";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 overflow-hidden">
        <TopBar
          onMenuClick={() => setIsSidebarOpen(true)}
          userName="Sara Cynthia"
          userEmail="SaraCynthia5@gmail.com"
        />

        <main className="h-[calc(100vh-64px)] overflow-y-auto">
          <div className="container mx-auto p-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
