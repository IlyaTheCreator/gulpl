const Overlay = ({ className }) => {
  const classes = ["modal-overlay", className];

  return <div className={classes.join(" ")}></div>;
};

export default Overlay;
