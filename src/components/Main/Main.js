import React from "react";
import "./Main.css";

const Main = ({ weatherCard, weatherData, cardsList }) => {
  return (
    <main className="main">
      {weatherCard}
      <h2 className="main__info">
        Today is {Math.round(weatherData.temp)}° F / You may want to wear:
      </h2>
      <ul className="main__card-list">{cardsList}</ul>
    </main>
  );
};

export default Main;
