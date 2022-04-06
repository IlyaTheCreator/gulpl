import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoading } from "../../store/ui";
import CityWidgets from "./CityWidgets";

const SelectedCity = () => {
  const dispatch = useDispatch();
  const selectedCity = useSelector((state) => state.cities.selectedCity);
  const wConditionImage =
    selectedCity.cityImage &&
    require(`../../assets/images/${selectedCity.cityImage}`);

  useEffect(() => {
    dispatch(setIsLoading(false));
  }, [dispatch]);

  return (
    <div className="city-info">
      <h1 className="screen__header">{selectedCity.title}</h1>
      <p className="screen__date">
        {new Date(selectedCity.date).toDateString()}
      </p>
      <div className="screen__weather">
        <img
          src={wConditionImage}
          className="screen__image"
          alt="weather condition"
        />
        <p className="screen__temperature">{selectedCity.currentTemp}°</p>
        <p className="screen__weather-type">{selectedCity.weatherCondition}</p>
      </div>
      <CityWidgets widgetRelatedInfo={selectedCity.widgetRelatedInfo} />
    </div>
  );
};

export default SelectedCity;
