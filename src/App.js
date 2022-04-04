import { useEffect } from "react"
import { useSelector } from "react-redux";

import LsService from "./services/lsService";

import Layout from "./components/Layout";
import ModalWindows from "./components/ModalWindows";
import Navigation from "./components/Navigation";
import SelectedCity from "./components/SelectedCity";

// import { mapTypes } from "./constants";
// import weatherAPIService from "./services/weatherAPIService";
// import mapService from "./services/mapService";

const appLsKey = "weather-2.0.0"

const App = () => {
  const state = useSelector((state) => state);
  const shouldDisplayCityInfo = useSelector(
    (state) => state.ui.shouldDisplayCityInfo
  );

  const setupLocalStorage = () => {
    const lsDataCheck = LsService.get(appLsKey)

    if (!lsDataCheck) {
      LsService.set(appLsKey, state)
    }
  }

  useEffect(() => {
    setupLocalStorage();
  }, [])


  // const weatherAPITypes = weatherAPIService.getApiTypes();
  // weatherAPIService.setApiType(weatherAPITypes[apiTypes.FREE_WEATHER_API]);

  // weatherAPIService
  //   .getForecast("Moscow", [55.751244, 37.618423])
  //   .then((cityData) => console.log(cityData));

  // const availableMapTypes = mapService.getMapTypes();
  // mapService.setMapType(availableMapTypes[mapTypes.YANDEX]);

  // mapService.createMap("root")

  return (
    <>
      <ModalWindows />
      <Layout>
        {shouldDisplayCityInfo && (
          <>
            <Navigation />
            <SelectedCity />
          </>
        )}
      </Layout>
    </>
  );
};

export default App;
