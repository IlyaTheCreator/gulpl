import { useDispatch, useSelector } from "react-redux";
import { toggleSetting } from "../../store/settings";

import SettingToggle from "./SettingsToggle";

const WidgetCardSettings = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

  const switchers = Object.keys(settings).map((key) => {
    const clickHandler = () => {
      dispatch(toggleSetting(key));
    };

    return (
      <SettingToggle key={key} onClick={clickHandler} setting={settings[key]} />
    );
  });

  return <div className="card settings">{switchers}</div>;
};

export default WidgetCardSettings;
