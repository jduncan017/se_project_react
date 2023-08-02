import React from "react";
import "./AddClothesForm.css";

const AddClothesForm = () => {
  return (
    <>
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
        />
        <label
          className="add-clothes-modal__radio-selector-name"
          htmlFor="cold"
        >
          Cold
        </label>
      </div>
    </>
  );
};

export default AddClothesForm;
