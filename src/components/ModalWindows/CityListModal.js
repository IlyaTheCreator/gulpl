import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hideCityInfo, toggleCityList } from "../../store/ui";
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
    <div className="modal city-list">
      <CityList />
      <CloseModalButton
        className="close-city-list-btn"
        text="close"
        onClick={clickHandler}
      />
    </div>
  );
};

export default CityListModal;
