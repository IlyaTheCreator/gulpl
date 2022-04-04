import { useEffect } from "react";
import Modal from "./Modal";

import { mapTypes } from "../../constants";
import mapService from "../../services/mapService";

const mapContainerId = "yandex-map";

const MapModal = () => {
  const initMap = () => {
    const availableMapTypes = mapService.getMapTypes();
    mapService.setMapType(availableMapTypes[mapTypes.YANDEX]);

    mapService.createMap(mapContainerId);
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <Modal
      hasOverlay={true}
      overlayClassName="modal-overlay--select-api-source"
    >
      <div className="map-wrapper">
        <div id={mapContainerId} className="map-element" />
      </div>
    </Modal>
  );
};

export default MapModal;
