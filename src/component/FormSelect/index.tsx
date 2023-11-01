import { Select } from "antd";

export interface IFormSelectProps {
  label?: string;
  placeholder?: string;
  name?: string;
  error?: string | boolean;
  defaultValue?: string | number;
  value?: string | number;
  inputClassName?: string;
  labelClassName?: string;
  className?: string;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  icon?: JSX.Element | string;
  required?: boolean;
  disabled?: boolean;
  options: {
   value: string;
   label: string;
  }[]
}

const FormSelect = ({
  className,
  labelClassName,
  label,
  options,
  onChange,
  onBlur,
  icon,
  placeholder,
  required,
  disabled,
  defaultValue,
  error,
}: IFormSelectProps) => {
  // Filter `option.label` match the user type `input`
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <div className={`flex flex-col mt-3 ${error ? "" : "mb-3"} ${className}`}>
      <label
        htmlFor=""
        className={`text-[14px] font-semibold mb-[0.8px] ${labelClassName}`}
      >
        {label} {required ? <span className="text-shades-red">*</span> : ""}
      </label>
        {icon && <span>{icon}</span>}
        <Select
          showSearch
          defaultValue={defaultValue}
          placeholder={placeholder}
          optionFilterProp="children"
          onChange={onChange}
          filterOption={filterOption}
          options={options}
          className={`bg-transparent text-[14px] flex flex-row gap-x-3 justify-center items-center p-2 !h-11 border-[2px] border-[#d6d6da] rounded-md w-full text-[#666365]`}
          disabled={disabled}
        />
      {error && <p className="text-shades-red text-[14px] mb-3">{error}</p>}
    </div>
  );
};

export default FormSelect;
