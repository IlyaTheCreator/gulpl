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
   * @property {Function} createCloseSettingsBtn creating btn for closing setting modal
   * @returns {Object}
   */
   createCloseSettingsBtn(onClick) {
    const btn = document.createElement("button");

    btn.classList.add("close-modal-btn");
    btn.classList.add("close-settings-modal-btn");
    btn.id = "settingsCloseBtn";

    btn.innerHTML = `
      <i class="icon-cancel-squared"></i>
    `;

    btn.addEventListener("click", onClick);

    return btn;
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
