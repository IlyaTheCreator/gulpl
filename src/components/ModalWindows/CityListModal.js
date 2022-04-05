import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideCityInfo, hideCityList } from "../../store/ui";
import Modal from "../ui/Modal";
import CityList from "../CityList";
import CloseModalButton from "../ui/CloseModalButton";

const CityListModal = () => {
  const dispatch = useDispatch();
  const citiesData = useSelector((state) => state.cities.citiesList);

  useEffect(() => {
    dispatch(hideCityInfo());
  }, [dispatch]);

  const clickHandler = () => {
    dispatch(hideCityList());
  };

  const shouldDisplayCloseModalBtn = citiesData.length > 0 ? true : false;

  return (
    <Modal hasOverlay={false} modalClassName="city-list">
      <div className="city-list-container">
        <CityList />
        {shouldDisplayCloseModalBtn && (
          <CloseModalButton
            className="close-city-list-btn"
            text="close"
            onClick={clickHandler}
          />
        )}
      </div>
    </Modal>
  );
};

export default CityListModal;
