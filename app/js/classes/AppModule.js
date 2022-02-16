import addWrapperClass from "../wrapperClassScript";
import Settings from "./Settings";
import DashBoard from "./DashBoard";
import App from "./App";

/**
 * @namespace entities
 */

/**
 * App module
 * @memberof entities
 */
const AppModule = (function() {
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
