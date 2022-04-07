import { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";

import { reducer, initialState } from "./appStateManager";

import Layout from "./components/Layout";
import ModalWindows from "./components/ModalWindows";
import Navigation from "./components/ui/Navigation";
import CitiesSwiper from "./components/CitiesSwiper";

const App = () => {
  const citiesData = useSelector((state) => state.cities.citiesList);
  const weatherAPIType = useSelector((state) => state.apis.weather);

  const [modalsState, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (citiesData.length === 0) {
      if (!weatherAPIType.path || !weatherAPIType.type) {
        dispatch({ type: "open-select-api-source" });
        return;
      }

      dispatch({ type: "open-city-list" });
    }
  }, [dispatch, weatherAPIType, citiesData]);

  return (
    <>
      <ModalWindows modalsState={modalsState} appDispatch={dispatch} />
      <Layout>
        {citiesData.length !== 0 && (
          <>
            <Navigation appDispatch={dispatch} />
            <CitiesSwiper />
          </>
        )}
      </Layout>
    </>
  );
};

export default App;
