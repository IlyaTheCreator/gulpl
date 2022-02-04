import addWrapperClass from "../wrapperClassScript";
import City from "./City";
import CityList from "./CityList";
import Settings from "./Settings";
import App from "./App";

const AppModule = (function () {
  return {
    init() {
      new App(
        new City(),
        new CityList(),
        new Settings(),
        document.getElementById("app")
      ).create();

      addWrapperClass();
    },
  };
})();

export default AppModule;

