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
  createContentWrapper() {
    const contentWrapper = document.createElement("div");

    contentWrapper.id = "settings-overlay";
    contentWrapper.classList.add("modal-overlay");
    contentWrapper.classList.add("modal-overlay--settings");

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
   * @property {Function} createSelectAPIContent creating content for api selection card
   * @returns {Object}
   */
  createSelectAPIContent(selectHandle, currentWeatherAPIType) {
    const content = document.createElement("div");
    const inputSelect = document.createElement("select");

    inputSelect.id = "api-source-select";
    inputSelect.addEventListener("change", selectHandle);
    inputSelect.innerHTML =  `
      <option value="open-weather-map">OpenWeather API</div>
      <option value="free-weather-api">Free Weather API</div>
    `;

    inputSelect.value = currentWeatherAPIType.apiType;

    content.innerHTML = `
      <h3>Weather data source:</h3>
    `;

    content.appendChild(inputSelect);

    return content;
  }

  /**
   * @property {Function} createSelectAPIContent creating content for map selection card
   * @returns {Object}
   */
  createSelectMapContent(selectHandle, currentMapType) {
    const content = document.createElement("div");
    const inputSelect = document.createElement("select");

    inputSelect.id = "map-type-select";
    inputSelect.addEventListener("change", selectHandle);
    inputSelect.innerHTML =  `
      <option value="yandex-map">Yandex</div>
      <option value="open-street-map">Open Street Map</div>
    `;

    inputSelect.value = currentMapType.mapType;

    content.innerHTML = `
      <h3>Map type:</h3>
    `;

    content.appendChild(inputSelect);

    return content;
  }

  /**
   * @property {Function} createSettings creating settings
   * @param {Object} lcData settings data from localstorage
   * @param {Function} setOnSettingClick
   * @param {Function} selectAPIHandle 
   * @param {Function} selectMapHandle
   * @param {Object} currentWeatherAPIType
   * @param {Object} currentMapType
   * @returns {Object}
   */
  createSettings(
    lcData, 
    setOnSettingClick, 
    selectAPIHandle, 
    selectMapHandle,
    currentWeatherAPIType,
    currentMapType
  ) {
    const settingsModalWrapper = document.createElement("div");
    const settingsTogglesCard = document.createElement("div");
    const settingsSelectAPICard = document.createElement("div");
    const settingsSelectMapCard = document.createElement("div");
    
    settingsModalWrapper.classList.add("settings-modal-wrapper");
    settingsTogglesCard.classList.add("card");
    settingsTogglesCard.classList.add("settings");
    settingsSelectAPICard.classList.add("card");
    settingsSelectAPICard.classList.add("settings");
    settingsSelectAPICard.classList.add("card-select");
    settingsSelectMapCard.classList.add("card");
    settingsSelectMapCard.classList.add("settings");
    settingsSelectMapCard.classList.add("card-select");

    Object.keys(lcData).forEach((key) => {
      const setting = lcData[key];

      settingsTogglesCard.appendChild(this.createSettingItem(setting, key, setOnSettingClick));
    });

    settingsSelectAPICard.appendChild(this.createSelectAPIContent(selectAPIHandle, currentWeatherAPIType));
    settingsSelectMapCard.appendChild(this.createSelectMapContent(selectMapHandle, currentMapType));

    settingsModalWrapper.appendChild(settingsTogglesCard);
    settingsModalWrapper.appendChild(settingsSelectAPICard);
    settingsModalWrapper.appendChild(settingsSelectMapCard);

    return settingsModalWrapper;
  }
}
