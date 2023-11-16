import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logoPath from "../../images/Logo.svg";
import avatar from "../../images/Avatar.svg";
import openMenuIcon from "../../images/hamburger-icon.png";
import closeMenuIcon from "../../images/close-icon-black.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { AuthContext } from "../../contexts/AuthContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function getCurrentDate() {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return currentDate;
}

const Header = ({ handleClick, weatherData }) => {
  const [isMobileMenuOpened, setMobileMenuOpened] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  const { currentUser } = useContext(CurrentUserContext);

  const toggleMobileMenu = () => {
    setMobileMenuOpened(!isMobileMenuOpened);
  };

  const loggedInHeader = (
    <>
      <button
        className={`header__button ${
          isMobileMenuOpened ? "header__button" : ""
        }`}
        onClick={() => {
          handleClick("add");
          setMobileMenuOpened(false);
        }}
      >
        + Add Clothes
      </button>
      <Link to="/home">
        <button className="header__button" type="button">
          Home
        </button>
      </Link>
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
          <div className="header__username">{currentUser.name}</div>
          <img
            src={isLoggedIn ? currentUser.avatar : avatar}
            alt="user avatar"
            className="header__user-avatar"
          ></img>
        </div>
      </Link>
    </>
  );

  const loggedOutHeader = (
    <>
      <button
        className={`header__button ${
          isMobileMenuOpened ? "header__button" : ""
        }`}
        onClick={() => {
          handleClick("signup");
          setMobileMenuOpened(false);
        }}
      >
        SignUp
      </button>
      <button
        className={`header__button ${
          isMobileMenuOpened ? "header__button" : ""
        }`}
        onClick={() => {
          handleClick("login");
          setMobileMenuOpened(false);
        }}
      >
        Login
      </button>
    </>
  );

  return (
    <header className="header">
      <div className="header__title-container">
        <Link to="/home">
          <img src={logoPath} alt="wtwr Logo" className="header__logo" />
        </Link>
        <div className="header__date-location">
          {`${getCurrentDate()}, ${weatherData.location}`}
        </div>
      </div>
      <div
        className={`header__navigation-container ${
          isMobileMenuOpened ? "header__navigation-container_opened" : ""
        }`}
      >
        <ToggleSwitch />
        {isLoggedIn ? loggedInHeader : loggedOutHeader}
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
