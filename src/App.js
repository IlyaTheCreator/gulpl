import { useSelector } from "react-redux";

import Layout from "./components/Layout";
import ModalWindows from "./components/ModalWindows";

const App = () => {
  const shouldDisplayCityInfo = useSelector(
    (state) => state.ui.shouldDisplayCityInfo
  );

  return (
    <>
      <ModalWindows />
      <Layout>
        {shouldDisplayCityInfo && (
          <div className="temporary-content">
            <h1>hello</h1>
            <p>let's rock</p>
          </div>
        )}
      </Layout>
    </>
  );
};

export default App;
