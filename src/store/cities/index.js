import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCity: {},
  citiesList: [],
  cityQuery: "",
};

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    addCity: (state, action) => {
      state.citiesList.push(action.payload);
    },
    removeCity: (state, action) => {
      state.citiesList = state.citiesList.filter(
        (city) => city.id !== action.payload
      );
    },
    clearCities: (state) => {
      state.citiesList = [];
    },
    selectCity: (state, action) => {
      state.selectedCity = action.payload;
    },
    setCityQuery: (state, action) => {
      state.cityQuery = action.payload;
    },
  },
});

export const { addCity, removeCity, clearCities, selectCity, setCityQuery } =
  citiesSlice.actions;
export default citiesSlice.reducer;
