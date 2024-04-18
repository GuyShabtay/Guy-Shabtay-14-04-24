import { configureStore } from '@reduxjs/toolkit'
import ThemeReducer from './Theme';
import TemperatureScaleReducer from './TemperatureScale';
import VisiblePageReducer from './VisiblePage';
import FavoritesListReducer from './FavoritesList';

export const store = configureStore({
  reducer: {
    theme: ThemeReducer,
    temperatureScale:TemperatureScaleReducer,
    visiblePage:VisiblePageReducer,
    favoritesList:FavoritesListReducer,
  },
})