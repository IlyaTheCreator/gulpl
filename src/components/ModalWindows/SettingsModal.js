import { useDispatch, useSelector } from "react-redux";

import Modal from "../ui/Modal";
import WidgetCardSettings from "../Settings/WidgetSettingsCard";
import SelectCard from "../Settings/SelectCard";
import CloseModalButton from "../ui/CloseModalButton";
import { setIsLoading } from "../../store/ui";
import { setWeather, setMap } from "../../store/apis";
import { settingsSelectInputsData } from "../../constants";
import { addCity, clearCities } from "../../store/cities";

import weatherAPIService from "../../services/weatherAPIService";
import mapService from "../../services/mapService";
import { appActionTypes } from "../../appStateManager";

const SettingsModal = ({ zIndex, appDispatch }) => {
  const dispatch = useDispatch();
  const citiesData = useSelector((state) => state.cities.citiesList);
  const weatherAPIType = useSelector((state) => state.apis.weather);
  const selectedMap = useSelector((state) => state.apis.map);

  const closeSettingsClickHandler = () => {
    appDispatch({ type: appActionTypes.CLOSE_SETTINGS });
  };

  const weatherSwitchHandler = (e) => {
    const weatherAPITypes = weatherAPIService.getApiTypes();
    const oldApiType = weatherAPIType;
    weatherAPIService.setApiType(weatherAPITypes[e.target.value]);

    if (
      oldApiType &&
      weatherAPIService.selectedApiType.apiType === oldApiType.type
    ) {
      return;
    }

    dispatch(
      setWeather({
        type: weatherAPIService.selectedApiType.apiType,
        path: weatherAPIService.selectedApiType.apiPath,
      })
    );

    // loader goes here
    dispatch(setIsLoading(true));

    Promise.all(
      citiesData.map((city) => {
        weatherAPIService
          .getForecast(city.title, [city.lat, city.lon])
          .then((data) => {
            if (data.error) {
              return;
            }

            dispatch(addCity(data));
          });
      })
    ).then(() => {
      dispatch(clearCities());
      appDispatch({ type: appActionTypes.CLOSE_SETTINGS });
      appDispatch({ type: appActionTypes.OPEN_CITY_LIST });
    });
  };

  const mapSwitchHandler = (e) => {
    const availableMapTypes = mapService.getMapTypes();
    const oldMapType = selectedMap;
    mapService.setMapType(availableMapTypes[e.target.value]);

    if (oldMapType && mapService.selectedMapType.apiType === oldMapType.type) {
      return;
    }

    dispatch(
      setMap({
        type: mapService.selectedMapType.mapType,
        path: mapService.selectedMapType.path,
      })
    );
  };

  const changeHandler = (e, type) => {
    switch (type) {
      case "weather":
        weatherSwitchHandler(e);
        break;
      case "map":
        mapSwitchHandler(e);
        break;
      default:
        return;
    }
  };

  const cards = settingsSelectInputsData.map((select) => (
    <SelectCard
      key={select.title}
      title={select.title}
      options={select.options}
      initialValue={
        select.type === "weather" ? weatherAPIType.type : selectedMap.type
      }
      onChange={changeHandler}
      type={select.type}
    />
  ));

  return (
    <Modal
      zIndex={zIndex}
      hasOverlay
      overlayClassName="modal-overlay--settings"
    >
      <div className="settings-modal-wrapper">
        <WidgetCardSettings appDispatch={appDispatch} />
        {cards}
        <CloseModalButton
          className="close-settings-modal-btn"
          text="close"
          onClick={closeSettingsClickHandler}
        />
      </div>
    </Modal>
  );
};

export default SettingsModal;
