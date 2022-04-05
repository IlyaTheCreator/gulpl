import { useDispatch, useSelector } from "react-redux";
import { selectCity } from "../../store/cities";

const NavCircles = () => {
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.cities.citiesList);
  const selectedCity = useSelector((state) => state.cities.selectedCity);

  const output = cities.map((city) => {
    const classes = ["icon", "icon-dot", "navigation__circle"]

    if (city.id === selectedCity.id) {
      classes.push("navigation__circle--active");
    }

    const clickHandler = () => {
      dispatch(selectCity(city));
    }

    return (
      <i onClick={clickHandler} key={city.id} className={classes.join(" ")} />
    )
  });

  return output;
};

export default NavCircles;
