const CloseModalButton = ({ onClick, text, className }) => {
  const classes = ["close-modal-btn", className];

  return (
    <button className={classes.join(" ")} onClick={onClick}>
      <p className="cancel-btn">{text}</p>
    </button>
  );
};

export default CloseModalButton;