import addWrapperClass from "../wrapperClassScript";
import Settings from "./Settings";
import DashBoard from "./DashBoard";
import App from "./App";

const AppModule = (function () {
  return {
    init() {
      new App(
        new DashBoard(),
        new Settings(),
        document.getElementById("app")
      ).create();

      addWrapperClass();
    },
  };
})();

export default AppModule;
