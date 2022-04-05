import CityListItem from "./CityListItem";
import AddCityBtn from "./AddCityBtn";
import { useSelector } from "react-redux";
import NoCitiesMessageBlock from "../NoCitiesMessageBlock";

const CityList = () => {
  const citiesData = useSelector((state) => state.cities.citiesList);

  if (citiesData.length === 0) {
    return (
      <>
        <NoCitiesMessageBlock />
        <AddCityBtn belongsToNoCitiesBlock />
      </>
    );
  }

  const cities = citiesData.map((city) => (
    <CityListItem key={city.id} itemData={city} />
  ));

  return (
    <>
      {cities}
      <AddCityBtn />
    </>
  );
};

export default CityList;
