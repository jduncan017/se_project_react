import React, { useContext } from "react";
import "./WeatherCard.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const WeatherCard = ({ weatherData }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temperature = weatherData.temp[currentTemperatureUnit];

  if (!weatherData) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className="weather__card"
      style={{ backgroundImage: `url(${weatherData.weatherImagePath})` }}
    >
      <h1 className="weather__card-temperature">
        {temperature}°{currentTemperatureUnit}
      </h1>
    </div>
  );
};
export default WeatherCard;
