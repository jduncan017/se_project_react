import React, { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import WeatherCard from "../WeatherCard/WeatherCard";

const Main = ({ weatherData, allClothesList, handleCardClick }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temperature = weatherData.temp.currentTemperatureUnit;

  const filteredList = allClothesList.filter((item) => {
    return item.weather === weatherData.tempCategory;
  });

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <h2 className="main__info">
        Today is {temperature}° {currentTemperatureUnit} / You may want to wear:
      </h2>
      <ul className="main__card-list">
        {filteredList.map((item) => {
          return (
            <ItemCard
              handleClick={handleCardClick(item)}
              clothingItem={item}
              key={item.id}
            />
          );
        })}
      </ul>
    </main>
  );
};

export default Main;
