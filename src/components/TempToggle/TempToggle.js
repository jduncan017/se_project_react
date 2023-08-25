import React, { useContext } from "react";
import "./TempToggle.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const TempToggle = () => {
  const { currentTemperatureUnit, setCurrentTemperatureUnit } = useContext(
    CurrentTemperatureUnitContext
  );

  function handleToggle() {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  }

  return (
    <>
      <input
        className="temp-toggle"
        id={`react-switch-new`}
        type="checkbox"
        onChange={handleToggle}
      />
      <label className="temp-toggle__switch" htmlFor={`react-switch-new`}>
        <span className="temp-toggle__text temp-toggle__text_farenheit">F</span>
        <span className="temp-toggle__text temp-toggle__text_celsius">C</span>
        <span className={`temp-toggle__slider`} />
      </label>
    </>
  );
};

export default TempToggle;
