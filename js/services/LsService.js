"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
 * @namespace services
 */

/**
 * Class for managing localstorage data for the app
 * @memberof services
 */
var LsService = /*#__PURE__*/function () {
  function LsService() {
    _classCallCheck(this, LsService);

    /**
     * @property {string} appKey current app key in localstorage
     */
    this.appKey = "";
  }
  /**
   * @property {Function} init initializing localstorage data
   * @param {string} appKey appKey
   * @param {Object} data data to be put in the localstorage
   */


  _createClass(LsService, [{
    key: "init",
    value: function init(appKey) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      LsManager.set(appKey, data);
      this.appKey = appKey;
    }
    /**
     * @property {Function} get localstorage getter
     * @param {string} key localstorage key
     * @returns {Object}
     */

  }, {
    key: "delete",
    value:
    /**
     * @property {Function} delete removing localstorage item
     * @param {string} key localstorage key
     */
    function _delete(key) {
      localStorage.removeItem(key);
    }
    /**
     * @property {Function} clear clearing out localstorage item
     */

  }, {
    key: "clear",
    value: function clear() {
      this.set(this.appKey, "");
    }
    /**
     * @property {Function} list gets all localstorage data
     * @returns {Object}
     */

  }], [{
    key: "get",
    value: function get(key) {
      return JSON.parse(localStorage.getItem(key));
    }
    /**
     * @property {Function} set localstorage setter
     * @param {string} key localstorage key
     * @param {Object} key localstorage value
     * @returns {Object}
     */

  }, {
    key: "set",
    value: function set(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, {
    key: "list",
    value: function list() {
      var output = {};

      for (var _i = 0, _Object$entries = Object.entries(localStorage); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            key = _Object$entries$_i[0],
            value = _Object$entries$_i[1];

        output[key] = value;
      }

      return output;
    }
    /**
     * @property {Function} reset wiping out localstorage data completely
     */

  }, {
    key: "reset",
    value: function reset() {
      localStorage.clear();
    }
  }]);

  return LsService;
}();

exports["default"] = LsService;