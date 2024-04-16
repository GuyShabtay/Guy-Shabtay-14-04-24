import axios from 'axios';
const apiKey=import.meta.env.VITE_API_KEY;


export const getCity = async (cityName) => {
  const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
  const query = `?apikey=${apiKey}&q=${cityName}`;
  try {
    const response = await axios.get(base + query);
    return response.data[0].Key;
  } catch (error) {
    console.error('Error fetching city:', error);
    throw error; // Rethrow the error to be caught by the caller
  }
};


export const getCurrentConditions = async (cityCode) => {
  const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
  const query = `${cityCode}?apikey=${apiKey}`;
  try {
    const response = await axios.get(base + query);
    return response.data[0];
  } catch (error) {
    console.error('Error fetching city:', error);
    throw error; 
  }
};


export const getNextFiveDaysConditions = async (cityCode) => {
  const base = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';
  const query = `${cityCode}?apikey=${apiKey}`;
  try {
    const response = await axios.get(base + query);
    let nextFiveDaysConditions=[]
    response.data.DailyForecasts.map((item, index) => {
      const minTemperatureC=Math.floor((item.Temperature.Minimum.Value -32) / 1.8);
      const maxTemperatureC = Math.floor((item.Temperature.Maximum.Value - 32) / 1.8);
      nextFiveDaysConditions.push({dayIcon:item.Day.Icon,minTemperatureF:item.Temperature.Minimum.Value,maxTemperatureF:item.Temperature.Maximum.Value,minTemperatureC:minTemperatureC,maxTemperatureC:maxTemperatureC})
        return null; // Make sure to return something to satisfy the map function
      });
    return nextFiveDaysConditions;
  } catch (error) {
    console.error('Error fetching city:', error);
    throw error; 
  }
};





// // Usage example
// getCity('manchester')
//   .then((data) => console.log(data))
//   .catch((error) => console.error(error)); // Log the error properly
