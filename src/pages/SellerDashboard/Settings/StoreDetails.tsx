import Image from "@/assets/avatar.png";

const StoreDetails = () => {
  return (
    <div className="w-full mx-auto mt-6">
      <div className="flex flex-col min-w-0 break-words w-full mb-6 rounded-lg">
        <div className="rounded-t bg-white mb-0 px-6 py-6 border-b">
          <div className="text-center flex justify-between items-center">
            <div className="flex flex-row gap-2">
              <img src={Image} alt="" className="w-[80px] h-[80x] rounded-md" />
              <div className="flex flex-col gap-2">
                <h6 className="text-xl font-semibold">Hello3vans Store</h6>
                <h4 className="text-shades-primary bg-shades-primary/30 px-3 py-2 rounded-md">
                  Basic Plan
                </h4>
              </div>
            </div>
            <div>
              <button className="bg-gray-400 text-white uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
                Upgrade plan
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="w-full py-3 border-b">{/* <h3>Outlet A</h3> */}</div>

          <div className="w-full flex flex-col"></div>
        </div>
      </div>
    </div>
  );
};

export default StoreDetails;
