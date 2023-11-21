import React, { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import WeatherCard from "../WeatherCard/WeatherCard";

const Main = ({ weatherData, allClothesList, handleCardClick, onCardLike }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temperature = weatherData.temp[currentTemperatureUnit];

  const filteredList = allClothesList
    .filter((item) => {
      return item.weather === weatherData.tempCategory;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

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
              key={item._id}
              handleClick={handleCardClick(item)}
              clothingItem={item}
              onCardLike={onCardLike}
            />
          );
        })}
      </ul>
    </main>
  );
};

export default Main;
