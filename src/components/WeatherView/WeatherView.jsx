import React,{useState} from 'react';
import './WeatherView.css';
import HeartBtn from '../HeartBtn/HeartBtn';
import DayCard from '../DayCard/DayCard';
import {getCity,getCurrentConditions,getNextFiveDaysConditions} from '../../ApiCalls';

const WeatherView = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
  const [currentWeatherConditions, setCurrentWeatherConditions] = useState({});
  const [city, setCity] = useState('london');
  const [nextFiveDaysConditions, setNextFiveDaysConditions] = useState([]);
  const [temperatureScale, setTemperatureScale] = useState('°C');

  
  const handleAddToFavorites =async () => {
      try {
        const cityCode = await getCity(city); // Replace 'YourCityName' with the city you want to search for
        console.log(cityCode); // Print the result
        handleAddToFavorites1(215854)
      } catch (error) {
        console.error('Error:', error);
      }


  }
  const handleAddToFavorites1 =async (cityCode) => {
    try {
      const currentWeatherDetails = await getCurrentConditions(cityCode); // Replace 'YourCityName' with the city you want to search for
      setCurrentWeatherConditions(currentWeatherDetails);      
        handleAddToFavorites2(cityCode)
    } catch (error) {
      console.error('Error:', error);
    }
  }
  const handleAddToFavorites2 =async (cityCode) => {
    try {
      const nextFiveDaysDetails = await getNextFiveDaysConditions(cityCode); // Replace 'YourCityName' with the city you want to search for
      setNextFiveDaysConditions(nextFiveDaysDetails)
      console.log(nextFiveDaysDetails)
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  return (
    <div id='weather-view'>
      <div id='weather-view-top'>
        <div id='weather-view-top-left'>
        <img id='current-weather-icon' src={`/weather icons/${currentWeatherConditions.weatherIcon}.png`} alt="current weather icon" />
        <div id='location-details'>
            <div id='city'>{city}</div>
            <div id='current-temperature'>{currentWeatherConditions.temperatureC}{temperatureScale}</div>
          </div>
        </div>
        <h1 className='handlee-regular'>Discover your forecast, seize the day</h1>
        <div id='weather-view-top-right'>
          <HeartBtn />
          <button
            id='add-to-favorites'
            onClick={handleAddToFavorites}
          >
            Add to Favorites
          </button>
        </div>
      </div>
      <div id='current-weather'>
      <h1>{currentWeatherConditions.weatherText}</h1>
      </div>
      <div id='weather-view-bottom'>
  {nextFiveDaysConditions.map((day, index) => (
    <div className='day' key={index}>
    {/*<div id='day-name'>{days[index]}</div>
      <div id='degrees'>{day.minTemperatureC} - {day.maxTemperatureC} {temperatureScale}</div>
  <img src={`/weather icons/${day.dayIcon}.png`} alt="weather icon" />*/}
  <DayCard dayName={days[index]} day={day}  />
    </div>
  ))}
</div>

    </div>
  );
};

export default WeatherView;
