import React, { useState, useEffect, useCallback } from "react";
import { Route } from "react-router-dom";
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
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import api from "../../utils/api";
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
  const [currentTemperatureUnit, setCurrentTemperatureUnit] =
    React.useState("F");

  // clothing item states
  const [allClothesList, setAllClothesList] = useState([]);
  const [allClothingCards, setAllClothingCards] = useState([]);

  /* --------------------------------------- */
  /*          FUNCTION DECLARATIONS          */
  /* --------------------------------------- */
  // fetch user clothing items:
  const fetchUserClothes = async () => {
    try {
      const clothesList = await api("GET");
      setAllClothesList(clothesList);
    } catch (error) {
      console.error(error);
    }
  };

  function toggleModal(modalName, buttonDisplay = null) {
    if (currentModal === modalName) {
      setCurrentModal(null);
    } else {
      setCurrentModal(modalName);
      setButtonDisplay(buttonDisplay);
    }
  }

  function handleToggleSwitchChange() {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  }

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
            key={item._id}
            clothingItem={item}
          />
        );
      });
    },
    [handleCardClick]
  );

  // I tried to setIsLoading but since state is async,
  // I couldn't get it to update fast enough to update buttonDisplay
  async function handleAddItemSubmit(newItem) {
    try {
      setButtonDisplay("Saving...");
      await api("POST", newItem);
      toggleModal("add", "Add garment");
      setAllClothesList([newItem, ...allClothesList]);
    } catch (error) {
      setButtonDisplay("Server error, try again");
      console.error("Couldn't add the item:", error);
    }
  }

  async function handleDeleteItemConfirm(item) {
    try {
      setButtonDisplay("Deleting...");
      await api("DELETE", item, item._id);
      toggleModal("confirm", "Yes, delete item");
      setAllClothesList(
        allClothesList.filter((items) => {
          return items._id !== item._id;
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

  // useEffect to update allClothingItems, setAllClothingItems List
  useEffect(() => {
    setAllClothingCards(renderCardList(allClothesList));
  }, [renderCardList, allClothesList]);

  /* --------------------------------------- */
  /*               HTML RETURN               */
  /* --------------------------------------- */

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        {/* HEADER */}
        <Header
          handleClick={() => toggleModal("add", "Add garment")}
          ToggleSwitch={<ToggleSwitch />}
          weatherData={weatherData}
        />

        {/* MAIN */}
        <Route exact path="/">
          <Main
            weatherData={weatherData}
            allClothesList={allClothesList}
            // CARDS LIST:
            handleCardClick={handleCardClick}
          />
        </Route>
        <Route path="/profile">
          <Profile
            // CARDS LIST:
            cardsList={allClothingCards}
            handleClick={() => toggleModal("add", "Add garment")}
          />
        </Route>

        {/* MODAL WITH FORM: */}
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

        {/* FOOTER */}
        <Footer />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
