import "./SignUpModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect } from "react";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

const SignUpModal = ({ onClose, isOpen, handleSignup, handleClick }) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const formInfo = {
    title: "Sign up",
    name: "sign-up",
    buttonText: "Next",
  };

  const loginButton = [
    {
      text: "or Log in",
      onClick: () => {
        handleClick("login");
      },
      type: "submit",
      disabled: false,
    },
  ];

  /* --------------------------------------- */
  /*                 Handlers                */
  /* --------------------------------------- */
  function handleSubmit(e) {
    e.preventDefault();
    const newUser = { values };
    handleSignup(newUser);
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
        Email*
      </label>
      <input
        className="form-modal__form-input"
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        minLength="1"
        maxLength="30"
        required
        onChange={handleChange}
        value={values.email || ""}
      />
      <span className="form-modal__error" id="name-error">
        {errors.email || ""}
      </span>
      <label className="form-modal__form-label" htmlFor="name">
        Password*
      </label>
      <input
        className="form-modal__form-input"
        type="text"
        id="password"
        name="password"
        placeholder="Password"
        minLength="1"
        maxLength="30"
        required
        onChange={handleChange}
        value={values.password || ""}
      />
      <span className="form-modal__error" id="name-error">
        {errors.password || ""}
      </span>
      <label className="form-modal__form-label" htmlFor="name">
        Name*
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
        Avatar URL
      </label>
      <input
        className="form-modal__form-input"
        id="link"
        name="avatar"
        placeholder="Image link"
        type="url"
        required
        onChange={handleChange}
        value={values.avatar || ""}
      />
      <span className="form-modal__error" id="link-error">
        {errors.avatar || ""}
      </span>
    </ModalWithForm>
  );
};

export default SignUpModal;
