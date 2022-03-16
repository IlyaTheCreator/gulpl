
 import ymaps from 'ymaps';
 import mapboxgl from 'mapbox-gl'
 import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

 import { mapTypes } from "../constants";

/**
 * @namespace services
 */

/**
 * Class for working with different maps
 * @memberof services
 */
export default class MapService {
    constructor() {
        this.selectedMapType = null;
    }

    /**
     * @property {Function} mapsData returns available map types
     */
    static #mapsData() {
        return {
            "yandex-map": {
                secretKey: "079377f5-7ba4-4ffa-aa07-682636080af0",
                path: "https://api-maps.yandex.ru/2.1",
                mapType: mapTypes.YANDEX,
            },
            "open-street-map": {
                secretKey: "pk.eyJ1IjoiaWx5YXRoZXN1bmZsb3dlciIsImEiOiJjbDBxcmpwNGwwMGVhM2NyejQ2OXQ0aGc4In0.eSAushmUDuWDAqcbUEswtA",
                path: "mapbox://styles/ilyathesunflower/cl0qt3t5x004d15s8ss6q38ui",
                mapType: mapTypes.OPEN_STREET_MAP,
            }
        }
    }

    /**
     * Main map creation method
     * @property {Function} createMap
     * @param {number} id  
     */
    createMap(id) {
        switch(this.selectedMapType.mapType) {
            case mapTypes.YANDEX:
                this.createYandexMap(id);
                break;
            case mapTypes.OPEN_STREET_MAP:
                this.createOpenStreetMap(id);
                break;
            default:
                break;
        }
    }

    /**
     * @property {Function} createYandexMap
     * @param {number} id  
     */
    createYandexMap(id) {
        const yandexMapData = MapService.#mapsData()["yandex-map"];

        ymaps
        .load(`${yandexMapData.path}/?apikey=${yandexMapData.secretKey}&lang=en_US`)
        .then(maps => {
          new maps.Map(id, {
            center: [55.76, 37.64],
            zoom: 7,
            controls: ["zoomControl", "searchControl", "fullscreenControl"]
          });
        })
    }

    /**
     * @property {Function} createOpenStreetMap
     * @param {number} id  
     */
    createOpenStreetMap(id) {
        const openStreetMapData = MapService.#mapsData()["open-street-map"];

        mapboxgl.accessToken = openStreetMapData.secretKey;

        const map = new mapboxgl.Map({
          container: id,
          style: openStreetMapData.path,
        });

        const geocoder = new MapboxGeocoder({
          accessToken: openStreetMapData.secretKey,
          mapboxgl: mapboxgl,
          marker: false
        });

        map.addControl(geocoder);
        map.addControl(new mapboxgl.NavigationControl());
        map.addControl(new mapboxgl.GeolocateControl());
        map.addControl(new mapboxgl.FullscreenControl());
    }

    /**
     * @property {Function} getMapTypes
     */
    getMapTypes() {
        return MapService.#mapsData();
    }

    /**
     * @property {Function} setMapType
     */
    setMapType(mapType) {
        this.selectedMapType = mapType;
    }
}