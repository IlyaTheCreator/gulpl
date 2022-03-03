import AppModule from "./modules/AppModule";
import WeatherAPIService from "./services/WeatherAPIService";

// testing 
const weatherAPIService = new WeatherAPIService();

const testOpenWeather = async () => {
    const result = await weatherAPIService.openWeatherMapSearch();

    console.log(result);
}

const testFreeWeather = async () => {
    const result = await weatherAPIService.freeWeatherApiSearch();

    console.log(result);
}

testOpenWeather();
testFreeWeather();

document.addEventListener("DOMContentLoaded", AppModule.init());