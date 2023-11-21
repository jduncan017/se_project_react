import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import getInitials from "../../utils/getInitials";
import "./SideBar.css";

const SideBar = ({ handleLogoutClick, handleEditProfileClick }) => {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__user-info">
        <div className="sidebar__image-container">
          {currentUser.avatar ? (
            <img
              src={currentUser.avatar}
              alt="user avatar"
              className="sidebar__user-avatar"
            ></img>
          ) : (
            getInitials(currentUser.name)
          )}
        </div>
        <h3 className="sidebar__username">
          {currentUser ? currentUser.name : "User Profile"}
        </h3>
      </div>
      <div className="sidebar__options">
        <button
          className="sidebar__button"
          type="button"
          onClick={handleEditProfileClick}
        >
          Change Profile Data
        </button>
        <button
          className="sidebar__button"
          type="button"
          onClick={handleLogoutClick}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default SideBar;
