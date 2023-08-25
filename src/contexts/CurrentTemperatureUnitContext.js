import React from "react";

export const CurrentTemperatureUnitContext = React.createContext();

export const CurrentTemperatureUnitProvider = ({ children }) => {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] =
    React.useState("F");

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, setCurrentTemperatureUnit }}
    >
      {children}
    </CurrentTemperatureUnitContext.Provider>
  );
};
