import FormInput from "@/component/FormInput";

const Profile = () => {
  return (
    <div className="w-full p-4">
      <div className="flex flex-col px-6 pb-16 pt-6 rounded-lg bg-white mb-5">
        <div className="flex flex-row justify-between mt-2 gap-4 flex-wrap">
          <h1 className="sm:text-[24px] text-[18px] font-bold">Profile Information</h1>
          <button className="bg-shades-white text-shades-primary hover:text-shades-white hover:bg-shades-primary py-1 px-3 rounded-md text-[14px] border-2 border-shades-primary transition-all ease-in-out flex flex-row items-center gap-x-2">
            Edit
          </button>
        </div>

        {/* Profile info */}
        <div className="w-full flex sm:flex-col flex-col justify-between">
          <div className="w-full flex sm:flex-row flex-col flex-wrap justify-between gap-x-4">
            <FormInput
              className="max-w-full flex flex-1"
              disabled
              label="First name"
              defaultValue="Evans"
            />
            <FormInput
              className="max-w-full flex flex-1"
              disabled
              label="Last name"
              defaultValue="Okere"
            />
          </div>
          <div className="w-full flex sm:flex-row flex-col flex-wrap justify-between gap-x-4">
            <FormInput
              className="max-w-full flex flex-1"
              disabled
              label="Email"
              defaultValue="hello3vans@gmail.com"
            />
            <div className="flex flex-col my-3 max-w-full flex-1">
              <label
                htmlFor=""
                className="text-[14px] font-semibold mb-[0.8px]"
              >
                Business Logo
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col px-6 pb-8 pt-6 rounded-lg bg-white mb-5">
        <div className="flex flex-row justify-between mt-2 gap-4 flex-wrap">
          <h1 className="sm:text-[24px] text-[18px] font-bold">Change password</h1>
          <button className="bg-shades-white text-shades-primary hover:text-shades-white hover:bg-shades-primary py-1 px-3 rounded-md text-[14px] border-2 border-shades-primary transition-all ease-in-out flex flex-row items-center gap-x-2">
            Change
          </button>
        </div>
      </div>
      <div className="flex flex-col px-6 pb-8 pt-6 rounded-lg bg-white">
        <div className="flex flex-row justify-between mt-2 gap-4 flex-wrap">
          <h1 className="sm:text-[24px] text-[18px] font-bold">Delete account</h1>
          <button className="bg-shades-primary text-shades-white hover:text-shades-primary hover:bg-shades-white py-1 px-3 rounded-md text-[14px] border-2 border-shades-primary transition-all ease-in-out flex flex-row items-center gap-x-2">
            Delete my account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
