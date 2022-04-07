import React from "react";

const ModalWindows = ({
  modalsState,
  appDispatch,
  setSelectedCityId,
}) => {
  const modals = Object.keys(modalsState).map((key) => {
    if (!modalsState[key].isOpen) {
      return null;
    }

    const modalComponent = () => require(`./${key}`).default;
    const modalComponentProps = {
      ...modalsState[key],
      setSelectedCityId: key === "CityListModal" ? setSelectedCityId : null,
      appDispatch,
      key,
    };

    return React.createElement(modalComponent(), modalComponentProps);
  });

  return modals;
};

export default ModalWindows;
