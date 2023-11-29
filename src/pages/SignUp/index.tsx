import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BiSolidLock } from "react-icons/bi";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoCheckbox } from "react-icons/io5";
import { FaUserLarge } from "react-icons/fa6";
import FormInput from "../../component/FormInput";
import Button from "../../component/Button";
import * as Yup from "yup";
import { useFormik } from "formik";
import Logo from "@/assets/Logo 1.png";
import Logo2 from "@/assets/Logo 2.png";
import {
  useGetCurrentUserQuery,
  useSignUpMutation,
} from "@/api/sellerApiCalls";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { encode } from "@/utils/helpers";
import { saveUser } from "@/api/slices/user";
import { useAppDispatch } from "@/api/hook";
import useAuth from "@/api/context";

const SignUp = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading } = useAuth();

  const [signUp] = useSignUpMutation();
  const dispatch = useAppDispatch();

  
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate("/dashboard");
    }
  }, []);

  const {
    data: userData,
    error: _,
    refetch: refetchUser,
  } = useGetCurrentUserQuery();

  const signUpSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(2, "Full name is too short!")
      .required("Full name required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters!")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])(.{8,}$)/,
        "Password must meet the specified criteria"
      )
      .required("Password is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email address is required"),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      password: "",
      email: "",
      accountType: "SELLER"
    },
    validationSchema: signUpSchema,
    onSubmit: (values, { setSubmitting }) => {
      signUp(values)
        .unwrap()
        .then((res) => {
          const encodedToken = encode(res?.data?.token);
          const token = {
            value: encodedToken,
            expires: res?.data?.expiresIn,
          };
          login(res?.data?.user, token);
          localStorage.setItem("userEmail", values.email);

          refetchUser();
          Swal.fire({
            title: "Success!",
            text: "You have successfully signed up",
            icon: "success",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed || result.isDenied || result.isDismissed) {
              const currentUser = (userData as any)?.data;

              dispatch(saveUser(currentUser));

              navigate("/otp");
            }
          });
        })
        .catch((err) => {
          toast.error(err?.data?.message || "Signup failed, try again later");
        })
        .finally(() => {
          setSubmitting(false);
        });
      return;
    },
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
    formik.setFieldValue("password", value);
  };

  return (
    <div className="w-full h-screen max-h-full flex">
      <div className="relative sm:w-1/2 sm:flex flex-col h-full bg-no-repeat bg-cover bg-[linear-gradient(to_right_bottom,#903677,rgba(179,70,148,0.8)),url('/public/img/female.png')]">
        <img src={Logo} className="absolute top-5 left-5 w-[120px] h-[40px]" />
      </div>
      <div className="sm:w-1/2 w-full min-h-screen no_scrollbar overflow-y-scroll bg-white flex flex-col px-10 py-16 justify-center">
        <div className="w-full flex flex-col">
          <div className="flex items-center w-full justify-center mb-10 sm:hidden">
            <img src={Logo2} className="top-5 left-5 w-[120px] h-[40px]" />
          </div>
          <div className="w-full flex flex-col mb-2 items-center justify-center">
            <h3 className="xs:text-2xl text-xl font-semibold mb-4">Sign up</h3>
            <p className="xs:text-sm text-[13px] mb-2 text-center">
              Create an account, let’s get you started.
            </p>
          </div>

          <div className="w-full flex flex-col">
            <FormInput
              name="fullName"
              type="text"
              label="Full name"
              placeholder="Enter your full name"
              onChange={formik.handleChange}
              icon={<FaUserLarge />}
              error={formik.touched.email && formik.errors.fullName}
            />
            <FormInput
              name="email"
              type="email"
              label="Email Address"
              placeholder="Enter your email address"
              onChange={formik.handleChange}
              icon={<MdOutlineMailOutline />}
              error={formik.touched.email && formik.errors.email}
            />
            <FormInput
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              icon={<BiSolidLock />}
              onChange={(e: any) => {
                formik.handleChange(e);
                handlePasswordChange(e);
              }}
              error={formik.touched.password && formik.errors.password}
            />
            <div>
              {/* <div className="w-full flex flex-row gap-x-2">
                <div className="h-2 w-full rounded-md bg-green-600"></div>
                <div className="h-2 w-full rounded-md bg-green-600"></div>
                <div className="h-2 w-full rounded-md bg-green-600"></div>
              </div> */}
              {formik.values.password.length > 0 && (
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

            <Button
              handleClick={formik.handleSubmit}
              className={"w-full mt-5"}
              type={"button"}
              title={"Sign up"}
              disabled={formik.isSubmitting}
              loading={formik.isSubmitting}
            />
          </div>
        </div>
        <div className="w-full flex items-center justify-center mt-10">
          <p
            className="text-sm font-normal text-[#666365]"
            onClick={() => navigate("/sign-in")}
          >
            Already have an account?{" "}
            <span className="font-semibold text-[#903677] cursor-pointer">
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
