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
    {isFahrenheit ? (
      <div id='degrees'>
      {favorite.temperatureF} °F
      </div>
    ) : (
      <div id='degrees'>
      {favorite.temperatureC} °C
      </div>
    )}
      <img id='favorite-weather-icon' src={`/weather icons/${favorite.dayIcon}.png`} alt="favorite weather icon" />
      {console.log(isDarkMode)}
    </div>
  )
}
export default FavoriteCard