import { createSlice } from "@reduxjs/toolkit";
import cities from "../../mocks/cities";

const initialState = {
  selectedCity: cities[0],
  citiesList: cities,
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
