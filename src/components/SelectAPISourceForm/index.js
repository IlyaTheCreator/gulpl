import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleSelectAPISource } from "../../store/ui";
import { setWeather } from "../../store/apis";

const SelectAPISourceForm = () => {
  const [selectedAPI, setSelectedAPI] = useState("open-weather-map");
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(toggleSelectAPISource());
  };

  const changeHandler = (e) => {
    setSelectedAPI(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(setWeather({ type: selectedAPI, path: "unknown yet" }));
    clickHandler();
  };

  return (
    <div className="card select-api-source">
      <form onSubmit={submitHandler} className="select-api-source-form">
        <div className="input-wrapper">
          <label htmlFor="api-source-select">
            Please select weather data source:
          </label>
          <select value={selectedAPI} onChange={changeHandler}>
            <option value="open-weather-map">OpenWeatherMap API</option>
            <option value="free-weather-api">Free Weather API</option>
          </select>
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
