import React from 'react';
import './DayCard.css'

const DayCard = ({dayName,day}) => {
  return (
    <div id='day-card'>
    <div id='day-name'>{dayName}</div>
      <div id='degrees'>{day.minTemperatureC} - {day.maxTemperatureC} °C</div>
      <img id='day-weather-icon' src={`/weather icons/${day.dayIcon}.png`} alt="day weather icon" />
    </div>
  )
}

export default DayCard