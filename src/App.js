import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Layout from "./components/Layout";
import ModalWindows from "./components/ModalWindows";
import Navigation from "./components/ui/Navigation";
import SelectedCity from "./components/SelectedCity";
import { hideCityInfo, openSelectAPISource } from "./store/ui";
import { openCityList } from "./store/ui";

const App = () => {
  const dispatch = useDispatch();

  const shouldDisplayCityInfo = useSelector(
    (state) => state.ui.shouldDisplayCityInfo
  );
  const citiesData = useSelector((state) => state.cities.citiesList);
  const weatherAPIType = useSelector((state) => state.apis.weather);

  useEffect(() => {
    if (citiesData.length === 0) {
      dispatch(hideCityInfo());

      if (!weatherAPIType.path || !weatherAPIType.type) {
        dispatch(openSelectAPISource());
      } else {
        dispatch(openCityList());
      }
    }
  }, [dispatch, weatherAPIType, citiesData]);

  return (
    <>
      <ModalWindows />
      <Layout>
        {shouldDisplayCityInfo && citiesData.length !== 0 && (
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
