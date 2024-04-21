import React from 'react';
import './DayCard.css';
import { useSelector } from 'react-redux';

const DayCard = ({ day }) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const isFahrenheit = useSelector(
    (state) => state.temperatureScale.isFahrenheit
  );

  function getDayName(dateString) {
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();
    return daysOfWeek[dayOfWeek];
  }

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
        src={`/weather icons/${day?.dayIcon}.png`}
        alt='day weather icon'
      />
    </div>
  );
};

export default DayCard;
