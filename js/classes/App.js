"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cities = _interopRequireDefault(require("../mocks/cities"));

var _widgetsData = _interopRequireDefault(require("../mocks/widgetsData"));

var _settingsData = _interopRequireDefault(require("../mocks/settingsData"));

var _constants = require("../constants");

var _ModalService = _interopRequireDefault(require("../services/ModalService"));

var _LsService = _interopRequireDefault(require("../services/LsService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @namespace entities
 */

/**
 * Class representing entire application. Central manager of the app.
 * @memberof entities
 */
var App = /*#__PURE__*/function () {
  /**
   * @param {Object} dashBoard  DashBoard instance
   * @param {Object} settings Settings instance
   * @param {Object} modalService modalService instance
   * @param {HTMLBodyElement} rootElement DOM element to attach the app to
   */
  function App(dashBoard, settings, rootElement) {
    var _this = this;

    _classCallCheck(this, App);

    _defineProperty(this, "setupLocalStorage", function () {
      _this.settingsLcKey = "weather";
      _this.citiesListLcKey = "cities";
      _this.cityLcKey = "city";

      var lcSettings = _this.getSettingsState();

      var lcCitiesList = _this.getCities();

      var lcCity = _this.getCurrentCity(); // Inital launching checks


      if (lcSettings === null) {
        _LsService["default"].set(_this.settingsLcKey, _this.settingsData);
      }

      if (lcCitiesList === null || !lcCitiesList.length) {
        _LsService["default"].set(_this.citiesListLcKey, _cities["default"]);
      }

      if (lcCity === null || !Object.keys(lcCity).length) {
        _LsService["default"].set(_this.cityLcKey, {});

        _this.showCityList();
      }
    });

    _defineProperty(this, "mountModal", function (modalType, modalContentCreateMethod) {
      var classes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var id = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : modalType;

      _this.rootElement.appendChild(_this.modalService.createModal(modalType, modalContentCreateMethod, classes, id));
    });

    _defineProperty(this, "onCityWidgetClick", function (city) {
      _this.setCurrentCity(city);

      _this.showCityInfo = true;

      _this.create();
    });

    _defineProperty(this, "toggleWidgetDisplay", function (_ref) {
      var _ref$target = _ref.target,
          id = _ref$target.id,
          classList = _ref$target.classList;

      // check if there's an id
      if (!id.trim()) {
        _this.create();
      } // check if there's a '-' sign in the id


      if (!id.search("-")) {
        _this.create();
      } // check if there's a class


      if (!classList[1]) {
        _this.create();
      } // check if there's a '-' sign in the class


      if (!classList[1].split("-")) {
        _this.create();
      } // check if there's a division of the class


      if (!classList[1].split("-")[2]) {
        _this.create();
      }

      var key = id.split("-")[2];

      var newSettings = _LsService["default"].get(_this.settingsLcKey);

      var active = classList[1].split("-")[2];
      var isActive = active === "on";
      newSettings[key].isActive = !isActive;

      _LsService["default"].set(_this.settingsLcKey, newSettings);

      _this.createSettings();
    });

    _defineProperty(this, "getSettingsState", function () {
      return _LsService["default"].get(_this.settingsLcKey);
    });

    _defineProperty(this, "getCities", function () {
      return _LsService["default"].get(_this.citiesListLcKey); // return []
    });

    _defineProperty(this, "getCurrentCity", function () {
      return _LsService["default"].get(_this.cityLcKey);
    });

    _defineProperty(this, "showCityList", function () {
      _this.showCityInfo = false;

      _this.create();
    });

    _defineProperty(this, "smoothTransition", function () {
      _this.rootElement.classList.add("change-animate");
    });

    _defineProperty(this, "createSettings", function () {
      var _document$getElementB;

      _this.mountModal(_constants.modalTypes.SETTINGS, function () {
        return [_this.settings.createCloseSettingsBtn(_this.closeSettings), _this.settings.createContentWrapper(_this.closeSettings), _this.settings.createSettings(_this.getSettingsState(), _this.setOnSettingClick)];
      });

      (_document$getElementB = document.getElementById("settingsCloseBtn")) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.addEventListener("click", function () {
        console.log("chel");

        _this.closeSettings();
      });
    });

    _defineProperty(this, "closeSettings", function () {
      _this.create();
    });

    _defineProperty(this, "closeCityAddModal", function () {
      _this.create();

      _this.showCityInfo = false;
    });

    _defineProperty(this, "setOnSettingClick", function (settingNode) {
      settingNode.childNodes[3].childNodes[1].addEventListener("click", _this.toggleWidgetDisplay);
    });

    _defineProperty(this, "closeCityList", function () {
      _this.showCityInfo = true;

      _this.create();
    });

    _defineProperty(this, "create", function () {
      _this.clearRootElement();

      if (_this.showCityInfo) {
        _this.createNavigation();
      } // central "router"


      switch (_this.displayMode) {
        case "dashboard":
          _this.dashBoard.create(_this.getCities(), _this.getCurrentCity(), _this.onCityWidgetClick, _this.getSettingsState, _this.widgetsData, _this.showCityInfo, _this.mountModal, _this.closeCityAddModal, _this.smoothTransition).forEach(function (element) {
            return _this.rootElement.appendChild(element);
          });

          _this.setEventListeners();

          break;

        default:
          break;
      }

      if (_this.showCityInfo) {
        var _document$getElementB2;

        (_document$getElementB2 = document.getElementById("city-list")) === null || _document$getElementB2 === void 0 ? void 0 : _document$getElementB2.remove();
      }
    });

    /**
     * @property {Object} dashBoard  DashBoard instance
     */
    this.dashBoard = dashBoard;
    /**
     * @property {Object} settings Settings instance
     */

    this.settings = settings;
    /**
     * @property {Object} settings ModalService instance
     */

    this.modalService = new _ModalService["default"]();
    /**
     * @property {HTMLBodyElement} rootElement DOM element to attach the app to
     */

    this.rootElement = rootElement;
    /**
     * @property {Object} citiesData weather information
     */

    this.citiesData = [];
    /**
     * @property {Object} widgetsData Property for holding and managing individual widgets on single city page.
     */

    this.widgetsData = _widgetsData["default"];
    /**
     * Property for holding and managing city settings on single city page.
     * (notice how keys are matched with the widgetsData object above)
     * @property {Object} settingsData
     */

    this.settingsData = _settingsData["default"];
    /**
     * "dashboard" || something else
     * @property {string} displayMode defines what "page" to display (kind of SPA)
     */

    this.displayMode = "dashboard";
    /**
     * @property {boolean} showCityInfo defines whether to display single city "page" or not
     */

    this.showCityInfo = true;
    /**
     * @property {string} settingsLcKey localstorage key for keeping settings data
     */

    this.settingsLcKey = "";
    /**
     * @property {string} citiesListLcKey localstorage key for keeping cities' weather list data
     */

    this.citiesListLcKey = "";
    /**
     * @property {string} cityLcKey localstorage key for keeping individual city's data
     */

    this.cityLcKey = "";
    /**
     * @property {number} touchStartX property for swiping
     */

    this.touchStartX = 0;
    /**
     * @property {number} touchEndX property for swiping
     */

    this.touchEndX = 0;
    this.setupLocalStorage();
  }
  /**
   * @property {Function} setupLocalStorage initial localstorage setup
   */


  _createClass(App, [{
    key: "setCurrentCity",
    value:
    /**
     * @property {Function} setCurrentCity Current city localstorage setter
     * @param {Object} city city to set
     */
    function setCurrentCity(city) {
      _LsService["default"].set(this.cityLcKey, city);
    }
    /**
     * @property {Function} setEventListeners setting event listeners when single city "page" is loaded
     */

  }, {
    key: "setEventListeners",
    value: function setEventListeners() {
      var _this2 = this,
          _document$getElementB5,
          _document$getElementB6;

      // for smooth transitioning between "pages"
      this.rootElement.addEventListener("webkitAnimationEnd", function () {
        _this2.rootElement.classList.remove("change-animate");
      }, false);

      if (!this.showCityInfo) {
        var _document$getElementB3, _document$getElementB4;

        (_document$getElementB3 = document.getElementById("cityListCloseBtn")) === null || _document$getElementB3 === void 0 ? void 0 : _document$getElementB3.addEventListener("click", this.closeCityList);
        (_document$getElementB4 = document.getElementById("addCityBtn")) === null || _document$getElementB4 === void 0 ? void 0 : _document$getElementB4.addEventListener("click", function () {
          return _this2.dashBoard.generateAddCityModal();
        });
        return;
      }

      var cityInfo = document.getElementById("city-info");
      (_document$getElementB5 = document.getElementById("showCitiesListBtn")) === null || _document$getElementB5 === void 0 ? void 0 : _document$getElementB5.addEventListener("click", this.showCityList);
      (_document$getElementB6 = document.getElementById("settingsOpenBtn")) === null || _document$getElementB6 === void 0 ? void 0 : _document$getElementB6.addEventListener("click", this.createSettings);
      cityInfo.addEventListener('touchstart', function (e) {
        _this2.touchStartX = e.changedTouches[0].screenX;
      });
      cityInfo.addEventListener('touchend', function (e) {
        _this2.touchEndX = e.changedTouches[0].screenX;

        _this2.handleGesture();
      });
    }
    /**
     * @property {Function} handleGesture swipe realization
     */

  }, {
    key: "handleGesture",
    value: function handleGesture() {
      var currentCity = this.getCurrentCity();
      this.citiesData = this.getCities();
      var currentCityIndex = this.citiesData.findIndex(function (city) {
        return city.id === currentCity.id;
      }); // swiped left | 100 is for correct behavior (don't swipe on 1px change, for example)

      if (this.touchEndX + 24 < this.touchStartX) {
        if (currentCityIndex < this.citiesData.length - 1 && currentCityIndex >= 0) {
          this.setCurrentCity(this.citiesData[currentCityIndex + 1]);
          this.create();
        }
      } // swiped right | 100 is for correct behavior (don't swipe on 1px change, for example)


      if (this.touchEndX - 24 > this.touchStartX) {
        if (currentCityIndex > 0) {
          this.setCurrentCity(this.citiesData[currentCityIndex - 1]);
          this.create();
        }
      }
    }
    /**
     * @property {Function} clearRootElement emptying roolElement's content
     */

  }, {
    key: "clearRootElement",
    value: function clearRootElement() {
      this.rootElement.innerHTML = "";
    }
    /**
     * @property {Function} showCityList displaying cities list "page"
     */

  }, {
    key: "createNavigation",
    value:
    /**
     * @property {Function} createNavigation creating navigation element
     */
    function createNavigation() {
      var navigation = document.createElement("nav");
      navigation.classList.add("navigation");
      navigation.innerHTML = "\n      <div class=\"navigation__settings\" id=\"settingsOpenBtn\">\n          <i class=\"icon icon-figma-settings\"></i>\n      </div>\n      <div class=\"navigation__pages\" id=\"nav-circles\"></div>\n      <div class=\"navigation__cities\">\n          <a class=\"link\" id=\"showCitiesListBtn\">\n              <div class=\"navigation__cities-link-wrapper\">\n                  <i class=\"icon icon-figma-tiles navigation__smaller-icon\"></i>\n              </div>\n          </a>\n      </div>\n    ";
      this.rootElement.appendChild(navigation);
      this.createNavCircles();
    }
    /**
     * @property {Function} createNavCircles
     */

  }, {
    key: "createNavCircles",
    value: function createNavCircles() {
      var _this3 = this;

      var circlesWrapper = document.getElementById("nav-circles");
      this.getCities().forEach(function (city) {
        var circle = document.createElement("i");
        circle.classList.add("icon");
        circle.classList.add("icon-dot");
        circle.classList.add("navigation__circle");

        if (city.id === _this3.getCurrentCity().id) {
          circle.classList.add("navigation__circle--active");
        }

        circle.addEventListener("click", function () {
          // check to avoid unnecessary re-rendering
          if (city.id !== _this3.getCurrentCity().id) {
            _this3.setCurrentCity(city);

            _this3.create();
          }
        });
        circlesWrapper.appendChild(circle);
      });
      return circlesWrapper;
    }
    /**
     * @property {Function} createSettings creating settings element
     */

  }]);

  return App;
}();

exports["default"] = App;