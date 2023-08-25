import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const AddItemModal = ({ onClose, isOpen, handleAddItems }) => {
  const [formState, setFormState] = useState({
    name: "",
    imageUrl: "",
    weather: "",
  });

  const formInfo = {
    title: "New Garment",
    name: "add-clothes",
    buttonText: "Add garment",
  };

  /* --------------------------------------- */
  /*                 Handlers                */
  /* --------------------------------------- */

  function handleChange(field) {
    return (event) => {
      setFormState({ ...formState, [field]: event.target.value });
    };
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newItem = { ...formState, _id: uuidv4() };
    handleAddItems(newItem);
    onClose();
  }

  useEffect(() => {
    setFormState({
      name: "",
      imageUrl: "",
      weather: "",
    });
  }, [isOpen]);

  return (
    <ModalWithForm
      formInfo={formInfo}
      onClose={onClose}
      handleSubmit={handleSubmit}
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
        onChange={handleChange("name")}
      />
      <span className="form-modal__error" id="name-error">
        Error Message Here
      </span>
      <label className="form-modal__form-label" htmlFor="link">
        Image
      </label>
      <input
        className="form-modal__form-input"
        id="link"
        name="link"
        placeholder="Image link"
        type="url"
        required
        onChange={handleChange("imageUrl")}
      />
      <span className="form-modal__error" id="link-error">
        Error Message Here
      </span>
      <h3 className="add-clothes-modal__radio-selector-title">
        Select the weather type:
      </h3>
      <div className="add-clothes-modal__radio-selector-container">
        <input
          className="add-clothes-modal__radio-selector"
          type="radio"
          id="hot"
          name="temperature"
          value="hot"
          onChange={handleChange("weather")}
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
          name="temperature"
          value="warm"
          onChange={handleChange("weather")}
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
          name="temperature"
          value="cold"
          onChange={handleChange("weather")}
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
