import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentDay: {},
  nextFiveDays: [],
};

export const WeatherConditionsSlice = createSlice({
  name: 'weatherConditions',
  initialState,
  reducers: {
    setCurrentDay: (state, action) => {
      const {
        cityKey,
        cityName,
        weather: { weatherText, weatherIcon, temperatureC, temperatureF },
      } = action.payload;
      state.currentDay = {
        cityKey,
        cityName,
        weather: { weatherText, weatherIcon, temperatureC, temperatureF },
      };
    },
    setNextFiveDays: (state, action) => {
      state.nextFiveDays = action.payload;
    },
  },
});

export const { setCurrentDay, setNextFiveDays } =
  WeatherConditionsSlice.actions;
export default WeatherConditionsSlice.reducer;
