import Button from "@/component/Button";
import { AiFillMoneyCollect } from "react-icons/ai";
import Image from "@/assets/image.jpg";
import { useState } from "react";
import { IProduct } from "@/interface";
import { Badge } from "antd";

const Dashboard = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-row flex-wrap gap-3">
        <div className="min-w-[170px] max-w-[170px] min-h-[110px] rounded-lg flex flex-col justify-between px-3 py-5 bg-shades-white">
          <span className="max-w-fit mb-2 p-2 rounded-md bg-shades-primary/5 text-shades-primary">
            <AiFillMoneyCollect size="1.2rem" />
          </span>
          <h4 className="text-[14px] font-medium">Total Earning</h4>
          <h3 className="text-base font-semibold mt-2">50,000</h3>
        </div>
        <div className="min-w-[170px] max-w-[170px] min-h-[110px] rounded-lg flex flex-col justify-between px-3 py-5 bg-shades-white">
          <span className="max-w-fit mb-2 p-2 rounded-md bg-shades-primary/5 text-shades-primary">
            <AiFillMoneyCollect size="1.2rem" />
          </span>
          <h4 className="text-[14px] font-medium">Pending orders</h4>
          <h3 className="text-base font-semibold mt-2">50,000</h3>
        </div>
        <div className="min-w-[170px] max-w-[170px] min-h-[110px] rounded-lg flex flex-col justify-between px-3 py-5 bg-shades-white">
          <span className="max-w-fit mb-2 p-2 rounded-md bg-shades-primary/5 text-shades-primary">
            <AiFillMoneyCollect size="1.2rem" />
          </span>
          <h4 className="text-[14px] font-medium">Complete Orders</h4>
          <h3 className="text-base font-semibold mt-2">50,000</h3>
        </div>
      </div>

      <div className="mt-4 w-full bg-shades-white flex flex-col rounded-lg py-6 px-4 relative">
        <div className="w-full flex flex-row justify-start">
          <div>
            <h3 className="text-[20px font-semibold]">
              Welcome Evans, continue setting up.
            </h3>
            <p className="text-[14px]">
              Take the next steps to help you get on track with Dandys store.
              Once you are done, you’ll have access to all necessary metrics to
              help you grow your business.
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col bg-shades-lightGray/40 rounded-lg p-3 mt-4"></div>

        <button
          //  onClick={handleClose}
          className="!bg-shades-lightGray/20 hover:!bg-shades-lightGray/40 btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
      </div>

      <div className="w-full flex md:flex-row flex-col gap-3 justify-between mt-4">
        <div className="w-full flex flex-col flex-1 bg-shades-white rounded-lg p-4 pb-6">
          <div className="w-full flex flex-row justify-between items-center">
            <h3 className="text-[20px] font-semibold">Top Sold Products</h3>
            <Button
              //   handleClick={handleSubmit}
              className={""}
              type={"button"}
              title={"View all"}
              disabled={false}
            />
          </div>

          <div className="w-full flex flex-row justify-around gap-3 flex-wrap mt-6">
            <div className="flex flex-col cursor-pointer">
              <img
                src={Image}
                className="min-w-[130px] min-h-[120px] max-w-[130px] max-h-[120px] rounded-lg"
                alt=""
              />
              <h3 className="text-base font-medium mt-2">Hair essential Oil</h3>
              <h3 className="text-[14px] font-normal">N20,000</h3>
            </div>
            <div className="flex flex-col cursor-pointer">
              <img
                src={Image}
                className="min-w-[130px] min-h-[120px] max-w-[130px] max-h-[120px] rounded-lg"
                alt=""
              />
              <h3 className="text-base font-medium mt-2">Hair essential Oil</h3>
              <h3 className="text-[14px] font-normal">N20,000</h3>
            </div>
            <div className="flex flex-col cursor-pointer">
              <img
                src={Image}
                className="min-w-[130px] min-h-[120px] max-w-[130px] max-h-[120px] rounded-lg"
                alt=""
              />
              <h3 className="text-base font-medium mt-2">Hair essential Oil</h3>
              <h3 className="text-[14px] font-normal">N20,000</h3>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col flex-1 bg-shades-white rounded-lg p-4 pb-6">
          <div className="w-full flex flex-row justify-between items-center">
            <h3 className="text-[20px] font-semibold">Top Sold Products</h3>
            <Button
              //   handleClick={handleSubmit}
              className={""}
              type={"button"}
              title={"View all"}
              disabled={false}
            />
          </div>

          <div className="w-full flex flex-row justify-around gap-3 flex-wrap mt-6">
            <div className="flex flex-col cursor-pointer">
              <img
                src={Image}
                className="min-w-[130px] min-h-[120px] max-w-[130px] max-h-[120px] rounded-lg"
                alt=""
              />
              <h3 className="text-base font-medium mt-2">Hair essential Oil</h3>
              <h3 className="text-[14px] font-normal">N20,000</h3>
            </div>
            <div className="flex flex-col cursor-pointer">
              <img
                src={Image}
                className="min-w-[130px] min-h-[120px] max-w-[130px] max-h-[120px] rounded-lg"
                alt=""
              />
              <h3 className="text-base font-medium mt-2">Hair essential Oil</h3>
              <h3 className="text-[14px] font-normal">N20,000</h3>
            </div>
            <div className="flex flex-col cursor-pointer">
              <img
                src={Image}
                className="min-w-[130px] min-h-[120px] max-w-[130px] max-h-[120px] rounded-lg"
                alt=""
              />
              <h3 className="text-base font-medium mt-2">Hair essential Oil</h3>
              <h3 className="text-[14px] font-normal">N20,000</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex md:flex-row flex-col gap-3 justify-between mt-4">
        <div className="w-full flex flex-col flex-1 bg-shades-white rounded-lg p-4 pb-6">
          <div className="w-full flex flex-row justify-between items-center">
            <h3 className="text-[20px] font-semibold">Payment History</h3>
            <Button
              //   handleClick={handleSubmit}
              className={""}
              type={"button"}
              title={"This month"}
              disabled={false}
            />
          </div>
          {products?.length > 0 ? (
            <div className="flex w-full flex-col mt-3 overflow-x-scroll no_scrollbar bg-white rounded-lg mb-5">
              {/* Head */}
              <div className="w-full flex flex-row gap-x-3 justify-between py-3 px-3 border-b-2 border-shades-lightGray">
                <div className="min-w-[150px] max-w-[150px] w-full flex items-center text-[14px]">
                  Type
                </div>
                <div className="min-w-[100px] max-w-[100px] w-full flex items-center text-[14px]">
                  Date
                </div>
                <div className="min-w-[120px] max-w-[120px] w-full flex items-center text-[14px]">
                  Reference
                </div>
                <div className="min-w-[120px] max-w-[120px] w-full flex items-center text-[14px]">
                  Selling Price
                </div>
                <div className="min-w-[120px] max-w-[120px] w-full flex items-center text-[14px]">
                  Status
                </div>
              </div>
              {/* body */}
              <div className="w-full">
                {products?.map((item, index) => (
                  <div
                    key={index}
                    className={`w-full flex flex-row gap-x-3 justify-between py-2.5 px-3 bg-shades-white/80 my-1 border-shades-lightGray ${
                      index + 1 === products.length ? "" : "border-b-2"
                    }`}
                  >
                    <div className="min-w-[150px] max-w-[150px] w-full flex items-center text-[14px] font-medium text-shades-primary">
                      {item?.title}
                    </div>
                    <div className="min-w-[100px] max-w-[100px] w-full flex items-center text-[14px]">
                      {item?.sku}
                    </div>
                    <div className="min-w-[120px] max-w-[120px] w-full flex items-center text-[14px]">
                      {item?.title}
                    </div>
                    <div className="min-w-[120px] max-w-[120px] w-full flex items-center text-[14px] font-medium text-shades-primary">
                      {item?.vendor}
                    </div>
                    <div className="min-w-[100px] max-w-[100px] w-full flex items-center text-[14px]">
                      <span className="py-2 px-2.5 rounded-md bg-shades-lightGreen text-status-success">
                        <Badge status="success" /> Successful
                      </span>
                    </div>
                  </div>
                ))}

                {/* Pagination */}
                <div></div>
              </div>
            </div>
          ) : (
            <div className="min-h-[30vh] w-full flex flex-col items-center justify-center bg-white rounded-lg mt-3">
              <h2 className="text-[18px] font-semibold">No Paymet Yet!</h2>
              <p>Your history will appear here when you have one</p>
            </div>
          )}
        </div>
        <div className="w-full flex flex-col flex-1 bg-shades-white rounded-lg p-4 pb-6">
          <div className="w-full flex flex-row justify-between items-center">
            <h3 className="text-[20px] font-semibold">Payment History</h3>
            <Button
              //   handleClick={handleSubmit}
              className={""}
              type={"button"}
              title={"This month"}
              disabled={false}
            />
          </div>
          {products?.length > 0 ? (
            <div className="flex w-full flex-col mt-3 overflow-x-scroll no_scrollbar bg-white rounded-lg mb-5">
              {/* Head */}
              <div className="w-full flex flex-row gap-x-3 justify-between py-3 px-3 border-b-2 border-shades-lightGray">
                <div className="min-w-[150px] max-w-[150px] w-full flex items-center text-[14px]">
                  Name
                </div>
                <div className="min-w-[100px] max-w-[100px] w-full flex items-center text-[14px]">
                  Category
                </div>
                <div className="min-w-[120px] max-w-[120px] w-full flex items-center text-[14px]">
                  Selling Price
                </div>
                <div className="min-w-[120px] max-w-[120px] w-full flex items-center text-[14px]">
                  Status
                </div>
              </div>
              {/* body */}
              <div className="w-full">
                {products?.map((item, index) => (
                  <div
                    key={index}
                    className={`w-full flex flex-row gap-x-3 justify-between py-2.5 px-3 bg-shades-white/80 my-1 border-shades-lightGray ${
                      index + 1 === products.length ? "" : "border-b-2"
                    }`}
                  >
                    <div className="min-w-[150px] max-w-[150px] w-full flex items-center text-[14px] font-medium text-shades-primary">
                      {item?.title}
                    </div>
                    <div className="min-w-[100px] max-w-[100px] w-full flex items-center text-[14px]">
                      {item?.sku}
                    </div>
                    <div className="min-w-[120px] max-w-[120px] w-full flex items-center text-[14px] font-medium text-shades-primary">
                      {item?.title}
                    </div>
                    <div className="min-w-[100px] max-w-[100px] w-full flex items-center text-[14px]">
                      <span className="py-2 px-2.5 rounded-md bg-shades-lightGreen text-status-success">
                        <Badge status="success" /> Successful
                      </span>
                    </div>
                  </div>
                ))}

                {/* Pagination */}
                <div></div>
              </div>
            </div>
          ) : (
            <div className="min-h-[30vh] w-full flex flex-col items-center justify-center bg-white rounded-lg mt-3">
              <h2 className="text-[18px] font-semibold">No Order Yet!</h2>
              <p>Your history will appear here when you have one</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
