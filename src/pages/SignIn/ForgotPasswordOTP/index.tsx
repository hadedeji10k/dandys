import { useState } from "react";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { FcAlarmClock } from "react-icons/fc";
import { Statistic } from "antd";
import Button from "../../../component/Button";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import FormInput from "@/component/FormInput";
import { BiSolidLock } from "react-icons/bi";
import { IoCheckbox } from "react-icons/io5";
import {
  useCompleteForgotPasswordMutation,
  useForgotPasswordMutation,
} from "@/api/sellerApiCalls";
import Loader from "@/component/Loader";

const { Countdown } = Statistic;

const forgotPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters!")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])(.{8,}$)/,
      "Password must meet the specified criteria"
    )
    .required("Password is required"),
});

const ForgotPasswordOTPVerification = () => {
  const navigate = useNavigate();
  const [pin, setPin] = useState("");
  const [otpExpired, setOtpExpired] = useState(false);
  const [deadline, setDeadline] = useState(Date.now() + 1 * 60 * 1000);

  // states for mananging validation
  const [hasEightCharacters, setHasEightCharacters] = useState(false);
  const [hasSpecialCharacter, setHasSpecialCharacter] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasOneNumber, setHasOneNumber] = useState(false);

  const email = localStorage.getItem("userEmail");

  const [completeForgotPassword] = useCompleteForgotPasswordMutation();
  const [resendOTP] = useForgotPasswordMutation();

  if (!email) {
    navigate(-1);
  }

  const formik = useFormik({
    initialValues: {
      fullName: "",
      password: "",
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: (values, { setSubmitting }) => {
      verifyData();
      setSubmitting(true);
      completeForgotPassword({
        email: email!,
        otpCode: pin,
        password: values.password,
      })
        .unwrap()
        .then(() => {
          localStorage.removeItem("userEmail");
          Swal.fire({
            title: "Success!",
            text: "You have successfully reset your password.",
            icon: "success",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed || result.isDenied || result.isDismissed) {
              navigate("/sign-in");
            }
          });
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  const handlePasswordChange = (e: any) => {
    e.preventDefault()
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

  const verifyData = () => {
    if (pin.length !== 6) {
      toast.error("OTP code must be 6 digits.");
      return;
    }
  };

  const handlePinChange = (pin: string) => {
    setPin(pin);
  };

  const handleResend = () => {
    formik.setSubmitting(true);
    resendOTP({ email: email! })
      .unwrap()
      .then(() => {
        toast.success("OTP has been re-sent to your e-mail addrress")
        setDeadline(Date.now() + 5 * 60 * 1000);
        setOtpExpired(false);        
      })
      .catch(() => {
        toast.error("Error sending OTP, please try again.");
      })
      .finally(() => {
        formik.setSubmitting(false);
      });
  };

  return (
    <Loader spinning={formik.isSubmitting}>
      <div className="w-full h-screen flex items-start">
        <div className="relative sm:w-1/2 sm:flex flex-col h-full bg-no-repeat bg-cover bg-[linear-gradient(to_right_bottom,#903677,rgba(179,70,148,0.8)),url('/public/img/female.png')]"></div>
        <div className="sm:w-1/2 w-full h-full bg-white flex flex-col xs:p-16 p-5 justify-center">
          <div className="w-full flex flex-col">
            <div className="w-full flex flex-col mb-2 items-center justify-center">
              <h3 className="xs:text-2xl text-xl font-semibold mb-4">
                Verify it's you
              </h3>
              <p className="xs:text-sm text-[13px] mb-2 text-center">
                We emailed you a security code at {email!}. it may take a moment
                to arrive.
              </p>
            </div>
            <div className="w-full flex flex-col">
              <label
                htmlFor=""
                className="text-[14px] font-semibold mb-[0.8px]"
              >
                OTP code
              </label>
              <OtpInput
                value={pin}
                onChange={handlePinChange}
                numInputs={6}
                inputStyle="border-2 text-[#325A73] bg-white border-[#D0D0D0] font-bold text-[32px] text-center !h-[60px] !w-[65px] xs:text-base xs:!w-[45px] xs:!h-[40px] rounded-[5px] mt-1 mr-2 mb-1 outline-none focus:border-[#903677]"
                renderInput={(props) => <input {...props} />}
                shouldAutoFocus={true}
                placeholder={"123456"}
                containerStyle="w-full flex !flex-row flex-wrap items-start justify-start"
              />
            </div>
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

          {otpExpired ? (
            <div className="flex flex-row gap-3 mt-5 items-center justify-center">
              <p>OTP Expired</p>
            </div>
          ) : (
            <div className="flex flex-row gap-3 mt-5 items-center justify-center">
              <p>
                <FcAlarmClock size="1.3rem" />
              </p>
              <p className="text-[16px] flex flex-row gap-2 items-center justify-normal">
                Expires In :{" "}
                <Countdown
                  value={deadline}
                  format="mm:ss"
                  valueStyle={{ fontSize: "16px", fontFamily: "Poppins" }}
                  onFinish={() => {
                    setOtpExpired(true);
                  }}
                />
              </p>
            </div>
          )}

          <Button
            handleClick={formik.handleSubmit}
            className={"w-full mt-5"}
            type={"button"}
            title={"Continue"}
            disabled={false}
          />

          {otpExpired && (
            <div className="w-full flex items-center justify-center mt-10">
              <p
                className="text-sm font-normal text-[#666365]"
                onClick={handleResend}
              >
                Didn’t get a code?{" "}
                <span className="font-semibold text-[#903677]">Resend</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </Loader>
  );
};

export default ForgotPasswordOTPVerification;
