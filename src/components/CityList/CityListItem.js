import Widget from "../Widget";
import { widgetTypes } from "../../constants";

const CityListItem = (props) => {
  return (
    <Widget
      classes={["screen__city"]}
      onClick={() => console.log("city list widget clicked")}
      type={widgetTypes.LIST}
    >
      <div className="link">
        <h3 className="screen__title">
          <div className="screen__city-title-group">
            <span className="screen__city-name">{props.title}</span>
            <p className="screen__city-time">{new Date(
              props.date
            ).toDateString()}</p>
          </div>
          <span className="screen__city-temperature">{props.currentTemp}°</span>
        </h3>
        <div className="screen__city-info">
          <span className="screen__city-weather-condition">{
            props.weatherCondition
          }</span>
          <span className="screen__city-temperature-range">
            Max. {props.widgetRelatedInfo.maxTemp.value} 
            <span> </span>
            Min. {props.widgetRelatedInfo.minTemp.value}
          </span>
        </div>
      </div>
    </Widget>
  );
}

export default CityListItem;