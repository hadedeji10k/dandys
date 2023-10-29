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
  icon?: JSX.Element | string;
  required?: boolean;
  disabled?: boolean;
}

const FormInput = ({
  className,
  labelClassName,
  label,
  type,
  onChange,
  icon,
  placeholder,
  required,
  disabled,
  defaultValue,
}: IFormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type
    ? type === "password"
      ? showPassword === true
        ? "text"
        : "password"
      : type
    : "text";

  return (
    <div className={`flex flex-col my-3 ${className}`}>
      <label
        htmlFor=""
        className={`text-[14px] font-semibold mb-[0.8px] ${labelClassName}`}
      >
        {label} {required ? <span className="text-shades-red">*</span> : ""}
      </label>
      <div className="flex flex-row gap-x-3 justify-center items-center p-2 h-11 border-[2px] border-[#d6d6da] rounded-md">
        {icon && <span>{icon}</span>}
        <input
          type={inputType}
          onChange={onChange}
          className={`bg-transparent text-[14px] border-none hover:border-none focus:border-none focus:outline-none w-full text-[#666365]`}
          placeholder={placeholder}
          disabled={disabled}
          defaultValue={defaultValue}
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
