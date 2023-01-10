import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThermometerHalf } from "@fortawesome/free-solid-svg-icons";
function Weather() {

  //states
  
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Lahore&appid=0a4481b57358df69dca7f995d0bd64db`
        );
        setWeather(response.data);
      } catch (error) {
        setError(error);
      }
    }
    fetchWeather();
  }, []);

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  // converting to celsius 
  const temperatureCelsius = weather
    ? Math.round(weather.main.temp - 273.15)
    : null;

  return (
    <div style={{ textAlign: "right" }}>
      {temperatureCelsius ? (
        <div>
          <p>
            <FontAwesomeIcon icon={faThermometerHalf} /> {temperatureCelsius}{" "}
            &#8451;
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Weather;
