import React from "react";
import { modalTypes } from "../../constants";

const ModalWindows = ({
  modalsState,
  appDispatch,
  setSelectedCityId,
  cityQuery,
  setCityQuery,
  citiesUpdated,
  setCitiesUpdated,
}) => {
  const modals = Object.keys(modalsState).map((key) => {
    if (!modalsState[key].isOpen) {
      return null;
    }

    const modalComponent = () => require(`./${key}Modal`).default;
    const modalComponentProps = {
      ...modalsState[key],
      setSelectedCityId:
        key === modalTypes.CITY_LIST ? setSelectedCityId : null,
      citiesUpdated: key === modalTypes.CITY_LIST ? citiesUpdated : null,
      cityQuery:
        key === modalTypes.ADD_CITY || key === modalTypes.MAP
          ? cityQuery
          : null,
      setCityQuery:
        key === modalTypes.ADD_CITY || key === modalTypes.MAP
          ? setCityQuery
          : null,
      setCitiesUpdated:
        key === modalTypes.SETTINGS || key === modalTypes.CITY_LIST
          ? setCitiesUpdated
          : null,
      appDispatch,
      key,
    };

    return React.createElement(modalComponent(), modalComponentProps);
  });

  return modals;
};

export default ModalWindows;
