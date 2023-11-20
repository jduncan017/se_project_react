import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

const Profile = ({ cardsList, handleClick }) => {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection cardsList={cardsList} handleClick={handleClick("Add")} />
    </div>
  );
};

export default Profile;
