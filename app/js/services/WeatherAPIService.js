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

    getForecast(cityName, country) {
        switch(this.selectedApiType.apiPath) {
            case this.apisData["open-weather-map"].apiPath:
                return this.openWeatherMapSearch(cityName, country);
            case this.apisData["free-weather-api"].apiPath:
                return this.freeWeatherApiSearch(cityName, country);
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
                widgetRelatedInfo: this.generateWidgetRelatedInfo(
                    forecastData.daily[0].temp.min,
                    forecastData.daily[0].temp.max,
                    forecastData.hourly[0].feels_like,
                    forecastData.daily[0].uvi,
                    forecastData.hourly[0].pressure,
                    forecastData.hourly[0].wind_speed
                ),
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
                widgetRelatedInfo: this.generateWidgetRelatedInfo(
                    forecastData.forecast.forecastday[0].day.mintemp_c,
                    forecastData.forecast.forecastday[0].day.maxtemp_c,
                    forecastData.current.feelslike_c,
                    forecastData.forecast.forecastday[0].day.uv,
                    forecastData.current.pressure_mb,
                    forecastData.current.wind_kph
                ),
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

    generateWidgetRelatedInfo(minTemp, maxTemp, feltTemp, uvIndicator, pressure, windSpeed) {
        return {
            minTemp: {
                name: "MIN TEMP",
                value: minTemp + "°"
            },
            maxTemp: {
                name: "MAX TEMP",
                value: maxTemp + "°"
            },
            feltTemp: {
                name: "FEELS LIKE",
                value: feltTemp + "°"
            },
            uvIndicator: {
                name: "Uv Indicator",
                value: uvIndicator
            },
            pressure: {
                name: "PRESSURE",
                value: pressure + " hPa",
            },
            windSpeed: {
                name: "WIND SPEED",
                value: windSpeed + " kph"
            } // instead of air quality
        }
    }

    getApiTypes() {
        return this.apisData;
    }

    setApiType(apiType) {
        this.selectedApiType = apiType;
    }
}