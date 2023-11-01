import FormInput from "@/component/FormInput";
import { AiFillLock } from "react-icons/ai";

const OrderSummary = () => {
  return (
    <div className="w-full max-h-fit p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 ">
      <h5 className="text-xl font-medium mb-5">Order Summary</h5>

      <div className="flex w-full flex-row justify-between mb-2">
        <h4 className="font-normal">
          Your plan: <span className="font-medium">Premium</span>
        </h4>
        <h4 className="text-end">#108</h4>
      </div>
      <div className="flex w-full flex-row justify-between mb-6">
        <h4 className="font-normal">Period:</h4>
        <h4 className="text-end">Monthly (#2,500)</h4>
      </div>

      <FormInput
        name="disxount"
        type="text"
        label="Discount code"
        placeholder="Discount code"
      />

      <hr className="my-8" />

      <div className="flex w-full flex-row justify-between mb-4">
        <h4 className="font-normal">Subtotal:</h4>
        <h4 className="text-end">#2,500.00</h4>
      </div>
      <div className="flex w-full flex-row justify-between mb-4">
        <h4 className="font-normal">Discount:</h4>
        <h4 className="text-end">0.00</h4>
      </div>

      <hr className="my-8" />

      <div className="flex w-full flex-row justify-between my-10">
        <h4 className="font-medium">Total amount:</h4>
        <h2 className="sm:text-2xl text-xl font-semibold text-end">#2,500.00</h2>
      </div>

      <button
        type="submit"
        className="w-full text-white bg-[#903677]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  "
      >
        Pay £2,500 now
      </button>
      <div className="mt-4 w-full text-sm font-medium text-gray-500 dark:text-gray-300 flex items-center justify-center">
        <AiFillLock className="mr-2" />
        <span>Payments are secure</span>
      </div>
    </div>
  );
};

export default OrderSummary;
