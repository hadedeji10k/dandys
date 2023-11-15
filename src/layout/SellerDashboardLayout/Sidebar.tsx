import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiSolidDashboard } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { FaClipboardList } from "react-icons/fa";
import { PiUsersThreeFill } from "react-icons/pi";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { TbDiscount, TbSettingsFilled } from "react-icons/tb";
import { GiCardboardBox, GiPieChart } from "react-icons/gi";

export const Menu = [
  {
    key: 1,
    name: "Dashboard",
    icon: <BiSolidDashboard size="1.4rem" />,
    link: "/seller-dashboard",
    hasSub: false,
    isSubOpen: false,
  },
  {
    key: 2,
    name: "Orders",
    icon: <FaClipboardList size="1.4rem" />,
    link: "/seller/orders",
    hasSub: false,
    isSubOpen: false,
  },
  {
    key: 3,
    name: "Products",
    icon: <GiCardboardBox size="1.4rem" />,
    hasSub: true,
    isSubOpen: false,
    sub: [
      {
        key: 1,
        name: "All Products",
        link: "/seller/products",
      },
      {
        key: 2,
        name: "Categories",
        link: "/seller/products/categories",
      },
    ],
  },
  {
    key: 4,
    name: "Customers",
    icon: <PiUsersThreeFill size="1.4rem" />,
    link: "/seller/customers",
    hasSub: false,
    isSubOpen: false,
  },
  {
    key: 5,
    name: "Analytics",
    icon: <GiPieChart size="1.4rem" />,
    link: "/seller/analytics",
    hasSub: false,
    isSubOpen: false,
  },
  {
    key: 6,
    name: "Discounts",
    icon: <TbDiscount size="1.4rem" />,
    link: "/seller/discounts",
    hasSub: false,
    isSubOpen: false,
  },
  {
    key: 7,
    name: "Settings",
    icon: <TbSettingsFilled size="1.4rem" />,
    link: "/seller/settings",
    hasSub: false,
    isSubOpen: false,
  },
];

const SellerDashboardLayoutSidebar = () => {
  const navigate = useNavigate();

  const [menu, setMenu] = useState(Menu);

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
    <div className="bg-shades-white h-[calc(100vh-100px)] pt-2 pl-6 pr-4 w-[250px] top-[100px] sticky">
      {menu.map((item) => (
        <div key={item.key} className="w-full flex flex-col">
          <div
            className={`flex w-full items-center justify-between gap-x-4 py-4 cursor-pointer ${
              false ? "text-shades-primary" : "hover:text-shades-primary"
            }`}
            onClick={() => {
              if(item.hasSub) {
                handleSubMenuClick(item.key);
              } else{
                navigate(item?.link!);
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
            <div className={`flex flex-col w-full gap-x-4 pb-4 cursor-pointer`}>
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
  );
};

export default SellerDashboardLayoutSidebar;
