
type ButtonType = "button" | "submit" | "reset" | undefined;
interface Props {
  handleClick?: () => void;
  className: string;
  type?: ButtonType;
  title: string;
  disabled?: boolean;
}

const Button = (props: Props) => {
  return (
    <button
      onClick={props?.handleClick}
      className={`${props.className} text-white px-3 py-2 h-10 bg-[#903677] hover:bg-[#7c2764] rounded-lg font-medium hover:outline-none transition-all ease-in-out duration-200`}
      type={props?.type}
      title={props.title}
      disabled={props?.disabled}
    >
      {props.title}
    </button>
  );
};

export default Button;
