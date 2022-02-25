import addWrapperClass from "../wrapperClassScript";
import Settings from "../classes/Settings";
import DashBoard from "../classes/DashBoard";
import ModalService from "../services/ModalService";
import App from "../classes/App";

/**
 * @namespace modules
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
        new ModalService(),
        document.getElementById("app")
      ).create();

      addWrapperClass();
    },
  };
})();

export default AppModule;
