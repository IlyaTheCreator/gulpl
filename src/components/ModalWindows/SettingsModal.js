import Modal from "./Modal";
import WidgetCardSettings from "../Settings/WidgetSettingsCard";
import SelectCard from "../Settings/SelectCard";
import CloseModalButton from "../CloseModalButton";
import { useDispatch, useSelector } from "react-redux";
import { toggleSettings } from "../../store/ui";
import { setWeather, setMap } from "../../store/apis";
import { settingsSelectInputsData } from "../../constants";

const SettingsModal = () => {
  const dispatch = useDispatch();
  const selectedMap = useSelector((state) => state.apis.map)
  const selectedWeatherAPI = useSelector((state) => state.apis.weather)

  const closeSettingsClickHandler = () => {
    dispatch(toggleSettings());
  };

  const changeHandler = (e, type) => {
    switch (type) {
      case "weather":
        setWeather(e.target.value);
        break;
      case "map":
        setMap(e.target.value);
        break;
      default:
        return;
    }
  };

  const cards = settingsSelectInputsData.map((select) => (
    <SelectCard
      key={select.title}
      title={select.title}
      options={select.options}
      onChange={changeHandler}
      type={select.type}
    />
  ));

  return (
    <Modal hasOverlay={true} overlayClassName="modal-overlay--settings">
      <div className="settings-modal-wrapper">
        <WidgetCardSettings />
        {cards}
        <CloseModalButton
          className="close-settings-modal-btn"
          text="close"
          onClick={closeSettingsClickHandler}
        />
      </div>
    </Modal>
  );
};

export default SettingsModal;
