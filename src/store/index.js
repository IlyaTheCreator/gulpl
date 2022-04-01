import { configureStore, combineReducers } from "@reduxjs/toolkit";

import uiReducer from "./ui";
import citiesReducer from "./cities";
import apisReducer from "./apis";

const rootReducer = combineReducers({
  ui: uiReducer,
  cities: citiesReducer,
  apis: apisReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
