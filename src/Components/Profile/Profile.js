import React from "react";
import avatar from "../../images/Avatar.svg";
import "./Profile.css";

const Profile = ({ cardsList, handleClick }) => {
  return (
    <div className="profile">
      <div className="profile__sidebar">
        <div className="profile__user-info">
          <img
            src={avatar}
            alt="user avatar"
            className="profile__user-avatar"
          ></img>
          <div className="profile__username">Joshua Duncan</div>
        </div>
      </div>
      <div className="profile__clothes-section">
        <div className="profile__header-wrapper">
          <h2 className="profile__title">Your items</h2>
          <button
            type="button"
            className="profile__add-clothes"
            onClick={handleClick}
          >
            + Add New
          </button>
        </div>
        <ul className="profile__cards-list">{cardsList}</ul>
      </div>
    </div>
  );
};

export default Profile;
