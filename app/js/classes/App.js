import { modalTypes } from "../constants";

import modalService from "../services/ModalService";
import LsService from "../services/LsService";
import WeatherAPIService from "../services/WeatherAPIService";
import MapService from "../services/MapService";

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
     * @property {string} settingsLsKey localstorage key for keeping settings data
     */
    this.settingsLsKey = "";
    /**
     * @property {string} citiesListLsKey localstorage key for keeping cities' weather list data
     */
    this.citiesListLsKey = "";
    /**
     * @property {string} cityLsKey localstorage key for keeping individual city's data
     */
    this.cityLsKey = "";
    /**
     * @property {string} weatherAPITypeLsKey localstorage key for keeping weather api type (object - secret key + api url)
     */
    this.weatherAPITypeLsKey = "";
    /**
     * @property {string} mapTypeLsKey localstorage key for keeping map type (object - secret key + url)
     */
    this.mapTypeLsKey = "";
    /**
     * @property {number} touchStartX property for swiping
     */
    this.touchStartX = 0;
    /**
     * @property {number} touchEndX property for swiping
     */
    this.touchEndX = 0;
    /**
     * @property {WeatherAPIService} weatherAPIService api service
     */
    this.weatherAPIService = new WeatherAPIService();
    /**
     * @property {MapService} MapService map service
     */
    this.mapService = new MapService();
    /**
     * @property {LsService} LsService localStorage service
     */
    this.lsService = new LsService();
    /**
     * @property {string} appVerson version number for managing localstorage data differences
     */
    this.appVersion = "1.0.0";

    this.setupLocalStorage();
  }

  /**
   * @property {Function} setupLocalStorage initial localstorage setup
   */
  setupLocalStorage = () => {
    this.lsDataKey = "weather" + "-" + this.appVersion;
    this.settingsLsKey = "settings";
    this.citiesListLsKey = "cities";
    this.cityLsKey = "city";
    this.weatherAPITypeLsKey = "weather-api-type";
    this.mapTypeLsKey = "map-type";

    const lsSettings = this.getSettingsState();
    const lsCitiesList = this.getCities();
    const lsCity = this.getCurrentCity();
    const weatherApiType = this.getWeatherAPIType();
    const mapType = this.getMapType();

    const defaultMapType = this.mapService.getMapTypes()["yandex-map"];

    const initialLsState = {
      cities: [],
      settings: this.settingsData,
      city: {},
      "weather-api-type": {},
      "map-type": defaultMapType
    };

    // Inital launching checks
    if (!this.getLsData()) {
      this.lsService.init(this.lsDataKey);
      LsService.set(this.lsDataKey, initialLsState);

      return;
    }

    if (!lsSettings) {
      LsService.set(this.lsDataKey, {
        ...this.getLsData(),
        [this.settingsLsKey]: this.settingsData
      });
    }

    if (!lsCitiesList) {
      LsService.set(this.lsDataKey, {
        ...this.getLsData(),
        [this.citiesListLsKey]: []
      });
    }

    if (!lsCity) {
      LsService.set(this.lsDataKey, {
        ...this.getLsData(),
        [this.cityLsKey]: {}
      });
    }

    if (!weatherApiType) {
      LsService.set(this.lsDataKey, {
        ...this.getLsData(),
        [this.weatherAPITypeLsKey]: {}
      });
    }

    if (!mapType) {
      LsService.set(this.lsDataKey, {
        ...this.getLsData(),
        [this.mapTypeLsKey]: defaultMapType
      });

      this.mapService.setMapType(this.mapService.getMapTypes()["open-street-map"]);
    }
  }

  /**
   * @property {Function} mountModal function for creating and mounting a modal 
   * For props description see Modal's constructor
   */
  mountModal = (modalType, modalContentCreateMethod, classes = [], id = modalType) => {
    this.rootElement.appendChild(this.modalService.createModal(modalType, modalContentCreateMethod, classes, id))
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
    const newSettings = this.getSettingsState();
    const active = classList[1].split("-")[2];
    const isActive = active === "on";
    newSettings[key].isActive = !isActive;

    this.setSettings(newSettings);
    this.createSettings();
  }

  /**
   * @property {Function} getLsData getting entire current state from localstorage
   * @returns {Object}
   */
  getLsData() {
    return LsService.get(this.lsDataKey)
  }

  /**
   * @property {Function} getSettingsState getting current settings state from localstorage
   * @returns {Object}
   */
  getSettingsState = () => {
    return LsService.get(this.lsDataKey)?.[this.settingsLsKey];
  }

  /**
   * @property {Function} getCities getting current cities list state from localstorage
   * @returns {Object}
   */
  getCities = () => {
    return LsService.get(this.lsDataKey)?.[this.citiesListLsKey];
    // return []
  }

  /**
   * @property {Function} getCurrentCity Current city localstorage getter
   */
  getCurrentCity = () => {
    return LsService.get(this.lsDataKey)?.[this.cityLsKey];
  }

  /**
   * @property {Function} getWeatherAPIType Current weather api type localstorage getter
   */
  getWeatherAPIType = () => {
    return LsService.get(this.lsDataKey)?.[this.weatherAPITypeLsKey];
  }

  /**
   * @property {Function} getMapType Current map type localstorage getter
   */
  getMapType = () => {
    return LsService.get(this.lsDataKey)?.[this.mapTypeLsKey];
  }

  /**
   * @property {Function} setWeatherAPIType Current weather api type localstorage setter
   */
  setWeatherAPIType = (weatherApiType) => {
    LsService.set(
      this.lsDataKey, 
      {
        ...LsService.get(this.lsDataKey), 
        [this.weatherAPITypeLsKey]: weatherApiType
      }
    );
  }

  /**
   * @property {Function} setMapType Current map type localstorage setter
   */
  setMapType = (mapType) => {
    LsService.set(
      this.lsDataKey, 
      {
        ...LsService.get(this.lsDataKey), 
        [this.mapTypeLsKey]: mapType
      }
    );
  }

  /**
   * @property {Function} setCities Current cities list localstorage setter
   */
  setCities = (citiesList) => {
    LsService.set(
      this.lsDataKey, 
      {
        ...LsService.get(this.lsDataKey), 
        [this.citiesListLsKey]: citiesList
      }
    );
  }

  /**
   * @property {Function} setSettings Current settings localstorage setter
   */
  setSettings = (settings) => {
    LsService.set(
      this.lsDataKey, 
      {
        ...LsService.get(this.lsDataKey), 
        [this.settingsLsKey]: settings
      }
    );
  }

  /**
   * @property {Function} setCurrentCity Current city localstorage setter
   */
  setCurrentCity = (city) => {
    LsService.set(
      this.lsDataKey, 
      {
        ...LsService.get(this.lsDataKey), 
        [this.cityLsKey]: city
      }
    );
  }

  /**
   * @property {Function} setEventListeners setting event listeners when single city "page" is loaded
   */
  setEventListeners() {
    // Global events 
    window.addEventListener("map-search", (e) => {
      this.fetchCities(e.detail.title, e.detail.coordinates).then((cities) => {
        let shouldExit = false;

        // preventing unnecessary re-rendering & cities duplication
        this.getCities().forEach((city) => city.title === e.detail.title ? shouldExit = true : false);

        if (shouldExit) {
          return;
        }

        this.setCities(cities);
        this.setCurrentCity(cities[cities.length -1]);
        this.showCityInfo = true;

        this.create();
      })
    }, false, true)

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
    const citiesData = this.getCities();

    const currentCityIndex = citiesData.findIndex((city) => city.id === currentCity.id);

    // swiped left | 24 is for correct behavior (don't swipe on 1px change, for example)
    if (this.touchEndX + 24 < this.touchStartX) {
      if (currentCityIndex < citiesData.length - 1 && currentCityIndex >= 0) {
        this.setCurrentCity(citiesData[currentCityIndex + 1]);

        this.create();
      }
    }

    // swiped right | 24 is for correct behavior (don't swipe on 1px change, for example)
    if (this.touchEndX - 24 > this.touchStartX) {
      if (currentCityIndex > 0) {
        this.setCurrentCity(citiesData[currentCityIndex - 1]);

        this.create();
      }
    }
  }

  /**
   * @property {Function} createMapModalContentWrapper 
   */
  createMapModalContentWrapper() {
    const contentWrapper = document.createElement("div");
    
    contentWrapper.classList.add("modal-overlay");
    contentWrapper.classList.add("modal-overlay--select-api-source");

    return contentWrapper;
  }

  /**
   * @property {Function} closeMapModal 
   */
  closeMapModal() {
    document.getElementById(modalTypes.MAP).remove();
  }

  /**
   * @property {Function} createCloseMapModalBtn 
   */
  createCloseMapModalBtn() {
    const btn = document.createElement("button");

    btn.classList.add("close-modal-btn");
    btn.classList.add("close-map-modal-btn");
    btn.id = "mapCloseBtn";

    btn.innerHTML = `
      <i class="icon-cancel-squared"></i>
    `;

    btn.addEventListener("click", this.closeMapModal);

    return btn;
  }

  /**
   * @property {Function} createMapModalContainer 
   */
  createMapModalContainer(id) { 
    const container = document.createElement("div");

    container.classList.add("map-wrapper");

    container.innerHTML = `
      <div id=${id} class="map-element"></div>
    `;

    return container;
  }

  /**
   * @property {Function} createMap 
   */
  createMap = (id, cityName) => {
    this.mountModal(
      modalTypes.MAP,
      () => [
        this.createMapModalContentWrapper(),
        this.createCloseMapModalBtn(),
        this.createMapModalContainer(id)
      ]
    );
    
    this.mapService.setMapType(this.getMapType());
    this.mapService.createMap(id, cityName);
  }

  /**
   * @property {Function} clearRootElement emptying roolElement's content
   */
  clearRootElement = () => {
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
        this.settings.createContentWrapper(),
        this.settings.createSettings(
          this.getSettingsState(), 
          this.setOnSettingClick, 
          this.selectAPIHandle, 
          this.selectMapHandle,
          this.getWeatherAPIType(),
          this.getMapType()
        )
      ]
    );
    
    document.getElementById("settingsCloseBtn")?.addEventListener("click", () => {
      this.closeSettings();
    });
  }

  /**
   * @property {Function} selectHandle function triggered on weather api type select in settings modal
   */
  selectAPIHandle = (e) => {
    const selectField = e.target;
    const apiTypes = this.weatherAPIService.getApiTypes();
    const oldType = this.getWeatherAPIType();
    const newType = apiTypes[selectField.value];

    if (oldType.apiType === newType.apiType) {
      return;
    }

    this.updateCities(apiTypes[selectField.value]);
  }

  /**
   * @property {Function} selectMapHandle function triggered on map type select in settings modal
   */
  selectMapHandle = (e) => {
    const selectField = e.target;
    const mapTypes = this.mapService.getMapTypes();
    const oldType = this.getMapType();
    const newType = mapTypes[selectField.value];

    if (oldType.mapType === newType.mapType) {
      return;
    }

    this.setMapType(newType);
  }

  /**
   * method for fetching existent cities but with new selected api type 
   * @property {Function} updateCities 
   */
  updateCities = async (newAPIType) => {
    const oldCities = this.getCities();

    this.setWeatherAPIType(newAPIType);
    this.weatherAPIService.setApiType(newAPIType);
    this.setCities([]);
    this.setCurrentCity({});
    this.showCityInfo = false;

    oldCities.forEach(city => {
      this.fetchCity(city.title, [ city.lat, city.lon ])
        .then(fetchedCity => {
          this.setCities([...this.getCities(), fetchedCity])
          this.create();
        })
        .catch(() => {
          alert("Could not fetch city");
          this.setCities([]);
          this.showCityList();

          return;
        })
    })
  }

  /**
   * @property {Function} closeSettings Closing settings modal
   */
  closeSettings = () => {
    this.create();
  }

  /**
   * @property {Function} closeCityAddModal Closing add city modal
   */
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

  /**
   * @property {Function} fetchCities get a new city + all the old ones
   */
  fetchCities = async (cityName, coordinates) => {
    this.weatherAPIService.setApiType(this.getWeatherAPIType());

    const newCity = await this.fetchCity(cityName, coordinates);

    if (!newCity) {
      alert("Could not fetch city");
      this.setCities([]);
      this.showCityList();

      return;
    }

    if (!newCity) {
      return this.getCities();
    }

    return [...this.getCities(), newCity];
  }

  /**
   * @property {Function} fetchCity getting a new city from an api
   */
  fetchCity = async (cityName, coordinates) => {
    return await this.weatherAPIService.getForecast(cityName, coordinates);
  }

  /**
   * @property {Function} onSelectApiSourceClick function triggered when api type is being selected for the first time
   */
  onSelectApiSourceClick = (e) => {
    e.preventDefault();
    
    const selectField = e.target.elements["api-source-select"];
    const apiTypes = this.weatherAPIService.getApiTypes();

    this.setWeatherAPIType(apiTypes[selectField.value]);    
    this.create();
  }

  /**
   * @property {Function} addCityClickHandle handling adding a city
   */
  addCityClickHandle = (e) => {
    e.preventDefault();

    const selectedCity = document.getElementById("add-city-input").value;

    this.mapService.setMapType(this.getMapType().mapType);
    this.createMap(this.mapService.selectedMapType, selectedCity);
  }

  /**
   * @property {Function} onCloseSelectApiSource closing select api source modal
   */
  onCloseSelectApiSource = () => {
    if (!this.getWeatherAPIType()) {
      const apiTypes = this.weatherAPIService.getApiTypes();

      this.setWeatherAPIType(apiTypes["open-weather-map"]);    
      this.create();
    }
  }

  /**
   * @property {Function} create central app's point
   */
  create = () => {
    this.clearRootElement();

    this.createMap("yandex-map");

    // if (this.showCityInfo) {
    //   this.createNavigation();
    // }

    // // central "router"
    // switch (this.displayMode) {
    //   case "dashboard":
    //     this.dashBoard.create(
    //       this.getCities(),
    //       this.getCurrentCity(),
    //       this.onCityWidgetClick,
    //       this.getSettingsState,
    //       this.widgetsData,
    //       this.showCityInfo,
    //       this.mountModal,
    //       this.closeCityAddModal,
    //       this.smoothTransition,
    //       this.onSelectApiSourceClick,
    //       this.addCityClickHandle,
    //       this.getWeatherAPIType(),
    //       this.onCloseSelectApiSource,
    //       this.createMap,
    //       this.getMapType()
    //     ).forEach((element) => this.rootElement.appendChild(element));

    //     this.setEventListeners();

    //     break;
    //   default:
    //     break;
    // }

    // if (this.showCityInfo) {
    //   document.getElementById("city-list")?.remove();
    // }
  }
}
