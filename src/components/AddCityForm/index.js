import { useState } from "react";
import { useDispatch } from "react-redux";
import { hideAddCity, openMap } from "../../store/ui";
import { setCityQuery } from "../../store/cities";

const AddCityForm = () => {
  const dispatch = useDispatch();
  const [city, setCity] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(setCityQuery(city));
    dispatch(openMap());
    window.addCityBtnClicked = true;
  };

  const closeFormHandler = () => {
    dispatch(hideAddCity());
  };

  const iconClickHandler = () => {
    dispatch(setCityQuery(city));
    dispatch(openMap());
  };

  const changeHandler = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="card add-city">
      <form onSubmit={submitHandler} className="add-city-form">
        <div className="input-wrapper">
          <input
            value={city}
            onChange={changeHandler}
            type="text"
            placeholder="Enter City Name..."
          />
          <div className="icon-wrapper">
            <i className="icon-map" onClick={iconClickHandler} />
          </div>
        </div>
        <button type="submit" className="btn">
          Add
        </button>
        <button onClick={closeFormHandler} className="close-add-city-btn">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddCityForm;
