import React, { useContext } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  const { currentTemperatureUnit, setCurrentTemperatureUnit } = useContext(
    CurrentTemperatureUnitContext
  );

  function handleToggle() {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  }

  return (
    <>
      <input
        className="toggle-switch"
        id={`react-switch-new`}
        type="checkbox"
        onChange={handleToggle}
      />
      <label className="toggle-switch__switch" htmlFor={`react-switch-new`}>
        <span className="toggle-switch__text toggle-switch__text_farenheit">
          F
        </span>
        <span className="toggle-switch__text toggle-switch__text_celsius">
          C
        </span>
        <span className={`toggle-switch__slider`} />
      </label>
    </>
  );
};

export default ToggleSwitch;
