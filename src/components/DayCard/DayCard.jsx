import React from 'react';
import './DayCard.css';
import { useSelector } from 'react-redux';

const DayCard = ({ day }) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const isFahrenheit = useSelector(
    (state) => state.temperatureScale.isFahrenheit
  );


  function getDayName(dateString) {
    // Define an array of days of the week
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
    // Create a new Date object from the provided date string
    const date = new Date(dateString);
  
    // Get the day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
    const dayOfWeek = date.getDay();
  
    // Return the name of the current day
    return daysOfWeek[dayOfWeek];
  }
  
  // Example usage
  // const inputDate = '2024-04-21T07:00:00+03:00'; // Full date string
  // const currentDay = getCurrentDay(inputDate);
  // console.log('Current day:', currentDay);
  

  return (
    <div id='day-card' className={isDarkMode ? 'dark-mode' : ''}>
      <div id='day-name'>{getDayName(day.localDate)}</div>
      {isFahrenheit ? (
        <div id='degrees'>
          {day.minTemperatureF} - {day.maxTemperatureF} °F
        </div>
      ) : (
        <div id='degrees'>
          {day.minTemperatureC} - {day.maxTemperatureC} °C
        </div>
      )}
      <img
        id='day-weather-icon'
        src={`/weather icons/${day.dayIcon}.png`}
        alt='day weather icon'
      />
    </div>
  );
};

export default DayCard;
