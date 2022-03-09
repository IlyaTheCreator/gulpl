"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = require("../constants");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
 * @namespace entities
 */

/**
 * Class for managing creating widgets - ui components
 * @memberof entities
 */
var Widget = /*#__PURE__*/function () {
  function Widget() {
    _classCallCheck(this, Widget);
  }

  _createClass(Widget, null, [{
    key: "create",
    value:
    /**
     * @property {Function} create creating a widget
     * @param {Object} content 
     * @param {string} type 
     * @param {Function} onClick 
     * @param {Array} classes 
     * @returns {HTMLBodyElement}
     */
    function create(content, type) {
      var classes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var onClick = arguments.length > 3 ? arguments[3] : undefined;
      var widget = document.createElement("div");

      if (type === _constants.widgetTypes.LIST) {
        classes.push("widget");
      }

      if (type === _constants.widgetTypes.CITY) {
        classes.push("widget");
        classes.push("widget-rounded");
      }

      classes.forEach(function (className) {
        return widget.classList.add(className);
      });
      widget.innerHTML = content;
      widget.addEventListener("click", onClick);
      return widget;
    }
  }]);

  return Widget;
}();

exports["default"] = Widget;