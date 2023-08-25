import React from "react";
import "./ItemCard.css";

const ItemCard = ({ handleClick, clothingItem }) => {
  return (
    <div className="card__container">
      <h2 className="card__title">{clothingItem.name}</h2>
      <img
        src={clothingItem.imageUrl}
        alt={clothingItem.name}
        className="card__image"
        onClick={handleClick}
      ></img>
    </div>
  );
};

export default ItemCard;
