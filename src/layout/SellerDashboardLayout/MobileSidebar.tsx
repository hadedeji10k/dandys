import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import useAuth from "@/api/context";
import { Menu } from "./Sidebar";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineArrowForwardIos } from "react-icons/md";

const MobileSidebar = ({
  setSidebarIsOpen,
  sidebarIsOpen,
}: {
  setSidebarIsOpen: any;
  sidebarIsOpen: boolean;
}) => {
  const { isAuthenticated, logout, user } = useAuth();

  const navigate = useNavigate();
  const [menu, setMenu] = useState(Menu);

  const goTo = (route: string) => {
    setSidebarIsOpen(!sidebarIsOpen);
    navigate(route);
  };

  const handleLogout = () => {
    logout();
    setSidebarIsOpen(!sidebarIsOpen);
    navigate("/");
  };

  const handleSubMenuClick = (id: number) => {
    const newMenu = menu.map((item) => {
      return {
        ...item,
        isSubOpen: item.key === id && item.hasSub ? !item.isSubOpen : false,
      };
    });

    setMenu([...newMenu]);
  };

  return (
    <div
      className={`top-[100px] w-full h-full fixed z-[1000] bg-shades-primary text-shades-white ${
        !sidebarIsOpen ? "hidden" : ""
      } transition-all duration-500`}
    >
      <div className="h-full pt-2 pl-6 pr-4 w-full">
        {menu.map((item) => (
          <div key={item.key} className="w-full flex flex-col">
            <div
              className={`flex w-full items-center justify-between gap-x-4 py-4 cursor-pointer ${
                false ? "text-shades-primary" : ""
              }`}
              onClick={() => {
                if (item.hasSub) {
                  handleSubMenuClick(item.key);
                } else {
                  navigate(item?.link!);
                  setSidebarIsOpen(!sidebarIsOpen);
                }
              }}
            >
              <div className="flex flex-row items-center gap-x-4">
                <div
                  className={`p-2 ${
                    false ? "rounded-md bg-shades-primary/20" : ""
                  }`}
                >
                  {item.icon}
                </div>
                <h4 className={`${false ? "font-semibold" : "font-medium"}`}>
                  {item.name}
                </h4>
              </div>
              {item.hasSub && (
                <div>
                  {item.isSubOpen ? (
                    <IoIosArrowDown size="1.2rem" />
                  ) : (
                    <MdOutlineArrowForwardIos />
                  )}
                </div>
              )}
            </div>

            {item.hasSub && item.sub && item.isSubOpen && (
              <div
                className={`flex flex-col w-full gap-x-4 pb-4 cursor-pointer`}
              >
                {item.sub.map((sub) => (
                  <h4
                    key={sub.key}
                    className={`pl-14 mb-3 ${
                      false
                        ? "font-semibold text-shades-primary"
                        : "font-medium hover:text-shades-primary"
                    }`}
                    onClick={() => navigate(sub.link)}
                  >
                    {sub.name}
                  </h4>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileSidebar;
