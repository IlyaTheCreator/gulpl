import CityListItem from "./CityListItem";

import mockCities from "../../mocks/cities";

const CityList = () => {
  const cities = mockCities.map((city) => (
    <CityListItem key={city.id} {...city} />
  ));
  
  return (
    <>
      {cities}
      <button className="btn widget screen__add-btn">
        <i className="icon-figma-plus" />
      </button>
    </>
  );
};

export default CityList;
