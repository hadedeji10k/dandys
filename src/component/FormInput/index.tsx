import React, { useState } from "react";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";

export interface IFormInputProps {
  label?: string;
  placeholder?: string;
  name?: string;
  defaultValue?: string | number;
  value?: string | number;
  type?: React.HTMLInputTypeAttribute;
  inputClassName?: string;
  labelClassName?: string;
  className?: string;
  onChange?: (e: any) => void;
  icon?: React.FC | JSX.Element | string;
}

const FormInput = ({
  className,
  labelClassName,
  label,
  type,
  onChange,
  icon,
  placeholder,
}: IFormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const inputType =
    type === "password" ? (showPassword === true ? "text" : "password") : type;

  return (
    <div className={`flex flex-col my-3 ${className}`}>
      <label
        htmlFor=""
        className={`text-[13px] font-normal mb-2 ${labelClassName}`}
      >
        {label}
      </label>
      <div className="flex flex-row gap-x-3 justify-center items-center p-2 h-11 border border-[#b9b5b8] rounded-md">
        {icon && <span>{icon}</span>}
        <input
          type={inputType}
          onChange={onChange}
          className={`bg-transparent text-[14px] border-none hover:border-none focus:border-none focus:outline-none w-full text-[#666365]`}
          placeholder={placeholder}
        />
        {type === "password" && (
          <span onClick={handleShowPassword}>
            {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
          </span>
        )}
      </div>
    </div>
  );
};

export default FormInput;
