import React from "react";
import { connect } from "react-redux";

import Message from "../../ui/Message";

import { messageTypes, modalTypes } from "../../../constants";
import { appActionTypes } from "../../../appStateManager";

class AddCityForm extends React.Component {
  constructor() {
    super();

    this.state = {
      cityExists: false,
      noCityEntered: false,
    };

    this.inputRef = React.createRef();
  }

  triggerMapModal = () => {
    this.props.appDispatch({
      type: appActionTypes.OPEN_MODAL,
      payload: modalTypes.MAP,
    });

    window.addCityBtnClicked = true;
  };

  positiveBtnClickHandler = () => {
    this.setState((prevState) => ({ ...prevState, cityExists: false }));
    this.triggerMapModal();
  };

  negativeBtnClickHandler = () => {
    this.setState((prevState) => ({ ...prevState, cityExists: false }));
    this.props.setCityQuery("");
    this.inputRef.current.focus();
  };

  submitHandler = (e) => {
    e.preventDefault();

    if (this.props.cityQuery.trim().length === 0) {
      this.setState((prevState) => ({ ...prevState, noCityEntered: true }));

      const timeoutId = setTimeout(() => {
        this.setState((prevState) => ({ ...prevState, noCityEntered: false }));
        clearTimeout(timeoutId);
      }, 5000);

      this.inputRef.current.focus();

      return;
    }

    // checking if a city with such a name is already chosen
    const existentCityCheck = this.props.existentCities.find(
      (existentCity) =>
        existentCity.title.trim().toLowerCase() ===
        this.props.cityQuery.trim().toLowerCase()
    );

    if (existentCityCheck) {
      this.setState((prevState) => ({ ...prevState, cityExists: true }));
      this.setState((prevState) => ({ ...prevState, noCityEntered: false }));

      return;
    }

    this.triggerMapModal();
  };

  closeFormHandler = () => {
    this.props.appDispatch({
      type: appActionTypes.CLOSE_MODAL,
      payload: modalTypes.ADD_CITY,
    });
  };

  iconClickHandler = () => {
    this.props.appDispatch({
      type: appActionTypes.OPEN_MODAL,
      payload: modalTypes.MAP,
    });
  };

  changeHandler = (e) => {
    this.props.setCityQuery(e.target.value);
  };

  getForm() {
    return (
      <div className="card add-city">
        <form onSubmit={this.submitHandler} className="add-city-form">
          <div className="input-wrapper">
            <input
              ref={this.inputRef}
              value={this.props.cityQuery}
              onChange={this.changeHandler}
              type="text"
              placeholder="Enter City Name..."
            />
            <div className="icon-wrapper">
              <i className="icon-map" onClick={this.iconClickHandler} />
            </div>
          </div>
          <button type="submit" className="btn">
            Add
          </button>
          <button
            type="button"
            onClick={this.closeFormHandler}
            className="close-add-city-btn"
          >
            Cancel
          </button>
        </form>
      </div>
    );
  }

  getCityExistMessage = () => {
    return (
      <Message
        type={messageTypes.USER_ACTION}
        position="center"
        message="City with such name already exists"
        positiveBtnText="Proceed anyways"
        negativeBtnText="Cancel"
        onPositiveBtnClick={this.positiveBtnClickHandler}
        onNegativeBtnClick={this.negativeBtnClickHandler}
        icon={
          <>
            <i className="icon-building user-message__icon" />
            <i className="icon-building user-message__icon user-message__icon--small user-message__icon--building" />
          </>
        }
      />
    );
  };

  getNoCityEnteredMessage = () => {
    return (
      <Message
        type={messageTypes.INFO}
        position="bottom"
        message="Please enter city name"
        icon={
          <i className="icon-building user-message__icon user-message__icon--small" />
        }
      />
    );
  };

  render() {
    return (
      <>
        {this.state.cityExists && this.getCityExistMessage()}
        {this.state.noCityEntered && this.getNoCityEnteredMessage()}
        {this.getForm()}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  existentCities: state.cities.citiesList,
});

export default connect(mapStateToProps)(AddCityForm);
