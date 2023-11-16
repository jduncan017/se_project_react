import useEscape from "../../hooks/useEscape";
import "./ModalWithForm.css";
const ModalWithForm = ({
  onClose,
  formInfo,
  children,
  handleSubmit,
  buttonState,
  extraButtons,
}) => {
  useEscape(onClose);

  return (
    <div className="modal" id="add-clothes-modal">
      <div className="modal__overlay" onClick={onClose} />
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
          <div className="modal-with-form__button-wrapper">
            <button
              className="modal-with-form__submit-button"
              type="submit"
              disabled={!buttonState}
            >
              {formInfo.buttonText}
            </button>
            {extraButtons &&
              extraButtons.map((btn, index) => (
                <button
                  key={index}
                  className={btn.className || "modal-with-form__extra-button"}
                  type={btn.type || "button"}
                  onClick={btn.onClick}
                  disabled={btn.disabled}
                >
                  {btn.text}
                </button>
              ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
