import React from 'react';
import './DayCard.css';
import { useSelector } from 'react-redux';

const DayCard = ({ dayName, day }) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const isFahrenheit = useSelector(
    (state) => state.temperatureScale.isFahrenheit
  );

  return (
    <div id='day-card' className={isDarkMode ? 'dark-mode' : ''}>
      <div id='day-name'>{dayName}</div>
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
