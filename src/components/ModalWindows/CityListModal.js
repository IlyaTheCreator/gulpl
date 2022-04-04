import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hideCityInfo, toggleCityList } from "../../store/ui";
import Modal from "./Modal";
import CityList from "../CityList";
import CloseModalButton from "../CloseModalButton";

const CityListModal = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hideCityInfo());
  }, [dispatch]);

  const clickHandler = () => {
    dispatch(toggleCityList());
  };

  return (
    <Modal hasOverlay={false} modalClassName="city-list">
      <CityList />
      <CloseModalButton
        className="close-city-list-btn"
        text="close"
        onClick={clickHandler}
      />
    </Modal>
  );
};

export default CityListModal;
