import React, { useState, useEffect, useCallback, useContext } from "react";
import { Route } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../Modals/ItemModal/ItemModal";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import weatherApiRequest from "../../utils/weatherApi";
import Profile from "../Profile/Profile";
import ConfirmDeleteModal from "../Modals/ConfirmDeleteModal/ConfirmDeleteModal";
import AddItemModal from "../Modals/AddItemModal/AddItemModal";
import SignUpModal from "../Modals/SignUpModal/SignUpModal";
import LoginModal from "../Modals/LoginModal/LoginModal";
import ConfirmLogoutModal from "../Modals/ConfirmLogoutModal/ConfirmLogoutModal";
import EditProfileModal from "../Modals/EditProfileModal/EditProfileModal";
import ProtectedRoute from "../../utils/ProtectedRoute";
import { CurrentTemperatureUnitProvider } from "../../contexts/CurrentTemperatureUnitContext";
import { AuthContext } from "../../contexts/AuthContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { api, addLike, removeLike } from "../../utils/api";
import { signup, login } from "../../utils/auth";
import "./App.css";

function App() {
  // --------------------------------------- //
  //        - STATE DECLARATIONS -           //
  // --------------------------------------- //
  // modal states:
  const [currentModal, setCurrentModal] = useState(null);
  const [selectedItem, setSelectedItem] = useState({ src: "", name: "" });
  const [buttonDisplay, setButtonDisplay] = useState("");

  // weather states
  const [weatherData, setWeatherData] = useState({ name: "", temp: "" });

  // clothing item state
  const [allClothesList, setAllClothesList] = useState([]);

  // constants
  const { setIsLoggedIn } = useContext(AuthContext);
  const { setCurrentUser, currentUser } = useContext(CurrentUserContext);

  // --------------------------------------- //
  //        - FUNCTION DECLARATIONS -        //
  // --------------------------------------- //
  const toggleModal = useCallback(
    (modalName, buttonDisplay = null, ...additionalTextOptions) => {
      const additionalText = [additionalTextOptions];
      if (currentModal === modalName) {
        setCurrentModal(null);
      } else {
        setCurrentModal(modalName);
        setButtonDisplay(buttonDisplay);
      }
      return additionalText;
    },
    [currentModal]
  );

  const handleCardClick = useCallback(
    (item) => {
      return () => {
        setSelectedItem(item);
        toggleModal("image");
      };
    },
    [toggleModal]
  );

  async function getUserInfo(authToken) {
    try {
      const userInfo = await api("GET", "user/me", authToken);
      return userInfo;
    } catch (error) {
      console.error("Can't access user", error);
    }
  }

  /* --------------------------------------- */
  /*       FUNCTIONS FOR USER ACTIONS        */
  /* --------------------------------------- */
  async function handleLogin({ email, password }) {
    try {
      const config = login(email, password);
      const res = await api("AUTH", "signin", "", config);
      if (res.token) {
        localStorage.setItem("jwt", res.token);
        setCurrentModal(null);
        setIsLoggedIn(true);
        const userInfo = await getUserInfo(res.token);
        setCurrentUser(userInfo);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSignup({ name, avatar, email, password }) {
    try {
      const config = signup(name, avatar, email, password);
      await api("AUTH", "signup", "", config);
      handleLogin({ email, password });
      setAllClothesList();
    } catch (error) {
      console.error(error);
    }
  }

  function handleLogout() {
    setCurrentModal(null);
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
  }

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

  // checks for jwt token and validates with server
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getUserInfo(token)
        .then((userData) => {
          userData.avatar = null ? userData.name[0] : userData.avatar;
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error("Token validation failed:", error);
          localStorage.removeItem("jwt");
        });
    }
  }, [setCurrentUser, setIsLoggedIn]);

  // --------------------------------------- //
  //             - HTML RETURN -             //
  // --------------------------------------- //

  return (
    <div className="page">
      {/* --------------------------------------- */
      /*                  ROUTES                 */
      /* --------------------------------------- */}
      <CurrentTemperatureUnitProvider>
        {/* HEADER */}
        <Header
          handleClick={toggleModal}
          ToggleSwitch={<ToggleSwitch />}
          weatherData={weatherData}
        />
        <Route path="/home">
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
      </CurrentTemperatureUnitProvider>
    </div>
  );
}

export default App;
