export default class City {
    constructor() {
        this.app = null;
    }

    createCityList() {
        this.app.citiesData.forEach((city) => {
            const content = `
                <a class="link" href="#">
                    <h3 class="screen__title">
                        <div className="screen__city-title-group">
                            <span class="screen__city-name">${city.title}</span>
                            <p class="screen__city-time">${city.date.toDateString()}</p>
                        </div>
                        <span class="screen__city-temperature">${city.currentTemp}°</span>
                    </h3>
                    <div class="screen__city-info">
                        <span class="screen__city-weather-condition">${city.weatherCondition}</span>
                        <span class="screen__city-temperature-range">Max. ${city.maxTemp.value} Min. ${city.minTemp.value}</span>
                    </div>
                </a>
            `;

            const onClick = () => {
                this.app.setCurrentCity(city.id);
                this.app.cityDisplayMode = 'city';
                this.app.create()
            };

            const cityWidget = this.app.createWidget(content, "list", onClick, ["screen__city"]);
            this.app.rootElement.appendChild(cityWidget);
        });
    }

    createCitySingle() {
        const city = this.app.getCurrentCity();
        const navigation = this.app.createNavigation();
        const contentWrapper = document.createElement("div");
        const cityInfoGrid = document.createElement("div");

        cityInfoGrid.classList.add("city-info-grid");

        contentWrapper.innerHTML = `
            <h1 class="screen__header">${city.title}</h1>
            <p class="screen__date">${city.date.toDateString()}</p>
            <div class="screen__weather">
                <img src="${city.cityImage}" alt="weather image" class="screen__image">
                <p class="screen__temperature">${city.currentTemp}°</p>
                <p class="screen__weather-type">${city.weatherCondition}</p>
            </div>
        `;

        const cityDataWidgets = Object.keys(this.app.lsManager.get(this.app.lcKey)).map((key) => {
            const cityData = this.app.getCurrentCity();

            const content = `
                <p class="city-info-grid__widget-description">${cityData[key].name}</p>
                <div class="city-info-grid__content-wrapper city-info-grid__content-wrapper--margin-bottom">
                    <p class="city-info-grid__widget-number">${cityData[key].value}</p>
                    ${cityData[key].text ? `<p class="city-info-grid__widget-data">${cityData[key].text}</p>` : ""}
                    ${cityData[key].additional ? `<p class="city-info-grid__widget-additional">${cityData[key].additional}</p>` : ""}
                </div>
            `;

            if (this.app.lsManager.get(this.app.lcKey)[key].isActive) {
                return this.app.createWidget(content, "city");
            }

            return;
        });

        cityDataWidgets.forEach((widget) => {
            if (widget !== undefined) {
                widget.classList.add("city-info-grid__grid-item");
                cityInfoGrid.appendChild(widget);
            }
        });

        contentWrapper.appendChild(cityInfoGrid);

        this.app.rootElement.appendChild(navigation);
        this.app.rootElement.appendChild(contentWrapper);
        
        document.getElementById("settingsToggleBtn").addEventListener("click", this.app.showSettings);
        document.getElementById("showCitiesListBtn").addEventListener("click", this.app.showCityList);
    }
};