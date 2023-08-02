import React, { useEffect } from "react";
import "./ModalWithForm.css";

const ModalWithForm = ({ onClose, formInfo, children }) => {
  useEffect(() => {
    function handleEscClose(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", handleEscClose);

    return () => {
      window.removeEventListener("keydown", handleEscClose);
    };
  }, [onClose]);

  return (
    <>
      <div className="modal" id="add-clothes-modal">
        <div className="modal__overlay" onClick={onClose}></div>
        <div className="modal-with-form__container">
          <h1 className="modal-with-form__title">{formInfo.title}</h1>
          <button
            className="modal__close-button"
            type="button"
            onClick={onClose}
          ></button>
          <form
            className="modal-with-form__inputs-container"
            id={`${formInfo.name}-form`}
            name={`${formInfo.name}-form`}
          >
            {children}
            <button
              className="modal-with-form__submit-button"
              type="submit"
              id="image-submit-button"
              disabled
            >
              {formInfo.buttonText}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ModalWithForm;
