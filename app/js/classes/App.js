import LsManager from "./LsManager";
import MOCK_CITIES from "../mocks/cities";

export default class App {
  widgetsData = {
    maxTemp: {
      id: 0,
      name: "max temp",
      value: 67,
      text: "min",
    },
    minTemp: {
      id: 1,
      name: "min temp",
      value: 40,
      text: "max",
    },
    feltTemp: {
      id: 2,
      name: "felt temp",
      value: 50,
    },
    uvIndicator: {
      id: 3,
      name: "uv indicator",
      value: 1,
      additional: "some optional text...",
      text: "low",
    },
    pressure: {
      id: 4,
      name: "pressure",
      value: 1040,
      text: "hPa",
    },
    airQuality: {
      id: 5,
      name: "air quality",
      value: "good air ;)",
    },
  };

  settingsData = {
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
    airQuality: {
      text: "Air quality",
      isActive: false,
    },
  };

  constructor(dashBoard, settings, rootElement) {
    this.dashBoard = dashBoard;
    this.settings = settings;
    this.rootElement = rootElement;
    this.lsManager = new LsManager();

    this.citiesData = this.getCities();

    // dashboard || something else
    this.displayMode = "dashboard";
    this.showCityInfo = false;
    this.setupLocalStorage();
  }

  setupLocalStorage = () => {
    this.settingsLcKey = "weather";
    this.citiesListLcKey = "cities";
    this.cityLcKey = "city";

    const lcSettings = this.lsManager.get(this.settingsLcKey);
    const lcCitiesList = this.lsManager.get(this.citiesListLcKey);
    const lcCity = this.lsManager.get(this.cityLcKey);

    if (lcSettings === null) {
      this.lsManager.init(this.settingsLcKey, this.settingsData);
    }

    if (lcCitiesList === null || !lcCitiesList.length) {
      this.lsManager.init(this.citiesListLcKey, MOCK_CITIES);
    }

    if (lcCity === null || !Object.keys(lcCity).length) {
      this.lsManager.init(this.cityLcKey, {});
    }
  };

  onCityWidgetClick = (city) => {
    this.setCurrentCity(city);
    this.showCityInfo = true;
    this.create();
  };

  toggleWidgetDisplay = (e) => {
    const key = e.target.id.split("-")[2];
    const newSettings = this.lsManager.get(this.settingsLcKey);
    const active = e.target.classList[1].split("-")[2];
    const isActive = active === "on" ? true : false;
    newSettings[key].isActive = !isActive;

    this.lsManager.set(this.settingsLcKey, newSettings);

    this.create();
    this.createSettings();
  };

  closeSettings = () => {
    this.closeSettings();
  };

  getSettingsState = () => {
    return this.lsManager.get(this.settingsLcKey);
  };

  setEventListeners() {
    if (!this.showCityInfo) {
      return;
    }

    document
      .getElementById("settingsToggleBtn")
      .addEventListener("click", this.showSettings);

    document
      .getElementById("showCitiesListBtn")
      .addEventListener("click", this.showCityList);

    document
      .getElementById("settingsToggleBtn")
      .addEventListener("click", this.createSettings);

    document
      .getElementById("cityCloseBtn")
      .addEventListener("click", this.showCityList);
  }

  clearRootElement() {
    this.rootElement.innerHTML = "";
  }

  getCities = () => {
    return this.lsManager.get(this.citiesListLcKey);
    // return [];
  };

  showCityList = () => {
    this.showCityInfo = false;
    this.create();
  };

  createNavigation() {
    const navigation = document.createElement("nav");
    navigation.classList.add("navigation");

    navigation.innerHTML = `
            <div class="navigation__settings" id="settingsToggleBtn">
                <i class="icon icon-figma-settings"></i>
            </div>
            <div class="navigation__pages">
                <i class="icon icon-dot navigation__circle navigation__circle--active"></i>
                <i class="icon icon-dot navigation__circle"></i>
                <i class="icon icon-dot navigation__circle"></i>
                <i class="icon icon-dot navigation__circle"></i>
            </div>
            <div class="navigation__cities">
                <a class="link" id="showCitiesListBtn">
                    <div class="navigation__cities-link-wrapper">
                        <i class="icon icon-figma-tiles navigation__smaller-icon"></i>
                    </div>
                </a>
            </div>
        `;

    this.rootElement.appendChild(navigation);
  }

  createSettings = () => {
    this.rootElement.appendChild(this.settings.createContentWrapper());

    this.settings
      .createSettings(this.lsManager.get(this.settingsLcKey))
      .forEach((setting) => {
        document.getElementById("settings-card").appendChild(setting);

        setting.childNodes[3].childNodes[1].addEventListener(
          "click",
          this.toggleWidgetDisplay
        );
      });

    document
      .getElementById("settings-overlay")
      .addEventListener("click", this.closeSettings);
  };

  setCurrentCity(city) {
    this.lsManager.set(this.cityLcKey, city);
  }

  getCurrentCity = () => {
    return this.lsManager.get(this.cityLcKey);
  };

  closeSettings = () => {
    this.create();
  };

  create() {
    this.clearRootElement();

    if (this.showCityInfo) {
      this.createNavigation();
    }

    switch (this.displayMode) {
      case "dashboard":
        this.dashBoard
          .create(
            this.onCityWidgetClick,
            this.getCities,
            this.getCurrentCity,
            this.getSettingsState,
            this.widgetsData,
            this.showCityInfo
          )
          .forEach((element) => this.rootElement.appendChild(element));

        this.setEventListeners();
        break;
      default:
        break;
    }

    if (this.showCityInfo) {
      document
        .querySelector(".city-list")
        .classList.toggle("city-list--hidden");
    }
  }
}
