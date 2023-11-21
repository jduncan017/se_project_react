import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

const Profile = ({
  allClothesList,
  handleAddClick,
  handleLogoutClick,
  handleEditProfileClick,
  handleCardClick,
  onCardLike,
}) => {
  return (
    <div className="profile">
      <SideBar
        handleLogoutClick={handleLogoutClick}
        handleEditProfileClick={handleEditProfileClick}
      />
      <ClothesSection
        allClothesList={allClothesList}
        handleAddClick={handleAddClick}
        handleCardClick={handleCardClick}
        onCardLike={onCardLike}
      />
    </div>
  );
};

export default Profile;
