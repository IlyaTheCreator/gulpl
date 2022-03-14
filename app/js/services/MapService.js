/**
 * @namespace services
 */

import { mapTypes } from "../constants";

/**
 * Class for working with different maps
 * @memberof services
 */
export default class MapService {
    constructor() {
        this.selectedMapType = null;
    }

    static #mapsData() {
        return {
            "yandex": {
                secretKey: "079377f5-7ba4-4ffa-aa07-682636080af0",
                apiPath: "https://api.openweathermap.org/data/2.5/onecall",
                mapType: mapTypes.YANDEX,
            },
            "free-weather-api": {
                secretKey: "c4256c0653c74259adb84822220203",
                apiPath: "https://api.weatherapi.com/v1/forecast.json",
                mapType: mapTypes.OPEN_STREET_MAP,
            }
        }
    }
}