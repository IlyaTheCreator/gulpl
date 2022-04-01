import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleDisplayCityInfo } from "../../store/ui";
import CityList from "../CityList";
import CloseModalButton from "../CloseModalButton";

const CityListModal = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleDisplayCityInfo());
  }, [dispatch]);

  const clickHandler = () => {
    console.log("close city list btn clicked")
  }

  return (
    <>
      <div className="modal city-list">
        <CityList />
        <CloseModalButton text="close" onClick={clickHandler}/>
      </div>
    </>
  );
};

export default CityListModal;
