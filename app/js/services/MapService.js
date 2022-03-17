
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
        /**
         * @property {string} selectedMapType
         */
        this.selectedMapType = null;
    }

    /**
     * @property {Function} mapsData returns available map types
     */
    static #mapsData() {
        return {
            "yandex-map": {
                path: "https://api-maps.yandex.ru/2.1",
                mapType: mapTypes.YANDEX,
            },
            "open-street-map": {
                path: "mapbox://styles/ilyathesunflower/cl0qt3t5x004d15s8ss6q38ui",
                mapType: mapTypes.OPEN_STREET_MAP,
            }
        }
    }

    /**
     * @property {Function} mapsData returns map apis' keys
     */
    static #mapsKeys() {
        return {
            "yandex-map": "079377f5-7ba4-4ffa-aa07-682636080af0",
            "open-street-map": "pk.eyJ1IjoiaWx5YXRoZXN1bmZsb3dlciIsImEiOiJjbDBxcmpwNGwwMGVhM2NyejQ2OXQ0aGc4In0.eSAushmUDuWDAqcbUEswtA",
        }
    }

    /**
     * Main map creation method
     * @property {Function} createMap
     * @param {number} id  
     */
    createMap(id, cityName) {
        switch(this.selectedMapType.mapType) {
            case mapTypes.YANDEX:
                this.createYandexMap(id, cityName);
                break;
            case mapTypes.OPEN_STREET_MAP:
                this.createOpenStreetMap(id, cityName);
                break;
            default:
                break;
        }
    }

    /**
     * @property {Function} createYandexMap
     * @param {number} id
     * @param {string} cityName  
     */
    createYandexMap(id, cityName) {
        const yandexMapData = MapService.#mapsData()["yandex-map"];
        const key = MapService.#mapsKeys()["yandex-map"];

        const exitMap = (title, coordinates) => {
            const mapSearchEvent = new CustomEvent("map-search", {
                detail: {
                    coordinates,
                    title
                },
                bubbles: true,
                cancelable: true,
                composed: false
            });

            window.dispatchEvent(mapSearchEvent);
            mapClicked = false;
        }

        ymaps
            .load(`${yandexMapData.path}/?apikey=${key}&lang=en_US`)
            .then(maps => {
                const myMap = new maps.Map(id, {
                  center: [55.76, 37.64],
                  zoom: 7,
                  controls: ["zoomControl", "fullscreenControl"]
                });

                const searchControl = new maps.control.SearchControl({
                    options: {
                        provider: "yandex#search",
                        size: "large",
                        float: "left"
                    }
                });

                let mapClicked = false;

                const btn = new maps.control.Button("Save");

                btn.events.add("click", () => {
                    const result = searchControl.getResult(0);

                    result.then((res) => {
                        if (mapClicked) {
                            maps.geocode(myMap.getCenter())
                                .then((innerRes) => {
                                    const closestObject = innerRes.geoObjects.get(0);

                                    exitMap(res.properties._data.name, closestObject.geometry._coordinates);
                                });
                        } else {
                            exitMap(res.properties._data.name, res.geometry._coordinates);
                        }
                    });
                });

                myMap.events.add("click", (e) => {
                    const coords = e.get("coords");
                    myMap.center = coords;
                    mapClicked = true;

                    if (!myMap.balloon.isOpen()) {
                        myMap.balloon.open(coords, {
                            contentHeader: "Place selected",
                            contentBody: "<p>Click save button to get weather <br> from this location</p>"
                        })
                    } else {
                        myMap.balloon.close();
                    }
                });

                myMap.controls.add(searchControl);
                myMap.controls.add(btn, {
                    float: "right",
                    position: {
                        right: 10,
                        bottom: 50
                    }
                });

                if (cityName) {
                    searchControl.search(cityName);
                }
            })
    }

    /**
     * @property {Function} createOpenStreetMap
     * @param {number} id
     * @param {string} cityName  
     */
    createOpenStreetMap(id, cityName) {
        const openStreetMapData = MapService.#mapsData()["open-street-map"];
        const key = MapService.#mapsKeys()["open-street-map"];

        mapboxgl.accessToken = key;

        const map = new mapboxgl.Map({
          container: id,
          style: openStreetMapData.path,
        });

        const geocoder = new MapboxGeocoder({
          accessToken: key,
          mapboxgl: mapboxgl,
          marker: false,
        });

        const mapContainer = document.getElementById(id);
        const mapOverlayBtn = document.createElement("button");

        mapOverlayBtn.classList.add("open-street-map-overlay-btn");
        mapOverlayBtn.innerText = "Save";

        mapOverlayBtn.addEventListener("click", () => {
            if (!geocoder.lastSelected) {
                return;
            }

            const city = JSON.parse(geocoder.lastSelected);

            console.log(city)
            console.log(map.getCenter())

            const mapSearchEvent = new CustomEvent("map-search", {
                detail: {
                    coordinates: [map.getCenter().lng, map.getCenter().lat],
                    title: city.text
                },
                bubbles: true,
                cancelable: true,
                composed: false
            });

            window.dispatchEvent(mapSearchEvent)
        })
        
        mapContainer.insertAdjacentElement("afterend", mapOverlayBtn);

        map.on("click", (e) => {
            const coordinates = [e.lngLat.lng, e.lngLat.lat];

            new mapboxgl.Popup({ closeOnClick: true })
                .setLngLat(coordinates)
                .setHTML(`
                    <div class="mapbox-popup">
                        <h1>Place selected</h1>
                        <p>Click save button to get weather <br> from this location</p>
                    </div>
                `)
                .addTo(map);

            map.setCenter(coordinates);
        });

        map.addControl(geocoder);
        map.addControl(new mapboxgl.NavigationControl());
        map.addControl(new mapboxgl.GeolocateControl());
        map.addControl(new mapboxgl.FullscreenControl());

        if (cityName) {
            geocoder.setInput(cityName);
        }
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