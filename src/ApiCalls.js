import axios from 'axios';
const apiKey = import.meta.env.VITE_API_KEY;

export const getCityName = async (cityName) => {
  const base = 'https://dataservice.accuweather.com/locations/v1/cities/search';
  const query = `?apikey=${apiKey}&q=${cityName}`;
  try {
    const response = await axios.get(base + query);
    return response.data[0].Key;
  } catch (error) {
    console.error('Error fetching city name:', error);
    throw error;
  }
};

export const getCurrentConditions = async (cityKey, cityName) => {
  const base = 'https://dataservice.accuweather.com/currentconditions/v1/';
  const query = `${cityKey}?apikey=${apiKey}`;
  try {
    const currentDetails = (await axios.get(base + query)).data[0];
    let currentConditions = {
      cityKey: cityKey,
      cityName: cityName,
      weather: {
        weatherText: currentDetails.WeatherText,
        weatherIcon: currentDetails.WeatherIcon,
        temperatureC: Math.floor(currentDetails.Temperature.Metric.Value),
        temperatureF: Math.floor(currentDetails.Temperature.Imperial.Value),
      },
    };
    return currentConditions;
  } catch (error) {
    console.error('Error fetching current city conditions:', error);
    throw error;
  }
};

export const getNextFiveDaysConditions = async (cityKey) => {
  const base = 'https://dataservice.accuweather.com/forecasts/v1/daily/5day/';
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
        localDate: item.Date,
        minTemperatureF: item.Temperature.Minimum.Value,
        maxTemperatureF: item.Temperature.Maximum.Value,
        minTemperatureC: minTemperatureC,
        maxTemperatureC: maxTemperatureC,
      });
      return null;
    });
    return nextFiveDaysConditions;
  } catch (error) {
    console.error('Error fetching next five days conditions:', error);
    throw error;
  }
};

export const getAutoComplete = async (searchInput) => {
  const base =
    'https://dataservice.accuweather.com/locations/v1/cities/autocomplete';
  const query = `?apikey=${apiKey}&q=${searchInput}`;
  try {
    const autoComplitions = await axios.get(base + query);
    const maxFiveAutoComplitions = autoComplitions.data.slice(0, 5);
    const autoComplitionsCitiesNames = maxFiveAutoComplitions.map(
      (item, index) => {
        return item.LocalizedName;
      }
    );
    const citiesNamesWithoutDuplicates = [
      ...new Set(autoComplitionsCitiesNames),
    ];
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
  latitude: 32.109333,
  longitude: 34.855499,
};

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
function success(pos) {
  coordinates = pos.coords;
  return coordinates;
}
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
navigator.geolocation.getCurrentPosition(success, error, options);

export const getCityKeyAndNameByGeoLocation = async () => {
  const currentCoordinates = `${coordinates.latitude},${coordinates.longitude}`;
  const base =
    'https://dataservice.accuweather.com/locations/v1/cities/geoposition/search';
  const query = `?apikey=${apiKey}&q=${currentCoordinates}`;
  try {
    const currentCityDetails = await axios.get(base + query);
    const cityDetails = {
      cityKey: currentCityDetails.data.Key,
      cityName: currentCityDetails.data.LocalizedName,
    };
    return cityDetails;
  } catch (error) {
    console.error('Error fetching city key and name by geoLocation:', error);
    throw error;
  }
};
