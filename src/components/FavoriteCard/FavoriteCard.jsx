import React from 'react';
import './FavoriteCard.css';
import { useSelector } from 'react-redux';


const FavoriteCard = ({favorite}) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  return (
    <div id='favorite-card' className={isDarkMode==true ? 'dark-mode' :''}>
    <div id='favorite-city'>{favorite.city}</div>
      <div id='degrees'>{favorite.temperatureC}°C</div>
      <img id='favorite-weather-icon' src={`/weather icons/${favorite.dayIcon}.png`} alt="favorite weather icon" />
      {console.log(isDarkMode)}
    </div>
  )
}
export default FavoriteCard