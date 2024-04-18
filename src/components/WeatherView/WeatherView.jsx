import React, { useState,useEffect } from 'react';
import './WeatherView.css';
import HeartBtn from '../HeartBtn/HeartBtn';
import DayCard from '../DayCard/DayCard';
import {
  getCity,
  getCurrentConditions,
  getNextFiveDaysConditions,
} from '../../ApiCalls';
import { useSelector,useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../redux/FavoritesList';


const WeatherView = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
  const [currentWeatherConditions, setCurrentWeatherConditions] = useState({});
  const [city, setCity] = useState('london');
  const [cityCode, setCityCode] = useState('');
  const [nextFiveDaysConditions, setNextFiveDaysConditions] = useState([]);
  const [temperatureScale, setTemperatureScale] = useState('°C');
  const [addOrRemoveFavorite, setAddOrRemoveFavorite] = useState('');
  const [isAddToFavorites, setIsAddToFavorites] = useState('');
  const [isFavorite, setIsFavorite] = useState('');
  const favoritesList = useSelector((state) => state.favoritesList);
  const isFahrenheit = useSelector(
    (state) => state.temperatureScale.isFahrenheit
  );
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const dispatch = useDispatch();


  useEffect((cityCode) => {
    if (favoritesList.map(item => item.ID).includes(cityCode)) {
      setAddOrRemoveFavorite('remove');
    } else {
      setAddOrRemoveFavorite('add');
    }
    
    
    console.log(addOrRemoveFavorite)
  }, [favoritesList, city]);

  const checkIsFavorite =  (cityCode) => {
    
    // setIsFavorite(favoritesList.some(item => item.ID === cityCode));
    // console.log('checkIsFavorite',isFavorite)

  };
  // useEffect(() => {
  //   // setIsFavorite(favoritesList.some(item => item.ID === cityCode));
  //   // setIsFavorite(favoritesList.findIndex(item => item.ID === cityCode));
  // }, [favoritesList]); 

  // const isFavorite = (favoritesList) => {
  //   return state.some(item => item.ID === ID);

  // };
  const handleAddToFavorites = async () => {
    try {
      const cityCode = await getCity(city); // Replace 'YourCityName' with the city you want to search for
      // console.log('Print the result',cityCode); // Print the result
      setCityCode(cityCode);
      checkIsFavorite(cityCode);
    //   if (isFavorite)
    //   setAddOrRemoveFavorite('add')
    // else
    //   setAddOrRemoveFavorite('remove')
    console.log('addOrRemoveFavorite',addOrRemoveFavorite)
      handleAddToFavorites1(cityCode);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleAddToFavorites1 = async (cityCode) => {
    try {
      const currentWeatherDetails = await getCurrentConditions(cityCode); // Replace 'YourCityName' with the city you want to search for
      setCurrentWeatherConditions(currentWeatherDetails);
      console.log('isAddToFavorites',isAddToFavorites)
      if(isAddToFavorites)
      dispatch(addToFavorites({ ID: cityCode,name:city, currentWeather:currentWeatherDetails.weatherText }));
    else
      dispatch(removeFromFavorites({ ID: cityCode}));

      // setAddOrRemoveFavorite(true);
      console.log('favoritesList',favoritesList[0])
      // console.log('setAddOrRemoveFavorite',addOrRemoveFavorite)
      // console.log('setIsFavorite',isFavorite)
      handleAddToFavorites2(cityCode);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleAddToFavorites2 = async (cityCode) => {
    try {
      const nextFiveDaysDetails = await getNextFiveDaysConditions(cityCode); // Replace 'YourCityName' with the city you want to search for
      setNextFiveDaysConditions(nextFiveDaysDetails);
      console.log(nextFiveDaysDetails);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div id='weather-view'>
      <div id='weather-view-top'>
        <div id='weather-view-top-left'>
          <img
            id='current-weather-icon'
            src={`/weather icons/${currentWeatherConditions.weatherIcon}.png`}
            alt='current weather icon'
          />
          <div id='location-details'>
            <div id='city'>{city}</div>
           
              {isFahrenheit ? (
                <div id='current-temperature'>
                {currentWeatherConditions.temperatureF} °F
                </div>
              ) : (
                <div id='current-temperature'>
                {currentWeatherConditions.temperatureC} °C
                </div>
              )}
          </div>
        </div>
        <h1 className='handlee-regular'>
          Discover your forecast, seize the day
        </h1>
        <div id='weather-view-top-right'>
          <HeartBtn addOrRemoveFavorite={addOrRemoveFavorite} isFavorite={isFavorite}/>
          <button id='add-to-favorites' className={isDarkMode ? 'dark-mode' :''} onClick={handleAddToFavorites} >
            {isAddToFavorites ? 'Add to Favorites': 'Remove From Favorites'}
          </button>
        </div>
      </div>
      <div id='current-weather'>
        <h1>{currentWeatherConditions.weatherText}</h1>
      </div>
      <div id='weather-view-bottom'>
        {nextFiveDaysConditions.map((day, index) => (
          <div className='day' key={index}>
            <DayCard dayName={days[index]} day={day} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherView;
