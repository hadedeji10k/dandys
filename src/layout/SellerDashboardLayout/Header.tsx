import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/Logo 1.png";
import Image from "@/assets/image.jpg";
import Avatar from "@/assets/avatar.png";
import { Badge, Popover } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/api/hook";
import useAuth from "@/api/context";
import Button from "@/component/Button";
import {
  useGetCurrentUserQuery,
  useGetNotificationsQuery,
} from "@/api/sellerApiCalls";
import { saveNotification, saveUser } from "@/api/slices/user";
import { MdClose, MdMenu } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";

const SellerDashboardLayoutHeader = ({
  setSidebarIsOpen,
  sidebarIsOpen,
}: {
  setSidebarIsOpen: any;
  sidebarIsOpen: boolean;
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data: userData, error: _ } = useGetCurrentUserQuery();

  const { numberOfUnreadNotifications } = useAppSelector((state) => state.user);

  const { data: fetchedNotifications } = useGetNotificationsQuery();

  useEffect(() => {
    const currentUser = (userData as any)?.data;
    dispatch(saveUser(currentUser));
    dispatch(saveNotification(fetchedNotifications));
  }, [userData]);

  // useEffect(() => {
  //   console.log("Width>>", window?.innerWidth)

  // }, [window?.innerWidth, window?.onresize])

  const { isAuthenticated, isLoading, user } = useAuth();

  if (!isAuthenticated && !isLoading) {
    navigate("/sign-in");
  }

  return (
    <div className="w-full min-h-[100px] max-h-[100px] px-4 bg-shades-primary sticky top-0 flex flx-row items-center justify-between z-[1000]">
      <div
        className="cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        <img src={Logo} alt="" />
      </div>

      {/* <div className="hidden md:flex flex-row gap-x-8">
        <h3 className="text-[20px] font-semibold text-shades-white">Route</h3>
      </div> */}

      <div className="hidden md:flex flex-row gap-x-3 items-center">
        {isAuthenticated && user ? (
          <>
            <div className="rounded-[50%] p-3 bg-white/25">
              <Badge
                className="mr-2 text-white text-[8px]"
                size="small"
                count={numberOfUnreadNotifications || 0}
                showZero
                title="Notifications"
              >
                <Popover
                  arrow={false}
                  placement="bottomRight"
                  content={<Notification />}
                  trigger="click"
                >
                  <BellOutlined className="text-[24px]" />
                </Popover>
              </Badge>
            </div>

            <Popover
              overlayClassName="pr-3"
              arrow={false}
              content={<ProfilePop />}
              trigger="click"
            >
              <div className="bg-shades-white/20 pl-4 pr-2 py-2 rounded-md flex flex-row gap-3 items-center cursor-pointer">
                <h3 className="text-shades-white font-medium hidden sm:block">
                  {user?.fullName!}
                </h3>
                {user?.avatar?.length > 0 ? (
                  <img
                    src={Avatar}
                    className="w-[45px] h-[45px] rounded-md"
                    alt=""
                  />
                ) : (
                  <span className="p-2 rounded-md bg-shades-white">
                    <FaRegUser size="1.8rem" />
                  </span>
                )}
              </div>
            </Popover>
          </>
        ) : (
          <>
            <Button
              handleClick={() => navigate("/sign-up")}
              className={
                "bg-white !text-shades-primary hover:!text-shades-white px-4"
              }
              type={"button"}
              title={"Sign Up"}
              disabled={false}
            />
            <Button
              handleClick={() => navigate("/sign-in")}
              className={
                "bg-white !text-shades-primary hover:!text-shades-white px-4"
              }
              type={"button"}
              title={"Sign In"}
              disabled={false}
            />
          </>
        )}
      </div>

      <div className="md:hidden">
        <div onClick={() => setSidebarIsOpen(!sidebarIsOpen)}>
          {sidebarIsOpen ? (
            <MdClose
              size="1.5rem"
              className="cursor-pointer animate-fadeAndScaleInFast text-shades-white"
            />
          ) : (
            <MdMenu
              size="1.5rem"
              className="cursor-pointer animate-fadeAndScaleInFast text-shades-white"
            />
          )}
        </div>
      </div>
    </div>
  );
};

const ProfilePop = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const { logout } = useAuth();

  return (
    <div className="md:min-w-[300px] max-w-[300px]">
      <div className="px-5 py-6 border-b-2 border-shades-lightGray w-full flex items-center flex-wrap gap-x-3">
        {user?.avatar?.length > 0 ? (
          <img src={Avatar} className="w-[70px] h-[70px] rounded-md mb-1" alt="" />
        ) : (
          <span className="p-2 rounded-md bg-shades-primary/20">
            <FaRegUser size="1.8rem" />
          </span>
        )}
        <div>
          <h2 className="text-[18px] font-semibold mb-1">{user?.fullName}</h2>
          <h4 className="text-[13px] font-medium">{user?.email}</h4>
        </div>
      </div>

      <div className="w-full flex flex-col cursor-pointer">
        <div
          onClick={() => navigate("/profile")}
          className="w-full py-5 md:pl-8 pl-5 pr-3 font-medium text-base hover:bg-shades-primary/5"
        >
          Manage account
        </div>
        <div
          onClick={() => navigate("/preferences")}
          className="w-full py-5 md:pl-8 pl-5 pr-3 font-medium text-base hover:bg-shades-primary/5"
        >
          Preferences
        </div>
        <div className="w-full py-5 md:pl-8 pl-5 pr-3 font-medium text-base hover:bg-shades-primary/5 text-shades-primary">
          Help center
        </div>
        <div
          onClick={() => logout()}
          className="w-full py-5 md:pl-8 pl-5 pr-3 font-medium text-base hover:bg-shades-primary/5"
        >
          Log out
        </div>
      </div>
    </div>
  );
};

const Notification = () => {
  const navigate = useNavigate();

  const { notifications } = useAppSelector((state) => state.user);

  return (
    <div className="md:min-w-[380px] max-w-[380px]">
      {notifications?.length > 0 ? (
        <>
          <div className="px-3 pt-3 pb-5 border-b-2 border-shades-lightGray w-full flex items-center justify-between flex-wrap gap-x-3">
            <h3 className="text-[18px] font-semibold">Notification</h3>
            <p
              className="cursor-pointer font-normal hover:underline text-[14px] text-shades-primary"
              onClick={() => console.log("Read!!")}
            >
              Mark all as read
            </p>
          </div>

          {notifications?.slice(0, 5).map((item: any, index: number) => (
            <div
              key={index}
              className="w-full flex flex-row gap-x-4 hover:bg-shades-primary/5 cursor-pointer px-3 py-2 mt-2"
            >
              <div className="w-[60px] h-[50px]">
                <img
                  src={Image}
                  className={`w-full h-full ${
                    item.type === "PRODUCT" ? "rounded-md" : "rounded-[50%]"
                  }`}
                  alt=""
                />
              </div>

              <div className="w-full">
                <p className="font-normal text-base">{item?.title}</p>
                <div className="flex flex-row justify-between gap-3">
                  <p className="text-shades-gray/50 text-[14px]">1m ago</p>
                  <p>{!item?.isRead && <Badge status="error" />}</p>
                </div>
                <div className="w-full flex flex-row justify-between gap-3 mt-1">
                  <p className="text-[12px] hover:underline">View</p>
                  {!item?.isRead && (
                    <p
                      className="text-[12px] hover:underline"
                      onClick={() => console.log(item?.id)}
                    >
                      Mark as read
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="w-full flex flex-col justify-center items-center cursor-pointer hover:underline">
            <p
              className="my-3"
              onClick={() => navigate("/notification")}
            >
              View more
            </p>
          </div>
        </>
      ) : (
        <>
          <p className="p-4 flex items-center justify-center">
            You have no notifications
          </p>
        </>
      )}
    </div>
  );
};

export default SellerDashboardLayoutHeader;
