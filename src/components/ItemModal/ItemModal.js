import useEscape from "../../hooks/useEscape";
import "./ItemModal.css";

const ItemModal = ({ onClose, selectedItem, confirmDelete }) => {
  useEscape(onClose);

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
