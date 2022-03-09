"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/*
  Array which allows us to loop through device types

  overall structure: [ [], [], [] ] - array of arrays. Each inner array is a group of related operating systems (e.g. mac and ios)
  structure of inner array: [ {}, {} ] - one or two objects. Each object represents a particular OS
  structure of the OS object: { systemName, devices } - devices - list of device types available in that OS
  structure of devices: [ {}, {} ] - each object is a separate device 
  structure of the device: { name, types } - types - array of strings which will help us to search through userAgent string 
*/
var devices = [[{
  systemName: "android",
  devices: [{
    name: "device",
    types: []
  }]
}], [{
  systemName: "windows",
  devices: [{
    name: "mobile",
    types: ["Mobile"]
  }, {
    name: "desktop",
    types: ["win64", "wow64;", "wow64", "win64;"]
  }]
}], [{
  systemName: "ios",
  devices: [{
    name: "device",
    types: ["iphone;", "iphone"]
  }]
}, {
  systemName: "mac",
  devices: [{
    name: "desktop",
    types: ["macintosh", "macintosh;"]
  }, {
    name: "tablet",
    types: ["ipad", "ipad;"]
  }]
}], [{
  systemName: "linux",
  devices: [{
    name: "device",
    types: []
  }]
}]]; // Array which allows us to loop through different device sizes

var deviceDimensions = [{
  name: "phone-wide",
  maxWidth: 599
}, {
  name: "tablet-portrait-wide",
  maxWidth: 600
}, {
  name: "tablet-landscape-wide",
  maxWidth: 900
}, {
  name: "desktop-wide",
  maxWidth: 1200
}, {
  name: "big-desktop-wide",
  maxWidth: 1920
}, {
  name: "large-desktop-wide",
  maxWidth: 2600
}];
/* 
  Function which in the end assigns a class to outer wrapper of the application which tells 
  what device a user is in.
*/

var detectDevice = function detectDevice() {
  var ua = navigator.userAgent.toLocaleLowerCase();
  var typeClassName;
  devices.forEach(function (systemGroup) {
    systemGroup.forEach(function (system) {
      system.devices.forEach(function (device) {
        var searchResult; // If there are no types for this particular device, do the search with systemName (windows, linux, android, etc)

        if (device.types.length === 0) {
          searchResult = ua.search(system.systemName);
        } // Otherwise, search for each individual type is executed


        device.types.forEach(function (type) {
          searchResult = ua.search(type);
        }); // If there's a match in the search, assign this value to the class variable

        if (searchResult !== -1) {
          typeClassName = "screen-wrapper--".concat(system.systemName, "--").concat(device.name);
        }
        /* 
          Expections.
          If you are on android, your userAgent will have both linux and android strings matches.
          Here typeClassName is explicitly set to the value of android
        */


        if (ua.search("linux") !== -1 && ua.search("android")) {
          typeClassName = "screen-wrapper--android--device";
        }
      });
    });
  });
  document.querySelector(".screen-wrapper").classList.add(typeClassName);
};

var detectDeviceWidth = function detectDeviceWidth() {
  var _iterator = _createForOfIteratorHelper(deviceDimensions),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var dimension = _step.value;

      // if there's a match, assign the class and exit from the loop
      if (screen.width <= dimension.maxWidth) {
        document.querySelector(".screen-wrapper").classList.add(dimension.name);
        break;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
};

var addWrapperClass = function addWrapperClass() {
  detectDevice();
  detectDeviceWidth();
};

var _default = addWrapperClass;
exports["default"] = _default;