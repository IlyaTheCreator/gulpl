import React, { useState } from "react";

const ModalWindows = ({ modalsState, appDispatch, setSelectedCityId }) => {
  // state for managing user entered city name in order to pass it
  // from addCityModal to mapModal
  const [cityQuery, setCityQuery] = useState("");

  const modals = Object.keys(modalsState).map((key) => {
    if (!modalsState[key].isOpen) {
      return null;
    }

    const modalComponent = () => require(`./${key}`).default;
    const modalComponentProps = {
      ...modalsState[key],
      setSelectedCityId: key === "CityListModal" ? setSelectedCityId : null,
      cityQuery:
        key === "AddCityModal" || key === "MapModal" ? cityQuery : null,
      setCityQuery:
        key === "AddCityModal" || key === "MapModal" ? setCityQuery : null,
      appDispatch,
      key,
    };

    return React.createElement(modalComponent(), modalComponentProps);
  });

  return modals;
};

export default ModalWindows;
