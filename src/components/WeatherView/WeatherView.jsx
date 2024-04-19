import React, { useState,useEffect } from 'react';
import './WeatherView.css';
import HeartBtn from '../HeartBtn/HeartBtn';
import DayCard from '../DayCard/DayCard';
import {
  getCityName,
  getCurrentConditions,
  getNextFiveDaysConditions,
} from '../../ApiCalls';
import { useSelector,useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../redux/FavoritesList';
import {setCurrentDay,setNextFiveDays} from '../../redux/WeatherConditions'

const WeatherView = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
  const [currentWeatherConditions, setCurrentWeatherConditions] = useState({});
  const [cityName, setCityName] = useState('london');
  const [cityKey, setCityKey] = useState('');
  const [nextFiveDaysConditions, setNextFiveDaysConditions] = useState([]);
  const [temperatureScale, setTemperatureScale] = useState('°C');
  const [addOrRemoveFavorite, setAddOrRemoveFavorite] = useState('');
  const [isAddFavoritePressed, setIsAddFavoritePressed] = useState('initial');
  const [isFavorite, setIsFavorite] = useState(true);
  const [heartStyle, setHeartStyle] = useState('empty-heart');
  const favoritesList = useSelector((state) => state.favoritesList);
  const isFahrenheit = useSelector(
    (state) => state.temperatureScale.isFahrenheit
  );
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const currentDay = useSelector((state) => state.weatherConditions.currentDay);
  const searchQuery = useSelector((state) => state.search.searchQuery);
  const nextFiveDays = useSelector((state) => state.weatherConditions.nextFiveDays);


  const dispatch = useDispatch();


  useEffect(() => {
    const getCityKeyByCityName = async () => {
      try {
        if(searchQuery && searchQuery.length>0)
        {
        const cityKey = await getCityName(searchQuery); // Replace 'YourCityName' with the city you want to search for
        // setCityKey(cityKey);
        getCurrentWeatherConditionsByCityKey();
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const getCurrentWeatherConditionsByCityKey = async () => {
      try {
        console.log('cityKey',cityKey)
        const currentWeatherDetails = await getCurrentConditions(cityKey,cityName); // Replace 'YourCityName' with the city you want to search for
        // setCurrentWeatherConditions(currentWeatherDetails);
        // setCurrentWeatherConditions(currentWeatherDetails);
        dispatch(setCurrentDay(currentWeatherDetails));
        console.log(currentWeatherDetails)
        console.log(currentDay)
        
        getNextFiveDaysConditionsByCityKey(cityKey);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    const getNextFiveDaysConditionsByCityKey = async (cityKey) => {
      try {
        const nextFiveDaysDetails = await getNextFiveDaysConditions(cityKey); // Replace 'YourCityName' with the city you want to search for
        // setNextFiveDaysConditions(nextFiveDaysDetails);
        dispatch(setNextFiveDays(nextFiveDaysDetails));
        // console.log(nextFive)
      } catch (error) {
        console.error('Error:', error);
      }
    };
    getCityKeyByCityName(cityName)


  }, [favoritesList, searchQuery]);

  const checkIsFavorite =  (cityKey) => {
    
    // setIsFavorite(favoritesList.some(item => item.ID === cityKey));
    // console.log('checkIsFavorite',isFavorite)

  };
  // useEffect(() => {
  //   // setIsFavorite(favoritesList.some(item => item.ID === cityKey));
  //   // setIsFavorite(favoritesList.findIndex(item => item.ID === cityKey));
  // }, [favoritesList]); 

  // const isFavorite = (favoritesList) => {
  //   return state.some(item => item.ID === ID);

  // };
  const handleAddToFavorites = async () => {
    const existingItemIndex = favoritesList?.findIndex(item => item.ID === currentDay.cityKey);
console.log(favoritesList)
      if(existingItemIndex === -1 )
      {
        const currentWeather={
          weatherText:currentDay.weatherText,
          temperatureC:currentDay.temperatureC,
          temperatureF:currentDay.temperatureF,
          weatherIcon: currentDay.weatherIcon
        }
      dispatch(addToFavorites({ ID: cityKey,name:cityName, currentWeather:currentWeather }));
      setHeartStyle('added')
      setIsFavorite(false);
      setIsAddFavoritePressed('added');
      }
    else
    {
      dispatch(removeFromFavorites(cityKey));
      setHeartStyle('removed')
      setIsFavorite(true)
      setIsAddFavoritePressed('removed')
    }
  };

//   const handleAddToFavorites0 = async () => {
//     try {
//       const cityKey = await getCity(city); // Replace 'YourCityName' with the city you want to search for
//       // console.log('Print the result',cityKey); // Print the result
//       setCityKey(cityKey);
//       checkIsFavorite(cityKey);
//     //   if (isFavorite)
//     //   setAddOrRemoveFavorite('add')
//     // else
//     //   setAddOrRemoveFavorite('remove')
//     console.log('addOrRemoveFavorite',addOrRemoveFavorite)
//       handleAddToFavorites1(cityKey);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };
//   const handleAddToFavorites1 = async (cityKey) => {
//     try {
//       const currentWeatherDetails = await getCurrentConditions(cityKey); // Replace 'YourCityName' with the city you want to search for
//       setCurrentWeatherConditions(currentWeatherDetails);
//       console.log('isAddToFavorites',isAddToFavorites)
//       const existingItemIndex = favoritesList?.findIndex(item => item.ID === '328328');
// console.log(favoritesList)
//       if(existingItemIndex === -1 )
//       {
//       dispatch(addToFavorites({ ID: cityKey,name:city, currentWeather:currentWeatherDetails.weatherText }));
//       setIsFavorite(true)
//       setIsAddToFavorites(true)
//       }
//     else
//     {
//       dispatch(removeFromFavorites(cityKey));
//       setIsFavorite(false)
//       setIsAddToFavorites(false)
//     }


//       // setAddOrRemoveFavorite(true);
//       console.log('favoritesList',favoritesList[0])
//       // console.log('setAddOrRemoveFavorite',addOrRemoveFavorite)
//       // console.log('setIsFavorite',isFavorite)
//       handleAddToFavorites2(cityKey);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };
//   const handleAddToFavorites2 = async (cityKey) => {
//     try {
//       const nextFiveDaysDetails = await getNextFiveDaysConditions(cityKey); // Replace 'YourCityName' with the city you want to search for
//       setNextFiveDaysConditions(nextFiveDaysDetails);
//       console.log(nextFiveDaysDetails);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

  return (
    <div id='weather-view'>
      <div id='weather-view-top'>
        <div id='weather-view-top-left'>
          <img
            id='current-weather-icon'
            src={`/weather icons/${currentDay.weatherIcon}.png`}
            alt='current weather icon'
          />
          <div id='location-details'>
            <div id='city-name'>{Name}</div>
           
              {isFahrenheit ? (
                <div id='current-temperature'>
                {currentDay.temperatureF} °F
                </div>
              ) : (
                <div id='current-temperature'>
                {currentDay.temperatureC} °C
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
            {isFavorite ? 'Add to Favorites': 'Remove From Favorites'}
          </button>
        </div>
      </div>
      <div id='current-weather'>
        <h1>{currentDay.weatherText}</h1>
      </div>
      <div id='weather-view-bottom'>
        {nextFiveDays.map((day, index) => (
          <div className='day' key={index}>
            <DayCard dayName={days[index]} day={day} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherView;
