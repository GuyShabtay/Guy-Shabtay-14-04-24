import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: [],
};

export const FavoritesListSlice = createSlice({
  name: 'favoritesList',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const { ID, name, currentWeather } = action.payload;
      state.favorites.push({ ID, name, currentWeather });
    },
    removeFromFavorites: (state, action) => {
      const IDToRemove = action.payload;
      const favoritesArray = state.favorites || [];
      return {
        ...state,
        favorites: favoritesArray.filter((item) => item.ID !== IDToRemove),
      };
    },
  },
});

export const { addToFavorites, removeFromFavorites, setIsFavorite } =
  FavoritesListSlice.actions;
export default FavoritesListSlice.reducer;
