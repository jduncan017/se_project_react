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
        <div className="sidebar__username">Joshua Duncan</div>
      </div>
    </div>
  );
};

export default SideBar;
