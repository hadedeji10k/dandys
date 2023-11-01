import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import Modal from "react-modal";

type Props = {
  children?: React.ReactNode;
  isOpen: boolean;
  close: (
    event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
  ) => void;
  title?: string;
  width?: string;
  headerTitle?: string;
  headerSubTitle?: string;
  headerText?: string;
  headerClassName?: string;
  className?: string;
};

const customStyles = {
  content: {
    top: "52%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    //borderRadius: "24px",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    // backdropFilter: "blur(2px)",
    zIndex: 1000,
  },
};

const AppModal = ({
  children,
  isOpen,
  close,
  title,
  headerTitle,
  headerText,
  headerClassName,
  width = "normal",
  className,
}: Props) => {
  return (
    <div className={isOpen ? "" : "hidden"}>
      <Modal
        isOpen={isOpen}
        shouldCloseOnOverlayClick={false}
        onRequestClose={close}
        style={customStyles}
        ariaHideApp={false}
      >
        <div
          id="modal"
          className={`mx-auto max-w-[450px] ${
            width === "md"
              ? "md:max-w-md"
              : width === "lg"
              ? "md:max-w-2xl"
              : width === "xl"
              ? "md:max-w-4xl"
              : width === "normal"
              ? "md:max-w-[500px]"
              : `md:max-w-[${width}]`
          } ${className}`}
        >
          <div
            className={[
              "flex w-full pb-2 justify-between items-center",
              "px-5 sm:px-8 w-full bg-white rounded-t-3xl",
            ].join(" ")}
          >
            {!headerTitle && (
              <h2 className="font-semibold text-[20px] leading-[24px]">
                {title}
              </h2>
            )}
            {(headerTitle || headerText) && (
              <div className={headerClassName}>
                <h2 className="text-xl font-bold">{headerTitle}</h2>
                <p className="text-gray-600">{headerText}</p>
              </div>
            )}
            <div className="w-10 h-10 grid cursor-pointer" onClick={close}>
              <div className="m-auto">
                <MdOutlineCancel className="text-[26px]" />
              </div>
            </div>
          </div>

          <div
            className={`set__h overflow-y-scroll my-auto px-5 sm:px-8 bg-white rounded-b-3xl`}
          >
            {children}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AppModal;
