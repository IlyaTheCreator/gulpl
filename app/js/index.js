import AppModule from "./modules/AppModule";
import cities from "cities.json";

// console.log(cities.find(city => city.name === "Moscow" && city.country === "RU"))

// import WeatherAPIService from "./services/WeatherAPIService";

// testing 
// const weatherAPIService = new WeatherAPIService();

// const testOpenWeather = async () => {
//     const result = await weatherAPIService.openWeatherMapSearch();

//     console.log(result);
// }

// const testFreeWeather = async () => {
//     const result = await weatherAPIService.freeWeatherApiSearch();

//     console.log(result);
// }

// testOpenWeather();
// testFreeWeather();

document.addEventListener("DOMContentLoaded", AppModule.init());