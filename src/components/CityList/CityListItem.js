import { useDispatch } from "react-redux";

import Widget from "../Widget";
import { widgetTypes } from "../../constants";
import { toggleCityList } from "../../store/ui";
import { selectCity } from "../../store/cities";

const CityListItem = ({ itemData }) => {
  const dispatch = useDispatch();

  const clickHandle = () => {
    dispatch(selectCity(itemData));
    dispatch(toggleCityList());
  }
  
  return (
    <Widget
      classes={["screen__city"]}
      onClick={clickHandle}
      type={widgetTypes.LIST}
    >
      <div className="link">
        <h3 className="screen__title">
          <div className="screen__city-title-group">
            <span className="screen__city-name">{itemData.title}</span>
            <p className="screen__city-time">{new Date(
              itemData.date
            ).toDateString()}</p>
          </div>
          <span className="screen__city-temperature">{itemData.currentTemp}°</span>
        </h3>
        <div className="screen__city-info">
          <span className="screen__city-weather-condition">{
            itemData.weatherCondition
          }</span>
          <span className="screen__city-temperature-range">
            Max. {itemData.widgetRelatedInfo.maxTemp.value} 
            <span> </span>
            Min. {itemData.widgetRelatedInfo.minTemp.value}
          </span>
        </div>
      </div>
    </Widget>
  );
}

export default CityListItem;