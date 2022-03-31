import { configureStore, combineReducers } from "@reduxjs/toolkit";

import modalsReducer from "./modals";
import citiesReducer from "./cities";
import apisReducer from "./apis";

const rootReducer = combineReducers({
  modals: modalsReducer,
  cities: citiesReducer,
  apis: apisReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
