import React from 'react';
import './Favorites.css';
import FavoriteCard from '../FavoriteCard/FavoriteCard';

const Favorites = () => {
  const favorites=[
    {city:'Tel Aviv',weatherText:'sunny',dayIcon:5,temperatureC:22,temperatureF:37},
    {city:'Tel Aviv',weatherText:'sunny',dayIcon:5,temperatureC:22,temperatureF:37},
    {city:'Tel Aviv',weatherText:'sunny',dayIcon:5,temperatureC:22,temperatureF:37},
    {city:'Tel Aviv',weatherText:'sunny',dayIcon:5,temperatureC:22,temperatureF:37},
    {city:'Tel Aviv',weatherText:'sunny',dayIcon:5,temperatureC:22,temperatureF:37}, 
    {city:'Tel Aviv',weatherText:'sunny',dayIcon:5,temperatureC:22,temperatureF:37}, 
    
  ]
  return (
    <div id='favorites'>
    <h1 className='handlee-regular'>Favorites</h1>
    <div id='favorite-cards'>
    {favorites.map((favorite, index) => (
      <div className='favorite' key={index}>
    <FavoriteCard favorite={favorite}  />
      </div>
    ))}
    </div>
    </div>

  )
}

export default Favorites