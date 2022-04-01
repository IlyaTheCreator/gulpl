import { useDispatch } from "react-redux";
import { toggleAddCity } from "../../store/ui";

const AddCityForm = () => {
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(toggleAddCity());
  }

  return (
    <div className="card add-city">
      <form className="add-city-form">
        <div className="input-wrapper">
          <input type="text" placeholder="Enter City Name..." />
          <div className="icon-wrapper">
            <i className="icon-map" />
          </div>
        </div>
        <button className="btn">Add</button>
        <button type="button" onClick={clickHandler} className="close-add-city-btn">Cancel</button>
      </form>
    </div>
  );
};

export default AddCityForm;
