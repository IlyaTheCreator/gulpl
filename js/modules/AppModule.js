"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _wrapperClassScript = _interopRequireDefault(require("../wrapperClassScript"));

var _Settings = _interopRequireDefault(require("../classes/Settings"));

var _DashBoard = _interopRequireDefault(require("../classes/DashBoard"));

var _App = _interopRequireDefault(require("../classes/App"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @namespace modules
 */

/**
 * App module
 * @memberof entities
 */
var AppModule = function () {
  return {
    init: function init() {
      new _App["default"](new _DashBoard["default"](), new _Settings["default"](), document.getElementById("app")).create();
      (0, _wrapperClassScript["default"])();
    }
  };
}();

var _default = AppModule;
exports["default"] = _default;