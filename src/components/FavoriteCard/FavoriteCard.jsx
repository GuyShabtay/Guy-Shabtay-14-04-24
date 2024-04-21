import React from 'react';
import './FavoriteCard.css';
import { useSelector } from 'react-redux';


const FavoriteCard = ({favorite}) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const isFahrenheit = useSelector(
    (state) => state.temperatureScale.isFahrenheit
  );
  return (
    <div id='favorite-card' className={isDarkMode ? 'dark-mode' :''}>
    <div id='favorite-city'>{favorite.city}</div>
    <div>{favorite.name}</div>
    <div>
    {favorite.currentWeather.weatherText}
    </div>
    {isFahrenheit ? (
      <div id='degrees'>
      {favorite.currentWeather.temperatureF} °F
      </div>
    ) : (
      <div id='degrees'>
      {favorite.currentWeather.temperatureC} °C
      </div>
    )}
      <img id='favorite-weather-icon' src={`/weather icons/${favorite.currentWeather.weatherIcon}.png`} alt="favorite weather icon" />
    </div>
  )
}
export default FavoriteCard