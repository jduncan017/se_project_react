import React, { createContext, useState } from "react";

export const CurrentTemperatureUnitContext = createContext();

export function CurrentTemperatureUnitProvider({ children }) {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  function handleToggleSwitchChange() {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  }

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      {children}
    </CurrentTemperatureUnitContext.Provider>
  );
}
