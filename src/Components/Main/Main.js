import React, { useContext } from "react";
import "./Main.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const Main = ({ weatherCard, weatherData, cardsList }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temperature = weatherData.temp[currentTemperatureUnit];

  return (
    <main className="main">
      {weatherCard}
      <h2 className="main__info">
        Today is {temperature}° {currentTemperatureUnit} / You may want to wear:
      </h2>
      <ul className="main__card-list">{cardsList}</ul>
    </main>
  );
};

export default Main;