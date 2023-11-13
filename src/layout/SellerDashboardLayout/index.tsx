import React from "react";
import SellerDashboardLayoutSidebar from "./Sidebar";
import SellerDashboardLayoutHeader from "./Header";

interface Props {
  children: React.ReactNode | JSX.Element;
}

const SellerDashboardLayout = ({ children }: Props) => {

  return (
    <div className={`flex flex-col h-screen bg-gray-50`}>
      <SellerDashboardLayoutHeader />

      <div className="flex flex-row w-full justify-between">
        <SellerDashboardLayoutSidebar />
        <div className="bg-[#F0F0F0] w-[calc(100%-250px)] min-h-[calc(100vh-100px)] p-6">{children}</div>
      </div>
    </div>
  );
};

export default SellerDashboardLayout;
