import FormInput from "../../../component/FormInput";
import {MdOutlineMailOutline} from "react-icons/md"
import Button from "../../../component/Button";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full h-screen flex items-start">
      <div className="relative w-1/2 flex flex-col h-full bg-[linear-gradient(to_right_bottom,#903677,rgba(179,70,148,0.8)),url('/public/img/female.png')]"></div>
      <div className="w-1/2 h-full bg-white flex flex-col p-20 justify-center">
        <div className="w-full flex flex-col">
          <div className="w-full flex flex-col mb-2 items-center justify-center">
            <h3 className="text-2xl font-semibold mb-4">Forgot Password</h3>
            <p className="text-sm mb-2">
              Enter the email address associated with your account.
            </p>
          </div>
          <div className="w-full flex flex-col">
            <FormInput
              name="email"
              type="email"
              label="Email Address"
              placeholder="Enter your email address"
              icon={<MdOutlineMailOutline />}
            />
            <Button
              handleClick={() => navigate("/otp")}
              className={"w-full mt-5"}
              type={"button"}
              title={"Continue"}
              disabled={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;