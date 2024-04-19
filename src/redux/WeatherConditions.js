import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentDay: {},
  nextFiveDays: []
};

export const WeatherConditionsSlice = createSlice({
  name: 'weatherConditions',
  initialState,
  reducers: {
    setCurrentDay: (state, action) => {
      const { weatherText, weatherIcon, temperatureC,temperatureF } = action.payload;
      state.currentDay={cityKey,cityName,weather:{ weatherText, weatherIcon, temperatureC,temperatureF }};
    },
    setNextFiveDays: (state, action) => {
      // const { dayIcon, minTemperatureF, maxTemperatureF,minTemperatureC ,maxTemperatureC} = action.payload;
      // state.push({ ID, name, currentWeather });
      state.nextFiveDays = action.payload;
    },
    // currentWeather that contains weatherText,weatherIcon(number),temperatureC,temperatureF
    // 2.that contains dayIcon,minTemperatureF,maxTemperatureF,minTemperatureC,maxTemperatureC
    
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentDay,setNextFiveDays } = WeatherConditionsSlice.actions;
export default WeatherConditionsSlice.reducer;
