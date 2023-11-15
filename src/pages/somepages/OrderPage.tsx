import { AiOutlineExport } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { FiFilter } from "react-icons/fi";
import Image from "@/assets/image.jpg";
import { Badge } from "antd";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useGetSellerOrdersQuery } from "@/api/sellerApiCalls";
import { IOrder } from "@/interface";
import { formatDate } from "@/utils/helpers";

const OrderPage = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);

  const { data: fetchedOrders } = useGetSellerOrdersQuery();

  useEffect(() => {
    setOrders((fetchedOrders as any)?.data?.result);
  }, [fetchedOrders]);

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-row justify-between gap-4 flex-wrap items-center bg-white p-3 rounded-lg">
        <div className="flex flex-row gap-3 flex-wrap">
          <button className="py-2 px-3 text-[14px] font-medium bg-[#DEC3D6]/90 text-shades-gray border border-[#DEC3D6] hover:bg-[#DEC3D6] hover:text-shades-white rounded-lg">
            All
          </button>
          <button className="py-2 px-3 text-[14px] font-medium border border-shades-gray/30 text-shades-gray hover:bg-[#DEC3D6] hover:border-[#DEC3D6] hover:text-shades-white rounded-lg">
            Shipped
          </button>
          <button className="py-2 px-3 text-[14px] font-medium border border-shades-gray/30 text-shades-gray hover:bg-[#DEC3D6] hover:border-[#DEC3D6] hover:text-shades-white rounded-lg">
            Cancelled
          </button>
          <button className="py-2 px-3 text-[14px] font-medium border border-shades-gray/30 text-shades-gray hover:bg-[#DEC3D6] hover:border-[#DEC3D6] hover:text-shades-white rounded-lg">
            Partial
          </button>
          <button className="py-2 px-3 text-[14px] font-medium border border-shades-gray/30 text-shades-gray hover:bg-[#DEC3D6] hover:border-[#DEC3D6] hover:text-shades-white rounded-lg">
            Paid
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
            placeholder="Search Orders"
          />
        </div>
        <button className="p-1 rounded-md bg-white border-2 border-shades-primary hover:bg-shades-primary hover:text-white">
          <FiFilter size="1.5rem" />
        </button>
      </div>

      {/* Table */}
      {orders?.length > 0 ? (
        <div className="flex w-full flex-col mt-3 overflow-x-scroll no_scrollbar">
          {/* Head */}
          <div className="min-w-max w-full flex flex-row gap-x-3 justify-between py-3 px-3 bg-shades-lightGray/90">
            <div className="min-w-[50px] max-w-[50px] w-full"></div>
            <div className="min-w-[120px] max-w-[120px] w-full flex items-center">
              Order No
            </div>
            <div className="min-w-[100px] max-w-[100px] w-full flex items-center">
              Date
            </div>
            <div className="min-w-[150px] max-w-[150px] w-full flex items-center">
              Customer
            </div>
            {/* <div className="min-w-[100px] max-w-[100px] w-full flex items-center">
              Paid
            </div> */}
            <div className="min-w-[120px] max-w-[120px] w-full flex items-center">
              Status
            </div>
            <div className="min-w-[50px] max-w-[50px] w-full flex items-center">
              Items
            </div>
            <div className="min-w-[110px] max-w-[110px] w-full flex items-center">
              Total
            </div>
            <div className="min-w-[20px] max-w-[20px] w-full flex items-center cursor-pointer">
              <BsThreeDotsVertical />
            </div>
          </div>
          {/* body */}
          <div className="w-full">
            {orders?.map((item) => (
              <div className="w-full flex flex-row gap-x-3 justify-between py-3 px-3 bg-shades-white my-1">
                <div className="min-w-[50px] max-w-[50px] w-full flex items-center">
                  <img src={Image} className="w-[45px] h-[45px] rounded-lg" />
                </div>
                <div className="min-w-[120px] max-w-[120px] w-full flex items-center">
                  {item?.amount}
                </div>
                <div className="min-w-[100px] max-w-[100px] w-full flex items-center">
                  {formatDate(item?.createdAt)}
                </div>
                <div className="min-w-[150px] max-w-[150px] w-full flex items-center">
                  Kelvin Mesh
                </div>
                <div className="min-w-[100px] max-w-[100px] w-full flex items-center">
                  <span className="py-2 px-2.5 rounded-md bg-shades-lightGreen text-status-success">
                    <Badge status="success" /> {item?.status}
                  </span>
                </div>
                {/* <div className="min-w-[120px] max-w-[120px] w-full flex items-center">
                  <span className="py-2 px-2.5 rounded-md bg-shades-lightGreen text-status-success">
                    <Badge status="success" /> Shipped
                  </span>
                </div> */}
                <div className="min-w-[50px] max-w-[50px] w-full flex items-center">
                  {item?.orderItem?.length || 0}
                </div>
                <div className="min-w-[110px] max-w-[110px] w-full flex items-center">
                  {item?.amount}
                </div>
                <div className="min-w-[20px] max-w-[20px] w-full flex items-center cursor-pointer">
                  <BsThreeDotsVertical />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="min-h-[30vh] w-full flex flex-col items-center justify-center bg-white rounded-lg mt-3">
          <h2 className="text-[18px] font-semibold">No orders Yet!</h2>
          <p>Your history will appear here when you have one</p>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
