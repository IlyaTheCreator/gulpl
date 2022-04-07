import { widgetTypes } from "../../../constants";

const Widget = ({
  children,
  type,
  classes = [],
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  if (type === widgetTypes.LIST) {
    classes.push("widget");
  }

  if (type === widgetTypes.CITY) {
    classes.push("widget");
    classes.push("widget-rounded");
  }

  const clickHandler = (e) => {
    if (onClick) onClick(e);
    e.stopPropagation();
  };

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={clickHandler}
      className={classes.join(" ")}
    >
      {children}
    </div>
  );
};

export default Widget;
