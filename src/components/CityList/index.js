import CityListItem from "./CityListItem";
import mockCities from "../../mocks/cities";
import AddCityBtn from "./AddCityBtn";

const CityList = () => {
  const cities = mockCities.map((city) => (
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
