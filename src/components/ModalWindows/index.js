import React from "react";
import { useSelector } from "react-redux";

const ModalWindows = () => {
  const modalsStateData = useSelector((state) => state.ui.modals);

  const modals = Object.keys(modalsStateData).map((key) => {
    if (!modalsStateData[key].isOpen) {
      return null;
    }

    const modalComponent = () => require(`./${key}`).default;
    const displayOption = modalsStateData[key].isUpfront ? "block" : "none";

    return (
      <div
        className="modal-wrapper"
        key={key}
        style={{ display: displayOption }}
      >
        {React.createElement(modalComponent())}
      </div>
    );
  });

  return modals;
};

export default ModalWindows;
