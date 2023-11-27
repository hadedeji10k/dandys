import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { FcAlarmClock } from "react-icons/fc";
import { Statistic } from "antd";
import Button from "../../../component/Button";
import Swal from "sweetalert2";
import Logo2 from "@/assets/Logo 2.png";
import Logo from "@/assets/Logo 1.png";
import {
  useResendOTPMutation,
  useVerifyOTPMutation,
} from "@/api/sellerApiCalls";
import { toast } from "react-toastify";
import Loader from "@/component/Loader";

const { Countdown } = Statistic;

const OTPVerification = () => {
  const navigate = useNavigate();
  const [pin, setPin] = useState("");
  const [otpExpired, setOtpExpired] = useState(false);
  const [deadline, setDeadline] = useState(Date.now() + 5 * 60 * 1000);
  
  const [isLoading, setIsLoading] = useState(false);

  const handlePinChange = (pin: string) => {
    setPin(pin);
  };

  const email = localStorage.getItem("userEmail");

  const [verifyOTP] = useVerifyOTPMutation();
  const [resendOTP] = useResendOTPMutation();

  useEffect(() => {
    if (!email) {
      navigate(-1);
    }
  }, [])

  const verifyData = () => {
    if (pin.length !== 6) {
      toast.error("OTP code must be 6 digits.");
      return;
    }
  };

  const handleResend = () => {
    setIsLoading(true);
    resendOTP({
      email: email!,
    })
      .unwrap()
      .then(() => {
        toast.success("OTP has been re-sent to your e-mail addrress");
        setDeadline(Date.now() + 5 * 60 * 1000);
        setOtpExpired(false);
      })
      .catch(() => {
        toast.error("Error sending OTP, please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSubmit = () => {
    verifyData();
    setIsLoading(true);
    verifyOTP({
      email: email!,
      otpCode: pin,
    })
      .unwrap()
      .then(() => {
        localStorage.removeItem("userEmail");
        Swal.fire({
          title: "Success!",
          text: "You have successfully verified your email address.",
          icon: "success",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed || result.isDenied || result.isDismissed) {
            navigate("/account");
          }
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Loader spinning={isLoading}>
      <div className="w-full h-screen flex items-start">
        <div className="relative sm:w-1/2 sm:flex flex-col h-full bg-no-repeat bg-cover bg-[linear-gradient(to_right_bottom,#903677,rgba(179,70,148,0.8)),url('/public/img/female.png')]">
          <img
            src={Logo}
            className="absolute top-5 left-5 w-[120px] h-[40px]"
          />
        </div>
        <div className="sm:w-1/2 w-full min-h-screen no_scrollbar overflow-y-scroll bg-white flex flex-col px-10 py-16 justify-center">
          <div className="w-full flex flex-col">
            <div className="flex items-center w-full justify-center mb-10 sm:hidden">
              <img src={Logo2} className="top-5 left-5 w-[120px] h-[40px]" />
            </div>
            <div className="w-full flex flex-col mb-2 items-center justify-center">
              <h3 className="xs:text-2xl text-xl font-semibold mb-4 text-center">
                OTP Verification
              </h3>
              <p className="xs:text-sm text-[13px] mb-2 text-center">
                We emailed you a security code at {email}. it may take a moment
                to arrive.
              </p>
            </div>
            <div className="w-full flex flex-col">
              <OtpInput
                value={pin}
                onChange={handlePinChange}
                numInputs={6}
                inputStyle="border-2 text-[#325A73] bg-white border-[#D0D0D0] font-bold text-[32px] text-center !h-[60px] !w-[65px] xs:text-base xs:!w-[45px] xs:!h-[40px] rounded-[5px] mt-1 mr-2 mb-1 outline-none focus:border-[#903677]"
                renderInput={(props) => <input {...props} />}
                shouldAutoFocus={true}
                placeholder={"123456"}
                containerStyle="m-auto w-full flex !flex-row flex-wrap items-start justify-center"
              />
            </div>
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
            handleClick={handleSubmit}
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
                <span className="font-semibold text-[#903677] cursor-pointer">
                  Resend
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </Loader>
  );
};

export default OTPVerification;
