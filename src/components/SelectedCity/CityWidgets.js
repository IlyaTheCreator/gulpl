import CityWidget from "./CityWidget";

const CityWidgets = ({ widgetRelatedInfo }) => {
  const output = Object.keys(widgetRelatedInfo).map((key) => (
    <CityWidget key={key} widgetData={widgetRelatedInfo[key]} />
  ));

  return <div className="city-info-grid">{output}</div>;
};

export default CityWidgets;
