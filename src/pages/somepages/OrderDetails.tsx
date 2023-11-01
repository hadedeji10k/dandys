import { IoIosArrowBack } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidBank, BiSolidEditAlt } from "react-icons/bi";
import { Badge } from "antd";
import Image from "@/assets/image.jpg";
import { useNavigate } from "react-router-dom";

const OrderDetails = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full flex flex-col p-6">
      <div className="flex flex-row justify-start gap-x-3 items-center">
        <div
          onClick={() => navigate(-1)}
          className="p-1.5 rounded-md bg-white cursor-pointer"
        >
          <IoIosArrowBack size="1.5rem" />
        </div>
        <h2 className="font-semibold text-[20px] text-shades-gray">
          Order details
        </h2>
      </div>

      <div className="flex flex-row justify-between items-center bg-white rounded-lg py-2 px-3 mt-3">
        <div className="flex flex-row items-center">
          <h2 className="font-normal text-[16px] border-r-[3px] mr-2 pr-2">
            Order - <span className="text-shades-primary">#1234</span>
          </h2>
          <span className="border-r-[3px] mr-2 pr-2">5 Items</span>
          <span className="border-r-[3px] mr-2 pr-2">Total N90,000</span>

          <button className="bg-status-successLight p-1 px-2 mr-2 rounded-md text-status-success flex items-center">
            <Badge status="success" className="mr-1" /> Shipped
          </button>
          <button className="bg-status-successLight p-1 px-2 rounded-md text-status-success flex items-center">
            <Badge status="success" className="mr-1" /> Paid
          </button>
        </div>

        <div className="flex flex-row gap-x-2">
          <button className="text-shades-red py-1 px-2 rounded-md text-[14px] border border-shades-red hover:bg-shades-red hover:text-white transition-all ease-in-out flex flex-row items-center gap-x-2">
            <RiDeleteBin6Line /> Delete order
          </button>
          <button className="bg-shades-primary text-white hover:text-shades-primary hover:bg-white py-1 px-2 rounded-md text-[14px] border hover:border-shades-primary transition-all ease-in-out flex flex-row items-center gap-x-2">
            <BiSolidEditAlt /> Edit order
          </button>
        </div>
      </div>

      <div className="w-full flex flex-row justify-between flex-wrap gap-x-6">
        <div className="flex-1">
          <div className="w-full rounded-lg bg-white p-4 min-h-[100px] mt-3">
            Notes about order
          </div>

          <div className="w-full rounded-lg bg-white mt-3">
            <div className="p-4 border-b-2">
              <h2 className="text-[18px] font-bold">Items</h2>
            </div>
            {/* Start of Products */}
            <div className="p-4 border-b-2 flex flex-row justify-between flex-wrap gap-x-3">
              <div className="flex flex-row gap-x-3">
                <div className="rounded-md w-[50px] h-[50px]">
                  <img
                    src={Image}
                    alt=""
                    className="w-full h-full rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-[15px] font-medium">Body Shampoo</h3>
                  <p className="text-[12px] font-normal">50ml | Black cover</p>
                </div>
              </div>
              <div className="max-w-full w-[50%] flex flex-row items-center justify-between gap-x-2">
                <p className="text-[14px] font-normal">N20,000</p>
                <p className="text-[14px] font-normal">3</p>
                <p className="text-[14px] font-normal">N60,000</p>
              </div>
            </div>
            <div className="p-4 border-b-2 flex flex-row justify-between flex-wrap gap-x-3">
              <div className="flex flex-row gap-x-3">
                <div className="rounded-md w-[50px] h-[50px]">
                  <img
                    src={Image}
                    alt=""
                    className="w-full h-full rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-[15px] font-medium">Body Shampoo</h3>
                  <p className="text-[12px] font-normal">50ml | Black cover</p>
                </div>
              </div>
              <div className="max-w-full w-[50%] flex flex-row items-center justify-between gap-x-2">
                <p className="text-[14px] font-normal">N20,000</p>
                <p className="text-[14px] font-normal">3</p>
                <p className="text-[14px] font-normal">N60,000</p>
              </div>
            </div>
            <div className="p-4 flex flex-row justify-between flex-wrap gap-x-3">
              <div className="flex flex-row gap-x-3">
                <div className="rounded-md w-[50px] h-[50px]">
                  <img
                    src={Image}
                    alt=""
                    className="w-full h-full rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-[15px] font-medium">Body Shampoo</h3>
                  <p className="text-[12px] font-normal">50ml | Black cover</p>
                </div>
              </div>
              <div className="max-w-full w-[50%] flex flex-row items-center justify-between gap-x-2">
                <p className="text-[14px] font-normal">N20,000</p>
                <p className="text-[14px] font-normal">3</p>
                <p className="text-[14px] font-normal">N60,000</p>
              </div>
            </div>
            {/* End of Products */}

            <div className="p-4 border-y-2 mt-8">
              <div className="flex flex-row justify-between flex-wrap gap-x-3">
                <p className="text-[15px] font-medium">Sub total</p>
                <p className="text-[14px] font-medium">N100,000</p>
              </div>
              <div className="flex flex-row justify-between flex-wrap gap-x-3">
                <p className="text-[15px] font-medium">Store credit</p>
                <p className="text-[14px] font-medium">N100,000</p>
              </div>
            </div>

            {/* Total */}
            <div className="p-4 flex flex-row justify-between flex-wrap gap-x-3">
              <p className="text-[15px] font-semibold">Total</p>
              <p className="text-[15px] font-semibold">N90,000</p>
            </div>
          </div>
        </div>
        <div className="flex-1">
          {/* Customer */}
          <div className="rounded-lg bg-white mt-3">
            <div className="p-4 border-b-2">
              <h2 className="text-[18px] font-bold">Customer</h2>
            </div>
            {/* Start of Customer details */}
            <div className="p-4 flex flex-row justify-between flex-wrap gap-x-3">
              <div className="flex flex-row gap-x-3">
                <div className="rounded-md w-[100px] h-[100px]">
                  <img
                    src={Image}
                    alt=""
                    className="w-full h-full rounded-md"
                  />
                </div>
                <div className="flex flex-col justify-around">
                  <h3 className="text-[15px] font-normal mb-1">Kelvin Mesh</h3>
                  <h3 className="text-[15px] font-normal mb-1">
                    Kelvinmesh01@gmail.com
                  </h3>
                  <h3 className="text-[15px] font-normal mb-1">+23470123456</h3>
                </div>
              </div>
            </div>
            {/* End of Customer details */}

            {/* Shipping address */}
            <div className="w-full">
              <div className="p-4 border-y-2">
                <h2 className="text-[18px] font-bold">Shipping Address</h2>
              </div>
              <div className="p-4 pb-10">
                <p>Kelvin Mesh, Random Federation 115302, Lagos, Nigeria.</p>
              </div>
            </div>
            {/* End of Shipping address */}
          </div>

          {/* Payment Method */}
          <div className="rounded-lg bg-white mt-3">
            <div className="p-4 border-b-2">
              <h2 className="text-[18px] font-bold">Payment Method</h2>
            </div>

            <div className="p-4 flex flex-row items-center mb-5">
              <div className="p-1.5 rounded-md bg-shades-primary text-white mr-3">
                <BiSolidBank size="1.5rem" />
              </div>
              <p className="font-medium">Bank transfer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
