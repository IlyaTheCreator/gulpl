import { useEffect } from "react";
import { useSelector } from "react-redux";
import Modal from "./Modal";

import mapService from "../../services/mapService";

const mapContainerId = "yandex-map";

const MapModal = () => {
  const mapType = useSelector((state) => state.apis.map);

  const initMap = () => {
    mapService.setMapType({
      path: mapType.path,
      mapType: mapType.type
    });

    // dispatch(setMap({
    //   path: mapService.selectedMapType.path,
    //   type: mapService.selectedMapType.mapType
    // }));

    mapService.createMap(mapContainerId);
  };

  useEffect(() => {
    initMap();
  }, [initMap]);

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
