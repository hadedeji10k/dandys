import { BiSolidLock } from "react-icons/bi";
import FormInput from "../../component/FormInput";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoCheckbox } from "react-icons/io5";
import { FaUserLarge } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SignUp = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // states for mananging validation
  const [hasEightCharacters, setHasEightCharacters] = useState(false);
  const [hasSpecialCharacter, setHasSpecialCharacter] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasOneNumber, setHasOneNumber] = useState(false);

  const handlePasswordChange = (e: any) => {
    const value = e.target.value;

    // has special characters
    const hasSpecialCharacterTest = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/;
    setHasSpecialCharacter(hasSpecialCharacterTest.test(value));

    // has uppercase characters
    const hasUpperCaseTest = /[A-Z]/;
    setHasUpperCase(hasUpperCaseTest.test(value));

    // has lowercase characters
    const hasLowerCaseTest = /[a-z]/;
    setHasLowerCase(hasLowerCaseTest.test(value));

    // has one number
    const hasOneNumberTest = /\d+/;
    setHasOneNumber(hasOneNumberTest.test(value));

    // has eight characters
    setHasEightCharacters(value.length >= 8 ? true : false);
    setForm({
      ...form,
      password: value,
    });
  };

  return (
    <div className="w-full h-screen max-h-full flex">
      <div className="relative w-1/2 flex flex-col h-full bg-[linear-gradient(to_right_bottom,#903677,rgba(179,70,148,0.8)),url('/public/img/female.png')]"></div>
      <div className="w-1/2 min-h-screen overflow-y-scroll bg-white flex flex-col px-10 py-16 justify-start">
        <div className="w-full flex flex-col">
          <div className="w-full flex flex-col mb-2 items-center justify-center">
            <h3 className="text-2xl font-semibold mb-4">Sign up</h3>
            <p className="text-sm mb-2">
              Create an account, let’s get you started.
            </p>
          </div>

          <div className="w-full flex flex-col">
            <FormInput
              name="email"
              type="email"
              label="Full name"
              placeholder="Enter your full name"
              icon={<FaUserLarge />}
            />
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
              onChange={handlePasswordChange}
            />
            <div>
              {/* <div className="w-full flex flex-row gap-x-2">
                <div className="h-2 w-full rounded-md bg-green-600"></div>
                <div className="h-2 w-full rounded-md bg-green-600"></div>
                <div className="h-2 w-full rounded-md bg-green-600"></div>
              </div> */}
              {form.password.length > 0 && (
                <div>
                  <div
                    className={`flex flex-row gap-x-3 items-center my-2 ${
                      hasEightCharacters ? "text-green-600" : "text-gray-600"
                    }`}
                  >
                    <IoCheckbox />
                    <p>At least 8 characters</p>
                  </div>
                  <div
                    className={`flex flex-row gap-x-3 items-center my-2 ${
                      hasOneNumber ? "text-green-600" : "text-gray-600"
                    }`}
                  >
                    <IoCheckbox />
                    <p>Contains at least one number</p>
                  </div>
                  <div
                    className={`flex flex-row gap-x-3 items-center my-2 ${
                      hasSpecialCharacter ? "text-green-600" : "text-gray-600"
                    }`}
                  >
                    <IoCheckbox />
                    <p>Contains a special character</p>
                  </div>
                  <div
                    className={`flex flex-row gap-x-3 items-center my-2 ${
                      hasUpperCase ? "text-green-600" : "text-gray-600"
                    }`}
                  >
                    <IoCheckbox />
                    <p>Contains uppercase letter</p>
                  </div>
                  <div
                    className={`flex flex-row gap-x-3 items-center my-2 ${
                      hasLowerCase ? "text-green-600" : "text-gray-600"
                    }`}
                  >
                    <IoCheckbox />
                    <p>Contains lowercase letter</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full mt-5 flex flex-row items-center justify-between gap-x-3 flex-wrap">
            <div className="flex flex-row">
              <input type="checkbox" className="w-4 h-4 mr-2 bg-white" />
              <p className="text-sm">Remember Me</p>
            </div>
            <p className="text-sm cursor-pointer">Forgot password</p>
          </div>
        </div>
        <div className="w-full flex items-center justify-center mt-10">
          <p
            className="text-sm font-normal text-[#666365]"
            onClick={() => navigate("/sign-in")}
          >
            Already have an account?{" "}
            <span className="font-semibold text-[#903677]">Log in</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
