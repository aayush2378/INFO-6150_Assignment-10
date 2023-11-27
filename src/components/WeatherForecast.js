// WeatherForecast.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DailyForecast from './DailyForecast';
import {WiDaySunny,WiCloud,WiDayRain,WiDaySnow} from 'weather-icons-react';
import '../App.css';

const WeatherForecast = () => {
  const [forecastData, setForecastData] = useState(null);
  const [currentTemp, setCurrentTemp] = useState(null);
  const [main,setMain]=useState()
  const apiKey = process.env.REACT_APP_API_KEY;
  console.log(apiKey);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [currentTempResponse, forecastResponse] = await Promise.all([
          axios.get(`https://api.openweathermap.org/data/2.5/weather?q=boston&units=metric&APPID=${apiKey}`),
          axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=boston&units=metric&APPID=${apiKey}`)
        ]);
  
        setCurrentTemp(currentTempResponse.data.main.temp);
        setMain(currentTempResponse.data.weather[0].main)
        setForecastData(forecastResponse.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Clear':
        return <WiDaySunny />;
      case 'Rain':
        return <WiDayRain />;
      case 'Clouds':
        return <WiCloud />;
      case 'Snow':
        return <WiDaySnow />;
      default:
        return null;
    }
  };
  
  return (
    <div>
      <div>

        <div className="weather-today">
        <h2><span className='weather-icon' style={{fontSize: 100}}>{getWeatherIcon(main)}</span> Boston Current Temperature: {currentTemp}°C</h2>
        </div>

        <br></br>
        <div className="daily">
          <DailyForecast forecastData={forecastData} />
        </div>
      </div>
      
    </div>
  );
};

export default WeatherForecast;
