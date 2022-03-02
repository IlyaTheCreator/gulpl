/**
 * @namespace services
 */

/**
 * Class for searching weather with different apis by dates 
 * @memberof services
 */
export default class WeatherAPIService {
    constructor() {
        this.#apiTypes = apiTypes;
        this.selectedApiType = null;

        this.apisData = {
            "yandex-weather": {
                apiKey: "b7132815-d46e-4085-8e9c-1e549b2c8b2b",
                apiPath: "https://api.weather.yandex.ru/v2/forecast"
            },
            "open-weather-map": {
                apiKey: "cf33b9e5a1e26909a3ca013250b1a78c",
                apiPath: "http://api.openweathermap.org/data/2.5/weather"
            },
            "free-weather-api": {
                apiKey: "c4256c0653c74259adb84822220203",
                apiPath: "http://api.weatherapi.com/v1/history.json"
            }
        }
    }

    // прогноз на определенный день / history apis. У яндекса такого нет.

    getForecast(date) {
        switch(this.selectedApiType) {
            case "yandex-weather":
                return this.yandexSearch();
            case "open-weather-map":
                return this.openWeatherMapSearch(date);
            case "free-weather-api":
                return this.freeWeatherApiSearch(date);
            default:
                break;
        }
    }

    /**
     * available query params: 
     * lat=<широта>
     * lon=<долгота>
     * [lang=<язык ответа>]
     * [limit=<срок прогноза>]
     * [hours=<наличие почасового прогноза>]
     * [extra=<подробный прогноз осадков>]
     * 
     */
    yandexSearch() {
        // url, params, headers

        return this.fetchWeatherData(url, params, headers);
    }

    openWeatherMapSearch(date) {
        // url, params, headers

        return this.fetchWeatherData(
            this.apisData["open-weather-map"], 
            [
                { name: "lat", value: 9999 }
            ], 
            headers
        );
    }

    freeWeatherApiSearch(date) {

    }

    getApiTypes() {
        return this.apiTypes;
    }

    setApiType(apiType) {
        this.selectedApiType = apiType;
    }
}