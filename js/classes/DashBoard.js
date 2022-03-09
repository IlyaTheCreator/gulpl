"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = require("../constants");

var _Widget = _interopRequireDefault(require("./Widget"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
 * @namespace entities
 */

/**
 * DashBoard class - manager for cities list and single city
 * @memberof entities
 */
var DashBoard = /*#__PURE__*/function () {
  function DashBoard() {
    _classCallCheck(this, DashBoard);
  }

  _createClass(DashBoard, [{
    key: "createContentWrapper",
    value:
    /**
     * @property {Function} createContentWrapper creating markup/styles wrapper for displayed city
     * @param {*} city current city to be displayed
     * @returns {Object}
     */
    function createContentWrapper(city) {
      var contentWrapper = document.createElement("div");
      contentWrapper.innerHTML = "\n      <h1 class=\"screen__header\">".concat(city.title, "</h1>\n      <p class=\"screen__date\">").concat(new Date(city.date).toDateString(), "</p>\n      <div class=\"screen__weather\">\n          <img src=\"").concat(city.cityImage, "\" alt=\"weather image\" class=\"screen__image\">\n          <p class=\"screen__temperature\">").concat(city.currentTemp, "\xB0</p>\n          <p class=\"screen__weather-type\">").concat(city.weatherCondition, "</p>\n      </div>\n    ");
      return contentWrapper;
    }
    /**
     * @property {Function} createCloseCityBtn creating btn for closing current city
     * @returns {Object}
     */

  }, {
    key: "createCloseCityListBtn",
    value: function createCloseCityListBtn() {
      var btn = document.createElement("button");
      btn.classList.add("close-modal-btn");
      btn.classList.add("close-city-list-btn");
      btn.id = "cityListCloseBtn";
      btn.innerHTML = "\n      <i class=\"icon-cancel-squared\"></i>\n    ";
      return btn;
    }
    /**
     * @property {Function} createCityInfoGrid creating wrapper for city's widgets
     * @returns {Object}
     */

  }, {
    key: "createCityInfoGrid",
    value: function createCityInfoGrid() {
      var cityInfoGrid = document.createElement("div");
      cityInfoGrid.classList.add("city-info-grid");
      return cityInfoGrid;
    }
    /**
     * @property {Function} createCityWidgetContent creating innerHTMl of a city widget
     * @returns {string}
     */

  }, {
    key: "createCityWidgetContent",
    value: function createCityWidgetContent(cityData, key) {
      return "\n      <p class=\"city-info-grid__widget-description\">".concat(cityData[key].name, "</p>\n      <div class=\"city-info-grid__content-wrapper city-info-grid__content-wrapper--margin-bottom\">\n          <p class=\"city-info-grid__widget-number\">").concat(cityData[key].value, "</p>\n          ").concat(cityData[key].text ? "<p class=\"city-info-grid__widget-data\">".concat(cityData[key].text, "</p>") : "", "\n          ").concat(cityData[key].additional ? "<p class=\"city-info-grid__widget-additional\">".concat(cityData[key].additional, "</p>") : "", "\n      </div>\n     ");
    }
    /**
     * @property {Function} createCity creating current city page
     * @param {Object} citiesData current cities data
     * @param {Object} currentCity current city data
     * @returns {Object}
     */

  }, {
    key: "createCity",
    value: function createCity(citiesData, currentCity) {
      var _this = this;

      var contentWrapper = this.createContentWrapper(currentCity);
      var cityInfoGrid = this.createCityInfoGrid();
      Object.keys(citiesData).forEach(function (key) {
        var content = _this.createCityWidgetContent(currentCity, key);

        var widget = _Widget["default"].create(content, _constants.widgetTypes.CITY, ["city-info-grid__grid-item"]);

        cityInfoGrid.appendChild(widget);
      });
      contentWrapper.id = "city-info";
      contentWrapper.classList.add("city-info");
      contentWrapper.appendChild(cityInfoGrid);
      return contentWrapper;
    }
    /**
     * @property {Function} createContent creating initial content innerHTML for city page
     * @param {Object} city current city
     * @returns {string}
     */

  }, {
    key: "createContent",
    value: function createContent(city) {
      return "\n      <a class=\"link\" href=\"#\">\n        <h3 class=\"screen__title\">\n          <div className=\"screen__city-title-group\">\n            <span class=\"screen__city-name\">".concat(city.title, "</span>\n            <p class=\"screen__city-time\">").concat(new Date(city.date).toDateString(), "</p>\n          </div>\n          <span class=\"screen__city-temperature\">").concat(city.currentTemp, "\xB0</span>\n        </h3>\n        <div class=\"screen__city-info\">\n          <span class=\"screen__city-weather-condition\">").concat(city.weatherCondition, "</span>\n          <span class=\"screen__city-temperature-range\">Max. ").concat(city.maxTemp.value, " Min. ").concat(city.minTemp.value, "</span>\n        </div>\n      </a>\n    ");
    }
    /**
     * @property {Function} createCityList creating city list page
     * @param {Object} cities current cities data
     * @param {Function} onCityWidgetClick Individual city widget's onClick handler
     * @returns {Array<Object>}
     */

  }, {
    key: "createCityList",
    value: function createCityList(cities, onCityWidgetClick) {
      var _this2 = this;

      var content = cities.map(function (city) {
        var onClick = function onClick() {
          onCityWidgetClick(city);
        };

        var cityWidget = _Widget["default"].create(_this2.createContent(city), _constants.widgetTypes.LIST, ["screen__city"], onClick);

        return cityWidget;
      });
      content.push(this.createAddBtn());
      return content;
    }
    /**
     * @property {Function} createAddBtn creates button to add a city
     * @returns {Object}
     */

  }, {
    key: "createAddBtn",
    value: function createAddBtn() {
      var btn = document.createElement("button");
      btn.classList.add("btn");
      btn.classList.add("widget");
      btn.classList.add("screen__add-btn");
      btn.id = "addCityBtn";
      btn.innerHTML = "\n      <i class=\"icon-figma-plus\"></i>\n    ";
      return btn;
    }
    /**
     * @property {Function} createAddCityContentWrapper creating add-city overlay
     * @returns {Object}
     */

  }, {
    key: "createAddCityContentWrapper",
    value: function createAddCityContentWrapper(onClick) {
      var contentWrapper = document.createElement("div");
      contentWrapper.id = "add-city-overlay";
      contentWrapper.classList.add("modal-overlay");
      contentWrapper.classList.add("modal-overlay--add-city");
      contentWrapper.addEventListener("click", onClick);
      return contentWrapper;
    }
    /**
     * @property {Function} createCloseAddCityBtn creating btn for closing add-city modal
     * @returns {Object}
     */

  }, {
    key: "createCloseAddCityBtn",
    value: function createCloseAddCityBtn() {
      var btn = document.createElement("button");
      btn.classList.add("close-modal-btn");
      btn.classList.add("close-add-city-btn");
      btn.id = "closeCityBtn";
      btn.innerHTML = "\n      <i class=\"icon-cancel-squared\"></i>\n    ";
      btn.addEventListener("click", this.closeCityAddModal);
      return btn;
    }
  }, {
    key: "createAddCityForm",
    value: function createAddCityForm() {
      var form = document.createElement("form");
      form.classList.add("add-city-form");
      form.innerHTML = "\n      <div class=\"input-wrapper\">\n        <input type=\"text\" placeholder=\"Enter City Name...\" />\n        <div class=\"icon-wrapper\">\n          <i class=\"icon-map\"></i>\n        </div>\n      </div>\n      <button class=\"btn\">Add</button>\n    ";
      return form;
    }
  }, {
    key: "createAddCityContent",
    value: function createAddCityContent() {
      var addCityCard = document.createElement("div");
      addCityCard.classList.add("card");
      addCityCard.classList.add("add-city");
      addCityCard.appendChild(this.createAddCityForm());
      return addCityCard;
    }
    /**
     * @property {Function} createEmptyListMessage creating message of empty city list
     * @returns {Object}
     */

  }, {
    key: "createEmptyListMessage",
    value: function createEmptyListMessage() {
      var container = document.createElement("div");
      container.classList.add("empty-city-list-container");
      container.innerHTML = "\n      <p class=\"empty-city-list-container__text\">\n        It seems like you don't have any cities selected.\n        Let's add one!\n      </p>\n    ";
      return container;
    }
  }, {
    key: "generateAddCityModal",
    value: function generateAddCityModal() {
      var _this3 = this;

      if (!document.getElementById("add-city")) {
        this.mountModal(_constants.modalTypes.ADD_CITY, function () {
          return [_this3.createCloseAddCityBtn(), _this3.createAddCityContentWrapper(_this3.closeCityAddModal), _this3.createAddCityContent()];
        }, ["add-city-modal"]);
      }
    }
    /**
     * @property {Function} generateCityList preparing city list to be attached to the dom
     * @returns {Object}
     */

  }, {
    key: "generateCityList",
    value: function generateCityList() {
      if (this.cities.length === 0) {
        return [this.createEmptyListMessage(), this.createAddBtn()];
      }

      var list = this.createCityList(this.cities, this.onCityWidgetClick);
      var listWrapper = document.createElement("div");
      listWrapper.classList.add("city-list");
      list.forEach(function (item) {
        return listWrapper.appendChild(item);
      });
      this.mountModal(_constants.modalTypes.CITY_LIST, function () {
        return list;
      }, ["city-list"]);
    }
    /**
     * @property {Function} generateCityInfo preparing single city page to be attached to the dom
     * @returns {Object}
     */

  }, {
    key: "generateCityInfo",
    value: function generateCityInfo() {
      var _this4 = this;

      var currentSettingsState = this.getSettingsState();
      var filteredCityWidgets = {};
      Object.keys(currentSettingsState).filter(function (key) {
        return currentSettingsState[key].isActive;
      }).forEach(function (key) {
        return filteredCityWidgets[key] = _this4.widgetsData[key];
      });
      return this.createCity(filteredCityWidgets, this.currentCity);
    }
    /**
     * @property {Function} generateDashBoard preparing entire dashboard to be attached to the dom
     * @returns {Array<Object>}
     */

  }, {
    key: "generateDashBoard",
    value: function generateDashBoard() {
      var output = [];

      if (this.showCityInfo) {
        output.push(this.generateCityInfo());
      } else {
        if (this.cities.length > 0 && this.currentCity.title) {
          output.push(this.createCloseCityListBtn());
        }

        if (Array.isArray(this.generateCityList())) {
          output = [].concat(_toConsumableArray(output), _toConsumableArray(this.generateCityList()));
        }
      }

      this.smoothTransition();
      return output;
    }
    /**
     * @property {Function} create getting the required methods from the app and connecting to it
     * @param {Object} cities 
     * @param {Object} currentCity 
     * @param {Function} onCityWidgetClick 
     * @param {Function} getSettingsState 
     * @param {Function} widgetsData 
     * @param {Function} showCityInfo 
     * @param {Function} mountModal 
     * @param {Function} closeCityAddModal 
     * @param {Function} smoothTransition 
     * @returns {Array<Object>}
     */

  }, {
    key: "create",
    value: function create(cities, currentCity, onCityWidgetClick, getSettingsState, widgetsData, showCityInfo, mountModal, closeCityAddModal, smoothTransition) {
      /**
       * @property {Array} cities latest city data
       */
      this.cities = cities;
      /**
       * @property {Function} currentCity 
       */

      this.currentCity = currentCity;
      /**
       * @property {Function} onCityWidgetClick check App class for more information
       */

      this.onCityWidgetClick = onCityWidgetClick;
      /**
       * @property {Function} getSettingsState
       */

      this.getSettingsState = getSettingsState;
      /**
       * @property {Function} widgetsData
       */

      this.widgetsData = widgetsData;
      /**
       * @property {Function} showCityInfo
       */

      this.showCityInfo = showCityInfo;
      /**
       * @property {Function} mountModal
       */

      this.mountModal = mountModal;
      /**
       * @property {Function} closeCityAddModal
       */

      this.closeCityAddModal = closeCityAddModal;
      /**
       * @property {Function} smoothTransition
       */

      this.smoothTransition = smoothTransition;
      return this.generateDashBoard();
    }
  }]);

  return DashBoard;
}();

exports["default"] = DashBoard;