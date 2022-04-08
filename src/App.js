import { useState, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";

import { reducer, initialState, appActionTypes } from "./appStateManager";

import Layout from "./components/Layout";
import ModalWindows from "./components/ModalWindows";
import Navigation from "./components/ui/Navigation";
import CitiesSwiper from "./components/CitiesSwiper";

import LsService from "./services/lsService";
import { appVersion } from "./constants";

const App = () => {
  const citiesData = useSelector((state) => state.cities.citiesList);
  const weatherAPIType = useSelector((state) => state.apis.weather);
  const [modalsState, dispatch] = useReducer(reducer, initialState);

  const lsCheck = LsService.get(appVersion);

  const [selectedCityId, setSelectedCityId] = useState(
    lsCheck ? lsCheck.cities.selectedCityId : null
  );

  useEffect(() => {
    if (citiesData.length === 0) {
      if (!weatherAPIType.path || !weatherAPIType.type) {
        dispatch({ type: appActionTypes.OPEN_SELECT_API_SOURCE });
        return;
      }

      dispatch({ type: appActionTypes.OPEN_CITY_LIST });
    }
  }, [dispatch, weatherAPIType, citiesData]);

  const updateSelectedCityId = (id) => {
    const lsData = LsService.get(appVersion);

    LsService.set(appVersion, {
      ...lsData,
      cities: {
        ...lsData.cities,
        selectedCityId: id,
      },
    });
    setSelectedCityId(id);
  };

  return (
    <>
      <ModalWindows
        setSelectedCityId={updateSelectedCityId}
        modalsState={modalsState}
        appDispatch={dispatch}
      />
      <Layout>
        {citiesData.length !== 0 && (
          <>
            <Navigation appDispatch={dispatch} />
            <CitiesSwiper
              selectedCityId={selectedCityId}
              setSelectedCityId={updateSelectedCityId}
            />
          </>
        )}
      </Layout>
    </>
  );
};

export default App;
