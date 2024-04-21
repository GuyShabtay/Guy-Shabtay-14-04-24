import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites:[],
  // isFavorite:false
};

export const FavoritesListSlice = createSlice({
  name: 'favoritesList',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const { ID, name, currentWeather } = action.payload;
      state.favorites.push({ ID, name, currentWeather });

      // const { ID, name,currentWeather:{ weatherText, weatherIcon, temperatureC,temperatureF } } = action.payload;
      // state.push={ID, name,currentWeather:{ weatherText, weatherIcon, temperatureC,temperatureF }};
    },
    removeFromFavorites: (state, action) => {
      const IDToRemove = action.payload;
      // Ensure that state.favorites is initialized to an empty array if it's undefined
      const favoritesArray = state.favorites || [];
      // Filter the favorites array and return the filtered array
      return {
        ...state,
        favorites: favoritesArray.filter(item => item.ID !== IDToRemove)
      };
    }
    ,
    // setIsFavorite: (state, action) => {
    //   const IDToRemove = action.payload;
    //   state.isFavorite=action.payload;

    // },
  },
});

// Action creators are generated for each case reducer function
export const { addToFavorites, removeFromFavorites,setIsFavorite } = FavoritesListSlice.actions;
export default FavoritesListSlice.reducer;
