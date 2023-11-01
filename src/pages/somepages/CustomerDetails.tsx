import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Image from "@/assets/Face.png";
import { Badge } from "antd";

const CustomerDetails = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-row justify-start gap-x-3 items-center mb-3">
        <div
          onClick={() => navigate(-1)}
          className="p-1.5 rounded-md bg-white cursor-pointer"
        >
          <IoIosArrowBack size="1.5rem" />
        </div>
        <h2 className="font-semibold text-[20px] text-shades-gray">Back</h2>
      </div>
      <div className="flex flex-row justify-between items-center bg-white rounded-lg py-4 px-5 mt-3">
        <h2 className="font-semibold text-[20px] text-shades-gray">
          Customer details
        </h2>
      </div>

      <div className="w-full flex md:flex-row flex-col justify-between gap-3 mt-5">
        <div className="w-full md:max-w-[48%] bg-white rounded-md py-6 px-4 flex flex-col">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-[167px] max-h-[157px] mb-6">
              <img src={Image} alt="" className="w-full rounded-md" />
            </div>
            <h3 className="font-semibold text-[20px]">Kelvin Mesh</h3>
            <p className="text-base font-medium mt-2">Kelvinmesh01@gmail.com</p>
            <p className="text-base font-normal mt-1">+234 (070) 12345678</p>
            <p className="text-base font-normal mt-3 text-center">
              Kelvin Mesh, Random Federation 115302, Lagos, Nigeria.
            </p>
          </div>

          <hr className="my-6 w-full" />

          <div className="flex flex-col items-start justify-center lg:mx-auto">
            <div className="mb-6">
              <h2 className="font-semibold text-[20px]">Last Order</h2>
              <p className="text-base font-medium mt-2.5">
                7 days ago – #12345
              </p>
            </div>
            <div className="mb-6">
              <h2 className="font-semibold text-[20px]">Average order value</h2>
              <p className="text-base font-medium mt-2.5">N25,000</p>
            </div>
            <div className="mb-4">
              <h2 className="font-semibold text-[20px]">Registered</h2>
              <p className="text-base font-medium mt-2.5">2 months ago</p>
            </div>
          </div>
        </div>
        <div className="w-full md:max-w-[48%] bg-white rounded-md flex flex-col">
          <div className="px-3 py-4 flex flex-row justify-between gap-6 items-center border-b-2">
            <h3 className="font-semibold text-[20px]">Customer</h3>
            <p className="text-[14px] font-medium">
              Total spent N400,000 on 8 orders
            </p>
          </div>

          {/* table */}
          <div className="w-full px-3 py-4 flex flex-row gap-6 items-center justify-between border-b-2"> b
            <div className="min-w-[40px] max-w-[40px] w-full flex items-center text-[14px]">
              #12345
            </div>
            <div className="min-w-[140px] max-w-[140px] w-full flex items-center text-[14px]">
              Today at 6:00 pm
            </div>
            <div className="min-w-[90px] max-w-[90px] w-full flex items-center text-[14px]">
              <span className="py-2 px-2.5 rounded-md bg-shades-lightGreen text-status-success">
                <Badge status="success" /> Active
              </span>
            </div>
            <div className="min-w-[60px] max-w-[60px] w-full flex items-center text-[14px]">
              4 Items
            </div>
            <div className="min-w-[90px] max-w-[90px] w-full flex items-center text-[14px]">
              N80,000
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
