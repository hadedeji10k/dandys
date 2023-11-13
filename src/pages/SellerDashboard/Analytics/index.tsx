import { useState } from "react";

import Sales from "./Sales";
import Expenses from "./Expenses";
import Products from "./Products";
import Invoices from "./Invoices";

const Menu = [
  {
    id: 1,
    title: "Sales",
    active: true,
  },
  {
    id: 2,
    title: "Expenses",
    active: false,
  },
  {
    id: 3,
    title: "Products",
    active: false,
  },
  {
    id: 4,
    title: "Invoices",
    active: false,
  },
];

const Analytics = () => {
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
            <Sales />
          </>
        ) : active.id === 2 ? (
          <Expenses />
        ) : active.id === 3 ? (
          <Products />
        ) : active.id === 4 ? (
          <Invoices />
        ) : null}
      </div>
    </div>
  );
};

export default Analytics;
