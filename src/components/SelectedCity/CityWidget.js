import { widgetTypes, uvTypes } from "../../constants";
import Widget from "../Widget";

const CityWidget = ({ widgetData }) => {
  let uvText;

  if (widgetData.name === "Uv Indicator") {
    const uv = widgetData.value;

    if (uv <= 1) {
      uvText = uvTypes.LOW;
    }

    if (uv > 1 && uv <= 2) {
      uvText = uvTypes.MEDIUM;
    }

    if (uv > 2) {
      uvText = uvTypes.HIGH;
    }
  }

  return (
    <Widget classes={["city-info-grid__grid-item"]} type={widgetTypes.CITY}>
      <p className="city-info-grid__widget-description">{widgetData.name}</p>
      <div className="city-info-grid__content-wrapper city-info-grid__content-wrapper--margin-bottom">
        <p className="city-info-grid__widget-number">{widgetData.value}</p>
        {uvText && <p className="city-info-grid__widget-data">{uvText}</p>}
        {widgetData.additional && (
          <p className="city-info-grid__widget-additional">
            {widgetData.additional}
          </p>
        )}
      </div>
    </Widget>
  );
};

export default CityWidget;
