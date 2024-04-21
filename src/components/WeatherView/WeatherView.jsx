import React, { useState, useEffect } from 'react';
import './WeatherView.css';
import HeartBtn from '../HeartBtn/HeartBtn';
import DayCard from '../DayCard/DayCard';
import {
  getCityName,
  getCurrentConditions,
  getNextFiveDaysConditions,
  getCityKeyAndNameByGeoLocation,
} from '../../ApiCalls';
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../redux/FavoritesList';
import { setCurrentDay, setNextFiveDays } from '../../redux/WeatherConditions';
import { Toaster, toast } from 'sonner';

const WeatherView = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [heartStyle, setHeartStyle] = useState('empty-heart');
  const favoritesList = useSelector((state) => state.favoritesList.favorites);
  const isFahrenheit = useSelector(
    (state) => state.temperatureScale.isFahrenheit
  );
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const currentDay = useSelector((state) => state.weatherConditions.currentDay);
  const searchQuery = useSelector((state) => state.search.searchQuery);
  const nextFiveDays = useSelector(
    (state) => state.weatherConditions.nextFiveDays
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const getCityDetailsByGeoLocation = async () => {
      try {
        const cityDetails = await getCityKeyAndNameByGeoLocation();
        const { cityKey, cityName } = cityDetails;
        getCurrentWeatherConditionsByCityKey(cityKey, cityName);
      } catch (error) {
        console.error('Error:', error);
        toast.error(error);
      }
    };
    getCityDetailsByGeoLocation();
  }, []);

  const getCityKeyByCityName = async () => {
    try {
      if (searchQuery && searchQuery.length > 0) {
        const cityKey = await getCityName(searchQuery);
        getCurrentWeatherConditionsByCityKey(cityKey, searchQuery);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error);
    }
  };

  const getCurrentWeatherConditionsByCityKey = async (cityKey, cityName) => {
    try {
      const currentWeatherDetails = await getCurrentConditions(
        cityKey,
        cityName
      );
      dispatch(setCurrentDay(currentWeatherDetails));
      checkIsFavorite(currentWeatherDetails.cityKey);
      getNextFiveDaysConditionsByCityKey(cityKey);
    } catch (error) {
      console.error('Error:', error);
      toast.error(error);
    }
  };
  const getNextFiveDaysConditionsByCityKey = async (cityKey) => {
    try {
      const nextFiveDaysDetails = await getNextFiveDaysConditions(cityKey);
      dispatch(setNextFiveDays(nextFiveDaysDetails));
    } catch (error) {
      console.error('Error:', error);
      toast.error(error);
    }
  };

  useEffect(() => {
    getCityKeyByCityName(searchQuery);
  }, [searchQuery]);

  const checkIsFavorite = (cityKey) => {
    const existingItemIndex = favoritesList?.findIndex(
      (item) => item.ID === cityKey
    );
    if (existingItemIndex !== -1) {
      setIsFavorite(true);
      setHeartStyle('full-heart');
    } else {
      setIsFavorite(false);
      setHeartStyle('empty-heart');
    }
  };

  const handleAddToFavorites = async () => {
    if (!isFavorite) {
      const currentWeather = {
        weatherText: currentDay.weather.weatherText,
        temperatureC: currentDay.weather.temperatureC,
        temperatureF: currentDay.weather.temperatureF,
        weatherIcon: currentDay.weather.weatherIcon,
      };
      dispatch(
        addToFavorites({
          ID: currentDay.cityKey,
          name: currentDay.cityName,
          currentWeather: currentWeather,
        })
      );
      setIsFavorite(true);
      setHeartStyle('added');
    } else {
      dispatch(removeFromFavorites(currentDay.cityKey));
      setIsFavorite(false);
      setHeartStyle('removed');
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
          <HeartBtn heartStyle={heartStyle} />
          <button
            id='add-to-favorites'
            className={isDarkMode ? 'dark-mode' : ''}
            onClick={handleAddToFavorites}
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
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
      <Toaster richColors />
    </div>
  );
};

export default WeatherView;
