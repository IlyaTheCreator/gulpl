import { appActionTypes } from "../../../appStateManager";
import NavCircles from "./NavCircles";

const Navigation = ({ appDispatch, selectedCityId }) => {
  const cityListClickHandle = () => {
    appDispatch({ type: appActionTypes.OPEN_CITY_LIST });
  }

  const settingsClickHandle = () => {
    appDispatch({ type: appActionTypes.OPEN_SETTINGS });
  }

  const addCityClickHandle = () => {
    appDispatch({ type: appActionTypes.OPEN_ADD_CITY });
  }

  return (
    <nav className="navigation">
      <div className="navigation__settings" onClick={settingsClickHandle}>
        <i className="icon icon-figma-settings"></i>
      </div>
      <div className="navigation__pages">
        <NavCircles selectedCityId={selectedCityId} />
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
