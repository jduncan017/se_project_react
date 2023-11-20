import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import getInitials from "../../utils/getInitials";
import "./SideBar.css";

const SideBar = () => {
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
        <h3 className="sidebar__username">User Profile</h3>
      </div>
      <button className="sidebar__button" type="button">
        Change Profile Data
      </button>
      <button className="sidebar__button" type="button">
        Log Out
      </button>
    </div>
  );
};

export default SideBar;
