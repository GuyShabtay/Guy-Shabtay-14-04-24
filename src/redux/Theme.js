import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isDarkMode: false,
}

export const ThemeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    invert: (state) => {
      state.isDarkMode=!state.isDarkMode
    },
  },
})

// Action creators are generated for each case reducer function
export const { invert } = ThemeSlice.actions
export default ThemeSlice.reducer