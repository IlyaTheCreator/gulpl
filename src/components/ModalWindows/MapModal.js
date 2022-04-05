import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../ui/Modal";
import { hideAddCity, hideCityList, hideMap, showCityInfo } from "../../store/ui";
import { addCity, selectCity } from "../../store/cities";
import mapService from "../../services/mapService";
import weatherAPIService from "../../services/weatherAPIService";

const mapContainerId = "yandex-map";

const MapModal = () => {
  const dispatch = useDispatch();
  const mapType = useSelector((state) => state.apis.map);
  const weatherAPIType = useSelector((state) => state.apis.weather);
  const cityQuery = useSelector((state) => state.cities.cityQuery);

  const initMap = useCallback(() => {
    mapService.setMapType({
      path: mapType.path,
      mapType: mapType.type,
    });

    mapService.createMap(mapContainerId, cityQuery);
  }, [mapType, cityQuery]);

  const mapSearchListener = useCallback(
    (e) => {
      if (!e.detail.title || !e.detail.coordinates) {
        dispatch(hideMap());
        return;
      }

      weatherAPIService.setApiType({
        apiPath: weatherAPIType.path,
        apiType: weatherAPIType.type,
      });

      weatherAPIService
        .getForecast(e.detail.title, e.detail.coordinates)
        .then((data) => {
          dispatch(addCity(data));
          dispatch(selectCity(data));
          dispatch(hideMap());
          dispatch(hideAddCity());
          dispatch(hideCityList());
          dispatch(showCityInfo());
        });
    },
    [weatherAPIType, dispatch]
  );

  useEffect(() => {
    initMap();
    window.addEventListener("map-search", mapSearchListener);

    return () => {
      window.removeEventListener("map-search", mapSearchListener);
      window.addCityBtnClicked = false;
    };
  }, [initMap, mapSearchListener]);

  return (
    <Modal
      hasOverlay={true}
      overlayClassName="modal-overlay--select-api-source"
      modalClassName="map-modal"
    >
      <div className="map-wrapper">
        <div id={mapContainerId} className="map-element" />
      </div>
    </Modal>
  );
};

export default MapModal;
