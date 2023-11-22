import { useContext } from "react";
import useEscape from "../../../hooks/useEscape";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";
import "./ItemModal.css";

const ItemModal = ({ onClose, selectedItem, confirmDelete }) => {
  useEscape(onClose);

  // current user data definitions
  const { currentUser } = useContext(CurrentUserContext);
  const isOwn = selectedItem.owner === currentUser._id;
  const deleteButtonClassName = `image-modal__delete ${
    isOwn ? "image-modal__delete_visible" : "image-modal__delete_hidden"
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
            className={deleteButtonClassName}
            onClick={() => {
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
