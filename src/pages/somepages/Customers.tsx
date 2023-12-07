import { useNavigate } from "react-router-dom";
import { AiOutlineExport } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { FiFilter } from "react-icons/fi";
import { useEffect, useState } from 'react';
import { useGetSellerCustomersQuery } from "@/api/sellerApiCalls";
import { ICustomer } from "@/interface";
import { Popover } from "antd";
import { BsThreeDotsVertical } from "react-icons/bs";
import Image from "@/assets/image.jpg";


const Customers= () => {
  const navigate = useNavigate();
  
  const [customers, setCustomers] = useState<ICustomer[]>([]);

  const { data: fetchedCustomers, error: _ } = useGetSellerCustomersQuery();

  useEffect(() => {
      setCustomers((fetchedCustomers as any)?.data?.result);
  }, [fetchedCustomers]);
  
  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-row justify-end gap-4 flex-wrap items-center bg-white p-3 rounded-lg">
        {/* <div className="flex flex-row gap-3 flex-wrap">
          <button className="py-2 px-5 text-[14px] font-medium bg-[#903677]  border border-[#DEC3D6] hover:bg-[#DEC3D6] text-shades-white rounded-lg">
            All
          </button>
          <button className="py-2 px-3 text-[14px] font-medium border border-shades-gray/30 text-shades-gray hover:bg-[#DEC3D6] hover:border-[#DEC3D6] hover:text-shades-white rounded-lg">
            Wholesalers
          </button>
          <button className="py-2 px-3 text-[14px] font-medium border border-shades-gray/30 text-shades-gray hover:bg-[#DEC3D6] hover:border-[#DEC3D6] hover:text-shades-white rounded-lg">
            Retailers
          </button>
        </div> */}
        <div className="flex flex-row gap-3 flex-wrap">
          <button className="text-shades-secondary py-2 px-3 rounded-md text-[14px] font-semibold border-2 border-shades-secondary hover:bg-shades-secondary hover:text-white transition-all ease-in-out flex flex-row items-center gap-x-4">
            <AiOutlineExport size="1.2rem" /> Export
          </button>
        </div>
      </div>
      <div className="w-full mt-3 flex flex-row justify-between gap-x-3 items-center bg-white py-2 px-3 rounded-lg text-shades-primary">
        <div className="w-full bg-shades-secondary/[12%] h-8 rounded-lg px-2 flex flex-row items-center gap-x-2 ">
          <BiSearch size="1.5rem" />
          <input
            type="text"
            className="bg-transparent w-full border-none outline-none placeholder:text-shades-primary"
            placeholder="Search customers"
          />
        </div>
        <button className="p-1 rounded-md bg-white border-2 border-shades-primary hover:bg-shades-primary hover:text-white">
          <FiFilter size="1.5rem" />
        </button>
      </div>

      {/* Table */}
      {customers?.length > 0 ? (
        <div className="flex w-full flex-col mt-3 overflow-x-scroll font-medium no_scrollbar bg-white rounded-lg mb-5">
          {/* Head */}
          <div className="min-w-max w-full flex flex-row gap-x-3 justify-between py-3 px-3 bg-shades-lightGray/90">
            <div className="min-w-[50px] max-w-[50px] w-full"></div>
            <div className="min-w-[200px] max-w-[200px] w-full flex items-center text-[14px]">
              Name
            </div>
            <div className="min-w-[100px] max-w-[100px] w-full flex items-center text-[14px]">
              No. of Orders
            </div>
            <div className="min-w-[120px] max-w-[120px] w-full flex items-center text-[14px]">
              Spent
            </div>
            <div className="min-w-[40px] max-w-[40px] w-full flex items-center text-[14px] cursor-pointer">
              <BsThreeDotsVertical size="1.2rem" />
            </div>
          </div>
          {/* body */}
          <div className="w-full mb-2">
            {customers?.map((item) => (
              <div className="w-full flex flex-row gap-x-3 justify-between py-2.5 px-3 bg-shades-white/80 my-1 border-b-2 border-shades-lightGray">
                <div className="min-w-[50px] max-w-[50px] w-full flex items-center">
                  <img src={Image} className="w-[45px] h-[45px] rounded-lg" />
                </div>
                <div className="min-w-[200px] max-w-[200px] w-full flex items-center text-[14px]">
                  {item?.user?.username || item?.user?.fullName}
                </div>
                <div className="min-w-[100px] max-w-[100px] w-full flex items-center text-[14px] font-medium text-shades-primary">
                  {item?.numberOfOrders}
                </div>
                <div className="min-w-[120px] max-w-[120px] w-full flex items-center text-[14px]">
                  {item?.amountOfTotalOrders}
                </div>
                <div className="min-w-[40px] max-w-[40px] w-full flex items-center text-[14px] cursor-pointer">
                  <Popover
                    arrow={false}
                    placement="bottomRight"
                    content={
                      <div className="flex flex-col">
                        <p
                          onClick={() => navigate(`/customer-details/${item.user?.id}`)}
                          className="text-[14px] cursor-pointer hover:bg-shades-primary/5 px-6 py-2.5"
                        >
                          View
                        </p>
                      </div>
                    }
                    trigger="click"
                  >
                    <BsThreeDotsVertical size="1.2rem" />
                  </Popover>
                </div>
              </div>
            ))}

            {/* Pagination */}
            <div></div>
          </div>
        </div>
      ) : (
        <div className="min-h-[30vh] w-full flex flex-col items-center justify-center bg-white rounded-lg mt-3">
          <h2 className="text-[18px] font-semibold mb-2">No Customer Added Yet!</h2>
          <p>Your history will appear here when you have one</p>
        </div>
      )}
    </div>
  );
};

export default Customers;