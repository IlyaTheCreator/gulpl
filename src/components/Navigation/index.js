import { useDispatch } from "react-redux";

import NavCircles from "./NavCircles";
import { toggleAddCity, toggleCityList, toggleSettings } from "../../store/ui";

const Navigation = () => {
  const dispatch = useDispatch();

  const cityListClickHandle = () => {
    dispatch(toggleCityList());
  }

  const settingsClickHandle = () => {
    dispatch(toggleSettings());
  }

  const addCityClickHandle = () => {
    dispatch(toggleAddCity());
  }

  return (
    <nav className="navigation">
      <div className="navigation__settings" onClick={settingsClickHandle}>
        <i className="icon icon-figma-settings"></i>
      </div>
      <div className="navigation__pages">
        <NavCircles />
      </div>
      <div className="navigation__cities">
        <span onClick={addCityClickHandle} className="link add-city-link">
          <div className="navigation__cities-link-wrapper">
            <i className="icon icon-figma-plus navigation__smaller-icon"></i>
          </div>
        </span>
        <span className="link" onClick={cityListClickHandle}>
          <div className="navigation__cities-link-wrapper">
            <i className="icon icon-figma-tiles navigation__smaller-icon"></i>
          </div>
        </span>
      </div>
    </nav>
  );
};

export default Navigation;
