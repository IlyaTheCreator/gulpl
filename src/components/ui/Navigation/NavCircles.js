import { useDispatch, useSelector } from "react-redux";
import { useSwiper } from "swiper/react";
import { selectCity } from "../../../store/cities";

const NavCircles = () => {
  const dispatch = useDispatch();
  const citiesData = useSelector((state) => state.cities.citiesList);
  const selectedCity = useSelector((state) => state.cities.selectedCity);
  const swiper = useSwiper();

  const output = citiesData.map((city, index) => {
    const classes = ["icon", "icon-dot", "navigation__circle"]

    if (city.id === selectedCity.id) {
      classes.push("navigation__circle--active");
    }

    const clickHandler = () => {
      dispatch(selectCity(city));
      swiper.slideTo(index);
    }

    return (
      <i onClick={clickHandler} key={city.id} className={classes.join(" ")} />
    )
  });

  return output;
};

export default NavCircles;
