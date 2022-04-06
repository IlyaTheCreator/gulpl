import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modals: {
    SettingsModal: { isOpen: false, isUpfront: false },
    CityListModal: { isOpen: false, isUpfront: false },
    AddCityModal: { isOpen: false, isUpfront: false },
    SelectAPISourceModal: { isOpen: false, isUpfront: false },
    MapModal: { isOpen: false, isUpfront: false },
  },
  shouldDisplayCityInfo: true,
  isLoading: false
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUpfrontModalsToFalse: (state) => {
      Object.keys(state.modals).forEach((key) => {
        state.modals[key] = { ...state.modals[key], isUpfront: false };
      });
    },
    openSettings: (state) => {
      state.modals.SettingsModal.isOpen = true;
      state.modals.SettingsModal.isUpfront = true;
    },
    hideSettings: (state) => {
      state.modals.SettingsModal.isOpen = false;
      state.modals.SettingsModal.isUpfront = false;
    },
    openCityList: (state) => {
      state.modals.CityListModal.isOpen = true;
      state.modals.CityListModal.isUpfront = true;
    },
    hideCityList: (state) => {
      state.modals.CityListModal.isOpen = false;
      state.modals.CityListModal.isUpfront = false;
      uiSlice.caseReducers.showCityInfo(state);
    },
    openAddCity: (state) => {
      state.modals.AddCityModal.isOpen = true;
      state.modals.AddCityModal.isUpfront = true;
      state.modals.CityListModal.isUpfront = false;
    },
    hideAddCity: (state) => {
      state.modals.AddCityModal.isOpen = false;
      state.modals.AddCityModal.isUpfront = false;
      
      if (!state.modals.CityListModal.isUpfront) {
        state.modals.CityListModal.isUpfront = true;
      }
    },
    openSelectAPISource: (state) => {
      state.modals.SelectAPISourceModal.isOpen = true;
      state.modals.SelectAPISourceModal.isUpfront = true;
    },
    hideSelectAPISource: (state) => {
      state.modals.SelectAPISourceModal.isOpen = false;
      state.modals.SelectAPISourceModal.isUpfront = false;
    },
    openMap: (state) => {
      state.modals.MapModal.isOpen = true;
      state.modals.MapModal.isUpfront = true;
      state.modals.AddCityModal.isUpfront = false;
    },
    hideMap: (state) => {
      state.modals.MapModal.isOpen = false;
      state.modals.MapModal.isUpfront = false;
      state.modals.AddCityModal.isUpfront = true;
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
  openSettings,
  hideSettings,
  openCityList,
  hideCityList,
  openAddCity,
  hideAddCity,
  openSelectAPISource,
  hideSelectAPISource,
  openMap,
  hideMap,
  showCityInfo,
  hideCityInfo,
  setUpfrontModalsToFalse,
  setIsLoading
} = uiSlice.actions;
export default uiSlice.reducer;
