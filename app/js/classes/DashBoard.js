import { modalTypes, widgetTypes, uvTypes } from "../constants";
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
   * @param {Object} city current city to be displayed
   * @returns {Object}
   */
  createContentWrapper(city) {
    const contentWrapper = document.createElement("div");

    contentWrapper.innerHTML = `
      <h1 class="screen__header">${city.title}</h1>
      <p class="screen__date">${new Date(city.date).toDateString()}</p>
      <div class="screen__weather">
          <img src="${city.cityImage}" alt="weather image" class="screen__image">
          <p class="screen__temperature">${city.currentTemp}°</p>
          <p class="screen__weather-type">${city.weatherCondition}</p>
      </div>
    `;

    return contentWrapper;
  }

  createCitiesSlider() {
    const slider = document.createElement("div");

    slider.classList.add("cities-slider");

    return slider;
  }

  /**
   * @property {Function} createSelectApiSourceContentWrapper creating content wrapper for selecting inital api source
   * @returns {Object}
   */
  createSelectApiSourceContentWrapper() {
    const contentWrapper = document.createElement("div");

    contentWrapper.id = "select-api-source-overlay";
    contentWrapper.classList.add("modal-overlay");
    contentWrapper.classList.add("modal-overlay--select-api-source");

    contentWrapper.addEventListener("click", this.onCloseSelectApiSource);

    return contentWrapper;
  }

  /**
   * @property {Function} createCloseSelectApiSourceBtn creating close btn for selecting inital api source
   * @returns {Object}
   */
  createCloseSelectApiSourceBtn() {
    const btn = document.createElement("button");

    btn.classList.add("close-select-api-source-btn");
    btn.id = "citySelectApiSourceCloseBtn";

    btn.innerHTML = `
      <p class="cancel-btn">Cancel</p>
    `;

    btn.addEventListener("click", this.onCloseSelectApiSource);

    return btn;
  }

  /**
   * @property {Function} createSelectApiSourceCard creating form|card for selecting inital api source
   * @returns {Object}
   */
  createSelectApiSourceCard() {
    const card = document.createElement("div");
    const form = document.createElement("form");
    const closeBtn = this.createCloseSelectApiSourceBtn();

    form.classList.add("select-api-source-form");
    card.classList.add("select-api-source");
    card.classList.add("card");

    form.innerHTML = `
      <div class="input-wrapper">
        <label for="api-source-select">Please select weather data source:</label>
        <select id="api-source-select">
          <option value="open-weather-map">OpenWeatherMap API</div>
          <option value="free-weather-api">Free Weather API</div>
        </select>
      </div>
      <button class="btn">Select</button>
    `;

    form.appendChild(closeBtn);

    form.addEventListener("submit", e => this.onSelectApiSourceClick(e))

    card.appendChild(form);

    return card;
  }

  /**
   * @property {Function} createSelectApiSourceModal creating modal for selecting inital api source
   */
  createSelectApiSourceModal() {
    this.mountModal(
      modalTypes.SELECT_API_SOURCE,
      () => [
        this.createSelectApiSourceContentWrapper(),
        this.createCloseSelectApiSourceBtn(),
        this.createSelectApiSourceCard()
      ],
      ["select-api-source-modal"]
    );
  }

  /**
   * @property {Function} createCloseCityListBtn creating btn for closing current city
   * @returns {Object}
   */
  createCloseCityListBtn() {
    const btn = document.createElement("button");

    btn.classList.add("close-modal-btn");
    btn.classList.add("close-city-list-btn");
    btn.id = "cityListCloseBtn";

    btn.innerHTML = `
      <p class="cancel-btn">close</p>
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
    let uvText;

    if (cityData.widgetRelatedInfo[key].name === "Uv Indicator") {
      const uv = cityData.widgetRelatedInfo[key].value;

      if (uv <= 1) {
        uvText = uvTypes.LOW;
      }

      if (uv > 1 && uv <= 2) {
        uvText = uvTypes.MEDIUM;
      }

      if (uv > 2) {
        uvText = uvTypes.HIGH;
      }
    }

    return `
      <p class="city-info-grid__widget-description">${cityData.widgetRelatedInfo[key].name}</p>
      <div class="city-info-grid__content-wrapper city-info-grid__content-wrapper--margin-bottom">
        <p class="city-info-grid__widget-number">${cityData.widgetRelatedInfo[key].value}</p>
        ${
          uvText
          ? `<p class="city-info-grid__widget-data">${uvText}</p>`
          : ""
        }
        ${
          cityData.widgetRelatedInfo[key].additional
          ? `<p class="city-info-grid__widget-additional">${cityData.widgetRelatedInfo[key].additional}</p>`
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
    const citiesSlider = this.createCitiesSlider();

    this.cities.forEach((city) => {
      const contentWrapper = this.createContentWrapper(city);
      const cityInfoGrid = this.createCityInfoGrid();

      Object.keys(citiesData).forEach((key) => {
        const content = this.createCityWidgetContent(currentCity, key);
        const widget = Widget.create(content, widgetTypes.CITY, ["city-info-grid__grid-item"]);
      
        cityInfoGrid.appendChild(widget);
      });

      contentWrapper.classList.add("city-info");
      contentWrapper.appendChild(cityInfoGrid);
      
      citiesSlider.appendChild(contentWrapper);
    });

    return citiesSlider;
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
          <span class="screen__city-temperature-range">
            Max. ${city.widgetRelatedInfo.maxTemp.value} 
            Min. ${city.widgetRelatedInfo.minTemp.value}
          </span>
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

    btn.addEventListener("click", this.generateAddCityModal);

    return btn;
  }

  /**
   * @property {Function} createAddCityContentWrapper creating add-city overlay
   * @returns {Object}
   */
   createAddCityContentWrapper() {
    const contentWrapper = document.createElement("div");

    contentWrapper.id = "add-city-overlay";
    contentWrapper.classList.add("modal-overlay");
    contentWrapper.classList.add("modal-overlay--add-city");

    return contentWrapper;
  }

  /**
   * @property {Function} createCloseAddCityBtn creating btn for closing add-city modal
   * @returns {Object}
   */
   createCloseAddCityBtn() {
    const btn = document.createElement("button");

    btn.classList.add("close-add-city-btn");
    btn.id = "closeAddCityBtn";

    btn.innerHTML = `
      <p class="cancel-btn">close</p>
    `;

    btn.addEventListener("click", this.closeCityAddModal);

    return btn;
  }

  /**
   * @property {Function} createAddCitySubmitButton creating btn submitting adding a city
   * @returns {Object}
   */
  createAddCitySubmitButton() {
    const btn = document.createElement("button");

    btn.classList.add("btn");

    btn.innerHTML = `
      <i class="icon-cancel-squared"></i>
    `;

    btn.addEventListener("click", this.addCityClickHandle);

    return btn;
  }

  /**
   * @property {Function} createAddCityForm creating form for adding a city
   * @returns {Object}
   */
  createAddCityForm() {
    const form = document.createElement("form");
    const addBtn = this.createAddCitySubmitButton();
    const closeBtn = this.createCloseAddCityBtn();
    const inputWrapper = document.createElement("div");
    const iconWrapper = document.createElement("div");

    inputWrapper.classList.add("input-wrapper");
    iconWrapper.classList.add("icon-wrapper");

    inputWrapper.innerHTML = `
      <input autocomplete="off" id="add-city-input" type="text" placeholder="Enter City Name..." />
    `;

    iconWrapper.innerHTML = `
      <i class="icon-map"></i>
    `;

    form.classList.add("add-city-form");

    addBtn.innerText = "Add";
    closeBtn.innerText = "Cancel";

    iconWrapper.addEventListener("click", () => {
      this.addCityClickHandle();
      window.addCityBtnClicked = false;
    });

    inputWrapper.appendChild(iconWrapper);
    form.appendChild(inputWrapper);
    form.appendChild(addBtn);
    form.appendChild(closeBtn);

    return form;
  }

  /**
   * @property {Function} createAddCityForm creating content for adding city form
   * @returns {Object}
   */
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

  /**
   * @property {Function} generateAddCityModal creating add city modal
   */
  generateAddCityModal = () => {
    if (!document.getElementById("add-city")) {
      this.mountModal(
        modalTypes.ADD_CITY,
        () => [
          this.createAddCityContentWrapper(),
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
    if (!this.weatherAPIType.apiPath) {
      this.createSelectApiSourceModal();
    }

    if (!this.cities || this.cities.length === 0) {
      return [this.createEmptyListMessage(), this.createAddBtn()];
    }

    const list = this.createCityList(this.cities, this.onCityWidgetClick);
    
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
      .forEach((key) => filteredCityWidgets[key] = this.cities[0].widgetRelatedInfo[key]);

    return this.createCity(filteredCityWidgets, this.currentCity);
  }

  /**
   * @property {Function} generateDashBoard preparing entire dashboard to be attached to the dom
   * @returns {Array<Object>}
   */
  generateDashBoard() {
    let output = [];

    if (this.showCityInfo && this.cities.length > 0) {
      output.push(this.generateCityInfo());
    } else {
      if (this.currentCity.title) {
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
   * @param {Function} onSelectApiSourceClick 
   * @param {Function} addCityClickHandle 
   * @param {Object} weatherAPIType 
   * @param {Function} onCloseSelectApiSource 
   * @param {Function} createMap 
   * @param {Object} mapData 
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
    smoothTransition,
    onSelectApiSourceClick,
    addCityClickHandle,
    weatherAPIType,
    onCloseSelectApiSource,
    createMap,
    mapData
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
    /**
     * @property {Function} onSelectApiSourceClick
     */
    this.onSelectApiSourceClick = onSelectApiSourceClick;
    /**
     * @property {Function} addCityClickHandle
     */
    this.addCityClickHandle = addCityClickHandle;
    /**
     * @property {Object} weatherAPIType
     */
    this.weatherAPIType = weatherAPIType;
    /**
     * @property {Function} onCloseSelectApiSource
     */
    this.onCloseSelectApiSource = onCloseSelectApiSource;
    /**
     * @property {Function} createMap
     */
    this.createMap = createMap;
    /**
     * @property {Object} mapType
     */
    this.mapType = mapData?.mapType;


    return this.generateDashBoard();
  }
}
