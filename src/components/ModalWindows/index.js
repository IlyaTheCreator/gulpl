import React from "react";
import { useSelector } from "react-redux";

const ModalWindows = () => {
  const modals = useSelector((state) => state.ui.modals);

  const returnValue = Object.keys(modals).map((key) => {
    if (!modals[key].isOpen) {
      return;
    }

    const modalComponent = () => require(`./${key}`).default;
    const displayOption = modals[key].isUpfront ? "block" : "none";

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

  return returnValue;
};

export default ModalWindows;
