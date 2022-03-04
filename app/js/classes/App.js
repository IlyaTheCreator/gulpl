import { modalTypes } from "../constants";

import modalService from "../services/ModalService";
import LsService from "../services/LsService";
import WeatherAPIService from "../services/WeatherAPIService";

/**
 * @namespace entities
 */

/**
 * Class representing entire application. Central manager of the app.
 * @memberof entities
 */
export default class App {
  /**
   * @param {Object} dashBoard  DashBoard instance
   * @param {Object} settings Settings instance
   * @param {Object} modalService modalService instance
   * @param {HTMLBodyElement} rootElement DOM element to attach the app to
   */
  constructor(dashBoard, settings, rootElement) {
    /**
     * @property {Object} dashBoard  DashBoard instance
     */
    this.dashBoard = dashBoard;
    /**
     * @property {Object} settings Settings instance
     */
    this.settings = settings;
    /**
     * @property {Object} settings ModalService instance
     */
    this.modalService = new modalService();
    /**
     * @property {HTMLBodyElement} rootElement DOM element to attach the app to
     */
    this.rootElement = rootElement;
    /**
     * @property {Object} citiesData weather information
     */
    this.citiesData = [];
    /**
     * Property for holding and managing city settings on single city page.
     * (notice how keys are matched with widgetRelatedInfo property in a city)
     * @property {Object} settingsData
     */
    this.settingsData = {
      minTemp: {
          text: "Min. Temp.",
          isActive: true,
      },
      maxTemp: {
          text: "Max. Temp.",
          isActive: true,
      },
      uvIndicator: {
          text: "Uv Indicator",
          isActive: true,
      },
      feltTemp: {
          text: "Felt Temp",
          isActive: false,
      },
      pressure: {
          text: "Pressure",
          isActive: false,
      },
      windSpeed: {
          text: "Wind Speed",
          isActive: false,
      },
    };
    /**
     * "dashboard" || something else
     * @property {string} displayMode defines what "page" to display (kind of SPA)
     */
    this.displayMode = "dashboard";
    /**
     * @property {boolean} showCityInfo defines whether to display single city "page" or not
     */
    this.showCityInfo = false;
    /**
     * @property {string} settingsLcKey localstorage key for keeping settings data
     */
    this.settingsLcKey = "";
    /**
     * @property {string} citiesListLcKey localstorage key for keeping cities' weather list data
     */
    this.citiesListLcKey = "";
    /**
     * @property {string} cityLcKey localstorage key for keeping individual city's data
     */
    this.cityLcKey = "";
    this.weatherAPITypeLcKey = "";
    /**
     * @property {number} touchStartX property for swiping
     */
    this.touchStartX = 0;
    /**
     * @property {number} touchEndX property for swiping
     */
    this.touchEndX = 0;

    this.weatherAPIService = new WeatherAPIService();

    this.setupLocalStorage();
  }

  /**
   * @property {Function} setupLocalStorage initial localstorage setup
   */
  setupLocalStorage = async () => {
    this.settingsLcKey = "weather";
    this.citiesListLcKey = "cities";
    this.cityLcKey = "city";
    this.weatherAPITypeLcKey = "weather-api-type";

    const lcSettings = this.getSettingsState();
    const lcCitiesList = this.getCities();
    const lcCity = this.getCurrentCity();
    const weatherApiType = this.getWeatherAPIType();
    
    // Inital launching checks
    if (lcSettings === null) {
      this.setSettings(this.settingsData);
    }
    
    if (lcCitiesList === null || !lcCitiesList.length) {
      this.setCities([]);
    }

    if (lcCity === null || !Object.keys(lcCity).length) {
      this.setCurrentCity({})
      this.showCityList();
    }

    if (weatherApiType === null || weatherApiType === "") {
      this.setWeatherAPIType("");
    }
  }

  /**
   * @property {Function} mountModal function for creating and mounting a modal 
   * For props description see Modal's constructor
   */
  mountModal = (modalType, modalContentCreateMethod, classes = [], id = modalType) => {
    this.rootElement.appendChild(
      this.modalService.createModal(modalType, modalContentCreateMethod, classes, id)
    )
  }

  /**
   * @property {Function} onCityWidgetClick Individual city widget's onClick handler
   * @param {Object} city current city where the click occured
   */
  onCityWidgetClick = (city) => {
    this.setCurrentCity(city);
    this.showCityInfo = true;
    this.create();
  }

  /**
   * @property {Function} onCityWidgetClick Individual setting trigger onClick handler
   * @param {Object} e event object
   */
  toggleWidgetDisplay = ({ target: { id, classList }}) => {
    // check if there's an id
    if (!id.trim()) {
      this.create();
    }

    // check if there's a '-' sign in the id
    if (!id.search("-")) {
      this.create();
    }

    // check if there's a class
    if (!classList[1]) {
      this.create();
    }

    // check if there's a '-' sign in the class
    if (!classList[1].split("-")) {
      this.create();
    }

    // check if there's a division of the class
    if (!classList[1].split("-")[2]) {
      this.create();
    }

    const key = id.split("-")[2];
    const newSettings = LsService.get(this.settingsLcKey);
    const active = classList[1].split("-")[2];
    const isActive = active === "on";
    newSettings[key].isActive = !isActive;

    this.setSettings(newSettings);

    this.createSettings();
  }

  /**
   * @property {Function} getSettingsState getting current settings state from localstorage
   * @returns {Object}
   */
  getSettingsState = () => {
    return LsService.get(this.settingsLcKey);
  }

  /**
   * @property {Function} getCities getting current cities list state from localstorage
   * @returns {Object}
   */
  getCities = () => {
    return LsService.get(this.citiesListLcKey);
    // return []
  }

  /**
   * @property {Function} getCurrentCity Current city localstorage getter
   */
  getCurrentCity = () => {
    return LsService.get(this.cityLcKey);
  }

  getWeatherAPIType = () => {
    return LsService.get(this.weatherAPITypeLcKey);
  }

  setWeatherAPIType = (weatherApiType) => {
    return LsService.set(this.weatherAPITypeLcKey, weatherApiType);
  }

  setCities = (citiesList) => {
    LsService.set(this.citiesListLcKey, citiesList);
  }

  setSettings = (settings) => {
    LsService.set(this.settingsLcKey, settings);
  }

  /**
   * @property {Function} setCurrentCity Current city localstorage setter
   * @param {Object} city city to set
   */
  setCurrentCity(city) {
    LsService.set(this.cityLcKey, city);
  }

  /**
   * @property {Function} setEventListeners setting event listeners when single city "page" is loaded
   */
  setEventListeners() {
    // for smooth transitioning between "pages"
    this.rootElement.addEventListener("webkitAnimationEnd", () => {
      this.rootElement.classList.remove("change-animate");
    }, false)

    if (!this.showCityInfo) {
      document.getElementById("cityListCloseBtn")?.addEventListener("click", this.closeCityList);
      document.getElementById("addCityBtn")?.addEventListener("click", () => this.dashBoard.generateAddCityModal());

      return;
    }

    const cityInfo = document.getElementById("city-info");

    document.getElementById("showCitiesListBtn")?.addEventListener("click", this.showCityList);
    document.getElementById("settingsOpenBtn")?.addEventListener("click", this.createSettings);

    cityInfo.addEventListener('touchstart', e => {
      this.touchStartX = e.changedTouches[0].screenX
    });

    cityInfo.addEventListener('touchend', e => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleGesture();
    });
  }

  /**
   * @property {Function} handleGesture swipe realization
   */
  handleGesture() {
    const currentCity = this.getCurrentCity();
    this.citiesData = this.getCities();

    const currentCityIndex = this.citiesData.findIndex((city) => city.id === currentCity.id);

    // swiped left | 100 is for correct behavior (don't swipe on 1px change, for example)
    if (this.touchEndX + 24 < this.touchStartX) {
      if (currentCityIndex < this.citiesData.length - 1 && currentCityIndex >= 0) {
        this.setCurrentCity(this.citiesData[currentCityIndex + 1]);

        this.create();
      }
    }

    // swiped right | 100 is for correct behavior (don't swipe on 1px change, for example)
    if (this.touchEndX - 24 > this.touchStartX) {
      if (currentCityIndex > 0) {
        this.setCurrentCity(this.citiesData[currentCityIndex - 1]);

        this.create();
      }
    }
  }

  /**
   * @property {Function} clearRootElement emptying roolElement's content
   */
  clearRootElement() {
    this.rootElement.innerHTML = "";
  }

  /**
   * @property {Function} showCityList displaying cities list "page"
   */
  showCityList = () => {
    this.showCityInfo = false;
    this.create();
  }

  /**
   * @property {Function} smoothTransition
   */
  smoothTransition = () => {
    this.rootElement.classList.add("change-animate");
  }

  /**
   * @property {Function} createNavigation creating navigation element
   */
  createNavigation() {
    const navigation = document.createElement("nav");
    navigation.classList.add("navigation");

    navigation.innerHTML = `
      <div class="navigation__settings" id="settingsOpenBtn">
          <i class="icon icon-figma-settings"></i>
      </div>
      <div class="navigation__pages" id="nav-circles"></div>
      <div class="navigation__cities">
          <a class="link" id="showCitiesListBtn">
              <div class="navigation__cities-link-wrapper">
                  <i class="icon icon-figma-tiles navigation__smaller-icon"></i>
              </div>
          </a>
      </div>
    `;

    this.rootElement.appendChild(navigation);
    this.createNavCircles();
  }

  /**
   * @property {Function} createNavCircles
   */
  createNavCircles() {
    const circlesWrapper = document.getElementById("nav-circles");

    this.getCities().forEach((city) => {
      const circle = document.createElement("i");

      circle.classList.add("icon");
      circle.classList.add("icon-dot");
      circle.classList.add("navigation__circle");

      if (city.id === this.getCurrentCity().id) {
        circle.classList.add("navigation__circle--active")
      }

      circle.addEventListener("click", () => {
        // check to avoid unnecessary re-rendering
        if (city.id !== this.getCurrentCity().id) {
          this.setCurrentCity(city);
          this.create();
        }
      });

      circlesWrapper.appendChild(circle);
    })
    
    return circlesWrapper;
  }

  /**
   * @property {Function} createSettings creating settings element
   */
  createSettings = () => {
    this.mountModal(
      modalTypes.SETTINGS,
      () => [
        this.settings.createCloseSettingsBtn(this.closeSettings),
        this.settings.createContentWrapper(this.closeSettings),
        this.settings.createSettings(this.getSettingsState(), this.setOnSettingClick)
      ]
    );
    
    document.getElementById("settingsCloseBtn")?.addEventListener("click", () => {
      this.closeSettings()
    });
  }

  /**
   * @property {Function} closeSettings Closing settings modal
   */
  closeSettings = () => {
    this.create();
  }

  closeCityAddModal = () => {
    this.create();
    this.showCityInfo = false;
  }

  /**
   * @property {Function} setOnSettingClick Setting onClick event later on a single setting item
   */
  setOnSettingClick = (settingNode) => {
    settingNode.childNodes[3].childNodes[1].addEventListener("click",this.toggleWidgetDisplay);
  }

  /**
   * @property {Function} closeCityList
   */
  closeCityList = () => {
    this.showCityInfo = true;
    this.create();
  }

  async fetchCities(city, country) {
    this.weatherAPIService.setApiType(this.getWeatherAPIType());

    const newCity = await this.weatherAPIService.getForecast(city, country);

    if (!newCity) {
      return this.getCities();
    }

    return [...this.getCities(), newCity];
  }

  onSelectApiSourceClick = (e) => {
    e.preventDefault();
    
    const selectField = e.target.elements["api-source-select"];
    const apiTypes = this.weatherAPIService.getApiTypes();

    this.setWeatherAPIType(apiTypes[selectField.value]);    
    this.create();
  }

  addCityClickHandle = async () => {
    const selectedCity = document.getElementById("add-city-input").value;
    const selectedCountry = document.getElementById("add-city-input-country").value;
    const newCities = await this.fetchCities(selectedCity, selectedCountry);

    this.setCities(newCities);
    this.create();
  }

  /**
   * @property {Function} create central app's point
   */
  create = () => {
    this.clearRootElement();

    if (this.showCityInfo) {
      this.createNavigation();
    }

    // central "router"
    switch (this.displayMode) {
      case "dashboard":
        this.dashBoard.create(
          this.getCities(),
          this.getCurrentCity(),
          this.onCityWidgetClick,
          this.getSettingsState,
          this.widgetsData,
          this.showCityInfo,
          this.mountModal,
          this.closeCityAddModal,
          this.smoothTransition,
          this.onSelectApiSourceClick,
          this.addCityClickHandle,
          this.getWeatherAPIType()
        ).forEach((element) => this.rootElement.appendChild(element));

        this.setEventListeners();

        break;
      default:
        break;
    }

    if (this.showCityInfo) {
      document.getElementById("city-list")?.remove();
    }
  }
}
