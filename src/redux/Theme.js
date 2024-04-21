import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDarkMode: false,
};

export const ThemeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    invert: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { invert } = ThemeSlice.actions;
export default ThemeSlice.reducer;
