/**
 * @namespace services
 */

/**
 * Class for searching weather with different apis by dates 
 * @memberof services
 */
export default class WeatherAPIService {
    constructor() {
        this.selectedApiType = null;

        this.testLatitude = 55.7558;
        this.testLongitude = 37.6173;

        this.apisData = {
            "open-weather-map": {
                apiKey: "cf33b9e5a1e26909a3ca013250b1a78c",
                apiPath: "http://api.openweathermap.org/data/2.5/onecall"
            },
            "free-weather-api": {
                apiKey: "c4256c0653c74259adb84822220203",
                apiPath: "http://api.weatherapi.com/v1/forecast.json"
            }
        }
    }

    async getForecast() {
        switch(this.selectedApiType) {
            case "yandex-weather":
                return await this.yandexSearch();
            case "open-weather-map":
                return await this.openWeatherMapSearch();
            case "free-weather-api":
                return await this.freeWeatherApiSearch();
            default:
                break;
        }
    }

    async openWeatherMapSearch() {
        try {
            const forecastData = await this.fetchData(
                this.apisData["open-weather-map"].apiPath, 
                [
                    { name: "lat", value: this.testLatitude },
                    { name: "lon", value: this.testLongitude },
                    { name: "appid", value: this.apisData["open-weather-map"].apiKey },
                    { name: "units", value: "metric" },
                    { name: "lang", value: "ru"}
                ] 
            );
    
            return {
                temp: forecastData.daily[0].temp.day,
                description: forecastData.daily[0].weather[0].description,
                minTemp: forecastData.daily[0].temp.min,
                maxtemp: forecastData.daily[0].temp.max,
                feelsLike: forecastData.hourly[0].feels_like,
                uvIndicator: forecastData.daily[0].uvi,
                pressure: forecastData.hourly[0].pressure,
                wind_speed: forecastData.hourly[0].wind_speed // instead of air quality
            };
        } catch {
            return console.warn("could not fetch weather data");
        }
    }

    async freeWeatherApiSearch() {
        try {
            const forecastData = await this.fetchData(
                this.apisData["free-weather-api"].apiPath, 
                [
                    { name: "q", value: "Moscow" },
                    { name: "key", value: this.apisData["free-weather-api"].apiKey },
                    { name: "lang", value: "ru"}
                ] 
            );
    
            return {
                temp: forecastData.current.temp_c,
                description: forecastData.forecast.forecastday[0].day.condition.text,
                minTemp: forecastData.forecast.forecastday[0].day.mintemp_c,
                maxtemp: forecastData.forecast.forecastday[0].day.maxtemp_c,
                feelsLike: forecastData.current.feelslike_c,
                uvIndicator: forecastData.forecast.forecastday[0].day.uv,
                pressure: forecastData.current.pressure_mb,
                wind_speed: forecastData.current.wind_kph // instead of air quality
            };
        } catch {
            return console.warn("could not fetch weather data");
        }
    }

    async fetchData(url, params, headers = {}) {
        let urlParams = "?";

        params.forEach((param, index) => {
            urlParams += `${param.name}=${param.value}`

            if (index !== params.length - 1) {
                urlParams += "&";
            }
        });

        const res = await fetch(url + urlParams, { headers: new Headers(headers) });

        return await res.json();
    }

    getApiTypes() {
        return this.apiTypes;
    }

    setApiType(apiType) {
        this.selectedApiType = apiType;
    }
}