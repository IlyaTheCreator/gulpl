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
   * @returns {HTMLBodyElement}
   */
  createContentWrapper() {
    const contentWrapper = document.createElement("div");

    contentWrapper.innerHTML = `
      <div class="modal-overlay modal-overlay--settings" id="settings-overlay"></div>
      <div class="modal" id="settings-modal">
        <div class="card settings" id="settings-card"></div>
      </div>
    `;

    return contentWrapper;
  }

  /**
   * @property {Function} createSettingItem creating a single setting toggler
   * @param {Object} setting current setting object (see App's settingsData prop) 
   * @param {string} key current setting key (see App's settingsData prop) 
   * @returns {HTMLBodyElement}
   */
  createSettingItem(setting, key) {
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

    return settingItem;
  }

  /**
   * @property {Function} createSettings creating settings
   * @param {Object} lcData settings data from localstorage
   * @returns {Array<HTMLBodyElement>}
   */
  createSettings(lcData) {
    return Object.keys(lcData).map((key) => {
      const setting = lcData[key];

      return this.createSettingItem(setting, key);
    });
  }
}
