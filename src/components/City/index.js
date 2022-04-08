import CityWidgets from "./CityWidgets";

const City = ({ cityData}) => {
  const wConditionImage =
    cityData.cityImage && require(`../../assets/images/${cityData.cityImage}`);

  return (
    <div className="city-info">
      <h1 className="screen__header">{cityData.title}</h1>
      <p className="screen__date">{new Date(cityData.date).toDateString()}</p>
      <div className="screen__weather">
        <img
          src={wConditionImage}
          className="screen__image"
          alt="weather condition"
        />
        <p className="screen__temperature">{cityData.currentTemp}°</p>
        <p className="screen__weather-type">{cityData.weatherCondition}</p>
      </div>
      <CityWidgets widgetRelatedInfo={cityData.widgetRelatedInfo} />
    </div>
  );
};

export default City;
