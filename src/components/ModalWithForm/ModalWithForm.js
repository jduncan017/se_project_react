import useEscape from "../../hooks/useEscape";
import "./ModalWithForm.css";
import closeButton from "../../images/close-button-black.svg";

const ModalWithForm = ({
  onClose,
  formInfo,
  children,
  handleSubmit,
  buttonState,
}) => {
  useEscape(onClose);

  return (
    <div className="modal" id="add-clothes-modal">
      <div className="modal__overlay" onClick={onClose}></div>
      <div className="modal-with-form__container">
        <h1 className="modal-with-form__title">{formInfo.title}</h1>
        <button
          className="modal__close-button"
          type="button"
          onClick={onClose}
        />
        <form
          className="modal-with-form__inputs-container"
          name={`${formInfo.name}-form`}
          onSubmit={handleSubmit}
        >
          {children}
          <button
            className="modal-with-form__submit-button"
            type="submit"
            disabled={!buttonState}
          >
            {formInfo.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
