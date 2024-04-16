import React from 'react';
import './MainPage.css';
import SearchBar from '../../components/SearchBar';
import WeatherView from '../../components/WeatherView/WeatherView';


const MainPage = () => {
  return (
    <div id='main-page'>
    <SearchBar/>
    <WeatherView/>
    </div>
  )
}

export default MainPage