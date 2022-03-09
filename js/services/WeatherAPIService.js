"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
 * @namespace services
 */

/**
 * Class for searching weather with different apis by dates 
 * @memberof services
 */
var WeatherAPIService = /*#__PURE__*/function () {
  function WeatherAPIService() {
    _classCallCheck(this, WeatherAPIService);

    this.selectedApiType = null;
    this.testLatitude = 55.7558;
    this.testLongitude = 37.6173;
    this.apisData = {
      "open-weather-map": {
        apiKey: "cf33b9e5a1e26909a3ca013250b1a78c",
        apiPath: "http://api.openweathermap.org/data/2.5/onecall"
      },
      "free-weather-api": {
        apiKey: "c4256c0653c74259adb84822220203",
        apiPath: "http://api.weatherapi.com/v1/forecast.json"
      }
    };
  }

  _createClass(WeatherAPIService, [{
    key: "getForecast",
    value: function () {
      var _getForecast = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.t0 = this.selectedApiType;
                _context.next = _context.t0 === "yandex-weather" ? 3 : _context.t0 === "open-weather-map" ? 6 : _context.t0 === "free-weather-api" ? 9 : 12;
                break;

              case 3:
                _context.next = 5;
                return this.yandexSearch();

              case 5:
                return _context.abrupt("return", _context.sent);

              case 6:
                _context.next = 8;
                return this.openWeatherMapSearch();

              case 8:
                return _context.abrupt("return", _context.sent);

              case 9:
                _context.next = 11;
                return this.freeWeatherApiSearch();

              case 11:
                return _context.abrupt("return", _context.sent);

              case 12:
                return _context.abrupt("break", 13);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getForecast() {
        return _getForecast.apply(this, arguments);
      }

      return getForecast;
    }()
  }, {
    key: "openWeatherMapSearch",
    value: function () {
      var _openWeatherMapSearch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var forecastData;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.fetchData(this.apisData["open-weather-map"].apiPath, [{
                  name: "lat",
                  value: this.testLatitude
                }, {
                  name: "lon",
                  value: this.testLongitude
                }, {
                  name: "appid",
                  value: this.apisData["open-weather-map"].apiKey
                }, {
                  name: "units",
                  value: "metric"
                }, {
                  name: "lang",
                  value: "ru"
                }]);

              case 3:
                forecastData = _context2.sent;
                return _context2.abrupt("return", {
                  temp: forecastData.daily[0].temp.day,
                  description: forecastData.daily[0].weather[0].description,
                  minTemp: forecastData.daily[0].temp.min,
                  maxtemp: forecastData.daily[0].temp.max,
                  feelsLike: forecastData.hourly[0].feels_like,
                  uvIndicator: forecastData.daily[0].uvi,
                  pressure: forecastData.hourly[0].pressure,
                  wind_speed: forecastData.hourly[0].wind_speed // instead of air quality

                });

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", console.warn("could not fetch weather data"));

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 7]]);
      }));

      function openWeatherMapSearch() {
        return _openWeatherMapSearch.apply(this, arguments);
      }

      return openWeatherMapSearch;
    }()
  }, {
    key: "freeWeatherApiSearch",
    value: function () {
      var _freeWeatherApiSearch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var forecastData;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this.fetchData(this.apisData["free-weather-api"].apiPath, [{
                  name: "q",
                  value: "Moscow"
                }, {
                  name: "key",
                  value: this.apisData["free-weather-api"].apiKey
                }, {
                  name: "lang",
                  value: "ru"
                }]);

              case 3:
                forecastData = _context3.sent;
                return _context3.abrupt("return", {
                  temp: forecastData.current.temp_c,
                  description: forecastData.forecast.forecastday[0].day.condition.text,
                  minTemp: forecastData.forecast.forecastday[0].day.mintemp_c,
                  maxtemp: forecastData.forecast.forecastday[0].day.maxtemp_c,
                  feelsLike: forecastData.current.feelslike_c,
                  uvIndicator: forecastData.forecast.forecastday[0].day.uv,
                  pressure: forecastData.current.pressure_mb,
                  wind_speed: forecastData.current.wind_kph // instead of air quality

                });

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", console.warn("could not fetch weather data"));

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 7]]);
      }));

      function freeWeatherApiSearch() {
        return _freeWeatherApiSearch.apply(this, arguments);
      }

      return freeWeatherApiSearch;
    }()
  }, {
    key: "fetchData",
    value: function () {
      var _fetchData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(url, params) {
        var headers,
            res,
            _args4 = arguments;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                headers = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : {};
                _context4.next = 3;
                return _axios["default"].get(url, params, headers);

              case 3:
                res = _context4.sent;
                return _context4.abrupt("return", res.data);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function fetchData(_x, _x2) {
        return _fetchData.apply(this, arguments);
      }

      return fetchData;
    }()
  }, {
    key: "getApiTypes",
    value: function getApiTypes() {
      return this.apiTypes;
    }
  }, {
    key: "setApiType",
    value: function setApiType(apiType) {
      this.selectedApiType = apiType;
    }
  }]);

  return WeatherAPIService;
}();

exports["default"] = WeatherAPIService;