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

// Complexity of this code is caused by the fact that we need to
// separate selectedCityId from store and only keep it in localstorage
const lsCheck = LsService.get(appVersion);
let preloadedState;

if (lsCheck) {
  delete lsCheck.cities.selectedCityId;
  preloadedState = lsCheck;
}

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

store.subscribe(() => {
  // Complexity of this code is caused by the fact that we need to
  // separate selectedCityId from store and only keep it in localstorage
  const state = store.getState();
  const lsData = LsService.get(appVersion);

  let selectedCityId = null;

  if (lsData) {
    selectedCityId = LsService.get(appVersion).cities.selectedCityId;

    if (!selectedCityId && state.cities.citiesList.length > 0) {
      selectedCityId = state.cities.citiesList[0].id;
    }
  }

  const stateForLs = {
    apis: state.apis,
    cities: {
      ...state.cities,
      selectedCityId: selectedCityId ? selectedCityId : null,
    },
    settings: state.settings,
  };

  LsService.set(appVersion, stateForLs);
});

export default store;
