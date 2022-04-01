import { useSelector } from "react-redux";

const NavCircles = () => {
  const cities = useSelector((state) => state.cities.citiesList);
  const selectedCity = useSelector((state) => state.cities.selectedCity);

  const output = cities.map((city) => {
    const classes = ["icon", "icon-dot", "navigation__circle"]

    if (city.id === selectedCity.id) {
      classes.push("navigation__circle--active");
    }

    return (
      <i key={city.id} className={classes.join(" ")} />
    )
  });

  return output;
};

export default NavCircles;
