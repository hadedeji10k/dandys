import { Badge } from "antd";
import { AiOutlineExport } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { FiFilter } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import Button from "@/component/Button";
import { RiMastercardLine } from "react-icons/ri";
import { ISellerInformation } from "@/interface";
import { PlanAmount } from "@/utils/constant";
import { formatDate } from "@/utils/helpers";

interface IProps {
  sellerInformation: ISellerInformation;
  handleTabChange: (id: number) => void;
}


const Billing = ({ sellerInformation, handleTabChange }: IProps) => {
  return (
    <div>
      <div className="w-full flex flex-row justify-betweeen gap-3">
        <div className="w-full px-5 pt-6 pb-8 rounded-lg bg-white">
          <div className="flex flex-row gap-2 flex-wrap items-center">
            <h3 className="text-[18px] font-semibold">Billing</h3>
            <h4 className="text-[14px] font-semibold">
              {sellerInformation?.currentPlan} plan
            </h4>
            <div className="px-3 py-0.5 rounded-[20px] text-shades-primary bg-shades-primary/20 text-[12px]">
              {sellerInformation?.currentPlan === "FREE"
                ? "Trial"
                : "Monthly"}
            </div>
          </div>

          <h3 className="text-[14px] mt-2 font-light">
            Manage your billing and payment details
          </h3>

          <h3 className="font-semibold md:text-4xl sm:text-2xl text-lg mb-6 mt-8">
            {PlanAmount[sellerInformation?.currentPlan]}{" "}
            <small className="sm:text-[16px] text-[12px]">/month</small>
          </h3>

          <p className="">
            Last payment Date:{" "}
            {formatDate(sellerInformation?.lastSubscriptionDate)}
          </p>
          <p className="">
            Expiry Date: {formatDate(sellerInformation?.expiryDate)}
          </p>

          <h4
            onClick={() => handleTabChange(2)}
            className="flex flex-row gap-2 items-center text-shades-primary font-medium mt-8 text-[14px] cursor-pointer"
          >
            Change plan <IoIosArrowForward />
          </h4>
        </div>
        <div className="w-full px-5 pt-6 pb-8 rounded-lg bg-white">
          <div className="flex flex-row gap-2 flex-wrap items-center">
            <h3 className="text-[18px] font-semibold">Payment method</h3>
          </div>

          <h3 className="text-[14px] mt-2 font-light">
            Change your payment method
          </h3>

          <div className="flex flex-col mt-6 border border-shades-lightGray rounded-lg p-3">
            <div className="flex flex-row gap-3">
              <div>
                <RiMastercardLine size="1.5rem" />
              </div>
              <div>
                <p className="font-normal mb-1">5634 **** **** 2135</p>
                <p className="font-normal mb-2">08 / 2024</p>
                <p className="font-normal">Evans Okere</p>
              </div>
            </div>
            <div className="mt-4">
              <Button
                className={
                  "w-full bg-white border-shades-primary border !py-1 !text-shades-primary hover:!text-shades-white px-4"
                }
                type={"button"}
                title={"Edit"}
                disabled={false}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-between gap-4 flex-wrap items-center bg-white p-3 rounded-lg mt-4">
        <div className="flex flex-row gap-3 flex-wrap">
          <button className="py-2 px-3 text-[14px] font-medium bg-[#DEC3D6]/90 text-shades-gray border border-[#DEC3D6] hover:bg-[#DEC3D6] hover:text-shades-white rounded-lg">
            All
          </button>
          <button className="py-2 px-3 text-[14px] font-medium border border-shades-gray/30 text-shades-gray hover:bg-[#DEC3D6] hover:border-[#DEC3D6] hover:text-shades-white rounded-lg">
            Successful
          </button>
          <button className="py-2 px-3 text-[14px] font-medium border border-shades-gray/30 text-shades-gray hover:bg-[#DEC3D6] hover:border-[#DEC3D6] hover:text-shades-white rounded-lg">
            Pending
          </button>
          <button className="py-2 px-3 text-[14px] font-medium border border-shades-gray/30 text-shades-gray hover:bg-[#DEC3D6] hover:border-[#DEC3D6] hover:text-shades-white rounded-lg">
            Failed
          </button>
        </div>
        <div className="flex flex-row gap-3 flex-wrap">
          <button className="text-shades-secondary py-2 px-3 rounded-md text-[14px] font-semibold border-2 border-shades-secondary hover:bg-shades-secondary hover:text-white transition-all ease-in-out flex flex-row items-center gap-x-2">
            <AiOutlineExport /> Export
          </button>
        </div>
      </div>

      <div className="w-full mt-3 flex flex-row justify-between gap-x-3 items-center bg-white py-2 px-3 rounded-lg text-shades-primary">
        <div className="w-full bg-shades-secondary/[12%] h-8 rounded-lg px-2 flex flex-row items-center gap-x-2 ">
          <BiSearch size="1.5rem" />
          <input
            type="text"
            className="bg-transparent w-full border-none outline-none placeholder:text-shades-primary"
            placeholder="Search transaction"
          />
        </div>
        <button className="p-1 rounded-md bg-white border-2 border-shades-primary hover:bg-shades-primary hover:text-white">
          <FiFilter size="1.5rem" />
        </button>
      </div>
      {/* Table */}
      <div className="flex w-full flex-col mt-3 overflow-x-scroll no_scrollbar">
        {/* Head */}
        <div className="min-w-max w-full flex flex-row gap-x-3 justify-between py-3 px-3 bg-shades-lightGray/90">
          <div className="min-w-[120px] max-w-[120px] w-full flex items-center">
            ID
          </div>
          <div className="min-w-[100px] max-w-[100px] w-full flex items-center">
            Billing Date
          </div>
          <div className="min-w-[150px] max-w-[150px] w-full flex items-center">
            Amount
          </div>
          <div className="min-w-[100px] max-w-[100px] w-full flex items-center">
            Plan
          </div>

          <div className="min-w-[120px] max-w-[120px] w-full flex items-center">
            Reason
          </div>
          <div className="min-w-[100px] max-w-[100px] w-full flex items-center">
            Status
          </div>
          <div className="min-w-[20px] max-w-[20px] w-full flex items-center cursor-pointer">
            <BsThreeDotsVertical />
          </div>
        </div>
        {/* body */}
        <div className="w-full">
          <div className="w-full flex flex-row gap-x-3 justify-between py-3 px-3 bg-shades-white my-1">
            <div className="min-w-[120px] max-w-[120px] w-full flex items-center">
              #12345
            </div>
            <div className="min-w-[100px] max-w-[100px] w-full flex items-center">
              16/10/2023
            </div>
            <div className="min-w-[150px] max-w-[150px] w-full flex items-center">
              Kelvin Mesh
            </div>
            <div className="min-w-[100px] max-w-[100px] w-full flex items-center">
              <span className="py-2 px-2.5 rounded-md bg-shades-lightGreen text-status-success">
                <Badge status="success" /> Paid
              </span>
            </div>

            <div className="min-w-[120px] max-w-[120px] w-full flex items-center">
              Plan Upgrade
            </div>
            <div className="min-w-[120px] max-w-[120px] w-full flex items-center">
              <span className="py-2 px-2.5 rounded-md bg-shades-lightGreen text-status-success">
                <Badge status="success" /> Shipped
              </span>
            </div>
            <div className="min-w-[20px] max-w-[20px] w-full flex items-center cursor-pointer">
              <BsThreeDotsVertical />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
