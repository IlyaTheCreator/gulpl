import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Message from "../../ui/Message";

import { messageTypes } from "../../../constants";
import { appActionTypes } from "../../../appStateManager";

const AddCityForm = ({ appDispatch, cityQuery, setCityQuery }) => {
  const existentCities = useSelector((state) => state.cities.citiesList);
  const [cityExists, setCityExists] = useState(false);
  const [noCityEntered, setNoCityEntered] = useState(false);
  const inputRef = useRef();

  const triggerMapModal = () => {
    appDispatch({ type: appActionTypes.OPEN_MAP });
    window.addCityBtnClicked = true;
  };

  const positiveBtnClickHandler = () => {
    setCityExists(false);
    triggerMapModal();
  };

  const negativeBtnClickHandler = () => {
    setCityExists(false);
    setCityQuery("");
    inputRef.current.focus();
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (cityQuery.trim().length === 0) {
      setNoCityEntered(true);
      const timeoutId = setTimeout(() => {
        setNoCityEntered(false);
        clearTimeout(timeoutId);
      }, 5000);
      return;
    }

    // checking if a city with such a name is already chosen
    const existentCityCheck = existentCities.find(
      (existentCity) =>
        existentCity.title.trim().toLowerCase() === cityQuery.trim().toLowerCase()
    );

    if (existentCityCheck) {
      setCityExists(true);
      setNoCityEntered(false);
      return;
    }

    triggerMapModal();
  };

  const closeFormHandler = () => {
    appDispatch({ type: appActionTypes.CLOSE_ADD_CITY });
  };

  const iconClickHandler = () => {
    appDispatch({ type: appActionTypes.OPEN_MAP });
  };

  const changeHandler = (e) => {
    setCityQuery(e.target.value);
  };

  const form = (
    <div className="card add-city">
      <form onSubmit={submitHandler} className="add-city-form">
        <div className="input-wrapper">
          <input
            ref={inputRef}
            value={cityQuery}
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

  return (
    <>
      {cityExists && (
        <Message
          type={messageTypes.USER_ACTION}
          position="top"
          message="City with such name already exists"
          positiveBtnText="Proceed anyways"
          negativeBtnText="Cancel"
          onPositiveBtnClick={positiveBtnClickHandler}
          onNegativeBtnClick={negativeBtnClickHandler}
          icon={
            <>
              <i className="icon-building user-message__icon" />
              <i className="icon-building user-message__icon user-message__icon--small user-message__icon--building" />
            </>
          }
        />
      )}
      {noCityEntered && (
        <Message
          type={messageTypes.INFO}
          position="bottom"
          message="Please enter city name"
          icon={
            <i className="icon-building user-message__icon user-message__icon--small" />
          }
        />
      )}
      {form}
    </>
  );
};

export default AddCityForm;
