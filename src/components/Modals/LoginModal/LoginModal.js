import "./LoginModal.css";
import ModalWithForm from "../../Modals/ModalWithForm/ModalWithForm";
import { useEffect } from "react";
import { useFormAndValidation } from "../../../hooks/useFormAndValidation";

const SignUpModal = ({ onClose, isOpen, handleLogin, handleClick }) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const formInfo = {
    title: "Log in",
    name: "login",
    buttonText: "Log in",
  };

  const loginButton = [
    {
      text: "or Sign up",
      onClick: () => {
        handleClick("signup");
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
    handleLogin(values);
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
        Email
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
        Password
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
    </ModalWithForm>
  );
};

export default SignUpModal;