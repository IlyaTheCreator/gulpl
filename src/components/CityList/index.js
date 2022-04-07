import { useSelector } from "react-redux";
import CityListItem from "./CityListItem";
import AddCityBtn from "./AddCityBtn";
import NoCitiesMessageBlock from "../NoCitiesMessageBlock";
import Spinner from "../ui/Spinner";

const CityList = ({ appDispatch, setSelectedCityId }) => {
  const citiesData = useSelector((state) => state.cities.citiesList);
  const isLoading = useSelector((state) => state.ui.isLoading);

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
        <AddCityBtn appDispatch={appDispatch} />
      </>
    );
  }

  const cities = citiesData.map((city) => (
    <CityListItem
      setSelectedCityId={setSelectedCityId}
      appDispatch={appDispatch}
      key={city.id}
      itemData={city}
    />
  ));

  return (
    <>
      {cities}
      <AddCityBtn appDispatch={appDispatch} />
    </>
  );
};

export default CityList;
