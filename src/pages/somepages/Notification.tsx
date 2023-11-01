import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import Image from "@/assets/image.jpg";
import Button from "@/component/Button";

const Notification = () => {
  const navigate = useNavigate()
  const item = {
    id: 3,
    title: "hello here, welcome back",
    message: "How far na boss. How you dey!!",
    type: "PRODUCT",
    productId: "",
    orderId: "",
    isRead: true,
    createdAt: new Date(),
  };

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
          Notification
        </h2>
      </div>
      <div className="w-full mt-3 flex flex-col gap-2">
        <div className="w-full flex flex-col rounded-lg bg-shades-white/80 py-5 px-3">
          <div className="w-full flex flex-row gap-4 flex-wrap hover:bg-gray-100 cursor-pointer px-3 py-2 mt-2">
            <div className="w-[90px] h-[80px] ">
              <img
                src={Image}
                className={`w-full h-full ${
                  item.type === "PRODUCT" ? "rounded-md" : "rounded-[50%]"
                }`}
                alt=""
              />
            </div>

            <div className="w-full flex-1 ">
              <p className="font-medium text-[18px]">{item?.title}</p>
              <p className="mt-1 text-base">{item?.message}</p>
              <div className="flex flex-row justify-between gap-3 mt-1">
                <p className="text-shades-gray/50 text-base">1m ago</p>
              </div>
            </div>
          </div>

          <div>
            <Button
              title="Increase threshold"
              className="md:px-10 px-5 py-3 rounded-md mt-3 text-[14px] sm:text-base"
            />
          </div>
        </div>
        <div className="w-full flex flex-col rounded-lg bg-shades-white/80 py-5 px-3">
          <div className="w-full flex flex-row gap-4 flex-wrap hover:bg-gray-100 cursor-pointer px-3 py-2 mt-2">
            <div className="w-[90px] h-[80px] ">
              <img
                src={Image}
                className={`w-full h-full ${
                  item.type === "PRODUCT" ? "rounded-md" : "rounded-[50%]"
                }`}
                alt=""
              />
            </div>

            <div className="w-full flex-1 ">
              <p className="font-medium text-[18px]">{item?.title}</p>
              <p className="mt-1 text-base">{item?.message}</p>
              <div className="flex flex-row justify-between gap-3 mt-1">
                <p className="text-shades-gray/50 text-base">1m ago</p>
              </div>
            </div>
          </div>

          <div>
            <Button
              title="Increase threshold"
              className="md:px-10 px-5 py-3 rounded-md mt-3 text-[14px] sm:text-base"
            />
          </div>
        </div>
        <div className="w-full flex flex-col rounded-lg bg-shades-white/80 py-5 px-3">
          <div className="w-full flex flex-row gap-4 flex-wrap hover:bg-gray-100 cursor-pointer px-3 py-2 mt-2">
            <div className="w-[90px] h-[80px] ">
              <img
                src={Image}
                className={`w-full h-full ${
                  item.type === "PRODUCT" ? "rounded-md" : "rounded-[50%]"
                }`}
                alt=""
              />
            </div>

            <div className="w-full flex-1 ">
              <p className="font-medium text-[18px]">{item?.title}</p>
              <p className="mt-1 text-base">{item?.message}</p>
              <div className="flex flex-row justify-between gap-3 mt-1">
                <p className="text-shades-gray/50 text-base">1m ago</p>
              </div>
            </div>
          </div>

          <div>
            <Button
              title="Increase threshold"
              className="md:px-10 px-5 py-3 rounded-md mt-3 text-[14px] sm:text-base"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
