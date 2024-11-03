"use client";

import React, { useState } from "react";
import TopBar from "@/components/ui/Element/Topbar/TopBar";
import Sidebar from "./ui/Element/Sidebar/Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [expandSidebar, setExpandSidebar] = useState<boolean>(true);

  return (
    <div className="h-screen w-screen overflow-hidden relative">
        <TopBar />
      <div className="flex flex-1">
        <Sidebar
          expandSidebar={expandSidebar}
          setExpandSidebar={setExpandSidebar}
        />
        <div className="flex-1 sm:ml-0 ml-14 py-4 overflow-auto bg-white h-[calc(100vh-5rem)]">
            {children}
        </div>
      </div>

      {/* Overlay for small screens when sidebar is expanded */}
      {expandSidebar && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 sm:hidden"
          onClick={() => setExpandSidebar(false)} // Close sidebar on clicking the overlay
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;
