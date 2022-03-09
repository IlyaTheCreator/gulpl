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
 * Class for managing current city display settings
 * @memberof entities
 */
var Settings = /*#__PURE__*/function () {
  function Settings() {
    _classCallCheck(this, Settings);
  }

  _createClass(Settings, [{
    key: "createContentWrapper",
    value:
    /**
     * @property {Function} createContentWrapper creating settings dom wrapper
     * @returns {Object}
     */
    function createContentWrapper(onClick) {
      var contentWrapper = document.createElement("div");
      contentWrapper.id = "settings-overlay";
      contentWrapper.classList.add("modal-overlay");
      contentWrapper.classList.add("modal-overlay--settings");
      contentWrapper.addEventListener("click", onClick);
      return contentWrapper;
    }
    /**
     * @property {Function} createSettingItem creating a single setting toggler
     * @param {Object} setting current setting object (see App's settingsData prop) 
     * @param {string} key current setting key (see App's settingsData prop) 
     * @returns {Object}
     */

  }, {
    key: "createSettingItem",
    value: function createSettingItem(setting, key, setOnSettingClick) {
      var toggleValue = setting.isActive ? "on" : "off";
      var settingItem = document.createElement("div");
      settingItem.classList.add("settings__item");
      settingItem.innerHTML = "\n      <p class=\"settings__item-text\">".concat(setting.text, "</p>\n      <div \n          class=\"settings__toggle-icon settings__toggle-icon--").concat(toggleValue, "\"\n      >\n        <i \n          id=\"setting-toggle-").concat(key, "\"\n          class=\"icon icon-toggle-").concat(toggleValue, "\"\n        ></i>\n      </div>\n    ");
      setOnSettingClick(settingItem);
      return settingItem;
    }
    /**
     * @property {Function} createCloseSettingsBtn creating btn for closing setting modal
     * @returns {Object}
     */

  }, {
    key: "createCloseSettingsBtn",
    value: function createCloseSettingsBtn(onClick) {
      var btn = document.createElement("button");
      btn.classList.add("close-modal-btn");
      btn.classList.add("close-settings-modal-btn");
      btn.id = "settingsCloseBtn";
      btn.innerHTML = "\n      <i class=\"icon-cancel-squared\"></i>\n    ";
      btn.addEventListener("click", onClick);
      return btn;
    }
    /**
     * @property {Function} createSettings creating settings
     * @param {Object} lcData settings data from localstorage
     * @returns {Object}
     */

  }, {
    key: "createSettings",
    value: function createSettings(lcData, setOnSettingClick) {
      var _this = this;

      var settingsCard = document.createElement("div");
      settingsCard.classList.add("card");
      settingsCard.classList.add("settings");
      Object.keys(lcData).forEach(function (key) {
        var setting = lcData[key];
        settingsCard.appendChild(_this.createSettingItem(setting, key, setOnSettingClick));
      });
      return settingsCard;
    }
  }]);

  return Settings;
}();

exports["default"] = Settings;