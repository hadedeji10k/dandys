import { Switch } from "antd";

const Prefernces = () => {
  return (
    <div className="w-full bg-shades-white min-h-[80vh] rounded-lg p-6">
      <div className="bg-shades-lightGray/20 w-full rounded-lg sm:px-8 sm:py-8 px-5 py-4 flex flex-row gap-x-3 justify-between items-center mb-3">
        <h3 className="md:text-[20px] text-base font-semibold">
          Notification about new orders
        </h3>
        <div>
          <Switch />
        </div>
      </div>
      <div className="bg-shades-lightGray/20 w-full rounded-lg sm:px-8 sm:py-8 px-5 py-4 flex flex-row gap-x-3 justify-between items-center mb-3">
        <h3 className="md:text-[20px] text-base font-semibold">
          Seller Cancellation Order
        </h3>
        <div>
          <Switch />
        </div>
      </div>
      <div className="bg-shades-lightGray/20 w-full rounded-lg sm:px-8 sm:py-8 px-5 py-4 flex flex-row gap-x-3 justify-between items-center mb-3">
        <h3 className="md:text-[20px] text-base font-semibold">
          Seller Consignment Stock Alert
        </h3>
        <div>
          <Switch />
        </div>
      </div>
      <div className="bg-shades-lightGray/20 w-full rounded-lg sm:px-8 sm:py-8 px-5 py-4 flex flex-row gap-x-3 justify-between items-center mb-3">
        <h3 className="md:text-[20px] text-base font-semibold">
          Seller Order Summary Report
        </h3>
        <div>
          <Switch />
        </div>
      </div>
      <div className="bg-shades-lightGray/20 w-full rounded-lg sm:px-8 sm:py-8 px-5 py-4 flex flex-row gap-x-3 justify-between items-center mb-3">
        <h3 className="md:text-[20px] text-base font-semibold">
          Seller return Order
        </h3>
        <div>
          <Switch />
        </div>
      </div>
      <div className="bg-shades-lightGray/20 w-full rounded-lg sm:px-8 sm:py-8 px-5 py-4 flex flex-row gap-x-3 justify-between items-center mb-3">
        <h3 className="md:text-[20px] text-base font-semibold">
          Seller Returned And Delivery Failed Summary Report
        </h3>
        <div>
          <Switch />
        </div>
      </div>
    </div>
  );
}

export default Prefernces