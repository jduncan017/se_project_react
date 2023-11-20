import useEscape from "../../../hooks/useEscape";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";
import "./ItemModal.css";

const ItemModal = ({ onClose, selectedItem, confirmDelete }) => {
  useEscape(onClose);
  console.log(selectedItem);

  // current user data definitions
  const { currentUser } = CurrentUserContext;
  const isOwn = selectedItem.owner === currentUser;
  const itemDeleteButtonClassName = `item__delete-button ${
    isOwn ? "item__delete-button_visible" : "item__delete-button_hidden"
  }`;

  return (
    <div className="modal image-modal" id="image-modal">
      <div className="modal__overlay" onClick={onClose}></div>
      <div className="image-modal__container">
        <img
          className="image-modal__image"
          alt={selectedItem.name}
          src={selectedItem.imageUrl}
        />
        <div className="image-modal__title-wrapper">
          <h2 className="image-modal__title">{selectedItem.name}</h2>
          <button
            type="button"
            className="image-modal__delete"
            onClick={() => {
              onClose();
              confirmDelete();
            }}
          >
            Delete item
          </button>
        </div>
        <h2 className="image-modal__description">{`Weather: ${selectedItem.weather}`}</h2>
        <button
          className="modal__close-button"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
};

export default ItemModal;
