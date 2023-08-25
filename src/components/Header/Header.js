import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logoPath from "../../images/Logo.svg";
import avatar from "../../images/Avatar.svg";
import openMenuIcon from "../../images/hamburger-icon.png";
import closeMenuIcon from "../../images/close-icon-black.png";

function getCurrentDate() {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return currentDate;
}

const Header = ({ handleClick, tempToggle, weatherData }) => {
  const [isMobileMenuOpened, setMobileMenuOpened] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpened(!isMobileMenuOpened);
  };

  return (
    <header className="header">
      <div className="header__title-container">
        <Link to="/">
          <img src={logoPath} alt="wtwr Logo" className="header__logo" />
        </Link>
        <div className="header__date-location">
          {`${getCurrentDate()}, ${weatherData.location}`}{" "}
        </div>
      </div>
      <div
        className={`header__navigation-container ${
          isMobileMenuOpened ? "header__navigation-container_opened" : ""
        }`}
      >
        {tempToggle}
        <button
          className={`header__add-clothes ${
            isMobileMenuOpened ? "header__add-clothes_visible" : ""
          }`}
          onClick={() => {
            handleClick();
            setMobileMenuOpened(false);
          }}
        >
          + Add Clothes
        </button>
        <Link
          to="/profile"
          onClick={() => {
            setMobileMenuOpened(false);
          }}
        >
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
        </Link>
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
      ></button>
    </header>
  );
};

export default Header;
