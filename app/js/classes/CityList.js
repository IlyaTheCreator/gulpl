import Widget from "./Widget";

export default class CityList {
  createContent(city) {
    return `
                <a class="link" href="#">
                    <h3 class="screen__title">
                        <div className="screen__city-title-group">
                            <span class="screen__city-name">${city.title}</span>
                            <p class="screen__city-time">${city.date.toDateString()}</p>
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
        onCityWidgetClick(city.id);
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
}
