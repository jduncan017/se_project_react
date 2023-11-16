import React, { useState, useEffect, useCallback, useContext } from "react";
import { Route, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemCard from "../ItemCard/ItemCard";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import weatherApiRequest from "../../utils/weatherApi";
import Profile from "../Profile/Profile";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import SignUpModal from "../SignUpModal/SignUpModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../../utils/ProtectedRoute";
import { CurrentTemperatureUnitProvider } from "../../contexts/CurrentTemperatureUnitContext";
import { AuthContext } from "../../contexts/AuthContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import api from "../../utils/api";
import { signup, login, validateToken } from "../../utils/auth";
import "./App.css";

function App() {
  /* --------------------------------------- */
  /*          STATE DECLARATIONS             */
  /* --------------------------------------- */
  // modal states:
  const [currentModal, setCurrentModal] = useState(null);
  const [selectedItem, setSelectedItem] = useState({ src: "", name: "" });
  const [buttonDisplay, setButtonDisplay] = useState("");

  // weather states
  const [weatherData, setWeatherData] = useState({ name: "", temp: "" });

  // clothing item states
  const [allClothesList, setAllClothesList] = useState([]);
  const [allClothingCards, setAllClothingCards] = useState([]);

  // constants
  const location = useLocation();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { setCurrentUser } = useContext(CurrentUserContext);

  /* --------------------------------------- */
  /*          FUNCTION DECLARATIONS          */
  /* --------------------------------------- */
  const fetchUserClothes = async () => {
    const token = localStorage.getItem("jwt");
    try {
      const clothesList = await api("GET", "items", token);
      setAllClothesList(clothesList);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleModal = useCallback(
    (modalName, buttonDisplay = null) => {
      if (currentModal === modalName) {
        setCurrentModal(null);
      } else {
        setCurrentModal(modalName);
        setButtonDisplay(buttonDisplay);
      }
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

  const renderCardList = useCallback(
    (clothingItems) => {
      return clothingItems.map((item) => {
        return (
          <ItemCard
            handleClick={handleCardClick(item)}
            key={item.id}
            clothingItem={item}
          />
        );
      });
    },
    [handleCardClick]
  );

  async function handleLogin({ email, password }) {
    try {
      const config = login(email, password);
      const res = await api("AUTH", "login", "", config);
      if (res.token) {
        localStorage.setItem("jwt", res.token);
        setCurrentModal(null);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSignup({ name, avatar, email, password }) {
    try {
      const config = signup(name, avatar, email, password);
      const res = await api("AUTH", "signup", "", config);
      if (res.success) {
        handleLogin({ email, password });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAddItemSubmit(newItem) {
    const token = localStorage.getItem("jwt");
    try {
      setButtonDisplay("Saving...");
      await api("POST", "items", token, newItem);
      toggleModal("add", "Add garment");
      setAllClothesList([newItem, ...allClothesList]);
    } catch (error) {
      setButtonDisplay("Server error, try again");
      console.error("Couldn't add the item:", error);
    }
  }

  async function handleDeleteItemConfirm(item) {
    const token = localStorage.getItem("jwt");
    try {
      setButtonDisplay("Deleting...");
      await api("DELETE", `items/${item.id}`, token, item);
      toggleModal("confirm", "Yes, delete item");
      setAllClothesList(
        allClothesList.filter((items) => {
          return items.id !== item.id;
        })
      );
    } catch (error) {
      setButtonDisplay("Server error, try again");
      console.error("Couldn't delete item:", error);
    }
  }

  /* --------------------------------------- */
  /*               USE EFFECTS               */
  /* --------------------------------------- */
  // initial fetch of user clothes:
  useEffect(() => {
    fetchUserClothes();
  }, []);

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

  // update allClothingItems, setAllClothingItems List
  useEffect(() => {
    setAllClothingCards(renderCardList(allClothesList));
  }, [allClothesList, renderCardList]);

  // opens login modal uppon redirect for unAuth'd users
  useEffect(() => {
    if ((location.pathname === "/home/login") & !isLoggedIn) {
      setCurrentModal("login");
    } else {
      setCurrentModal(null);
    }
  }, [location, isLoggedIn]);

  // checks for jwt token and validates with server
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      const config = validateToken(token);
      api("AUTH", "user/me", "", config)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error("Token validation failed:", error);
          localStorage.removeItem("jwt");
        });
    }
  }, [setCurrentUser, setIsLoggedIn]);

  /* --------------------------------------- */
  /*               HTML RETURN               */
  /* --------------------------------------- */

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
          />
        </Route>
        <ProtectedRoute path="/profile">
          <Profile
            // CARDS LIST:
            cardsList={allClothingCards}
            handleClick={() => toggleModal("add")}
          />
        </ProtectedRoute>

        {/* --------------------------------------- */
        /*                 MODALS                  */
        /* --------------------------------------- */}
        {/* ADD CLOTHES MODAL */}
        {currentModal === "add" && (
          <AddItemModal
            onClose={() => toggleModal("add")}
            isOpen={currentModal === "add"}
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
          <ConfirmationModal
            onClose={() => toggleModal("confirm")}
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
        {/* MAIN */}

        {/* FOOTER */}
        <Footer />
      </CurrentTemperatureUnitProvider>
    </div>
  );
}

export default App;
