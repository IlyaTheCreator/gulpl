import { configureStore, combineReducers } from "@reduxjs/toolkit";

import uiReducer from "./ui";
import citiesReducer from "./cities";
import apisReducer from "./apis";
import settingsReducer from "./settings";

import LsService from "../services/lsService";
import { appVersion } from "../constants";

const rootReducer = combineReducers({
  ui: uiReducer,
  cities: citiesReducer,
  apis: apisReducer,
  settings: settingsReducer,
});

const preloadedState = LsService.get(appVersion)
  ? LsService.get(appVersion)
  : {};

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

store.subscribe(() => {
  const stateForLs = {
    apis: store.getState().apis,
    cities: store.getState().cities,
    settings: store.getState().settings,
  };

  LsService.set(appVersion, stateForLs);
});

export default store;
