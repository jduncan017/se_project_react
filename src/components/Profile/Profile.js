import React from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

const Profile = ({ cardsList, handleClick }) => {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection cardsList={cardsList} handleClick={handleClick} />
    </div>
  );
};

export default Profile;
