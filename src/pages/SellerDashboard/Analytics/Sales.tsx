import { useState, useEffect } from "react";
import { Scatter } from "react-chartjs-2";
import { AiOutlineExport } from "react-icons/ai";
import Image from "@/assets/image.jpg";
import { MdShowChart } from "react-icons/md";


const Sales = () => {
  const [chartData, setChartData] = useState<any>({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
      datasets: [
        {
          type: "bar",
          label: "Sale $",
          data: [18127, 22201, 19490, 17938, 24182, 17842, 22475],
          borderColor: "#D9D9D9",
          backgroundColor: "#D9D9D9",
          borderRadius: 5,
          hoverBackgroundColor: "#8F3677",
        },
        {
          type: "line",
          label: "Sale $",
          data: [18127, 22201, 19490, 17938, 24182, 17842, 22475],
          fill: false,
          borderColor: "#8F3677",
        },
      ],
    });
    setChartOptions({
      plugins: {
        legend: {
          display: false,
          position: "top",
          align: "center",
        },
        title: {
          display: false,
          text: "Daily Revenue",
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    });
  }, []);
  return (
    <div className="w-full">
      <div className="flex flex-row justify-between gap-4 flex-wrap items-center bg-white p-3 rounded-lg">
        <div className="flex flex-row gap-3 flex-wrap">
          <button className="py-2 px-3 text-[14px] font-medium bg-[#DEC3D6]/90 text-shades-gray border border-[#DEC3D6] hover:bg-[#DEC3D6] hover:text-shades-white rounded-lg">
            Today
          </button>
          <button className="py-2 px-3 text-[14px] font-medium border border-shades-gray/30 text-shades-gray hover:bg-[#DEC3D6] hover:border-[#DEC3D6] hover:text-shades-white rounded-lg">
            Weekly
          </button>
          <button className="py-2 px-3 text-[14px] font-medium border border-shades-gray/30 text-shades-gray hover:bg-[#DEC3D6] hover:border-[#DEC3D6] hover:text-shades-white rounded-lg">
            Monthly
          </button>
        </div>
        <div className="flex flex-row gap-3 flex-wrap">
          <button className="text-shades-secondary py-2 px-3 rounded-md text-[14px] font-semibold border-2 border-shades-secondary hover:bg-shades-secondary hover:text-white transition-all ease-in-out flex flex-row items-center gap-x-2">
            <AiOutlineExport /> Export
          </button>
        </div>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mt-4">
        <div className="w-full md:col-span-2 p-4 border rounded-lg bg-white">
          <h3 className="text-lg font-semibold mb-6">Total sales</h3>
          <div className="min-h-[400px]">
            <Scatter data={chartData} options={chartOptions} />
          </div>
        </div>
        <div className="w-full bg-white rounded-lg py-5 px-4">
          <h3 className="mb-3 font-semibold">Top Selling Product</h3>

          <div className="w-full flex flex-col">
            <div className="w-full flex flex-row gap-3 items-end justify-between my-2">
              <div className="w-full flex flex-row gap-2 justify-normal">
                <img src={Image} className="w-[45px] rounded-md" alt="" />
                <div className="flex flex-col">
                  <h4 className="text-[14px] font-medium">Body Shampoo</h4>
                  <p className="text-[13px]">1290</p>
                </div>
              </div>

              <div className="text-status-success font-semibold flex flex-row gap-1">
                <div className="p-1 flex items-center justify-center bg-status-success/20 rounded-md">
                  <MdShowChart />
                </div>
                1.6%
              </div>
            </div>
            <hr className="my-2" />
            <div className="w-full flex flex-row gap-3 items-end justify-between my-2">
              <div className="w-full flex flex-row gap-2 justify-normal">
                <img src={Image} className="w-[45px] rounded-md" alt="" />
                <div className="flex flex-col">
                  <h4 className="text-[14px] font-medium">Body Shampoo</h4>
                  <p className="text-[13px]">1290</p>
                </div>
              </div>

              <div className="text-status-success font-semibold flex flex-row gap-1">
                <div className="p-1 flex items-center justify-center bg-status-success/20 rounded-md">
                  <MdShowChart />
                </div>
                1.6%
              </div>
            </div>
            <hr className="my-2" />
            <div className="w-full flex flex-row gap-3 items-end justify-between my-2">
              <div className="w-full flex flex-row gap-2 justify-normal">
                <img src={Image} className="w-[45px] rounded-md" alt="" />
                <div className="flex flex-col">
                  <h4 className="text-[14px] font-medium">Body Shampoo</h4>
                  <p className="text-[13px]">1290</p>
                </div>
              </div>

              <div className="text-status-success font-semibold flex flex-row gap-1">
                <div className="p-1 flex items-center justify-center bg-status-success/20 rounded-md">
                  <MdShowChart />
                </div>
                1.6%
              </div>
            </div>
            <hr className="my-2" />
            <div className="w-full flex flex-row gap-3 items-end justify-between my-2">
              <div className="w-full flex flex-row gap-2 justify-normal">
                <img src={Image} className="w-[45px] rounded-md" alt="" />
                <div className="flex flex-col">
                  <h4 className="text-[14px] font-medium">Body Shampoo</h4>
                  <p className="text-[13px]">1290</p>
                </div>
              </div>

              <div className="text-status-success font-semibold flex flex-row gap-1">
                <div className="p-1 flex items-center justify-center bg-status-success/20 rounded-md">
                  <MdShowChart />
                </div>
                1.6%
              </div>
            </div>
            <hr className="my-2" />
          </div>
        </div>
      </div>
      <div className="">{/* <PieChart /> */}</div>
    </div>
  );
};

export default Sales;
