import { createSlice } from "@reduxjs/toolkit";
import { mapTypes } from "../../constants";

const initialState = {
  map: { path: "https://api-maps.yandex.ru/2.1", type: mapTypes.YANDEX },
  weather: { path: "", type: "" },
};

const apisSlice = createSlice({
  name: "apis",
  initialState,
  reducers: {
    setMap: (state, action) => {
      state.map = action.payload;
    },
    setWeather: (state, action) => {
      state.weather = action.payload;
    }
  },
});

export const { setMap, setWeather } = apisSlice.actions;
export default apisSlice.reducer;
