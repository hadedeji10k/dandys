import React, { useState } from "react";
import MobileSidebar from "./MobileSidebar";
import BuyerDashboardLayoutHeader from "./BuyerHeader";
import Footer from "./Footer";

interface Props {
  children: React.ReactNode | JSX.Element;
}

const BuyerDashboardLayout = ({ children }: Props) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  return (
    <div className={`flex flex-col h-screen bg-gray-50`}>
      <BuyerDashboardLayoutHeader
        setSidebarIsOpen={setSidebarIsOpen}
        sidebarIsOpen={sidebarIsOpen}
      />

      <div className="flex flex-col w-full">
        <div className="bg-[#F0F0F0] w-full min-h-[calc(100vh-100px)] p-2">
          {children}
        </div>
        <div>
          <Footer />
        </div>
      </div>
      
      <MobileSidebar
        setSidebarIsOpen={setSidebarIsOpen}
        sidebarIsOpen={sidebarIsOpen}
      />
    </div>
  );
};

export default BuyerDashboardLayout;
