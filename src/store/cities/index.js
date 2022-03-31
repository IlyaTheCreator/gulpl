import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCity: {},
  citiesList: [],
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
  },
});

export const { addCity, removeCity, clearCities, selectCity } =
  citiesSlice.actions;
export default citiesSlice.reducer;
