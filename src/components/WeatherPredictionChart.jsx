import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';
import { FaBars } from 'react-icons/fa'; // Import bars icon

const apiKey = import.meta.env.VITE_WEATHER_APP_API_KEY;
const apiUrl = import.meta.env.VITE_FORECAST_APP_API_URL;

console.log("API Key:", apiKey);
console.log("API URL:", apiUrl);

const WeatherPredictionChart = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Temperature (°C)",
        data: [], // Will be filled with fetched data
      },
      {
        name: "Rain Probability (%)",
        data: [], // Will be filled with fetched data
      },
      {
        name: "Wind Speed (m/s)",
        data: [], // Will be filled with fetched data
      },
    ],
  });

  const [precipitationData, setPrecipitationData] = useState([]);
  const [showPrecipitation, setShowPrecipitation] = useState(false);
  const [locationInfo, setLocationInfo] = useState({ city: '', country: '' });
  const [categories, setCategories] = useState([]); // For x-axis categories




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

        const temperatureData = dailyData.map(item => item.main.temp);
        const rainProbabilityData = dailyData.map(item => item.pop * 100);
        const windSpeedData = dailyData.map(item => item.wind.speed);
        const precipitationData = dailyData.map(item => item.rain ? item.rain['3h'] : 0);
        const dates = dailyData.map(item => new Date(item.dt_txt).toLocaleDateString('en-US', { weekday: 'short' }));

        setChartData({
          series: [
            {
              name: "Temperature (°C)",
              data: temperatureData,
            },
            {
              name: "Rain Probability (%)",
              data: rainProbabilityData,
            },
            {
              name: "Wind Speed (m/s)",
              data: windSpeedData,
            },
          ],
        });

        setPrecipitationData(precipitationData);
        console.log("Rain",precipitationData);
        setCategories(dates);

        setLocationInfo({
          city: data.city.name,
          country: data.city.country,
        });
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  };

  const chartOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      type: "line",
      height: 320,
      stacked: false,
    },
    colors: ["#FFA500", "#1E90FF", "#32CD32"], // Orange for temperature, blue for rain probability, green for wind speed
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      categories: categories, // Set categories for x-axis
    },
  };

  const precipitationChartOptions = {
    chart: {
      type: 'bar',
      height: 320,
    },
    xaxis: {
      categories: categories,
    },
    colors: ["#00BFFF"], // DeepSkyBlue for precipitation
  };

  return (
    <div>
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <input
          type="text"
          id="locationInput"
          placeholder="Enter location"
          style={{
            padding: '10px',
            border: '2px solid #1E90FF',
            borderRadius: '5px 0 0 5px',
            outline: 'none',
            fontSize: '16px'
          }}
        />
        <button
          id="searchButton"
          onClick={() => fetchWeather(document.getElementById('locationInput').value)}
          style={{
            padding: '10px 20px',
            border: '2px solid #1E90FF',
            borderLeft: 'none',
            borderRadius: '0 5px 5px 0',
            backgroundColor: '#1E90FF',
            color: 'white',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#1C86EE'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#1E90FF'}
        >
          Search
        </button>
      </div>
      <div style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '16px', fontWeight: 'bold' }}>
        {locationInfo.city}, {locationInfo.country}
      </div>
      <div style={{ position: 'relative' }}>
        <Chart options={chartOptions} series={chartData.series} type="line" height={320} />
        <button
          onClick={() => setShowPrecipitation(!showPrecipitation)}
          style={{
            position: 'absolute',
            top: '-20px', // Adjusted top position
            right: '5px',
            padding: '10px',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <FaBars size={24} color="#808080" /> {/* Changed color to grey */}
        </button>
      </div>
      {showPrecipitation && (
        <Chart options={precipitationChartOptions} series={[{ name: 'Precipitation (mm)', data: precipitationData }]} type="bar" height={320} />
      )}
    </div>
  );
};

export default WeatherPredictionChart;