import { useDispatch } from "react-redux";
import { toggleAddCity, toggleMap } from "../../store/ui";

const AddCityForm = () => {
  const dispatch = useDispatch();

  const btnClickHandler = () => {
    dispatch(toggleAddCity());
  };

  const iconClickHandler = () => {
    dispatch(toggleMap());
  };

  return (
    <div className="card add-city">
      <form className="add-city-form">
        <div className="input-wrapper">
          <input type="text" placeholder="Enter City Name..." />
          <div className="icon-wrapper">
            <i className="icon-map" onClick={iconClickHandler} />
          </div>
        </div>
        <button className="btn">Add</button>
        <button
          type="button"
          onClick={btnClickHandler}
          className="close-add-city-btn"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddCityForm;
