import { useState } from "react";
import FormInput from "@/component/FormInput";
import { useAppSelector } from "@/api/hook";
import Button from "@/component/Button";

const Menu = [
  {
    key: 1,
    title: "Account",
    active: true,
  },
  {
    key: 2,
    title: "Change password",
    active: false,
  },
  {
    key: 3,
    title: "Billing address",
    active: false,
  },
  {
    key: 4,
    title: "My orders",
    active: false,
  },
  {
    key: 5,
    title: "Delete account",
    active: false,
  },
];

const BuyerAccount = () => {
  const user = useAppSelector((state) => state.user.user);

  const [menu, setMenu] = useState(Menu);

  const handleTabChange = (id: number) => {
    const newMenu = menu.map((item) => {
      return {
        ...item,
        active: item.key === id ? true : false,
      };
    });

    setMenu([...newMenu]);
  };

  return (
    <div className="w-full flex flex-row gap-10 justify-between p-14">
      <div className="w-[250px] flex flex-col gap-3">
        {menu.map((item) => (
          <h3
            key={item.key}
            className={`py-2 border-b cursor-pointer ${
              item.active && "text-shades-primary"
            }`}
            onClick={() => handleTabChange(item.key)}
          >
            {item.title}
          </h3>
        ))}
      </div>

      <Account />
    </div>
  );
};

export default BuyerAccount;

const Account = () => {
  const user = useAppSelector((state) => state.user.user);

  return (
    <div className="w-full flex sm:flex-col flex-col p-4">
      <div className="w-full flex sm:flex-row flex-col flex-wrap justify-between gap-x-4">
        <FormInput
          className="max-w-full flex flex-1"
          disabled
          label="First name"
          defaultValue={user?.fullName?.split(" ")[0]}
        />
        <FormInput
          className="max-w-full flex flex-1"
          disabled
          label="Last name"
          defaultValue={user?.fullName?.split(" ")[0]}
        />
      </div>
      <div className="w-full flex sm:flex-row flex-col flex-wrap justify-between gap-x-4">
        <FormInput
          className="max-w-full flex flex-1"
          disabled
          label="Email"
          defaultValue={user?.email}
        />
        <FormInput
          className="max-w-full flex flex-1"
          disabled
          label="Phone"
          defaultValue={user?.phone!}
        />
      </div>
      <div className="flex flex-col my-3 max-w-full flex-1 mb-6">
        <label htmlFor="" className="text-[14px] font-semibold mb-[0.8px]">
          Business Logo
        </label>
      </div>

      <div>
        <Button
          // handleClick={() => navigate("/sign-up")}
          className={"px-8 py-3 mt-5"}
          type={"button"}
          title={"UPDATE"}
          disabled={false}
        />
      </div>
    </div>
  );
};
