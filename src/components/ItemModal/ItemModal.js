import useEscape from "../../hooks/useEscape";
import "./ItemModal.css";

const ItemModal = ({ onClose, modalImage, weather }) => {
  useEscape(onClose);

  return (
    <div className="modal image-modal" id="image-modal">
      <div className="modal__overlay" onClick={onClose}></div>
      <div className="image-modal__container">
        <img
          className="image-modal__image"
          alt={modalImage.name}
          src={modalImage.src}
        />
        <h2 className="image-modal__title">{modalImage.name}</h2>
        <h2 className="image-modal__description">{`Weather: ${weather}`}</h2>
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
