import addWrapperClass from "../wrapperClassScript";
import City from "./City";
import Settings from "./Settings";
import App from "./App";

const AppModule =  (function() {
    return {
        init() {
            const rootElement = document.getElementById("app");
            const city = new City();
            const settings = new Settings();

            new App(city, settings, rootElement).create();

            addWrapperClass();
        }
    }
})();

export default AppModule;