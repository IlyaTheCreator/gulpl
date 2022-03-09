"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Modal = _interopRequireDefault(require("../classes/Modal"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
 * @namespace services 
 */

/**
 * A class for managing modal windows 
 * @memberof services
 */
var ModalService = /*#__PURE__*/function () {
  function ModalService() {
    _classCallCheck(this, ModalService);

    /**
     * @property {Array<String>} availableModalTypes these types match element's ids in the dom
     */
    this.availableModalTypes = [_constants.modalTypes.SETTINGS, _constants.modalTypes.CITY_LIST, _constants.modalTypes.ADD_CITY];
    /**
     * @property {Array<Object>} registeredModals registered modals
     */

    this.registeredModals = [];
  }
  /**
   * You can find arguments' description in Modal class properties
   * @property {Function} createModal 
   * @returns {Object}
   */


  _createClass(ModalService, [{
    key: "createModal",
    value: function createModal(modalType, modalContentCreateMethod, classes, id) {
      var availableModal = this.checkAvailableModal(modalType);

      if (!availableModal) {
        console.warn("There is no available modal of type ".concat(modalType));
        return document.createElement("div");
      }

      var registeredModal = this.checkRegisteredModal(modalType);

      if (!registeredModal) {
        this.registeredModals.push(new _Modal["default"](modalType, modalContentCreateMethod, classes, id));
        registeredModal = this.registeredModals[this.registeredModals.length - 1];
      }

      return registeredModal.create();
    }
    /**
     * @property {Function} checkAvailableModal
     */

  }, {
    key: "checkAvailableModal",
    value: function checkAvailableModal(modalType) {
      return this.availableModalTypes.find(function (type) {
        return type === modalType;
      });
    }
    /**
     * @property {Function} checkRegisteredModal
     */

  }, {
    key: "checkRegisteredModal",
    value: function checkRegisteredModal(modalType) {
      return this.registeredModals.find(function (modal) {
        return modal.modalType === modalType;
      });
    }
  }]);

  return ModalService;
}();

exports["default"] = ModalService;
;