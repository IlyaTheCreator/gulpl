import Overlay from "../Layout/Overlay";

const Modal = ({ children, overlayClassName, modalClassName, hasOverlay }) => {
  return (
    <>
      {hasOverlay && (
        <Overlay className={["modal-overlay", overlayClassName].join(" ")} />
      )}
      <div className={["modal", modalClassName].join(" ")}>{children}</div>
    </>
  );
};

export default Modal;
