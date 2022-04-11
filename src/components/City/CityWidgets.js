import { useSelector } from "react-redux";

import CityWidget from "./CityWidget";

const CityWidgets = ({ widgetRelatedInfo }) => {
  const settingsData = useSelector((state) => state.settings);

  const output = Object.keys(widgetRelatedInfo).map((key) => {
    if (!settingsData[key].isActive) {
      return null;
    }

    return <CityWidget key={key} widgetData={widgetRelatedInfo[key]} />;
  });

  return <div className="city-info-grid">{output}</div>;
};

export default CityWidgets;
