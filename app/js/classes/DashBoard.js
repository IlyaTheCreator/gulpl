import { modalTypes, widgetTypes } from "../constants";
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
      const widget = Widget.create(content, widgetTypes.CITY, ["city-info-grid__grid-item"]);
    
      cityInfoGrid.appendChild(widget);
    });

    contentWrapper.id = "city-info";
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
        widgetTypes.LIST,
        ["screen__city"],
        onClick
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
    btn.id = "addCityBtn";

    btn.innerHTML = `
      <i class="icon-figma-plus"></i>
    `;

    return btn;
  }

  /**
   * @property {Function} createAddCityContentWrapper creating add-city overlay
   * @returns {Object}
   */
   createAddCityContentWrapper(onClick) {
    const contentWrapper = document.createElement("div");

    contentWrapper.id = "add-city-overlay";
    contentWrapper.classList.add("modal-overlay");
    contentWrapper.classList.add("modal-overlay--add-city");

    contentWrapper.addEventListener("click", onClick);

    return contentWrapper;
  }

  /**
   * @property {Function} createCloseAddCityBtn creating btn for closing add-city modal
   * @returns {Object}
   */
   createCloseAddCityBtn() {
    const btn = document.createElement("button");

    btn.classList.add("close-modal-btn");
    btn.classList.add("close-add-city-btn");
    btn.id = "closeCityBtn";

    btn.innerHTML = `
      <i class="icon-cancel-squared"></i>
    `;

    btn.addEventListener("click", this.closeCityAddModal);

    return btn;
  }

  createAddCityForm() {
    const form = document.createElement("form");

    form.classList.add("add-city-form");

    form.innerHTML = `
      <div class="input-wrapper">
        <input type="text" placeholder="Enter City Name..." />
        <div class="icon-wrapper">
          <i class="icon-map"></i>
        </div>
      </div>
      <button class="btn">Add</button>
    `;

    return form;
  }

  createAddCityContent() {
    const addCityCard = document.createElement("div");
    
    addCityCard.classList.add("card");
    addCityCard.classList.add("add-city");

    addCityCard.appendChild(this.createAddCityForm());

    return addCityCard;
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

  generateAddCityModal() {
    if (!document.getElementById("add-city")) {
      this.mountModal(
        modalTypes.ADD_CITY,
        () => [
          this.createCloseAddCityBtn(),
          this.createAddCityContentWrapper(this.closeCityAddModal),
          this.createAddCityContent()
        ],
        ["add-city-modal"]
      );
    }
  }

  /**
   * @property {Function} generateCityList preparing city list to be attached to the dom
   * @returns {Object}
   */
  generateCityList() {
    if (this.cities.length === 0) {
      return [this.createEmptyListMessage(), this.createAddBtn()];
    }

    const list = this.createCityList(this.cities, this.onCityWidgetClick);
    const listWrapper = document.createElement("div");

    listWrapper.classList.add("city-list");

    list.forEach((item) => listWrapper.appendChild(item));

    this.mountModal(
      modalTypes.CITY_LIST,
      () => list,
      ["city-list"]
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
      .filter((key) => currentSettingsState[key].isActive)
      .forEach((key) => filteredCityWidgets[key] = this.widgetsData[key]);

    return this.createCity(filteredCityWidgets, this.currentCity);
  }

  /**
   * @property {Function} generateDashBoard preparing entire dashboard to be attached to the dom
   * @returns {Array<Object>}
   */
  generateDashBoard() {
    let output = [];

    if (this.showCityInfo) {
      output.push(this.generateCityInfo());
    } else {
      if (this.cities.length > 0 && this.currentCity.title) {
        output.push(this.createCloseCityListBtn());
      }
      
      if (Array.isArray(this.generateCityList())) {
        output = [...output, ...this.generateCityList()];
      }
    }

    this.smoothTransition();

    return output;
  }

  /**
   * @property {Function} create getting the required methods from the app and connecting to it
   * @param {Object} cities 
   * @param {Object} currentCity 
   * @param {Function} onCityWidgetClick 
   * @param {Function} getSettingsState 
   * @param {Function} widgetsData 
   * @param {Function} showCityInfo 
   * @param {Function} mountModal 
   * @param {Function} closeCityAddModal 
   * @param {Function} smoothTransition 
   * @returns {Array<Object>}
   */
  create(
    cities,
    currentCity,
    onCityWidgetClick,
    getSettingsState,
    widgetsData,
    showCityInfo,
    mountModal,
    closeCityAddModal,
    smoothTransition
  ) {
    /**
     * @property {Array} cities latest city data
     */
     this.cities = cities;
    /**
     * @property {Function} currentCity 
     */
    this.currentCity = currentCity;
    /**
     * @property {Function} onCityWidgetClick check App class for more information
     */
    this.onCityWidgetClick = onCityWidgetClick;
    /**
     * @property {Function} getSettingsState
     */
    this.getSettingsState = getSettingsState;
    /**
     * @property {Function} widgetsData
     */
    this.widgetsData = widgetsData;
    /**
     * @property {Function} showCityInfo
     */
    this.showCityInfo = showCityInfo;
    /**
     * @property {Function} mountModal
     */
    this.mountModal = mountModal;
    /**
     * @property {Function} closeCityAddModal
     */
    this.closeCityAddModal = closeCityAddModal;
    /**
     * @property {Function} smoothTransition
     */
    this.smoothTransition = smoothTransition;

    return this.generateDashBoard();
  }
}
