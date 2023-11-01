import React, { useState } from "react";
import Plan from "./Plan";
import Billing from "./Billing";
import Payment from "./Payment";
import StoreDetails from "./StoreDetails";

const Menu = [
  {
    id: 1,
    title: "Store Details",
    active: true,
  },
  {
    id: 2,
    title: "Plan",
    active: false,
  },
  {
    id: 3,
    title: "Billing",
    active: false,
  },
  {
    id: 4,
    title: "Payment",
    active: false,
  },
];

const Settings = () => {
  const [menu, setMenu] = useState(Menu);

  const handleTabChange = (id: number) => {
    const newMenu = menu.map((item) => {
      return {
        ...item,
        active: item.id === id ? true : false,
      };
    });

    setMenu([...newMenu]);
  };

  const active = menu.filter((item) => item.active)[0];

  return (
    <div className="w-full">
      <div className="w-full flex flex-row items-center bg-white p-2 rounded-lg mb-3">
        {menu.map((item, index) => (
          <div key={index} className="flex-auto text-center">
            <span
              className={`flex w-full cursor-pointer items-center justify-center rounded-lg bg-inherit px-0 py-2.5 transition-all ease-in-out ${
                item.active ? "bg-shades-primary text-shades-white" : ""
              }`}
              onClick={() => handleTabChange(item.id)}
            >
              <span className="ml-1">{item.title}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="w-full">
        {active.id === 1 ? (
          <>
            {" "}
            <StoreDetails />
          </>
        ) : active.id === 2 ? (
          <Plan />
        ) : active.id === 3 ? (
          <Billing />
        ) : active.id === 4 ? (
          <Payment />
        ) : null}
      </div>
    </div>
  );
};

export default Settings;
