import React, { useState } from "react";
import "./Header.css";
import logoPath from "../../images/Logo.svg";
import avatar from "../../images/avatar.png";
import openMenuIcon from "../../images/hamburger-icon.png"; // Add your own path
import closeMenuIcon from "../../images/close-icon-black.png"; // Add your own path

function getCurrentDate() {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return currentDate;
}

const Header = ({ handleClick, weatherData }) => {
  const [isMobileMenuOpened, setMobileMenuOpened] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpened(!isMobileMenuOpened);
  };

  return (
    <header className="header">
      <div className="header__title-container">
        <img src={logoPath} alt="wtwr Logo" className="header__logo" />
        <div className="header__date-location">
          {`${getCurrentDate()}, ${weatherData.location}`}{" "}
        </div>
      </div>
      <div
        className={`header__navigation-container ${
          isMobileMenuOpened ? "header__navigation-container_opened" : ""
        }`}
      >
        <button
          className={`header__add-clothes ${
            isMobileMenuOpened ? "header__add-clothes_visible" : ""
          }`}
          onClick={handleClick}
        >
          + Add Clothes
        </button>
        <div
          className={`header__user-info-container ${
            isMobileMenuOpened ? "header__user-info-container_opened" : ""
          }`}
        >
          <div className="header__username">Joshua Duncan</div>
          <img
            src={avatar}
            alt="user avatar"
            className="header__user-avatar"
          ></img>
        </div>
      </div>
      <button
        onClick={toggleMobileMenu}
        className="header__mobile-menu"
        style={{
          backgroundImage: `url(${
            isMobileMenuOpened ? closeMenuIcon : openMenuIcon
          })`,
        }}
        aria-label={isMobileMenuOpened ? "Close menu" : "Open menu"}
      >
        {/* <img alt="menu" /> */}
      </button>
    </header>
  );
};

export default Header;
