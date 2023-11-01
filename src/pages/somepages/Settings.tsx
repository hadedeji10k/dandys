import React from "react";
import { Link } from "react-router-dom";

import TabComponent from "@/component/Tab";
import PricingCard from "../SellerDashboard/Settings/PricingCard";

const Settings = () => {
  return (
    <div className="w-full">
    <TabComponent/>
      <div className="container px-5 py-12   space-y-5">
        <div className="flex flex-wrap items-end justify-start w-full duration-500 ease-in-out transform bg-white border-2 hover:border-4 border-[#903677]  rounded-lg shadow-md hover:shadow-2xl transition-transform hover:scale-95 group">
          <div className="w-full xl:w-1/4 md:w-1/4 ">
            <div className="relative flex flex-col h-full py-8 px-4 text-center md:text-left">
              <h2 className="mb-4 font-bold  text-indigo-900 title-font">
                Current plan Basic Trial <span className="border-b rounded-md bg-slate-500">Monthly</span>
              </h2>

              <p className="flex items-center mb-2 text-lg font-normal tracking-wide text-indigo-800 justify-center md:justify-start">
                Manage your billing and payment details
              </p>
            </div>
          </div>
          <div className="w-full xl:w-1/4 md:w-1/4 lg:ml-auto">
            <div className="relative flex flex-col h-full p-8">
              <h1 className="flex items-end mx-auto text-5xl lg:text-5xl sm:text-4xl font-black leading-none text-gray-500 ">
                $1.99<span className="text-lg">/month</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
      <PricingCard/>
    </div>
  );
};

export default Settings;
