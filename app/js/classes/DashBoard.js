import Widget from "./Widget";

export default class DashBoard {
  createContentWrapper(city) {
    const contentWrapper = document.createElement("div");

    contentWrapper.innerHTML = `
            <h1 class="screen__header">${city.title}</h1>
            <p class="screen__date">${new Date(city.date).toDateString()}</p>
            <div class="screen__weather">
                <img src="${
                  city.cityImage
                }" alt="weather image" class="screen__image">
                <p class="screen__temperature">${city.currentTemp}°</p>
                <p class="screen__weather-type">${city.weatherCondition}</p>
            </div>
        `;

    return contentWrapper;
  }

  createCityInfoGrid() {
    const cityInfoGrid = document.createElement("div");

    cityInfoGrid.classList.add("city-info-grid");

    return cityInfoGrid;
  }

  createCityWidgetContent(cityData, key) {
    return `
                <p class="city-info-grid__widget-description">${
                  cityData[key].name
                }</p>
                <div class="city-info-grid__content-wrapper city-info-grid__content-wrapper--margin-bottom">
                    <p class="city-info-grid__widget-number">${
                      cityData[key].value
                    }</p>
                    ${
                      cityData[key].text
                        ? `<p class="city-info-grid__widget-data">${cityData[key].text}</p>`
                        : ""
                    }
                    ${
                      cityData[key].additional
                        ? `<p class="city-info-grid__widget-additional">${cityData[key].additional}</p>`
                        : ""
                    }
                </div>
            `;
  }

  createCity(citiesData, currentCity) {
    const contentWrapper = this.createContentWrapper(currentCity);
    const cityInfoGrid = this.createCityInfoGrid();
    const cityDataWidgets = Object.keys(citiesData).map((key) => {
      const content = this.createCityWidgetContent(currentCity, key);

      return Widget.create(content, "city");
    });

    contentWrapper.classList.add("city-info-modal");

    cityDataWidgets.forEach((widget) => {
      widget.classList.add("city-info-grid__grid-item");
      cityInfoGrid.appendChild(widget);
    });

    contentWrapper.appendChild(cityInfoGrid);

    return contentWrapper;
  }

  createContent(city) {
    return `
                <a class="link" href="#">
                    <h3 class="screen__title">
                        <div className="screen__city-title-group">
                            <span class="screen__city-name">${city.title}</span>
                            <p class="screen__city-time">${new Date(
                              city.date
                            ).toDateString()}</p>
                        </div>
                        <span class="screen__city-temperature">${
                          city.currentTemp
                        }°</span>
                    </h3>
                    <div class="screen__city-info">
                        <span class="screen__city-weather-condition">${
                          city.weatherCondition
                        }</span>
                        <span class="screen__city-temperature-range">Max. ${
                          city.maxTemp.value
                        } Min. ${city.minTemp.value}</span>
                    </div>
                </a>
            `;
  }

  createCityList(cities, onCityWidgetClick) {
    return cities.map((city) => {
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
  }

  generateCityList() {
    const list = this.createCityList(this.getCities(), this.onCityWidgetClick);
    const listWrapper = document.createElement("div");

    listWrapper.classList.add("city-list");

    list.forEach((item) => listWrapper.appendChild(item));

    return listWrapper;
  }

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

  generateDashBoard() {
    const output = [];

    const cityList = this.generateCityList(
      this.getCities(),
      this.onCityWidgetClick
    );

    if (this.showCityInfo) {
      output.push(this.generateCityInfo());
    }

    output.push(cityList);

    return output;
  }

  create(
    onCityWidgetClick,
    getCities,
    getCurrentCity,
    getSettingsState,
    widgetsData,
    showCityInfo
  ) {
    this.onCityWidgetClick = onCityWidgetClick;
    this.getCities = getCities;
    this.getCurrentCity = getCurrentCity;
    this.getSettingsState = getSettingsState;
    this.widgetsData = widgetsData;
    this.showCityInfo = showCityInfo;

    return this.generateDashBoard();
  }
}
