import { useSelector } from "react-redux";
import { useSwiper } from "swiper/react";

const NavCircles = ({ selectedCityId }) => {
  const citiesData = useSelector((state) => state.cities.citiesList);
  const swiper = useSwiper();

  const output = citiesData.map((city, index) => {
    const classes = ["icon", "icon-dot", "navigation__circle"]

    if (city.id === selectedCityId) {
      classes.push("navigation__circle--active");
    }

    const clickHandler = () => {
      swiper.slideTo(index);
    }

    return (
      <i onClick={clickHandler} key={city.id} className={classes.join(" ")} />
    )
  });

  return output;
};

export default NavCircles;
