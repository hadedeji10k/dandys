import React, { useState } from "react";
import SellerDashboardLayoutSidebar from "./Sidebar";
import SellerDashboardLayoutHeader from "./Header";
import MobileSidebar from "./MobileSidebar";

interface Props {
  children: React.ReactNode | JSX.Element;
}

const SellerDashboardLayout = ({ children }: Props) => {
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  return (
    <div className={`flex flex-col h-screen bg-gray-50`}>
      <SellerDashboardLayoutHeader
        setSidebarIsOpen={setSidebarIsOpen}
        sidebarIsOpen={sidebarIsOpen}
      />

      <div className="flex flex-row w-full justify-between">
        <div className="md:flex hidden">
        <SellerDashboardLayoutSidebar />
        </div>
        <div className="bg-[#F0F0F0] w-full md:w-[calc(100%-250px)] min-h-[calc(100vh-100px)] p-6">
          {children}
        </div>
      </div>
      <MobileSidebar
        setSidebarIsOpen={setSidebarIsOpen}
        sidebarIsOpen={sidebarIsOpen}
      />
    </div>
  );
};

export default SellerDashboardLayout;
