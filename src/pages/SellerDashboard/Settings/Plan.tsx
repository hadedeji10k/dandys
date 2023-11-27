import Button from "@/component/Button";
import { usePaystackPayment } from "react-paystack";
import { ISubscriptionDetails } from "@/interface";
import { PlanAmount, paystackPublicKey } from "@/utils/constant";
import { useAppSelector } from "@/api/hook";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCreateTransactionMutation } from "@/api/sellerApiCalls";
import Loader from "@/component/Loader";

interface IProps {
  subscriptionDetails: ISubscriptionDetails;
}

const Plan = ({ subscriptionDetails }: IProps) => {
  const user = useAppSelector((state) => state.user.user);

  const [createTransaction] = useCreateTransactionMutation();

  const [isLoading, setIsLoading] = useState(false);

  const InitializePaymentButton = ({
    plan,
  }: {
    plan: "FREE" | "BASIC" | "PREMIUM";
  }) => {

    const config = {
      reference: new Date().getTime().toString(),
      email: "user@example.com",
      amount: PlanAmount[plan] * 100,
      publicKey: paystackPublicKey,
      metadata: {
        custom_fields: [],
        plan,
        userId: user.id,
        paymentType: "SUBSCRIPTION",
      },
    };

    const onSuccess = (reference: any) => {
      window.location.reload();
    };

    const onClose = () => {
      window.location.reload()
    };

    const paystackPayment = usePaystackPayment(config);

    const createNewTransaction = () => {
      setIsLoading(true)
      createTransaction({
        reference: config.reference,
        amount: PlanAmount[plan],
        paymentProvider: "PAYSTACK",
        type: "SUBSCRIPTION",
      })
        .unwrap()
        .then(() => {
          paystackPayment(onSuccess as () => void, onClose);
        })
        .catch((err: any) => {
          toast.error(
            err?.data?.message ||
              "Error creating transaction, please try again later"
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    };


    return (
      <Button
        className={"px-8 text-lg capitalize"}
        type={"button"}
        title={`Choose ${plan}`}
        handleClick={createNewTransaction}
      />
    );
  };

  return (
    <Loader spinning={isLoading}>
      <div className="w-full">
        <div className="container px-5 py-12 bg-white mt-6  space-y-5">
          <div className="flex flex-col items-center justify-center text-center mb-8">
            <h1 className="md:text-4xl sm:text-2xl text-xl font-bold mb-2">
              Choose Pricing Plan
            </h1>
            <h3 className="text-sm text-gray-500 mb-4">
              No surprise fees. Cancel anytime.
            </h3>
          </div>

          <div className="flex flex-wrap items-end justify-start w-full bg-white border border-[#903677] rounded-lg p-4">
            <div className="w-full flex flex-row gap-3 items-center justify-between">
              <div className="flex flex-col gap-3">
                <div className="flex flex-row gap-2 flex-wrap items-center">
                  <h3 className="text-[18px] font-semibold">Current plan:</h3>
                  <h4 className="text-[14px]">
                    {subscriptionDetails?.currentPlan}
                  </h4>

                  <div className="px-3 py-0.5 rounded-[20px] text-shades-primary bg-shades-primary/20 text-[12px]">
                    {subscriptionDetails?.currentPlan === "FREE"
                      ? "Trial"
                      : "Monthly"}
                  </div>
                </div>
                {subscriptionDetails?.currentPlan === "FREE" && (
                  <p className="text-status-danger text-[12px] font-medium">
                    Your trial has {subscriptionDetails?.remainingDays} day
                    {subscriptionDetails?.remainingDays > 1 ? "s" : ""}{" "}
                    remaining
                  </p>
                )}
              </div>
              <div>
                <Button
                  className={"px-8 text-lg"}
                  type={"button"}
                  title={"Upgrade"}
                />
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
                <InitializePaymentButton plan="BASIC" />
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
                <InitializePaymentButton plan="PREMIUM" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Loader>
  );
};

export default Plan;
