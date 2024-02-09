import { useEffect, useState } from "react";
import Plan from "./Plan";
import Billing from "./Billing";
// import Payment from "./Payment";
import StoreDetails from "./StoreDetails";
import {
  useGetSellerInformationQuery,
  useGetTransactionsQuery
} from "@/api/sellerApiCalls";
import { ISellerInformation } from "@/interface";

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
  // {
  //   id: 4,
  //   title: "Payment",
  //   active: false,
  // },
];

const Settings = () => {
  const [menu, setMenu] = useState(Menu);
  const [transactions, setTransactions] = useState<any[]>([]);

  const [sellerInformation, setSellerInformation] =
    useState<ISellerInformation>({
      managerFullName: "",
      businessImage: "",
      shopName: "",
      cacNumber: "",
      documentNumber: "",
      documentType: "",
      documentVerified: false,
      documentImageUrl: "",
      phoneNumber: "",
      accountType: "",
      isActive: false,
      currentPlan: "FREE",
      lastSubscriptionDate: new Date(),
      expiryDate: new Date(),
      remainingDays: 0,
    });

  const { data: sellerInfo } = useGetSellerInformationQuery();
  const { data: sellerTransaction } = useGetTransactionsQuery();

  useEffect(() => {
    if (sellerInfo?.data) {
      setSellerInformation(sellerInfo?.data);
    }
  }, [sellerInfo]);

  useEffect(() => {
    if (sellerTransaction?.data) {
      setTransactions(sellerTransaction?.data);
    }
  }, [sellerTransaction]);

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
          <StoreDetails
            sellerInformation={sellerInformation}
            handleTabChange={handleTabChange}
          />
        ) : active.id === 2 ? (
          <Plan sellerInformation={sellerInformation} />
        ) : active.id === 3 ? (
          <Billing
            sellerInformation={sellerInformation}
            transactions={transactions}
            handleTabChange={handleTabChange}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Settings;
