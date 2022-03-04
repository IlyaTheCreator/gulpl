import cities from "cities.json";
import { v4 as uuid } from "uuid";

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

        this.lat = 0;
        this.lon = 0;

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

    async openWeatherMapSearch(cityName, country) {
        try {
            this.setCoordinates(cityName, country);

            const forecastData = await this.fetchData(
                this.apisData["open-weather-map"].apiPath, 
                [
                    { name: "lat", value: this.lat },
                    { name: "lon", value: this.lon },
                    { name: "appid", value: this.apisData["open-weather-map"].apiKey },
                    { name: "units", value: "metric" },
                ] 
            );

            return {
                id: uuid(),
                title: cityName,
                date: new Date(),
                cityImage: "assets/images/cloudy.png",
                currentTemp: forecastData.daily[0].temp.day,
                weatherCondition: forecastData.daily[0].weather[0].description,
                widgetRelatedInfo: {
                    minTemp: {
                        name: "MIN TEMP",
                        value: forecastData.daily[0].temp.min + "°"
                    },
                    maxTemp: {
                        name: "MAX TEMP",
                        value: forecastData.daily[0].temp.max + "°"
                    },
                    feltTemp: {
                        name: "FEELS LIKE",
                        value: forecastData.hourly[0].feels_like + "°"
                    },
                    uvIndicator: {
                        value: forecastData.daily[0].uvi,
                        name: "Uv Indicator",
                    },
                    pressure: {
                        name: "PRESSURE",
                        value: forecastData.hourly[0].pressure + " hPa"
                    },
                    windSpeed: {
                        name: "WIND SPEED",
                        value: forecastData.hourly[0].wind_speed + " kph"
                    } // instead of air quality
                }
            };
        } catch {
            return console.warn("could not fetch weather data");
        }
    }

    async freeWeatherApiSearch(cityName, country) {
        try {
            this.setCoordinates(cityName, country);

            const forecastData = await this.fetchData(
                this.apisData["free-weather-api"].apiPath, 
                [
                    { name: "q", value: `${this.lat},${this.lon}` },
                    { name: "key", value: this.apisData["free-weather-api"].apiKey },
                ] 
            );
    
            return {
                id: uuid(),
                title: cityName,
                date: new Date(),
                cityImage: "assets/images/cloudy.png",
                currentTemp: forecastData.current.temp_c,
                weatherCondition: forecastData.forecast.forecastday[0].day.condition.text,
                widgetRelatedInfo: {
                    minTemp: {
                        name: "MIN TEMP",
                        value: forecastData.forecast.forecastday[0].day.mintemp_c + "°"
                    },
                    maxTemp: {
                        name: "MAX TEMP",
                        value: forecastData.forecast.forecastday[0].day.maxtemp_c + "°"
                    },
                    feltTemp: {
                        name: "FEELS LIKE",
                        value: forecastData.current.feelslike_c + "°"
                    },
                    uvIndicator: {
                        value: forecastData.forecast.forecastday[0].day.uv,
                        name: "Uv Indicator",
                        isUv: true
                    },
                    pressure: {
                        name: "PRESSURE",
                        value: forecastData.current.pressure_mb + " hPa"
                    },
                    windSpeed: {
                        name: "WIND SPEED",
                        value: forecastData.current.wind_kph + " kph"
                    } // instead of air quality
                }
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

    setCoordinates(cityName, country) {
        const city = cities.find((city) => {
            if (city.name === cityName && city.country === country) {
                return true;
            }
        });

        if (!city) {
            throw new Error();
        }

        this.lat = city.lat;
        this.lon = city.lng;
    }

    getApiTypes() {
        return this.apiTypes;
    }

    setApiType(apiType) {
        this.selectedApiType = apiType;
    }
}