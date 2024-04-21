import axios from 'axios';
const apiKey = import.meta.env.VITE_API_KEY;
// const cityKey = useSelector((state) => state.weatherConditions.currentDay.cityKey);

export const getCityName = async (cityName) => {

  console.log(cityName)
  const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
  const query = `?apikey=${apiKey}&q=${cityName}`;
  try {
    // console.log(base + query)
    const response = await axios.get(base + query);
    // console.log(response.data[0].Key)

    return response.data[0].Key;
  } catch (error) {
    console.error('Error fetching city name:', error);
    throw error; // Rethrow the error to be caught by the caller
  }
};

export const getCurrentConditions = async (cityKey, cityName) => {
  const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
  const query = `${cityKey}?apikey=${apiKey}`;
  try {
    const currentDetails = (await axios.get(base + query)).data[0];
    let currentConditions = {
      cityKey: cityKey, // Assigning cityName to cityKey, assuming it's correct
      cityName: cityName, // Assigning cityKey to cityName, assuming it's correct
      // localDate:currentDetails.LocalObservationDateTime,
      weather: {
        weatherText: currentDetails.WeatherText,
        weatherIcon: currentDetails.WeatherIcon,
        temperatureC: Math.floor(currentDetails.Temperature.Metric.Value),
        temperatureF: Math.floor(currentDetails.Temperature.Imperial.Value),
      },
    };
    // console.log('currentConditions', currentConditions);
    return currentConditions;
  } catch (error) {
    console.error('Error fetching city conditions:', error);
    throw error;
  }
};


export const getNextFiveDaysConditions = async (cityKey) => {
  const base = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';
  const query = `${cityKey}?apikey=${apiKey}`;
  try {
    const response = await axios.get(base + query);
    let nextFiveDaysConditions = [];
    response.data.DailyForecasts.map((item, index) => {
      const minTemperatureC = fahrenheitToCelsius(
        item.Temperature.Minimum.Value
      );
      const maxTemperatureC = fahrenheitToCelsius(
        item.Temperature.Maximum.Value
      );
      nextFiveDaysConditions.push({
        dayIcon: item.Day.Icon,
        localDate:item.Date,
        minTemperatureF: item.Temperature.Minimum.Value,
        maxTemperatureF: item.Temperature.Maximum.Value,
        minTemperatureC: minTemperatureC,
        maxTemperatureC: maxTemperatureC,
      });
      return null; // Make sure to return something to satisfy the map function
    });
    return nextFiveDaysConditions;
  } catch (error) {
    console.error('Error fetching next five days conditions:', error);
    throw error;
  }
};

export const getAutoComplete = async (searchInput) => {
  const base = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete';
  const query = `?apikey=${apiKey}&q=${searchInput}`;
  try {
    const autoComplitions = await axios.get(base + query);
    const maxFiveAutoComplitions=autoComplitions.data.slice(0, 5); // Limit the maximum number of items to 5
    const autoComplitionsCitiesNames=maxFiveAutoComplitions.map((item, index) => {
        return item.LocalizedName;
    });
  const citiesNamesWithoutDuplicates = [...new Set(autoComplitionsCitiesNames)];
    return citiesNamesWithoutDuplicates;
  } catch (error) {
    console.error('Error fetching auto complete:', error);
    throw error;
  }
};


const fahrenheitToCelsius = (fahrenheitTemperature) => {
  return Math.floor((fahrenheitTemperature - 32) / 1.8);
};

let coordinates = {
  latitude:32.0853,
  longitude:34.7818
}; // Variable to store the coordinates

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
function success(pos) {
  coordinates = pos.coords;
  console.log(coordinates)
  return coordinates;
}
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
// console.log('1a',navigator.geolocation.getCurrentPosition(success, error, options))
navigator.geolocation.getCurrentPosition(success, error, options);

export const getGeoLocation = async () => {
  
  try {
    console.log('hi')
   
    
    
  } catch (error) {
    console.error('Error fetching auto complete:', error);
    throw error;
  }
};








export const getCityKeyAndNameByGeoLocation = async () => {
  // console.log('check')

  console.log('coordinates',coordinates)
  const currentCoordinates=`${coordinates.latitude},${coordinates.longitude}`
  // console.log('currentCoordinates',currentCoordinates)
  const base = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search';
  const query = `?apikey=${apiKey}&q=${currentCoordinates}`;
  try {
    const currentCityDetails = await axios.get(base + query);
    // console.log('currentCityDetails',currentCityDetails)
    // console.log('currentCityDetails.data',currentCityDetails.data)
    const cityDetails={
      cityKey:currentCityDetails.data.Key,
      cityName:currentCityDetails.data.LocalizedName
    }
    // console.log('cityDetails',cityDetails)
    return cityDetails;
  } catch (error) {
    console.error('Error fetching auto complete:', error);
    throw error;
  }
};