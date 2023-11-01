interface IProps {
  isOpen: boolean;
  children: JSX.Element;
  handleClose: any;
  showCloseButton?: boolean;
}

const Modal = ({
  isOpen,
  handleClose,
  showCloseButton = true,
  children
}: IProps) => {
  return (
    <div className={`modal sm:modal-middle ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box bg-white">
        {showCloseButton && (
          <button
            onClick={handleClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        )}

        {children}
      </div>
    </div>
  );
};

export default Modal;
