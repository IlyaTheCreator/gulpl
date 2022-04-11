import { useDispatch, useSelector } from "react-redux";
import CityListItem from "./CityListItem";
import AddCityBtn from "./AddCityBtn";
import NoCitiesMessageBlock from "../NoCitiesMessageBlock";
import Spinner from "../ui/Spinner";

import { appActionTypes } from "../../appStateManager";
import { modalTypes } from "../../constants";
import { removeCity } from "../../store/cities";

const CityList = ({
  appDispatch,
  setSelectedCityId,
  citiesUpdated,
  setCitiesUpdated,
}) => {
  const dispatch = useDispatch();
  const citiesData = useSelector((state) => state.cities.citiesList);
  const isLoading = useSelector((state) => state.ui.isLoading);

  const cityListItemClickHandler = (id) => {
    setSelectedCityId(id);
    appDispatch({
      type: appActionTypes.CLOSE_MODAL,
      payload: modalTypes.CITY_LIST,
    });

    if (citiesUpdated) {
      setCitiesUpdated(false);
    }
  };

  const AddCityBtnClickHandler = () => {
    appDispatch({
      type: appActionTypes.OPEN_MODAL,
      payload: modalTypes.ADD_CITY,
    });

    if (citiesUpdated) {
      setCitiesUpdated(false);
    }
  };

  const swipeHanlder = (id) => {
    dispatch(removeCity(id));
  }

  if (citiesData.length === 0) {
    if (isLoading) {
      return (
        <div className="spinner-container">
          <Spinner />
        </div>
      );
    }

    return (
      <>
        <NoCitiesMessageBlock />
        <AddCityBtn onClick={AddCityBtnClickHandler} />
      </>
    );
  }

  const cities = citiesData.map((city) => (
    <CityListItem
      onSwipe={() => swipeHanlder(city.id)}
      onClick={() => cityListItemClickHandler(city.id)}
      key={city.id}
      itemData={city}
    />
  ));

  return (
    <>
      {cities}
      <AddCityBtn onClick={AddCityBtnClickHandler} />
    </>
  );
};

export default CityList;
