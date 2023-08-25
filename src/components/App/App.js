import React, { useState, useEffect, useCallback } from "react";
import { Route } from "react-router-dom";
import Header from "../Header/Header";
import WeatherCard from "../WeatherCard/WeatherCard";
import Main from "../Main/Main";
import ItemCard from "../ItemCard/ItemCard";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import TempToggle from "../TempToggle/TempToggle";
import weatherApiRequest from "../../utils/weatherApi";
import Profile from "../Profile/Profile";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import { defaultClothingItems } from "../../utils/contants";
import { CurrentTemperatureUnitProvider } from "../../contexts/CurrentTemperatureUnitContext";
import api from "../../utils/api";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

function App() {
  /* --------------------------------------- */
  /*           STATE DECLARATIONS            */
  /* --------------------------------------- */
  // modal states:
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [ConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({ src: "", name: "" });

  // weather states
  const [weatherData, setWeatherData] = useState({ name: "", temp: "" });

  // clothing item states
  const [allClothesList, setAllClothesList] = useState(defaultClothingItems);
  const [allClothingCards, setAllClothingCards] = useState([]);
  const [appropriateClothingCards, setAppropriateClothingCards] = useState([]);

  /* --------------------------------------- */
  /*          FUNCTION DECLARATIONS          */
  /* --------------------------------------- */
  // modal open / close function (add clothes)
  function toggleAddModal() {
    setAddModalOpen(!addModalOpen);
  }

  //  modal open / close function (clothing image popup)
  const toggleImageModal = useCallback(() => {
    setImageModalOpen(!imageModalOpen);
  }, [imageModalOpen]);

  // modal open / close function (confirmation Modal)
  function toggleConfirmationModal() {
    setConfirmationModalOpen(!ConfirmationModalOpen);
  }

  const handleCardClick = useCallback(
    (item) => {
      return () => {
        setSelectedItem(item);
        toggleImageModal();
      };
    },
    [toggleImageModal]
  );

  function filterCards(clothingCards, weatherData) {
    return clothingCards.filter((card) => {
      return card.props.clothingItem.weather === weatherData.tempCategory;
    });
  }

  const renderCardList = useCallback(
    (clothingItems) => {
      return clothingItems.map((items) => {
        return (
          <ItemCard
            handleClick={handleCardClick(items)}
            key={items._id}
            clothingItem={items}
          />
        );
      });
    },
    [handleCardClick]
  );

  function handleAddItemSubmit(newItem) {
    const newItemWithId = {
      ...newItem,
      _id: uuidv4(),
    };
    setAllClothesList([...allClothesList, newItemWithId]);
  }

  function handleDeleteItemConfirm(item) {
    const filteredList = allClothesList.filter((items) => {
      return items._id !== item._id;
    });
    setAllClothesList(filteredList);
  }

  /* --------------------------------------- */
  /*               USE EFFECTS               */
  /* --------------------------------------- */
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

  // update appropriate clothing for weather:
  useEffect(() => {
    setAppropriateClothingCards(filterCards(allClothingCards, weatherData));
  }, [allClothingCards, weatherData]);

  // useEffect to update allClothingItems, setAllClothingItems List
  // Note: this will need updated to work with api data!
  useEffect(() => {
    setAllClothingCards(renderCardList(allClothesList));
  }, [renderCardList, allClothesList]);

  /* --------------------------------------- */
  /*               HTML RETURN               */
  /* --------------------------------------- */

  return (
    <div className="page">
      <CurrentTemperatureUnitProvider>
        {/* HEADER */}
        <Header
          handleClick={() =>
            toggleAddModal("New Garment", "add-clothes", "Add garment")
          }
          tempToggle={<TempToggle />}
          weatherData={weatherData}
        />

        {/* MAIN */}
        <Route exact path="/">
          <Main
            // WEATHER CARD:
            weatherCard={<WeatherCard weatherData={weatherData} />}
            weatherData={weatherData}
            // CARDS LIST:
            cardsList={appropriateClothingCards}
          />
        </Route>
        <Route path="/profile">
          <Profile
            // CARDS LIST:
            cardsList={allClothingCards}
            handleClick={() =>
              toggleAddModal("New Garment", "add-clothes", "Add garment")
            }
          />
        </Route>

        {/* MODAL WITH FORM: */}
        {addModalOpen && (
          <AddItemModal
            onClose={toggleAddModal}
            isOpen={addModalOpen}
            handleAddItems={handleAddItemSubmit}
          />
        )}

        {/* MODAL FOR DISPLAYING CARD INFO */}
        {imageModalOpen && (
          <ItemModal
            onClose={toggleImageModal}
            selectedItem={selectedItem}
            confirmDelete={toggleConfirmationModal}
          />
        )}

        {/* MODAL FOR CONFIRMING CLOTHING DELETION */}
        {ConfirmationModalOpen && (
          <ConfirmationModal
            onClose={toggleConfirmationModal}
            handleDelete={handleDeleteItemConfirm}
            selectedItem={selectedItem}
          />
        )}

        {/* FOOTER */}
        <Footer />
      </CurrentTemperatureUnitProvider>
    </div>
  );
}

export default App;
