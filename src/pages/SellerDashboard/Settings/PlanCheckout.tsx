import FormInput from "@/component/FormInput";
import { IoIosArrowBack } from "react-icons/io";
import { RiMastercardLine } from "react-icons/ri";
import OrderSummary from "./OrderSummary";

const PlanCheckout = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-row justify-start gap-x-3 items-center">
        <div
          // onClick={() => navigate(-1)}
          className="p-1.5 rounded-md bg-white cursor-pointer"
        >
          <IoIosArrowBack size="1.5rem" />
        </div>
        <h2 className="font-semibold text-[20px] text-shades-gray">Checkout</h2>
      </div>

      <div className="w-full flex flex-row justify-between gap-3 mt-4">
        <div className="w-full flex flex-col">
          <div className="w-full flex flex-col gap-y-4 bg-white p-4 rounded-lg">
            <h3 className="text-[24px] font-medium">Billing Period</h3>
            <span className="px-3 py-2 rounded-lg font-medium bg-shades-primary/25 text-shades-primary">
              Monthly
            </span>
          </div>

          {/* PAYMENT INFO */}
          <div className="w-full flex flex-col gap-y-4 bg-white p-4 rounded-lg mt-3">
            <h3 className="text-[24px] font-medium">Payment Info</h3>
            <div className="flex flex-col">
              <FormInput
                name="name"
                type="text"
                label="Name on card"
                placeholder="Enter your card name"
              />
              <FormInput
                name="card"
                type="text"
                label="Card number"
                placeholder="Enter your card number"
              />
              <div className="w-full flex flex-row gap-3 justify-between">
                <FormInput
                  name="expiry"
                  type="text"
                  label="Expiry"
                  placeholder="Enter your date"
                />
                <FormInput
                  name="cvv"
                  type="pasword"
                  label="CVV"
                  placeholder="Enter your cvv number"
                />
              </div>
              <FormInput
                name="email"
                type="email"
                label="E-mail"
                placeholder="Enter your email address"
              />
            </div>
          </div>
          {/* END PAYMENT INFO */}
          <div className="w-full flex flex-col bg-white p-4 rounded-lg mt-3">
            <h3 className="text-[24px] font-medium">Billing Address</h3>
            <FormInput
              name="name"
              type="text"
              label="Full Name"
              placeholder="Enter your full name"
            />
            <FormInput
              name="address"
              type="text"
              label="Address 1"
              placeholder="Enter your address"
            />
          </div>
        </div>


        <div className="w-full flex">
         <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default PlanCheckout;
