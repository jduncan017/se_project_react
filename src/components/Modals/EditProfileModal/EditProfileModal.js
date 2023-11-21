import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useContext } from "react";
import { useFormAndValidation } from "../../../hooks/useFormAndValidation";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

const EditProfileModal = ({ onClose, isOpen, handleProfileUpdate }) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();
  const { currentUser } = useContext(CurrentUserContext);

  const formInfo = {
    title: "Edit Profile",
    name: "edit-profile",
    buttonText: "Submit",
  };

  const loginButton = [
    {
      text: "Cancel",
      onClick: () => {
        onClose();
      },
      type: "button",
      disabled: false,
    },
  ];

  /* --------------------------------------- */
  /*                 Handlers                */
  /* --------------------------------------- */
  function handleSubmit(e) {
    e.preventDefault();
    handleProfileUpdate(values);
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
      extraButtons={loginButton}
    >
      <label className="form-modal__form-label" htmlFor="name">
        Name
      </label>
      <input
        className="form-modal__form-input"
        type="text"
        id="name"
        name="name"
        placeholder={currentUser.name}
        minLength="1"
        maxLength="30"
        onChange={handleChange}
        value={values.name || ""}
      />
      <span className="form-modal__error" id="name-error">
        {errors.name || ""}
      </span>
      <label className="form-modal__form-label" htmlFor="name">
        Email
      </label>
      <input
        className="form-modal__form-input"
        type="email"
        id="email"
        name="email"
        placeholder={currentUser.email}
        minLength="1"
        maxLength="30"
        onChange={handleChange}
        value={values.email || ""}
      />
      <span className="form-modal__error" id="name-error">
        {errors.email || ""}
      </span>
      <label className="form-modal__form-label" htmlFor="link">
        Profile Picture URL
      </label>
      <input
        className="form-modal__form-input"
        id="link"
        name="avatar"
        placeholder={currentUser.avatar || "Image Link"}
        type="url"
        onChange={handleChange}
        value={values.avatar || ""}
      />
      <span className="form-modal__error" id="link-error">
        {errors.avatar || ""}
      </span>
    </ModalWithForm>
  );
};

export default EditProfileModal;
