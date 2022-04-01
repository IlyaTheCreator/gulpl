import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modals: {
    SettingsModal: { isOpen: false, isUpfront: false },
    CityListModal: { isOpen: false, isUpfront: false },
    AddCityModal: { isOpen: true, isUpfront: true },
    SelectAPISourceModal: { isOpen: false, isUpfront: false },
    MapModal: { isOpen: false, isUpfront: false },
  },
  shouldDisplayCityInfo: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSettings: (state) =>
      (state.modals.isSettingsOpen = !state.modals.isSettingsOpen),
    toggleCityList: (state) =>
      (state.modals.isCityListOpen = !state.modals.isCityListOpen),
    toggleAddCity: (state) =>
      (state.modals.isAddCityOpen = !state.modals.isAddCityOpen),
    toggleSelectAPISource: (state) =>
      (state.modals.isSelectAPISourceOpen =
        !state.modals.isSelectAPISourceOpen),
    toggleMap: (state) => (state.modals.isMapOpen = !state.modals.isMapOpen),
    toggleDisplayCityInfo: (state) =>
      (state.shouldDisplayCityInfo = !state.shouldDisplayCityInfo),
  },
});

export const {
  toggleSettings,
  toggleCityList,
  toggleAddCity,
  toggleSelectAPISource,
  toggleMap,
  toggleDisplayCityInfo,
} = uiSlice.actions;
export default uiSlice.reducer;
