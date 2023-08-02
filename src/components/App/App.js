import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import WeatherCard from "../WeatherCard/WeatherCard";
import Main from "../Main/Main";
import ItemCard from "../ItemCard/ItemCard";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import AddClothesForm from "../AddClothesForm/AddClothesForm";
import ItemModal from "../ItemModal/ItemModal";
import weatherApiRequest from "../../utils/weatherApi";
import { defaultClothingItems } from "../../utils/contants";
import "./App.css";

function App() {
  /* --------------------------------------- */
  /*           STATE DECLARATIONS            */
  /* --------------------------------------- */
  const [weatherData, setWeatherData] = useState({ name: "", temp: "" });
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState({ src: "", name: "" });
  const [selectedItemWeather, setSelectedItemWeather] = useState("");
  const [clothingItems, setClothingItems] = useState([]);
  const [formInfo, setFormInfo] = useState({
    title: "",
    name: "",
    buttonText: "",
  });

  /* --------------------------------------- */
  /*               USE EFFECTS               */
  /* --------------------------------------- */
  // default clothing array:
  useEffect(() => {
    setClothingItems(defaultClothingItems);
  }, []);

  // fetch weather data:
  useEffect(() => {
    const fetchWeather = async () => {
      const data = await weatherApiRequest();
      setWeatherData(data);
    };

    fetchWeather();
  }, []);

  /* --------------------------------------- */
  /*          FUNCTION DECLARATIONS          */
  /* --------------------------------------- */
  // modal open / close function (add clothes)
  function toggleAddModal(title, name, buttonText) {
    setFormInfo({ title: title, name: name, buttonText: buttonText });
    setAddModalOpen(!addModalOpen);
  }

  //  modal open / close function (clothing image popup)
  function toggleImageModal() {
    setImageModalOpen(!imageModalOpen);
  }

  function handleCardClick(item) {
    return () => {
      setModalImage({
        src: item.link,
        name: item.name,
      });
      setSelectedItemWeather(item.weather);
      toggleImageModal();
    };
  }

  /* --------------------------------------- */
  /*               HTML RETURN               */
  /* --------------------------------------- */

  return (
    <div className="page">
      {/* HEADER */}
      <Header
        handleClick={() =>
          toggleAddModal("New Garment", "add-clothes", "Add garment")
        }
        weatherData={weatherData}
      />

      {/* MAIN */}
      <Main
        // WEATHER CARD:
        weatherCard={<WeatherCard weatherData={weatherData} />}
        weatherData={weatherData}
        // CARDS LIST:
        itemCard={clothingItems.map((item) => {
          return (
            <ItemCard
              handleClick={handleCardClick(item)}
              key={item._id}
              clothingItem={item}
            />
          );
        })}
      />

      {/* MODAL WITH FORM: */}
      {addModalOpen && (
        <ModalWithForm onClose={toggleAddModal} formInfo={formInfo}>
          <AddClothesForm />
        </ModalWithForm>
      )}

      {/* MODAL FOR DISPLAYING CARD INFO */}
      {imageModalOpen && (
        <ItemModal
          onClose={toggleImageModal}
          modalImage={modalImage}
          weather={selectedItemWeather}
        />
      )}

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default App;
