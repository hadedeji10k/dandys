import { getBase64 } from "@/utils/helpers";
import { DatePicker, DatePickerProps } from "antd";
import React, { useState } from "react";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import dayjs from "dayjs";
import { isBefore } from "date-fns";

export interface IFormInputProps {
  label?: string;
  placeholder?: string;
  name?: string;
  error?: string | boolean;
  defaultValue?: string | number;
  value?: string | number;
  type?: React.HTMLInputTypeAttribute | "textarea";
  inputClassName?: string;
  labelClassName?: string;
  className?: string;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  icon?: JSX.Element | string;
  required?: boolean;
  disabled?: boolean;
  startDate?: string | Date;
}

const FormInput = ({
  className,
  labelClassName,
  label,
  type,
  name,
  onChange,
  onBlur,
  icon,
  placeholder,
  required,
  disabled,
  defaultValue,
  error,
  startDate,
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

  const handleDateChange: DatePickerProps["onChange"] = (_, dateString) => {
    onChange && onChange(dateString);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    getBase64(file, (url: any) => {
      onChange && onChange(url);
    });
  };

  const disabledDate = (current: any) => {
    if (startDate) {
      const date = new Date(startDate);
      return isBefore(current.toDate(), date);
    } else {
      return false;
    }
  };

  if (type === "date") {
    console.log("Date>>", defaultValue);
  }

  return (
    <div className={`flex flex-col mt-3 ${error ? "" : "mb-3"} ${className}`}>
      <label
        htmlFor=""
        className={`text-[14px] font-semibold mb-[0.8px] ${labelClassName}`}
      >
        {label} {required ? <span className="text-shades-red">*</span> : ""}
      </label>
      <div
        className={`flex flex-row gap-x-3 justify-center items-center p-2 border-[1.5px] border-[#d6d6da] rounded-md`}
      >
        {icon && <span>{icon}</span>}
        {type === "textarea" ? (
          <textarea
            name={name}
            rows={6}
            onChange={onChange}
            onBlur={onBlur}
            className={`resize-none no_scrollbar bg-transparent text-[14px] border-none hover:border-none focus:border-none focus:outline-none w-full text-[#666365]`}
            placeholder={placeholder}
            disabled={disabled}
            defaultValue={defaultValue}
          ></textarea>
        ) : type === "date" ? (
          <DatePicker
            className={`resize-none no_scrollbar bg-transparent text-[14px] !border-none hover:!border-none focus:!border-none !shadow-none hover:!shadow-none focus:!shadow-none focus:!outline-none w-full text-[#666365]`}
            onChange={handleDateChange}
            defaultValue={dayjs("01/01/2015", "YYYY-MM-DD")}
            placeholder={placeholder}
            disabledDate={disabledDate}
          />
        ) : (
          <input
            type={inputType}
            name={name}
            onChange={inputType === "file" ? handleFileChange : onChange}
            onBlur={onBlur}
            className={`bg-transparent text-[14px] border-none hover:border-none focus:border-none focus:outline-none w-full text-[#666365]`}
            placeholder={placeholder}
            disabled={disabled}
            defaultValue={defaultValue}
          />
        )}
        {type === "password" && (
          <span className="cursor-pointer" onClick={handleShowPassword}>
            {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
          </span>
        )}
      </div>
      {error && <p className="text-shades-red text-[14px] mb-3">{error}</p>}
    </div>
  );
};

export default FormInput;
