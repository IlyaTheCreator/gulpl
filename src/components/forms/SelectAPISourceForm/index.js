import { useState } from "react";
import { useDispatch } from "react-redux";
import { setWeather } from "../../../store/apis";

import Selector from "../../ui/Selector";

import weatherAPIService from "../../../services/weatherAPIService";
import { appActionTypes } from "../../../appStateManager";
import { modalTypes } from "../../../constants";

const SelectAPISourceForm = ({ appDispatch }) => {
  const [selectedAPI, setSelectedAPI] = useState("open-weather-map");
  const dispatch = useDispatch();

  const selectWeatherAPI = () => {
    const weatherAPITypes = weatherAPIService.getApiTypes();
    weatherAPIService.setApiType(weatherAPITypes[selectedAPI]);

    dispatch(
      setWeather({
        type: weatherAPITypes[selectedAPI].apiType,
        path: weatherAPITypes[selectedAPI].apiPath,
      })
    );
  };

  const clickHandler = () => {
    selectWeatherAPI();
    appDispatch({
      type: appActionTypes.CLOSE_MODAL,
      payload: modalTypes.SELECT_API_SOURCE,
    });
  };

  const changeHandler = (value) => {
    setSelectedAPI(value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    selectWeatherAPI();
    clickHandler();
  };

  const selectorData = [
    {
      value: "open-weather-map",
      text: "Open Weather API",
    },
    {
      value: "free-weather-api",
      text: "Free Weather API",
    },
  ];

  return (
    <div className="card select-api-source">
      <form onSubmit={submitHandler} className="select-api-source-form">
        <div className="input-wrapper">
          <label htmlFor="api-source-select">
            Please select weather data source:
          </label>
          <Selector
            data={selectorData}
            currentIndex={0}
            onChange={changeHandler}
          />
        </div>
        <button type="submit" className="btn">
          Select
        </button>
        <button onClick={clickHandler} className="close-select-api-source-btn">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default SelectAPISourceForm;
