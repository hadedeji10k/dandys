import {
  useGetSellerPreferencesQuery,
  useSetSellerPreferencesMutation,
} from "@/api/sellerApiCalls";
import { ISellerPreference } from "@/interface";
import { Switch } from "antd";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Button from "@/component/Button";

const Prefernces = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [preferences, setPreferences] = useState<ISellerPreference>({
    newOrder: false,
    cancellationOrder: false,
    returnOrder: false,
  });

  const { data: sellerPreferences, refetch } = useGetSellerPreferencesQuery();
  const [setSellerPreferences] = useSetSellerPreferencesMutation();

  useEffect(() => {
    setPreferences({
      ...preferences,
      newOrder: sellerPreferences?.data?.newOrder || false,
      cancellationOrder: sellerPreferences?.data?.cancellationOrder || false,
      returnOrder: sellerPreferences?.data?.returnOrder || false,
    });
  }, [sellerPreferences]);

  const onChange = (name: string, checked: boolean) => {
    setPreferences({
      ...preferences,
      [name]: checked
    })
  };


  const handleSubmit = () => {
    setIsLoading(true);
    setSellerPreferences(preferences)
      .unwrap()
      .then(() => {
        refetch();
        Swal.fire({
          title: "Success!",
          text: "Preferences updated successfully",
          icon: "success",
          confirmButtonText: "Ok",
        }).then(() => {});
      })
      .catch((err: any) => {
        toast.error(
          err?.data?.message ||
            "Error updating your preferences, please try again later"
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
    return;
  };

  return (
    <div className="w-full bg-shades-white min-h-[80vh] rounded-lg p-6">
      <div className="bg-shades-lightGray/20 w-full rounded-lg sm:px-8 sm:py-8 px-5 py-4 flex flex-row gap-x-3 justify-between items-center mb-3">
        <h3 className="md:text-[20px] text-base font-semibold">
          Notification about new orders
        </h3>
        <div>
          <Switch
            checked={preferences?.newOrder}
            onChange={(checked) => onChange("newOrder", checked)}
          />
        </div>
      </div>
      <div className="bg-shades-lightGray/20 w-full rounded-lg sm:px-8 sm:py-8 px-5 py-4 flex flex-row gap-x-3 justify-between items-center mb-3">
        <h3 className="md:text-[20px] text-base font-semibold">
          Seller Cancellation Order
        </h3>
        <div>
          <Switch
            checked={preferences?.cancellationOrder}
            onChange={(checked) => onChange("cancellationOrder", checked)}
          />
        </div>
      </div>
      {/* <div className="bg-shades-lightGray/20 w-full rounded-lg sm:px-8 sm:py-8 px-5 py-4 flex flex-row gap-x-3 justify-between items-center mb-3">
        <h3 className="md:text-[20px] text-base font-semibold">
          Seller Consignment Stock Alert
        </h3>
        <div>
          <Switch />
        </div>
      </div> */}
      {/* <div className="bg-shades-lightGray/20 w-full rounded-lg sm:px-8 sm:py-8 px-5 py-4 flex flex-row gap-x-3 justify-between items-center mb-3">
        <h3 className="md:text-[20px] text-base font-semibold">
          Seller Order Summary Report
        </h3>
        <div>
          <Switch />
        </div>
      </div> */}
      <div className="bg-shades-lightGray/20 w-full rounded-lg sm:px-8 sm:py-8 px-5 py-4 flex flex-row gap-x-3 justify-between items-center mb-3">
        <h3 className="md:text-[20px] text-base font-semibold">
          Seller return Order
        </h3>
        <div>
          <Switch
            checked={preferences?.returnOrder}
            onChange={(checked) => onChange("returnOrder", checked)}
          />
        </div>
      </div>
      {/* <div className="bg-shades-lightGray/20 w-full rounded-lg sm:px-8 sm:py-8 px-5 py-4 flex flex-row gap-x-3 justify-between items-center mb-3">
        <h3 className="md:text-[20px] text-base font-semibold">
          Seller Returned And Delivery Failed Summary Report
        </h3>
        <div>
          <Switch />
        </div>
      </div> */}

      <div className="w-full flex items-center justify-center mt-8">
        <Button
          handleClick={handleSubmit}
          className={"sm:!px-10 px-6 py-3"}
          type={"button"}
          title={"Save"}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default Prefernces;
