import { useState } from "react";
import { useDispatch } from "react-redux";
import useLongPress from "../../hooks/useLongPress";

import Widget from "../ui/Widget";
import { widgetTypes } from "../../constants";
import { hideCityList, showCityInfo } from "../../store/ui";
import { removeCity, selectCity } from "../../store/cities";
import DeleteCityBtn from "../DeleteCityBtn";

const CityListItem = ({ itemData }) => {
  const dispatch = useDispatch();

  const [displayDeleteBtn, setDisplayDeleteBtn] = useState(false);
  const [classes, setClasses] = useState(["screen__city"]);

  const clickHandler = () => {
    dispatch(selectCity(itemData));
    dispatch(hideCityList());
    dispatch(showCityInfo());
  };

  const mouseEnterHandler = () => {
    setDisplayDeleteBtn(true);
    setClasses([...classes, "city-with-delete-btn"]);
  };

  const mouseLeaveHandler = () => {
    setDisplayDeleteBtn(false);
    setClasses(["screen__city"]);
  };

  const deleteBtnClickHandler = (e) => {
    e.stopPropagation();

    dispatch(removeCity(itemData.id));
  };

  const longPressHandler = () => {
    setDisplayDeleteBtn(true);
    setClasses([...classes, "city-with-delete-btn"]);
  };

  const widgetLongPress = useLongPress(longPressHandler, 500);

  return (
    <Widget
      classes={classes}
      type={widgetTypes.LIST}
      onMouseLeave={mouseLeaveHandler}
      onMouseEnter={mouseEnterHandler}
      longPressEvent={widgetLongPress}
      onClick={clickHandler}
    >
      {displayDeleteBtn && <DeleteCityBtn onClick={deleteBtnClickHandler} />}
      <div className="link">
        <h3 className="screen__title">
          <div className="screen__city-title-group">
            <span className="screen__city-name">{itemData.title}</span>
            <p className="screen__city-time">
              {new Date(itemData.date).toDateString()}
            </p>
          </div>
          <span className="screen__city-temperature">
            {itemData.currentTemp}°
          </span>
        </h3>
        <div className="screen__city-info">
          <span className="screen__city-weather-condition">
            {itemData.weatherCondition}
          </span>
          <span className="screen__city-temperature-range">
            Max. {itemData.widgetRelatedInfo.maxTemp.value}
            <span> </span>
            Min. {itemData.widgetRelatedInfo.minTemp.value}
          </span>
        </div>
      </div>
    </Widget>
  );
};

export default CityListItem;
