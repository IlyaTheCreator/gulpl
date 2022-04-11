import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  minTemp: {
    text: "Min. Temp.",
    isActive: true,
  },
  maxTemp: {
    text: "Max. Temp.",
    isActive: true,
  },
  uvIndicator: {
    text: "Uv Indicator",
    isActive: true,
  },
  feltTemp: {
    text: "Felt Temp",
    isActive: false,
  },
  pressure: {
    text: "Pressure",
    isActive: false,
  },
  windSpeed: {
    text: "Wind Speed",
    isActive: false,
  },
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleSetting: (state, action) => {
      state[action.payload].isActive = !state[action.payload].isActive; 
    }
  }
})

export const { toggleSetting } = settingsSlice.actions;
export default settingsSlice.reducer;