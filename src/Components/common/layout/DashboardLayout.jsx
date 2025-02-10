import React, { useState, Suspense } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);

  return (
    <div className="h-screen bg-gray-100 flex">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 overflow-hidden">
        <TopBar onMenuClick={() => setIsSidebarOpen(true)} />
        <Suspense fallback={<div>Loading...</div>}>
          <main className="overflow-auto h-[calc(100vh-64px)]">{children}</main>
        </Suspense>
      </div>
    </div>
  );
};

export default DashboardLayout;
