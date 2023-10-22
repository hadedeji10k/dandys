import FormInput from "../../component/FormInput";
import {MdOutlineMailOutline} from "react-icons/md"
import { BiSolidLock } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Button from "../../component/Button";

const SignIn = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full h-screen flex items-start">
      <div className="relative w-1/2 flex flex-col h-full bg-[linear-gradient(to_right_bottom,#903677,rgba(179,70,148,0.8)),url('/public/img/female.png')]"></div>
      <div className="w-1/2 h-full bg-white flex flex-col p-20 justify-center">
        <div className="w-full flex flex-col">
          <div className="w-full flex flex-col mb-2 items-center justify-center">
            <h3 className="text-2xl font-semibold mb-4">Login</h3>
            <p className="text-sm mb-2">
              Welcome Back! please enter your details.
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
            <FormInput
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              icon={<BiSolidLock />}
            />

            <Button
              handleClick={() => navigate("/")}
              className={"w-full mt-5"}
              type={"button"}
              title={"Sign in"}
              disabled={false}
            />
          </div>
          <div className="w-full mt-5 flex flex-row items-center justify-between gap-x-3 flex-wrap">
            <div className="flex flex-row">
              <input type="checkbox" className="w-4 h-4 mr-2 bg-white" />
              <p className="text-sm">Remember Me</p>
            </div>
            <p className="text-sm cursor-pointer" onClick={() => navigate("/forgot-password")}>Forgot password</p>
          </div>
        </div>
        <div className="w-full flex items-center justify-center mt-10">
          <p
            className="text-sm font-normal text-[#666365]"
            onClick={() => navigate("/sign-up")}
          >
            Don’t have an account?{" "}
            <span className="font-semibold text-[#903677] cursor-pointer">
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn