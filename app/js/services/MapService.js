import ymaps from "ymaps";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

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
      },
    };
  }

  /**
   * @property {Function} mapsData returns map apis' keys
   */
  static #mapsKeys() {
    return {
      "yandex-map": "079377f5-7ba4-4ffa-aa07-682636080af0",
      "open-street-map":
        "pk.eyJ1IjoiaWx5YXRoZXN1bmZsb3dlciIsImEiOiJjbDBxcmpwNGwwMGVhM2NyejQ2OXQ0aGc4In0.eSAushmUDuWDAqcbUEswtA",
    };
  }

  /**
   * Main map creation method
   * @property {Function} createMap
   * @param {number} id
   */
  createMap(id, cityName) {
    switch (this.selectedMapType.mapType) {
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
          title,
        },
        bubbles: true,
        cancelable: true,
        composed: false,
      });

      window.dispatchEvent(mapSearchEvent);
    };

    ymaps
      .load(`${yandexMapData.path}/?apikey=${key}&lang=en_US`)
      .then((maps) => {
        let isFullScreen;

        if (window.innerWidth <= 768) {
          isFullScreen = true;
        }

        const myMap = new maps.Map(id, {
          center: [55.76, 37.64],
          zoom: 7,
          controls: ["zoomControl"],
        });

        const fullscreenControl = new maps.control.FullscreenControl({
          options: {
            position: {
              top: 70,
              right: 10,
            },
          },
        });

        const searchControl = new maps.control.SearchControl({
          options: {
            provider: "yandex#search",
            size: "large",
            float: "left",
            maxWidth: "large",
          },
        });

        let mapClicked = false;

        searchControl.events.add("submit", (e) => {
          if (!window.addCityBtnClicked) {
            return;
          }

          const resultData = e.originalEvent.target.state._data;

          const intervalId = setInterval(() => {
            if (resultData.isLoaded) {
              // preventing infinite loop in case of invalid input
              if (resultData.results.length === 0) {
                clearInterval(intervalId);
              }

              const coordinates = resultData.results[0].geometry._coordinates;
              const title = resultData.results[0].properties._data.name;

              exitMap(title, coordinates);

              if (isFullScreen) {
                document.querySelector("ymaps").remove();
              }

              clearInterval(intervalId);
            }
          }, 100);
        });

        const saveBtn = new maps.control.Button({
          data: { title: "Save" },
          options: {
            layout: maps.templateLayoutFactory.createClass(`
                            <div class="yandex-save-button map-save-btn">{{ data.title }}</div>
                        `),
          },
        });

        const closeBtn = new maps.control.Button({
          data: { title: "Close" },
          options: {
            layout: maps.templateLayoutFactory.createClass(`
                            <div class="yandex-close-button map-close-btn">{{ data.title }}</div>
                        `),
          },
        });

        saveBtn.events.add("click", () => {
          const result = searchControl.getResult(0);

          result.then((res) => {
            if (mapClicked) {
              maps.geocode(myMap.getCenter()).then((innerRes) => {
                const closestObject = innerRes.geoObjects.get(0);

                exitMap(
                  res.properties._data.name,
                  closestObject.geometry._coordinates
                );
              });
            } else {
              exitMap(res.properties._data.name, res.geometry._coordinates);
            }

            if (isFullScreen) {
              document.querySelector("ymaps").remove();
            }
          });
        });

        closeBtn.events.add("click", () => {
          if (isFullScreen) {
            document.querySelector("ymaps").remove();
          }

          exitMap();
        });

        myMap.events.add("click", (e) => {
          const coords = e.get("coords");
          myMap.center = coords;
          mapClicked = true;

          if (!myMap.balloon.isOpen()) {
            myMap.balloon.open(coords, {
              contentHeader: "Place selected",
              contentBody:
                "<p>Click save button to get weather <br> from this location</p>",
            });
          } else {
            myMap.balloon.close();
          }
        });

        myMap.container.events.add(
          "fullscreenenter",
          () => (isFullScreen = true)
        );

        myMap.controls.add(searchControl);
        myMap.controls.add(saveBtn, {
          float: "right",
          position: {
            right: 80,
            bottom: 50,
          },
        });
        myMap.controls.add(closeBtn, {
          float: "right",
          position: {
            right: 10,
            bottom: 50,
          },
        });

        // go fullscreen on mobile
        if (window.innerWidth <= 768) {
          myMap.container.enterFullscreen();
        } else {
          myMap.controls.add(fullscreenControl);
        }

        if (cityName) {
          searchControl.search(cityName);
        }
      });
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
    const mapOverlayButtonsContainer = document.createElement("div");
    const mapSaveBtn = document.createElement("button");
    const mapCloseBtn = document.createElement("button");

    mapOverlayButtonsContainer.classList.add("open-street-map-buttons-wrapper");
    mapSaveBtn.classList.add("open-street-map-save-btn");
    mapSaveBtn.classList.add("map-save-btn");
    mapCloseBtn.classList.add("map-close-btn");
    mapCloseBtn.classList.add("open-street-map-close-btn");
    mapSaveBtn.innerText = "Save";
    mapCloseBtn.innerText = "Close";

    mapSaveBtn.addEventListener("click", () => {
      if (!geocoder.lastSelected) {
        return;
      }

      const city = JSON.parse(geocoder.lastSelected);

      const mapSearchEvent = new CustomEvent("map-search", {
        detail: {
          coordinates: [map.getCenter().lng, map.getCenter().lat],
          title: city.text,
        },
        bubbles: true,
        cancelable: true,
        composed: false,
      });

      window.dispatchEvent(mapSearchEvent);
    });

    mapCloseBtn.addEventListener("click", () => {
      const mapSearchEvent = new CustomEvent("map-search", {
        detail: {},
        bubbles: true,
        cancelable: true,
        composed: false,
      });

      window.dispatchEvent(mapSearchEvent);
    });

    mapOverlayButtonsContainer.appendChild(mapSaveBtn);
    mapOverlayButtonsContainer.appendChild(mapCloseBtn);

    mapContainer.appendChild(mapOverlayButtonsContainer);

    map.on("click", (e) => {
      const coordinates = [e.lngLat.lng, e.lngLat.lat];

      new mapboxgl.Popup({ closeOnClick: true })
        .setLngLat(coordinates)
        .setHTML(
          `
                    <div class="mapbox-popup">
                        <h1>Place selected</h1>
                        <p>Click save button to get weather <br> from this location</p>
                    </div>
                `
        )
        .addTo(map);

      map.setCenter(coordinates);
    });

    map.on("render", () => {
      // go fullscreen on mobile
      if (window.innerWidth <= 768) {
        const mapContainer = map.getContainer();

        mapContainer.classList.add("fullscreen-map");
      } else {
        map.addControl(new mapboxgl.FullscreenControl());
      }
    });

    geocoder.on("result", () => {
      const city = JSON.parse(geocoder.lastSelected);

      if (!window.addCityBtnClicked) {
        return;
      }

      const mapSearchEvent = new CustomEvent("map-search", {
        detail: {
          coordinates: [map.getCenter().lng, map.getCenter().lat],
          title: city.text,
        },
        bubbles: true,
        cancelable: true,
        composed: false,
      });

      window.dispatchEvent(mapSearchEvent);
    });

    map.addControl(geocoder);
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.GeolocateControl());

    if (cityName) {
      geocoder.setInput(cityName);

      if (window.addCityBtnClicked) {
        geocoder.query(cityName);
      }
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
