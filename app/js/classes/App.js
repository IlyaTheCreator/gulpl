import LsManager from "./LsManager";
import Widget from "./Widget";

export default class App {
  MOCK_CITIES = [
    {
      id: 2,
      title: "Escondido",
      date: new Date(),
      cityImage: "assets/images/cloudy.png",
      currentTemp: 49,
      weatherCondition: "cloudy",
      maxTemp: {
        name: "MAX TEMP",
        value: "67°",
      },
      minTemp: {
        name: "MIN TEMP",
        value: "40°",
      },
      feltTemp: {
        name: "FEELS LIKE",
        value: "14°",
      },
      uvIndicator: {
        value: 1,
        name: "Uv Indicator",
        additional: "Low level during all the day.",
        text: "Low",
      },
      pressure: {
        name: "PRESSURE",
        value: "1040 hPa",
      },
      airQuality: {
        name: "Air quality",
        value: "Air quality text",
      },
    },
    {
      id: 3,
      title: "Zaporozhie",
      date: new Date(),
      cityImage: "assets/images/cloudy.png",
      currentTemp: 49,
      weatherCondition: "cloudy",
      maxTemp: {
        name: "MAX TEMP",
        value: "67°",
      },
      minTemp: {
        name: "MIN TEMP",
        value: "40°",
      },
      feltTemp: {
        name: "FEELS LIKE",
        value: "14°",
      },
      uvIndicator: {
        value: 1,
        name: "Uv Indicator",
        additional: "Low level during all the day.",
        text: "Low",
      },
      pressure: {
        name: "PRESSURE",
        value: "1040 hPa",
      },
      airQuality: {
        name: "Air quality",
        value: "Air quality text",
      },
    },
  ];

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

  constructor(city, cityList, settings, rootElement) {
    this.city = city;
    this.cityList = cityList;
    this.settings = settings;
    this.rootElement = rootElement;
    this.lsManager = new LsManager();

    this.citiesData = this.getCities();

    // list || city
    this.cityDisplayMode = "list";
    this.currentCityId = 2;
    this.lcKey = "weather";

    if (!this.lsManager.get(this.lcKey)) {
      this.lsManager.init(this.lcKey, this.settingsData);
    }
  }

  onCityWidgetClick = (cityId) => {
    this.setCurrentCity(cityId);
    this.cityDisplayMode = "city";

    this.create();
  };

  create() {
    this.clearRootElement();

    if (this.cityDisplayMode === "list") {
      this.cityList
        .createCityList(this.getCities(), this.onCityWidgetClick)
        .forEach((city) => {
          this.rootElement.appendChild(city);
        });
    }

    if (this.cityDisplayMode === "city") {
      this.city.createCity(this.widgetsData, this.getCurrentCity());
    }
  }

  clearRootElement() {
    this.rootElement.innerHTML = "";
  }

  createWidget(content, type, onClick, classes) {
    return Widget.create(content, type, onClick, classes);
  }

  getCities() {
    return this.MOCK_CITIES;
  }

  showCityList = () => {
    this.cityDisplayMode = "list";
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

    return navigation;
  }

  setCurrentCity(id) {
    this.currentCityId = id;
  }

  getCurrentCity = () => {
    return this.citiesData.find((city) => city.id == this.currentCityId);
  };

  closeSettings = () => {
    this.create();
  };

  showSettings = () => {
    this.settings.create();
  };
}

