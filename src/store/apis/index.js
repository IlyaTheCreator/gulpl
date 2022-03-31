import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  map: { path: "", type: "" },
  weather: { path: "", type: "" },
};

const apisSlice = createSlice({
  name: "apis",
  initialState,
  reducers: {
    setMap: (state, action) => (state.map = action.payload),
    setWeather: (state, action) => (state.weather = action.payload),
  },
});

export const { setMap, setWeather } = apisSlice.actions;
export default apisSlice.reducer;
