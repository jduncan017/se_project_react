import avatar from "../../images/Avatar.svg";
import "./SideBar.css";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__user-info">
        <img
          src={avatar}
          alt="user avatar"
          className="sidebar__user-avatar"
        ></img>
        <h3 className="sidebar__username">User Profile</h3>
      </div>
    </div>
  );
};

export default SideBar;
