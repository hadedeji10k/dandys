import { AiOutlineExport } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { FiFilter } from "react-icons/fi";

const OrderPage = () => {
  return (
    <div className="w-full flex flex-col p-6">
      <div className="flex flex-row justify-between gap-x-3 items-center bg-white p-3 rounded-lg">
        <div className="flex flex-row gap-x-2">
          <button className="py-2 px-3 text-[14px] font-medium bg-[#DEC3D6]/90 text-shades-gray border border-[#DEC3D6] hover:bg-[#DEC3D6] hover:text-shades-white rounded-lg">
            All
          </button>
          <button className="py-2 px-3 text-[14px] font-medium border border-shades-gray text-shades-gray hover:bg-[#DEC3D6] hover:border-[#DEC3D6] hover:text-shades-white rounded-lg">
            Shipped
          </button>
          <button className="py-2 px-3 text-[14px] font-medium border border-shades-gray text-shades-gray hover:bg-[#DEC3D6] hover:border-[#DEC3D6] hover:text-shades-white rounded-lg">
            Cancelled
          </button>
          <button className="py-2 px-3 text-[14px] font-medium border border-shades-gray text-shades-gray hover:bg-[#DEC3D6] hover:border-[#DEC3D6] hover:text-shades-white rounded-lg">
            Partial
          </button>
          <button className="py-2 px-3 text-[14px] font-medium border border-shades-gray text-shades-gray hover:bg-[#DEC3D6] hover:border-[#DEC3D6] hover:text-shades-white rounded-lg">
            Paid
          </button>
        </div>
        <div className="flex flex-row gap-x-2">
          <button className="text-shades-secondary py-2 px-3 rounded-md text-[14px] border border-shades-secondary hover:bg-shades-secondary hover:text-white transition-all ease-in-out flex flex-row items-center gap-x-2">
            <AiOutlineExport /> Export
          </button>
          <button className="bg-shades-secondary text-white hover:text-shades-secondary hover:bg-white py-2 px-3 rounded-md text-[14px] border hover:border-shades-secondary transition-all ease-in-out flex flex-row items-center gap-x-2">
            Add new order
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
      <div className="grid">
        
      </div>
    </div>
  );
}

export default OrderPage