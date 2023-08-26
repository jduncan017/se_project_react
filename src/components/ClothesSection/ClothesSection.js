import "./ClothesSection.css";

const ClothesSection = ({ cardsList, handleClick }) => {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header-wrapper">
        <h2 className="clothes-section__title">Your items</h2>
        <button
          type="button"
          className="clothes-section__add-clothes"
          onClick={handleClick}
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__cards-list">{cardsList}</ul>
    </div>
  );
};

export default ClothesSection;
