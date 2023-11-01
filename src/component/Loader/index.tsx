import "./index.css";
import logo from "@/assets/Logo 2.png";
import { ImSpinner10 } from "react-icons/im";

const Loader = ({
  spinning,
  children,
  message,
}: {
  message?: string;
  spinning: boolean;
  children: any;
}) => {
  return spinning ? (
    <div className="relative">
      <div className="flex flex-col items-center justify-center">
        <div className="loader">
          <ImSpinner10
            fill="#679B71"
            size="6rem"
            className="animate-spin-slow absolute"
          />
          <span className="animate-pulse-slow w-[60px] h-[60px] rounded-[50%] overflow-hidden">
            <img src={logo} alt="" className="w-full h-full object-fill" />
          </span>
        </div>
        <p className="absolute loader top-[4.7rem] text-[1.1rem] font-semibold">
          {message}
        </p>
      </div>
      <div className="spin_blur">{children}</div>
    </div>
  ) : (
    <>{children}</>
  );
};

export default Loader;
