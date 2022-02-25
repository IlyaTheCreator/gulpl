/**
 * @namespace entities
 */

/**
 * Class for managing current city display settings
 * @memberof entities
 */
export default class Settings {
  /**
   * @property {Function} createContentWrapper creating settings dom wrapper
   * @returns {Object}
   */
  createContentWrapper(onClick) {
    const contentWrapper = document.createElement("div");

    contentWrapper.id = "settings-overlay";
    contentWrapper.classList.add("modal-overlay");
    contentWrapper.classList.add("modal-overlay--settings");

    contentWrapper.addEventListener("click", onClick);

    return contentWrapper;
  }

  /**
   * @property {Function} createSettingItem creating a single setting toggler
   * @param {Object} setting current setting object (see App's settingsData prop) 
   * @param {string} key current setting key (see App's settingsData prop) 
   * @returns {Object}
   */
  createSettingItem(setting, key, setOnSettingClick) {
    const toggleValue = setting.isActive ? "on" : "off";
    const settingItem = document.createElement("div");

    settingItem.classList.add("settings__item");

    settingItem.innerHTML = `
      <p class="settings__item-text">${setting.text}</p>
      <div 
          class="settings__toggle-icon settings__toggle-icon--${toggleValue}"
      >
        <i 
          id="setting-toggle-${key}"
          class="icon icon-toggle-${toggleValue}"
        ></i>
      </div>
    `;

    setOnSettingClick(settingItem);

    return settingItem;
  }

  /**
   * @property {Function} createSettings creating settings
   * @param {Object} lcData settings data from localstorage
   * @returns {Object}
   */
  createSettings(lcData, setOnSettingClick) {
    const settingsCard = document.createElement("div");
    
    settingsCard.classList.add("card");
    settingsCard.classList.add("settings");

    Object.keys(lcData).forEach((key) => {
      const setting = lcData[key];

      settingsCard.appendChild(this.createSettingItem(setting, key, setOnSettingClick));
    });

    return settingsCard;
  }
}
