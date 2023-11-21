/* --------------------------------------- */
/*                 IMPORTS                 */
/* --------------------------------------- */
// React and third party libraries
import React, { useState, useEffect, useCallback, useContext } from "react";
import { Route } from "react-router-dom";

// Contexts
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

//Components
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import Profile from "../Profile/Profile";
import ItemModal from "../Modals/ItemModal/ItemModal";
import ConfirmDeleteModal from "../Modals/ConfirmDeleteModal/ConfirmDeleteModal";
import AddItemModal from "../Modals/AddItemModal/AddItemModal";
import SignUpModal from "../Modals/SignUpModal/SignUpModal";
import LoginModal from "../Modals/LoginModal/LoginModal";
import ConfirmLogoutModal from "../Modals/ConfirmLogoutModal/ConfirmLogoutModal";
import EditProfileModal from "../Modals/EditProfileModal/EditProfileModal";

// Utilities
import { api, addLike, removeLike } from "../../utils/api";
import weatherApiRequest from "../../utils/weatherApi";
import ProtectedRoute from "../../utils/ProtectedRoute";

// Hooks
import useAuth from "../../hooks/useAuth";
import useModal from "../../hooks/useModal";

// Styles
import "./App.css";

function App() {
  // --------------------------------------- //
  //           - DECLARATIONS -              //
  // --------------------------------------- //
  // modal states:
  const [selectedItem, setSelectedItem] = useState({ src: "", name: "" });

  // weather states
  const [weatherData, setWeatherData] = useState({ name: "", temp: "" });
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  // clothing item state
  const [allClothesList, setAllClothesList] = useState([]);

  // contexts
  const { setCurrentUser, currentUser } = useContext(CurrentUserContext);

  // Custom Hooks
  const {
    currentModal,
    setCurrentModal,
    buttonDisplay,
    setButtonDisplay,
    toggleModal,
  } = useModal();
  const { handleLogin, handleSignup, handleLogout } = useAuth(toggleModal);

  // --------------------------------------- //
  //        - FUNCTION DECLARATIONS -        //
  // --------------------------------------- //
  const handleCardClick = useCallback(
    (item) => {
      return () => {
        setSelectedItem(item);
        toggleModal("image");
      };
    },
    [toggleModal]
  );

  function handleToggleSwitchChange() {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  }
  /* --------------------------------------- */
  /*       FUNCTIONS FOR USER ACTIONS        */
  /* --------------------------------------- */
  async function handleProfileUpdate({ name, avatar, email }) {
    const token = localStorage.getItem("jwt");
    const data = { name, avatar, email };
    try {
      const updatedInfo = await api("PATCH", "user/me", token, data);
      setCurrentModal(null);
      setCurrentUser(updatedInfo);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAddItemSubmit(newItem) {
    const token = localStorage.getItem("jwt");
    try {
      setButtonDisplay("Saving...");
      await api("POST", "items", token, newItem);
      toggleModal("addItem");
      const updatedClothesList = await api("GET", "items", token);
      setAllClothesList(updatedClothesList);
    } catch (error) {
      setButtonDisplay("Server error, try again");
      console.error("Couldn't add the item:", error);
    }
  }

  async function handleDeleteItemConfirm(item) {
    const token = localStorage.getItem("jwt");
    try {
      setButtonDisplay("Deleting...");
      await api("DELETE", `items/${item._id}`, token, item);
      toggleModal("confirm", "Yes, delete item");
      const updatedClothesList = await api("GET", "items", token);
      setAllClothesList(updatedClothesList);
    } catch (error) {
      setButtonDisplay("Server error, try again");
      console.error("Couldn't delete item:", error);
    }
  }

  const handleLikeClick = async ({ cardId, isLiked }) => {
    const token = localStorage.getItem("jwt");
    try {
      let updatedCard;
      if (isLiked) {
        updatedCard = await removeLike({ itemId: cardId }, token);
      } else {
        updatedCard = await addLike({ itemId: cardId }, token);
      }
      setAllClothesList((cards) =>
        cards.map((card) => (card._id === updatedCard._id ? updatedCard : card))
      );
    } catch (err) {
      console.log(err);
    }
  };

  // --------------------------------------- //
  //            -  USE EFFECTS -             //
  // --------------------------------------- //
  // fetch user clothes:
  useEffect(() => {
    const fetchUserClothes = async () => {
      const token = localStorage.getItem("jwt");
      try {
        const clothesList = await api("GET", "items", token);
        setAllClothesList(clothesList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserClothes();
  }, [currentUser]);

  // fetch weather data:
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await weatherApiRequest();
        setWeatherData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchWeather();
  }, []);

  // --------------------------------------- //
  //             - HTML RETURN -             //
  // --------------------------------------- //

  return (
    <div className="page">
      {/* --------------------------------------- */
      /*                  ROUTES                 */
      /* --------------------------------------- */}
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        {/* HEADER */}
        <Header
          path="/"
          handleClick={toggleModal}
          ToggleSwitch={<ToggleSwitch />}
          weatherData={weatherData}
        />
        <Route exact path="/">
          <Main
            weatherData={weatherData}
            allClothesList={allClothesList}
            // CARDS LIST:
            handleCardClick={handleCardClick}
            onCardLike={handleLikeClick}
          />
        </Route>
        <ProtectedRoute path="/profile">
          <Profile
            // CARDS LIST:
            allClothesList={allClothesList}
            handleAddClick={() => toggleModal("addItem")}
            handleLogoutClick={() => toggleModal("logout", "Log Out")}
            handleEditProfileClick={() => toggleModal("edit profile")}
            handleCardClick={handleCardClick}
            onCardLike={handleLikeClick}
          />
        </ProtectedRoute>
        {/* --------------------------------------- */
        /*                 MODALS                  */
        /* --------------------------------------- */}
        {/* ADD CLOTHES MODAL */}
        {currentModal === "addItem" && (
          <AddItemModal
            onClose={() => toggleModal("addItem")}
            isOpen={currentModal === "addItem"}
            handleAddItems={handleAddItemSubmit}
            buttonDisplay={buttonDisplay}
          />
        )}

        {/* MODAL FOR DISPLAYING CARD INFO */}
        {currentModal === "image" && (
          <ItemModal
            onClose={toggleModal}
            selectedItem={selectedItem}
            confirmDelete={() => toggleModal("confirm", "Yes, delete item")}
          />
        )}

        {/* MODAL FOR CONFIRMING CLOTHING DELETION */}
        {currentModal === "confirm" && (
          <ConfirmDeleteModal
            onClose={toggleModal}
            handleDelete={handleDeleteItemConfirm}
            selectedItem={selectedItem}
            buttonDisplay={buttonDisplay}
          />
        )}

        {/* MODAL FOR USER REGISTRATION */}
        {currentModal === "signup" && (
          <SignUpModal
            onClose={() => toggleModal("signup")}
            isOpen={currentModal === "signup"}
            handleSignup={handleSignup}
            buttonDisplay={buttonDisplay}
            handleClick={toggleModal}
          />
        )}

        {/* MODAL FOR USER LOGIN */}
        {currentModal === "login" && (
          <LoginModal
            onClose={() => toggleModal("login")}
            isOpen={currentModal === "login"}
            handleLogin={handleLogin}
            buttonDisplay={buttonDisplay}
            handleClick={toggleModal}
          />
        )}

        {/* MODAL FOR EDITING USER PROFILE INFO */}
        {currentModal === "edit profile" && (
          <EditProfileModal
            onClose={() => toggleModal("edit profile")}
            isOpen={currentModal === "edit profile"}
            handleProfileUpdate={handleProfileUpdate}
          />
        )}

        {/* MODAL FOR CONFIRMING LOGOUT */}
        {currentModal === "logout" && (
          <ConfirmLogoutModal
            onClose={toggleModal}
            handleLogout={handleLogout}
            buttonDisplay={buttonDisplay}
          />
        )}
        {/* MAIN */}
        {/* FOOTER */}
        <Footer />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
