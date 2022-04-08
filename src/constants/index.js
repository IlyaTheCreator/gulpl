export const appVersion = "weather-2.0.0";

export const modalTypes = {
  SETTINGS: "Settings",
  CITY_LIST: "CityList",
  ADD_CITY: "AddCity",
  SELECT_API_SOURCE: "SelectAPISource",
  MAP: "Map",
};

export const widgetTypes = {
  LIST: "list",
  CITY: "city",
};

export const uvTypes = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
};

export const apiTypes = {
  OPEN_WEATHER_MAP: "open-weather-map",
  FREE_WEATHER_API: "free-weather-api",
};

export const mapTypes = {
  YANDEX: "yandex-map",
  OPEN_STREET_MAP: "open-street-map",
};

export const messageTypes = {
  USER_ACTION: "user-action",
  INFO: "info",
};

export const settingsSelectInputsData = [
  {
    type: "weather",
    title: "Weather Data Source:",
    options: [
      {
        text: "Free Weather API",
        value: "free-weather-api",
      },
      {
        text: "Open Weather API",
        value: "open-weather-map",
      },
    ],
  },
  {
    type: "map",
    title: "Map Type:",
    options: [
      {
        text: "Yandex",
        value: "yandex-map",
      },
      {
        text: "Open Street Map",
        value: "open-street-map",
      },
    ],
  },
];
