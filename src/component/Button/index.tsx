import { Spin } from "antd";

type ButtonType = "button" | "submit" | "reset" | undefined;
interface Props {
  handleClick?: () => void;
  className?: string;
  type?: ButtonType;
  title: string;
  disabled?: boolean;
  loading?: boolean;
}

const Button = ({
  className,
  handleClick,
  type,
  title,
  disabled,
  loading = false,
}: Props) => {
  return (
    <button
      onClick={handleClick}
      className={`text-white px-3 py-2 min-h-10 bg-shades-primary/90 hover:bg-shades-primary rounded-lg font-medium hover:outline-none transition-all ease-in-out duration-200 ${className}`}
      type={type}
      title={title}
      disabled={disabled}
    >
      <Spin spinning={loading}>{title}</Spin>
    </button>
  );
};

export default Button;
