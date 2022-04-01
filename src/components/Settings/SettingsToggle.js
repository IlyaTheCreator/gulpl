const SettingToggle = ({ onClick, setting }) => {
  const toggleValue = setting.isActive ? "on" : "off";

  return (
    <div onClick={onClick} className="settings__item">
      <p className="settings__item-text">{setting.text}</p>
      <div className={`settings__toggle-icon settings__toggle-icon--${toggleValue}`}>
        <i className={`icon icon-toggle-${toggleValue}`} />
      </div>
    </div>
  );
};

export default SettingToggle;
