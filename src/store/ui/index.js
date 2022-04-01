import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modals: {
    SettingsModal: { isOpen: true, isUpfront: true },
    CityListModal: { isOpen: false, isUpfront: false },
    AddCityModal: { isOpen: false, isUpfront: false },
    SelectAPISourceModal: { isOpen: false, isUpfront: false },
    MapModal: { isOpen: false, isUpfront: false },
  },
  shouldDisplayCityInfo: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setUpfrontModalsToFalse: (state) => {
      Object.keys(state.modals).forEach((key) => {
        state.modals[key] = {...state.modals[key], isUpfront: false}
      })
    },
    toggleSettings: (state) => {
      state.modals.SettingsModal.isOpen = !state.modals.SettingsModal.isOpen;
      state.modals.SettingsModal.isUpfront = !state.modals.SettingsModal.isUpfront;
    },
    toggleCityList: (state) => {
      state.modals.CityListModal.isOpen = !state.modals.CityListModal.isOpen;
      state.modals.CityListModal.isUpfront = !state.modals.CityListModal.isUpfront;
      uiSlice.caseReducers.showCityInfo(state);
    },
    toggleAddCity: (state) => {
      state.modals.AddCityModal.isOpen = !state.modals.AddCityModal.isOpen;
      state.modals.AddCityModal.isUpfront = !state.modals.AddCityModal.isUpfront;
      state.modals.CityListModal.isUpfront = !state.modals.CityListModal.isUpfront;
      uiSlice.shouldDisplayCityInfo = false;
    },
    toggleSelectAPISource: (state) => {
      uiSlice.caseReducers.setUpfrontModalsToFalse(state);

      state.modals.SelectAPISourceModal.isOpen =
        !state.modals.SelectAPISourceModal.isOpen;
      state.modals.SelectAPISourceModal.isUpfront =
      !state.modals.SelectAPISourceModal.isUpfront;
    },
    toggleMap: (state) => {
      Object.keys(state.modals).forEach((key) => {
        state.modals[key] = {...state.modals[key], isUpfront: false}
      })
      state.modals.MapModal.isOpen = !state.modals.MapModal.isOpen;
      state.modals.MapModal.isUpfront = !state.modals.MapModal.isUpfront;
    },
    showCityInfo: (state) => {
      state.shouldDisplayCityInfo = true;
    },
    hideCityInfo: (state) => {
      state.shouldDisplayCityInfo = false;
    },
  },
});

export const {
  toggleSettings,
  toggleCityList,
  toggleAddCity,
  toggleSelectAPISource,
  toggleMap,
  showCityInfo,
  hideCityInfo,
} = uiSlice.actions;
export default uiSlice.reducer;
