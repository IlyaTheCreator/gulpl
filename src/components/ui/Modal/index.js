import Overlay from "../Overlay";

const Modal = ({
  children,
  overlayClassName,
  modalClassName,
  hasOverlay,
  zIndex,
}) => {
  return (
    <div className="modal-wrapper" style={{ zIndex }}>
      {hasOverlay && (
        <Overlay className={["modal-overlay", overlayClassName].join(" ")} />
      )}
      <div className={["modal", modalClassName].join(" ")}>{children}</div>
    </div>
  );
};

export default Modal;
