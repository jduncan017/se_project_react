import { React, useContext } from "react";
import "./ItemCard.css";
import likedButton from "../../images/likedButton.png";
import unlikedButton from "../../images/unlikedButton.png";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { AuthContext } from "../../contexts/AuthContext";

const ItemCard = ({ handleClick, clothingItem, onCardLike }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const { isLoggedIn } = useContext(AuthContext);
  const isLiked = clothingItem.likes.includes(currentUser._id);
  const likeButtonClassName = `card__like-button ${
    isLoggedIn ? "card__like-button_visible" : "card__like-button_hidden"
  }`;

  return (
    <div className="card__container">
      <div className="card__title-container">
        <h2 className="card__title">{clothingItem.name}</h2>
        <img
          className={likeButtonClassName}
          src={isLiked ? likedButton : unlikedButton}
          alt="like button"
          onClick={() =>
            onCardLike({
              cardId: clothingItem._id,
              isLiked: isLiked,
            })
          }
        ></img>
      </div>
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
