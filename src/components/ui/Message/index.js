import { messageTypes } from "../../../constants";
import Overlay from "../Overlay";

const Message = ({
  position,
  message,
  type,
  positiveBtnText,
  negativeBtnText,
  onPositiveBtnClick,
  onNegativeBtnClick,
  hasOverlay = false,
  icon,
}) => {
  let content;
  const classes = [
    "user-message",
    position === "top" ? "user-message--top" : "user-message--bottom",
  ];

  switch (type) {
    case messageTypes.INFO:
      content = (
        <h3 className="user-message__text">
          {icon && icon}
          {message}
        </h3>
      );

      classes.push("user-message--info");
      break;
    case messageTypes.USER_ACTION:
      content = (
        <>
          {icon && <div className="user-message__icon-wrapper">{icon}</div>}
          <h3 className="user-message__text">{message}</h3>
          <div className="user-message__buttons-wrapper">
            <button
              className="btn user-message__button user-message__button--positive"
              onClick={onPositiveBtnClick}
            >
              {positiveBtnText}
            </button>
            <button
              className="btn user-message__button user-message__button--negative"
              onClick={onNegativeBtnClick}
            >
              {negativeBtnText}
            </button>
          </div>
        </>
      );

      classes.push("user-message--action");
      break;
    default:
      content = <h1>invalid message type</h1>;
  }

  return (
    <>
      {hasOverlay && <Overlay className="modal-overlay--message" />}
      <div className={classes.join(" ")}>{content}</div>
    </>
  );
};

export default Message;
