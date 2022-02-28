import Widget from "./Widget";

/**
 * @namespace entities
 */

/**
 * DashBoard class - manager for cities list and single city
 * @memberof entities
 */
export default class DashBoard {
  /**
   * @property {Function} createContentWrapper creating markup/styles wrapper for displayed city
   * @param {*} city current city to be displayed
   * @returns {Object}
   */
  createContentWrapper(city) {
    const contentWrapper = document.createElement("div");
    const i = 2;

    contentWrapper.innerHTML = `
      <h1 class="screen__header">${city.title}</h1>
      <p class="screen__date">${new Date(city.date).toDateString()}</p>
      <div class="screen__weather">
          <img src="${city.cityImage
      }" alt="weather image" class="screen__image">
          <p class="screen__temperature">${city.currentTemp}°</p>
          <p class="screen__weather-type">${city.weatherCondition}</p>
      </div>
    `;

    return contentWrapper;
  }

  /**
   * @property {Function} createCloseCityBtn creating btn for closing current city
   * @returns {Object}
   */
  createCloseCityListBtn() {
    const btn = document.createElement("button");

    btn.classList.add("close-modal-btn");
    btn.classList.add("close-city-list-btn");
    btn.id = "cityListCloseBtn";

    btn.innerHTML = `
      <i class="icon-cancel-squared"></i>
    `;

    return btn;
  }

  /**
   * @property {Function} createCityInfoGrid creating wrapper for city's widgets
   * @returns {Object}
   */
  createCityInfoGrid() {
    const cityInfoGrid = document.createElement("div");

    cityInfoGrid.classList.add("city-info-grid");

    return cityInfoGrid;
  }

  /**
   * @property {Function} createCityWidgetContent creating innerHTMl of a city widget
   * @returns {string}
   */
  createCityWidgetContent(cityData, key) {
    return `
      <p class="city-info-grid__widget-description">${cityData[key].name
      }</p>
      <div class="city-info-grid__content-wrapper city-info-grid__content-wrapper--margin-bottom">
          <p class="city-info-grid__widget-number">${cityData[key].value
      }</p>
          ${cityData[key].text
        ? `<p class="city-info-grid__widget-data">${cityData[key].text}</p>`
        : ""
      }
          ${cityData[key].additional
        ? `<p class="city-info-grid__widget-additional">${cityData[key].additional}</p>`
        : ""
      }
      </div>
     `;
  }

  /**
   * @property {Function} createCity creating current city page
   * @param {Object} citiesData current cities data
   * @param {Object} currentCity current city data
   * @returns {Object}
   */
  createCity(citiesData, currentCity) {
    const contentWrapper = this.createContentWrapper(currentCity);
    const cityInfoGrid = this.createCityInfoGrid();
    
    Object.keys(citiesData).forEach((key) => {
      const content = this.createCityWidgetContent(currentCity, key);
      const widget = Widget.create(content, "city", undefined, ["city-info-grid__grid-item"])
    
      cityInfoGrid.appendChild(widget);
    });

    contentWrapper.classList.add("city-info");
    contentWrapper.appendChild(cityInfoGrid);

    return contentWrapper;
  }

  /**
   * @property {Function} createContent creating initial content innerHTML for city page
   * @param {Object} city current city
   * @returns {string}
   */
  createContent(city) {
    return `
      <a class="link" href="#">
        <h3 class="screen__title">
          <div className="screen__city-title-group">
            <span class="screen__city-name">${city.title}</span>
            <p class="screen__city-time">${new Date(city.date).toDateString()}</p>
          </div>
          <span class="screen__city-temperature">${city.currentTemp}°</span>
        </h3>
        <div class="screen__city-info">
          <span class="screen__city-weather-condition">${city.weatherCondition}</span>
          <span class="screen__city-temperature-range">Max. ${city.maxTemp.value} Min. ${city.minTemp.value}</span>
        </div>
      </a>
    `;
  }

  /**
   * @property {Function} createCityList creating city list page
   * @param {Object} cities current cities data
   * @param {Function} onCityWidgetClick Individual city widget's onClick handler
   * @returns {Array<Object>}
   */
  createCityList(cities, onCityWidgetClick) {
    const content = cities.map((city) => {
      const onClick = () => {
        onCityWidgetClick(city);
      };

      const cityWidget = Widget.create(
        this.createContent(city),
        "list",
        onClick,
        ["screen__city"]
      );

      return cityWidget;
    });

    content.push(this.createAddBtn());

    return content;
  }

  /**
   * @property {Function} createAddBtn creates button to add a city
   * @returns {Object}
   */
  createAddBtn() {
    const btn = document.createElement("button");

    btn.classList.add("btn");
    btn.classList.add("widget");
    btn.classList.add("screen__add-btn");

    btn.innerHTML = `
      <i class="icon-figma-plus"></i>
    `;

    return btn;
  }

  /**
   * @property {Function} createEmptyListMessage creating message of empty city list
   * @returns {Object}
   */
  createEmptyListMessage() {
    const container = document.createElement("div");

    container.classList.add("empty-city-list-container");

    container.innerHTML = `
      <p class="empty-city-list-container__text">
        It seems like you don't have any cities selected.
        Let's add one!
      </p>
    `;

    return container;
  }

  /**
   * @property {Function} generateCityList preparing city list to be attached to the dom
   * @returns {Object}
   */
  generateCityList() {
    const cities = this.cities;

    if (cities.length === 0) {
      return [this.createEmptyListMessage(), this.createAddBtn()];
    }

    const list = this.createCityList(cities, this.onCityWidgetClick);
    const listWrapper = document.createElement("div");

    listWrapper.classList.add("city-list");

    list.forEach((item) => listWrapper.appendChild(item));

    this.mountModal(
      "city-list",
      () => this.createCityList(cities, this.onCityWidgetClick),
      [], 
      "city-list"
    );
  }

  /**
   * @property {Function} generateCityInfo preparing single city page to be attached to the dom
   * @returns {Object}
   */
  generateCityInfo() {
    const currentSettingsState = this.getSettingsState();

    const filteredCityWidgets = {};

    Object.keys(currentSettingsState)
      .filter((key) => {
        return currentSettingsState[key].isActive;
      })
      .forEach((key) => {
        filteredCityWidgets[key] = this.widgetsData[key];
      });

    return this.createCity(filteredCityWidgets, this.getCurrentCity());
  }

  /**
   * @property {Function} generateDashBoard preparing entire dashboard to be attached to the dom
   * @returns {Array<Object>}
   */
  generateDashBoard() {
    const output = [this.generateCityInfo()];

    if (!this.showCityInfo) {
      output.push(this.createCloseCityListBtn());
      this.generateCityList();
    }

    return output;
  }

  /**
   * @property {Function} create getting the required methods from the app and connecting to it
   * @param {Function} onCityWidgetClick 
   * @param {Function} getCities 
   * @param {Function} getCurrentCity 
   * @param {Function} getSettingsState 
   * @param {Function} widgetsData 
   * @param {Function} showCityInfo 
   * @param {Function} mountModal 
   * @returns {Array<Object>}
   */
  create(
    cities,
    onCityWidgetClick,
    getCurrentCity,
    getSettingsState,
    widgetsData,
    showCityInfo,
    mountModal
  ) {
    /**
     * @property {Array} cities latest city data
     */
     this.cities = cities;
    /**
     * @property {Function} onCityWidgetClick check App class for more information
     */
    this.onCityWidgetClick = onCityWidgetClick;
    /**
     * @property {Function} getCurrentCity check App class for more information
     */
    this.getCurrentCity = getCurrentCity;
    /**
     * @property {Function} getSettingsState check App class for more information
     */
    this.getSettingsState = getSettingsState;
    /**
     * @property {Function} widgetsData check App class for more information
     */
    this.widgetsData = widgetsData;
    /**
     * @property {Function} showCityInfo check App class for more information
     */
    this.showCityInfo = showCityInfo;
    /**
     * @property {Function} mountModal check App class for more information
     */
    this.mountModal = mountModal;

    return this.generateDashBoard();
  }
}
