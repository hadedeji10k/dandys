import { useState } from "react";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { FcAlarmClock } from "react-icons/fc";
import { Statistic } from "antd";
import Button from "../../../component/Button";
import Swal from "sweetalert2";

const { Countdown } = Statistic;

const OTPVerification = () => {
  const navigate = useNavigate();
  const [pin, setPin] = useState("");
  const [otpExpired, setOtpExpired] = useState(false);

  const handlePinChange = (pin: string) => {
    setPin(pin);
  };

  const email = localStorage.getItem("userEmail")

  const handleSubmit = () => {
    setTimeout(() => {
      Swal.fire({
        title: "Success!",
        text: "You have successfully verified your email address.",
        icon: "success",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed || result.isDenied || result.isDismissed) {
          // getCurrentUser();
          navigate("/account")
        }
      });
    }, 3000)
  }

  return (
    <div className="w-full h-screen flex items-start">
      <div className="relative w-1/2 flex flex-col h-full bg-no-repeat bg-cover bg-[linear-gradient(to_right_bottom,#903677,rgba(179,70,148,0.8)),url('/public/img/female.png')]"></div>
      <div className="w-1/2 h-full bg-white flex flex-col p-20 justify-center">
        <div className="w-full flex flex-col">
          <div className="w-full flex flex-col mb-2 items-center justify-center">
            <h3 className="xs:text-2xl text-xl font-semibold mb-4">
              OTP Verification
            </h3>
            <p className="xs:text-sm text-[13px] mb-2 text-center">
              We emailed you a security code at {email}. it may take a moment to
              arrive.
            </p>
          </div>
          <div className="w-full flex flex-col">
            <OtpInput
              value={pin}
              onChange={handlePinChange}
              numInputs={4}
              inputStyle="border-2 text-[#325A73] bg-white border-[#D0D0D0] font-bold text-[32px] text-center !h-[60px] !w-[65px] xs:text-base xs:!w-[45px] xs:!h-[40px] rounded-[5px] mt-1 mr-2 mb-1 outline-none focus:border-[#903677]"
              renderInput={(props) => <input {...props} />}
              shouldAutoFocus={true}
              placeholder={"1234"}
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
                value={Date.now() + 1 * 60 * 1000}
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

        <div className="w-full flex items-center justify-center mt-10">
          <p
            className="text-sm font-normal text-[#666365]"
            onClick={() => setOtpExpired(false)}
          >
            Didn’t get a code?{" "}
            <span className="font-semibold text-[#903677]">Resend</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
