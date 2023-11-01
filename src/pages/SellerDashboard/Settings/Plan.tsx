import Button from "@/component/Button";

const Plan = () => {
  return (
    <div className="w-full">
      <div className="container px-5 py-12 bg-white mt-6  space-y-5">
        <div className="flex flex-col items-center justify-center text-center mb-8">
          <h1 className="md:text-4xl sm:text-2xl text-xl font-bold mb-2">
            Choose Pricing Plan
          </h1>
          <h3 className="text-sm text-gray-500 mb-4">
            No surprise fees. Cancel anytime.
          </h3>
          <div>
            <button className="border border-[#903677] text-[#903677] py-2 px-4 rounded-md font-medium">
              Deactivate Trial
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-end justify-start w-full bg-white border border-[#903677] rounded-lg p-4">
          <div className="w-full flex flex-row gap-3 items-center justify-between">
            <div className="flex flex-col gap-3">
              <div className="flex flex-row gap-2 flex-wrap items-center">
                <h3 className="text-[18px] font-semibold">Current plan</h3>
                <h4 className="text-[14px]">Basic Trial</h4>
                <div className="px-2 py-1 rounded-[20px] text-shades-primary bg-shades-primary/20 text-[12px]">
                  Monthly
                </div>
              </div>
              <h3 className="text-[14px]">
                Manage your billing and payment details
              </h3>
              <p className="text-status-danger text-[12px] font-medium">
                Your trial has 2 days remaining
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-semibold">
                N0 <small className="text-[17px] font-medium">/ month</small>
              </h3>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between gap-3">
          <div className="px-5 pt-6 pb-8 bg-shades-primary/10 rounded-lg">
            <h3 className="font-semibold md:text-4xl sm:text-2xl text-lg mb-6">
              Basic
            </h3>
            <p className="max-w-[60%]">
              Sell in person, online, over the phone, or out in the field. No
              setup fees or monthly fees
            </p>
            <hr className="my-8 w-full" />
            <h3 className="font-semibold md:text-4xl sm:text-2xl text-lg mb-6">
              #3,000{" "}
              <small className="sm:text-[16px] text-[12px]">/month</small>
            </h3>

            <div className="w-full flex items-center justify-center">
              <Button
                className={"px-8 text-lg"}
                type={"button"}
                title={"Choose Basic"}
              />
            </div>
          </div>
          <div className="px-5 pt-6 pb-8 bg-shades-primary/10 rounded-lg">
            <h3 className="font-semibold md:text-4xl sm:text-2xl text-lg mb-6">
              Premium
            </h3>
            <p className="max-w-[60%]">
              Get advanced features designed specifically for service-based
              businesses.
            </p>
            <hr className="my-8 w-full" />
            <h3 className="font-semibold md:text-4xl sm:text-2xl text-lg mb-6">
              #4,500{" "}
              <small className="sm:text-[16px] text-[12px]">/month</small>
            </h3>

            <div className="w-full flex items-center justify-center">
              <Button
                className={"px-8 text-lg"}
                type={"button"}
                title={"Choose Premium"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plan;
