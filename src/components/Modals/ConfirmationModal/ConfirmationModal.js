import React from "react";
import "./ConfirmationModal.css";
import useEscape from "../../../hooks/useEscape";

const ConfirmationModal = ({
  onClose,
  handleDelete,
  selectedItem,
  buttonDisplay,
}) => {
  useEscape(onClose);
  return (
    <div className="modal confirmation-modal">
      <div className="modal__overlay" onClick={onClose}></div>
      <div className="confirmation-modal__container">
        <h2 className="confirmation-modal__query">
          Are you sure you want to delete this item?
        </h2>
        <h2 className="confirmation-modal__warning">
          This action is irreversible.
        </h2>
        <button
          type="button"
          className="confirmation-modal__delete"
          onClick={() => {
            handleDelete(selectedItem);
          }}
        >
          {buttonDisplay}
        </button>
        <button
          type="button"
          className="confirmation-modal__cancel"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="modal__close-button"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
