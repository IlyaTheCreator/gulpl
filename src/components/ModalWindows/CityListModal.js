import { useSelector } from "react-redux";
import Modal from "../ui/Modal";
import CityList from "../CityList";
import CloseModalButton from "../ui/CloseModalButton";
import { appActionTypes } from "../../appStateManager";

const CityListModal = ({ zIndex, appDispatch, setSelectedCityId }) => {
  const citiesData = useSelector((state) => state.cities.citiesList);

  const clickHandler = () => {
    appDispatch({ type: appActionTypes.CLOSE_CITY_LIST });
  };

  const shouldDisplayCloseModalBtn = citiesData.length > 0 ? true : false;

  return (
    <Modal zIndex={zIndex} hasOverlay={false} modalClassName="city-list">
      <div className="city-list-container">
        <CityList setSelectedCityId={setSelectedCityId} appDispatch={appDispatch} />
        {shouldDisplayCloseModalBtn && (
          <CloseModalButton
            className="close-city-list-btn"
            text="Close"
            onClick={clickHandler}
          />
        )}
      </div>
    </Modal>
  );
};

export default CityListModal;
