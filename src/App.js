import { useSelector } from "react-redux";

import Layout from "./components/Layout";
import ModalWindows from "./components/ModalWindows";
import Navigation from "./components/Navigation";
import SelectedCity from "./components/SelectedCity";

const App = () => {
  const shouldDisplayCityInfo = useSelector(
    (state) => state.ui.shouldDisplayCityInfo
  );

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
