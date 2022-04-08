import { useSelector } from "react-redux";
import Modal from "../ui/Modal";
import CityList from "../CityList";
import CloseModalButton from "../ui/CloseModalButton";
import { appActionTypes } from "../../appStateManager";
import { modalTypes, messageTypes } from "../../constants";
import Message from "../ui/Message";

const CityListModal = ({
  zIndex,
  appDispatch,
  setSelectedCityId,
  citiesUpdated,
  setCitiesUpdated
}) => {
  const citiesData = useSelector((state) => state.cities.citiesList);

  const clickHandler = () => {
    appDispatch({
      type: appActionTypes.CLOSE_MODAL,
      payload: modalTypes.CITY_LIST,
    });

    if (citiesUpdated) {
      setCitiesUpdated(false);
    }
  };

  const shouldDisplayCloseModalBtn = citiesData.length > 0 ? true : false;

  const citiesUpdatedMessage = (
    <Message
      type={messageTypes.INFO}
      position="top"
      message="Weather data is updated."
      icon={
        <i className="icon-building user-message__icon user-message__icon--small" />
      }
    />
  );

  return (
    <Modal zIndex={zIndex} hasOverlay={false} modalClassName="city-list">
      {citiesUpdated && citiesUpdatedMessage}
      <div className="city-list-container">
        <CityList
          setSelectedCityId={setSelectedCityId}
          appDispatch={appDispatch}
          citiesUpdated={citiesUpdated}
          setCitiesUpdated={setCitiesUpdated}
        />
        {shouldDisplayCloseModalBtn && (
          <div className="close-city-list-btn-wrapper">
            <CloseModalButton
              className="close-city-list-btn"
              text="Close"
              onClick={clickHandler}
            />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CityListModal;
