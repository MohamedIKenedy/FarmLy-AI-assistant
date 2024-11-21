import React, { useEffect } from 'react';

const WeatherDataFetcher = ({ setCurrentWeather }) => {
  console.log("API Key:", import.meta.env.VITE_REACT_APP_API_KEY);
  console.log("API URL:", import.meta.env.VITE_REACT_APP_API_URL);
  console.log("Air Pollution URL:", import.meta.env.VITE_REACT_APP_AIR_POLLUTION_URL);
  
  const apiKey = import.meta.env.VITE_WEATHER_APP_API_KEY;
  const apiUrl = import.meta.env.VITE_FORECAST_APP_API_URL;
  const airPollutionUrl = import.meta.env.VITE_POLLUTION_APP_AIR_POLLUTION_URL;

  useEffect(() => {
    fetch('http://localhost:8000/config') // Ensure the URL points to the correct backend server
      .then(response => response.json())
      .then(config => {
        const savedLocation = config.location || 'Lahore';
        console.log('Fetched location from config:', savedLocation);
        fetchWeather(savedLocation);
      })
      .catch(error => {
        console.error('Error fetching config:', error);
      });
  }, []);

  const fetchWeather = (location) => {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;
    console.log('Fetching weather data for location:', location);

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched weather data:', data);
        // Filter data to get only one entry per day (e.g., at 12:00 PM)
        const dailyData = data.list.filter(item => new Date(item.dt_txt).getHours() === 12);

        // Get today's weather data
        const todayWeather = dailyData[0];

        // Fetch air pollution data
        const { lat, lon } = data.city.coord;
        fetchAirPollution(lat, lon, todayWeather, data.city);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  };

  const fetchAirPollution = (lat, lon, todayWeather, cityData) => {
    const url = `${airPollutionUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const airQualityIndex = data.list[0].main.aqi;
        const airQuality = mapAirQuality(airQualityIndex);

        // Pass the current weather data to the parent component
        const currentWeather = {
          temperature: todayWeather.main.temp,
          rainProbability: todayWeather.pop * 100,
          windSpeed: todayWeather.wind.speed,
          windDirection: todayWeather.wind.deg,
          pressure: todayWeather.main.pressure,
          rainfall: todayWeather.rain ? todayWeather.rain['3h'] : 0,
          precipitation: todayWeather.weather[0].description,
          city: cityData.name,
          country: cityData.country,
          uvIndex: todayWeather.main.uvi, // Assuming the API provides UV index in main
          airQuality: airQuality, // Air quality description
          humidity: todayWeather.main.humidity,
        };

        console.log('Current Weather:', currentWeather); // Debug log
        setCurrentWeather(currentWeather);
      })
      .catch(error => {
        console.error('Error fetching air pollution data:', error);
      });
  };

  const mapAirQuality = (index) => {
    switch (index) {
      case 1:
        return 'Good';
      case 2:
        return 'Fair';
      case 3:
        return 'Moderate';
      case 4:
        return 'Poor';
      case 5:
        return 'Very Poor';
      default:
        return 'Unknown';
    }
  };

  return null; // This component does not render anything
};

export default WeatherDataFetcher;