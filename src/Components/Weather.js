import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Weather() {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    async function fetchWeather() {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Lahore&appid=0a4481b57358df69dca7f995d0bd64db`);
      setWeather(response.data);
    }
    fetchWeather();
  }, []);

  return (
    <div>
      <p>Temperature: {weather.main.temp}</p>
    </div>
  );
}

export default Weather;
