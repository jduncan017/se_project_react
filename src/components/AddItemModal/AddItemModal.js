import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

const AddItemModal = ({ onClose, isOpen, handleAddItems, buttonDisplay }) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const formInfo = {
    title: "New Garment",
    name: "add-clothes",
    buttonText: buttonDisplay,
  };

  /* --------------------------------------- */
  /*                 Handlers                */
  /* --------------------------------------- */
  function handleSubmit(e) {
    e.preventDefault();
    const newItem = { ...values, _id: uuidv4() };
    handleAddItems(newItem);
  }

  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  return (
    <ModalWithForm
      formInfo={formInfo}
      onClose={onClose}
      handleSubmit={handleSubmit}
      buttonState={isValid}
    >
      <label className="form-modal__form-label" htmlFor="name">
        Name
      </label>
      <input
        className="form-modal__form-input"
        type="text"
        id="name"
        name="name"
        placeholder="Name"
        minLength="1"
        maxLength="30"
        required
        onChange={handleChange}
        value={values.name || ""}
      />
      <span className="form-modal__error" id="name-error">
        {errors.name || ""}
      </span>
      <label className="form-modal__form-label" htmlFor="link">
        Image
      </label>
      <input
        className="form-modal__form-input"
        id="link"
        name="imageUrl"
        placeholder="Image link"
        type="url"
        required
        onChange={handleChange}
        value={values.imageUrl || ""}
      />
      <span className="form-modal__error" id="link-error">
        {errors.imageUrl || ""}
      </span>
      <h3 className="add-clothes-modal__radio-selector-title">
        Select the weather type:
      </h3>
      <div className="add-clothes-modal__radio-selector-container">
        <input
          className="add-clothes-modal__radio-selector"
          type="radio"
          id="hot"
          name="weather"
          value="hot"
          onChange={handleChange}
          checked={values.weather === "hot"}
        />
        <label className="add-clothes-modal__radio-selector-name" htmlFor="hot">
          Hot
        </label>
      </div>
      <div className="add-clothes-modal__radio-selector-container">
        <input
          className="add-clothes-modal__radio-selector"
          type="radio"
          id="warm"
          name="weather"
          value="warm"
          onChange={handleChange}
          checked={values.weather === "warm"}
        />
        <label
          className="add-clothes-modal__radio-selector-name"
          htmlFor="warm"
        >
          Warm
        </label>
      </div>
      <div className="add-clothes-modal__radio-selector-container">
        <input
          className="add-clothes-modal__radio-selector"
          type="radio"
          id="cold"
          name="weather"
          value="cold"
          onChange={handleChange}
          checked={values.weather === "cold"}
        />
        <label
          className="add-clothes-modal__radio-selector-name"
          htmlFor="cold"
        >
          Cold
        </label>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
