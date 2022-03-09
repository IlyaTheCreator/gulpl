"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
 * @namespace entities 
 */

/**
 * A class for managing modals 
 * @memberof entities
 */
var Modal = /*#__PURE__*/function () {
  function Modal(modalType, modalContentCreateMethod, classes, id) {
    _classCallCheck(this, Modal);

    /**
     * @property {String} modalType type of a modal (must match those in ModalService)   
     */
    this.modalType = modalType;
    /**
     * @property {Function} modalContentCreateMethod function for creating modal's content
     * @returns {Array<Object>}
     * It returns an array for convinience
     */

    this.modalContentCreateMethod = modalContentCreateMethod;
    /**
     * @property {Array<String>} classes additional classes for the modal
     */

    this.classes = classes;
    /**
     * @property {String} id id for modal
     */

    this.id = id;
  }
  /**
   * @property {Function} create creating a modal
   * @returns {Object}
   */


  _createClass(Modal, [{
    key: "create",
    value: function create() {
      var modal = document.createElement("div");
      modal.classList.add("modal");
      this.classes.forEach(function (className) {
        return modal.classList.add(className);
      });
      modal.id = this.id;
      this.modalContentCreateMethod().forEach(function (child) {
        return modal.appendChild(child);
      });
      return modal;
    }
  }]);

  return Modal;
}();

exports["default"] = Modal;
;