import React from "react";
import "./Header.css";
import logoPath from "../../images/Logo.svg";
import avatar from "../../images/avatar.png";

function getCurrentDate() {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return currentDate;
}

const Header = ({ handleClick, weatherData }) => {
  return (
    <header className="header">
      <div className="header__title-container">
        <img src={logoPath} alt="wtwr Logo" className="header__logo" />
        <div className="header__date-location">
          {`${getCurrentDate()}, ${weatherData.location}`}{" "}
        </div>
      </div>
      <div className="header__navigation-container">
        <button className="header__add-clothes" onClick={handleClick}>
          + Add Clothes
        </button>
        <div className="header__username">Joshua Duncan</div>
        <img
          src={avatar}
          alt="user avatar"
          className="header__user-avatar"
        ></img>
      </div>
    </header>
  );
};

export default Header;
