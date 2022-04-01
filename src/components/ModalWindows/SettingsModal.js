import Overlay from "../Layout/Overlay";
import WidgetCardSettings from "../Settings/WidgetSettingsCard";
import SelectCard from "../Settings/SelectCard";
import CloseModalButton from "../CloseModalButton";
import { useDispatch } from "react-redux";
import { toggleSettings } from "../../store/ui";
import { settingsSelectInputsData } from "../../constants";

const SettingsModal = () => {
  const dispatch = useDispatch();

  const closeSettingsClickHandler = () => {
    dispatch(toggleSettings());
  };

  const cards = settingsSelectInputsData.map((select) => (
    <SelectCard
      key={select.title}
      title={select.title}
      options={select.options}
    />
  ));

  return (
    <>
      <Overlay className="modal-overlay modal-overlay--settings" />
      <div className="modal">
        <div className="settings-modal-wrapper">
          <WidgetCardSettings />
          {cards}
          <CloseModalButton
            className="close-settings-modal-btn"
            text="close"
            onClick={closeSettingsClickHandler}
          />
        </div>
      </div>
    </>
  );
};

export default SettingsModal;
