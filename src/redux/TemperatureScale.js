import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isFahrenheit: false,
}

export const TemperatureScaleSlice = createSlice({
  name: 'temperatureScale',
  initialState,
  reducers: {
    invert: (state) => {
      state.isFahrenheit=!state.isFahrenheit
    },
  },
})

// Action creators are generated for each case reducer function
export const { invert } = TemperatureScaleSlice.actions
export default TemperatureScaleSlice.reducer