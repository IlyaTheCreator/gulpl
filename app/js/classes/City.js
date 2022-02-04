import Widget from "./Widget";

export default class City {
  createContentWrapper(city) {
    const contentWrapper = document.createElement("div");

    contentWrapper.innerHTML = `
            <h1 class="screen__header">${city.title}</h1>
            <p class="screen__date">${city.date.toDateString()}</p>
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

    cityDataWidgets.forEach((widget) => {
      widget.classList.add("city-info-grid__grid-item");
      cityInfoGrid.appendChild(widget);
    });

    contentWrapper.appendChild(cityInfoGrid);

    return contentWrapper;
  }
}
