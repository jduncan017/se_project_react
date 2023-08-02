import React from "react";
import "./Main.css";

const Main = ({ weatherCard, weatherData, itemCard }) => {
  return (
    <div className="main">
      {weatherCard}
      <h2 className="main__info">
        Today is {Math.round(weatherData.temp)}° F / You may want to wear:
      </h2>
      <ul className="main__card-list">{itemCard}</ul>
    </div>
  );
};

export default Main;
