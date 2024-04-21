import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isFahrenheit: false,
};

export const TemperatureScaleSlice = createSlice({
  name: 'temperatureScale',
  initialState,
  reducers: {
    invert: (state) => {
      state.isFahrenheit = !state.isFahrenheit;
    },
  },
});

export const { invert } = TemperatureScaleSlice.actions;
export default TemperatureScaleSlice.reducer;
