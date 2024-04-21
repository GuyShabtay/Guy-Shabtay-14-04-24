import React, { useState,useEffect } from 'react';
import './WeatherView.css';
import HeartBtn from '../HeartBtn/HeartBtn';
import DayCard from '../DayCard/DayCard';
import {
  getCityName,
  getCurrentConditions,
  getNextFiveDaysConditions,
  getCityKeyAndNameByGeoLocation,
  getGeoLocation
} from '../../ApiCalls';
import { useSelector,useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../redux/FavoritesList';
import {setCurrentDay,setNextFiveDays} from '../../redux/WeatherConditions'

const WeatherView = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
  const [cityKey, setCityKey] = useState('');
  const [isAddFavoritePressed, setIsAddFavoritePressed] = useState('initial');
  const [isFavorite, setIsFavorite] = useState(false);
  const [heartStyle, setHeartStyle] = useState('empty-heart');
  // const [coordinates, setCoordinates] = useState('empty-heart');
  const favoritesList = useSelector((state) => state.favoritesList.favorites);
  // const isFavorite = useSelector((state) => state.favoritesList.isFavorite);
  const isFahrenheit = useSelector(
    (state) => state.temperatureScale.isFahrenheit
  );
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const currentDay = useSelector((state) => state.weatherConditions.currentDay);
  const searchQuery = useSelector((state) => state.search.searchQuery);
  const nextFiveDays = useSelector((state) => state.weatherConditions.nextFiveDays);
  const dispatch = useDispatch();

  
  

  

  useEffect(() => {
    const getCityDetailsByGeoLocation = async () => {
      try {
        // const a=await getGeoLocation()
        // console.log('a',a)
        const cityDetails = await getCityKeyAndNameByGeoLocation(); // Replace 'YourCityName' with the city you want to search for
        const { cityKey, cityName } = cityDetails;
        getCurrentWeatherConditionsByCityKey(cityKey, cityName);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    getCityDetailsByGeoLocation(); // Call the function to start the process
  }, []);
  

  const getCityKeyByCityName = async () => {
    try {
      if(searchQuery && searchQuery.length>0)
      {
      const cityKey = await getCityName(searchQuery); // Replace 'YourCityName' with the city you want to search for
      // console.log('the citykey is:',cityKey)
      getCurrentWeatherConditionsByCityKey(cityKey,searchQuery);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getCurrentWeatherConditionsByCityKey = async (cityKey,cityName) => {
    try {
      // console.log('cityKey',cityKey)
      const currentWeatherDetails = await getCurrentConditions(cityKey,cityName); // Replace 'YourCityName' with the city you want to search for
      dispatch(setCurrentDay(currentWeatherDetails));
      // console.log(currentDay)
      // console.log('currentDay.cityKey:', currentDay);
      checkIsFavorite(currentWeatherDetails.cityKey);

      getNextFiveDaysConditionsByCityKey(cityKey);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const getNextFiveDaysConditionsByCityKey = async (cityKey) => {
    try {
      const nextFiveDaysDetails = await getNextFiveDaysConditions(cityKey); // Replace 'YourCityName' with the city you want to search for
      dispatch(setNextFiveDays(nextFiveDaysDetails));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getCityKeyByCityName(searchQuery)
    // console.log('favoritesList:', favoritesList);

    
    // console.log('useeffect happened')
  }, [ searchQuery]);

  const checkIsFavorite = (cityKey) => {
    const existingItemIndex = favoritesList?.findIndex(item => item.ID === cityKey);
    // console.log('existingItemIndex', existingItemIndex);
  
    if (existingItemIndex !== -1) {
      // dispatch(setIsFavorite1(true));
      console.log('setIsFavorite(true)')
      setIsFavorite(true)
      setHeartStyle('full-heart');
    } else {
      // dispatch(setIsFavorite1(false));
      console.log('setIsFavorite(false)')

      setIsFavorite(false)
      setHeartStyle('empty-heart');
    }
  
    // console.log('isFavorite', isFavorite); // This may not reflect the updated state immediately
  };
  

  const handleAddToFavorites = async () => {
    // const existingItemIndex = favoritesList?.findIndex(item => item.ID === currentDay.cityKey);
// console.log(favoritesList)
      if(!isFavorite)
      {
        const currentWeather={
          weatherText:currentDay.weather.weatherText,
          temperatureC:currentDay.weather.temperatureC,
          temperatureF:currentDay.weather.temperatureF,
          weatherIcon: currentDay.weather.weatherIcon
        }
        // console.log('handleAddToFavorites currentDay',currentDay)
      dispatch(addToFavorites({ ID: currentDay.cityKey,name:currentDay.cityName, currentWeather:currentWeather }));
      setIsFavorite(true)
      setHeartStyle('added')
      console.log(heartStyle)
      // dispatch(setIsFavorite1(true));
      // setIsAddFavoritePressed('added');
      }
    else
    {
      dispatch(removeFromFavorites(currentDay.cityKey));
      setIsFavorite(false)
      setHeartStyle('removed')
      console.log(heartStyle)

      // dispatch(setIsFavorite1(false));
      // setIsAddFavoritePressed('removed')
    }
  };

  return (
    <div id='weather-view'>
      <div id='weather-view-top'>
        <div id='weather-view-top-left'>
          <img
            id='current-weather-icon'
            src={`/weather icons/${currentDay?.weather?.weatherIcon}.png`}
            alt='current weather icon'
          />
          <div id='location-details'>
            <div id='city-name'>{currentDay.cityName}</div>
           
              {isFahrenheit ? (
                <div id='current-temperature'>
                {currentDay?.weather?.temperatureF} °F
                </div>
              ) : (
                <div id='current-temperature'>
                {currentDay?.weather?.temperatureC} °C
                </div>
              )}
          </div>
        </div>
        <h1 className='handlee-regular'>
          Discover your forecast, seize the day
        </h1>
        <div id='weather-view-top-right'>
          <HeartBtn heartStyle={heartStyle}/>
          <button id='add-to-favorites' className={isDarkMode ? 'dark-mode' :''} onClick={handleAddToFavorites} >
            {isFavorite ? 'Remove from Favorites': 'Add to Favorites'}
          </button>
        </div>
      </div>
      <div id='current-weather'>
        <h1>{currentDay?.weather?.weatherText}</h1>
      </div>
      <div id='weather-view-bottom'>
        {nextFiveDays.map((day, index) => (
          <div className='day' key={index}>
            <DayCard day={day} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherView;
