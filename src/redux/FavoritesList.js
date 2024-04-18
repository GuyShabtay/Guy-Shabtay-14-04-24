import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const FavoritesListSlice = createSlice({
  name: 'favoritesList',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const { ID, name, currentWeather } = action.payload;
      state.push({ ID, name, currentWeather });
    },
    removeFromFavorites: (state, action) => {
      const IDToRemove = action.payload;
      return state.filter(item => item.ID !== IDToRemove);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToFavorites, removeFromFavorites } = FavoritesListSlice.actions;
export default FavoritesListSlice.reducer;
