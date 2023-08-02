import React from "react";
import "./WeatherCard.css";

const WeatherCard = ({ weatherData }) => {
  if (!weatherData) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className="weather__card"
      style={{ backgroundImage: `url(${weatherData.weatherImagePath})` }}
    >
      <h1 className="weather__card-temperature">{`${Math.round(
        weatherData.temp
      )}°F`}</h1>
    </div>
  );
};
export default WeatherCard;
