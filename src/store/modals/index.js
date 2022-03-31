import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSettingsOpen: false,
  isCityListOpen: false,
  isAddCityOpen: true,
  isSelectAPISourceOpen: false,
  isMapOpen: false,
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    toggleSettings: (state) => (state.isSettingsOpen = !state.isSettingsOpen),
    toggleCityList: (state) => (state.isCityListOpen = !state.isCityListOpen),
    toggleAddCity: (state) => (state.isAddCityOpen = !state.isAddCityOpen),
    toggleSelectAPISource: (state) =>
      (state.isSelectAPISourceOpen = !state.isSelectAPISourceOpen),
    toggleMap: (state) => (state.isMapOpen = !state.isMapOpen),
  },
});

export const {
  toggleSettings,
  toggleCityList,
  toggleAddCity,
  toggleSelectAPISource,
  toggleMap,
} = modalsSlice.actions;
export default modalsSlice.reducer;
