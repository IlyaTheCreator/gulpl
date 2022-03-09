import cities from "cities.json";
import { v4 as uuid } from "uuid";
import simpleRound from "../helpers/simpleRound";

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

    getForecast(cityName, country, coordinates) {
        switch(this.selectedApiType.apiPath) {
            case this.apisData["open-weather-map"].apiPath:
                return this.openWeatherMapSearch(cityName, country, coordinates);
            case this.apisData["free-weather-api"].apiPath:
                return this.freeWeatherApiSearch(cityName, country, coordinates);
            default:
                break;
        }
    }

    async openWeatherMapSearch(cityName, country, coordinates) {
        try {
            let lat, lon;

            if (!coordinates) {
                lat = this.getCoordinates(cityName, country).lat;
                lon = this.getCoordinates(cityName, country).lon;
            } else {
                lat = coordinates.lat;
                lon = coordinates.lon;
            }

            const forecastData = await this.fetchData(
                this.apisData["open-weather-map"].apiPath, 
                [
                    { name: "lat", value: lat },
                    { name: "lon", value: lon },
                    { name: "appid", value: this.apisData["open-weather-map"].apiKey },
                    { name: "units", value: "metric" },
                ] 
            );

            return {
                id: uuid(),
                title: cityName,
                date: new Date(),
                lat: lat,
                lon: lon,
                cityImage: "assets/images/cloudy.png",
                currentTemp: simpleRound(forecastData.daily[0].temp.day),
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
        } catch (e) {
            console.log(e)
            return console.warn("could not fetch weather data");
        }
    }

    async freeWeatherApiSearch(cityName, country, coordinates) {
        try {
            let lat, lon;

            if (!coordinates) {
                lat = this.getCoordinates(cityName, country).lat;
                lon = this.getCoordinates(cityName, country).lon;
            } else {
                lat = coordinates.lat;
                lon = coordinates.lon;
            }

            const forecastData = await this.fetchData(
                this.apisData["free-weather-api"].apiPath, 
                [
                    { name: "q", value: `${lat},${lon}` },
                    { name: "key", value: this.apisData["free-weather-api"].apiKey },
                ] 
            );
    
            return {
                id: uuid(),
                title: cityName,
                date: new Date(),
                lat: lat,
                lon: lon,
                cityImage: "assets/images/cloudy.png",
                currentTemp: simpleRound(forecastData.current.temp_c),
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

    getCoordinates(cityName, country) {
        const city = cities.find((city) => {
            if (city.name === cityName && city.country === country) {
                return true;
            }
        });

        if (!city) {
            throw new Error();
        }

        console.log(city)

        return { lat: city.lat, lon: city.lng }
    }

    generateWidgetRelatedInfo(minTemp, maxTemp, feltTemp, uvIndicator, pressure, windSpeed) {
        return {
            minTemp: {
                name: "MIN TEMP",
                value: simpleRound(minTemp) + "°"
            },
            maxTemp: {
                name: "MAX TEMP",
                value: simpleRound(maxTemp) + "°"
            },
            feltTemp: {
                name: "FEELS LIKE",
                value: simpleRound(feltTemp) + "°"
            },
            uvIndicator: {
                name: "Uv Indicator",
                value: simpleRound(uvIndicator)
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