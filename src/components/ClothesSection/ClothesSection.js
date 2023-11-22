import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

const ClothesSection = ({
  allClothesList,
  handleAddClick,
  handleCardClick,
  onCardLike,
}) => {
  const { currentUser } = useContext(CurrentUserContext);
  const userCardsList = allClothesList.filter(
    (item) => item.owner === currentUser._id
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__header-wrapper">
        <h2 className="clothes-section__title">Your items</h2>
        <button
          type="button"
          className="clothes-section__add-clothes"
          onClick={handleAddClick}
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__cards-list">
        {userCardsList.map((item) => {
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
    </div>
  );
};

export default ClothesSection;
