import { appActionTypes } from "../../../appStateManager";
import { modalTypes } from "../../../constants";

const Navigation = ({ appDispatch }) => {
  const cityListClickHandle = () => {
    appDispatch({
      type: appActionTypes.OPEN_MODAL,
      payload: modalTypes.CITY_LIST,
    });
  };

  const settingsClickHandle = () => {
    appDispatch({
      type: appActionTypes.OPEN_MODAL,
      payload: modalTypes.SETTINGS,
    });
  };

  const addCityClickHandle = () => {
    appDispatch({
      type: appActionTypes.OPEN_MODAL,
      payload: modalTypes.ADD_CITY,
    });
  };

  return (
    <nav className="navigation">
      <div className="navigation__settings" onClick={settingsClickHandle}>
        <i className="icon icon-figma-settings"></i>
      </div>
      <div className="navigation__pages"></div>
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
