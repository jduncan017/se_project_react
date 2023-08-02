import dayClear from "../images/day_clear.png";
import nightClear from "../images/night_clear.png";
import dayCloudy from "../images/day_cloudy.png";
import nightCloudy from "../images/night_cloudy.png";
import dayRain from "../images/day_rain.png";
import nightRain from "../images/night_rain.png";
import daySnow from "../images/day_snow.png";
import nightSnow from "../images/night_snow.png";
import dayStorm from "../images/day_storm.png";
import nightStorm from "../images/night_storm.png";
import dayFog from "../images/day_fog.png";
import nightFog from "../images/night_fog.png";

export const images = {
  day_clear: dayClear,
  night_clear: nightClear,
  day_cloudy: dayCloudy,
  night_cloudy: nightCloudy,
  day_rain: dayRain,
  night_rain: nightRain,
  day_snow: daySnow,
  night_snow: nightSnow,
  day_storm: dayStorm,
  night_storm: nightStorm,
  day_fog: dayFog,
  night_fog: nightFog,
};

export const defaultClothingItems = [
  {
    _id: 0,
    name: "Cap",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
  },
  {
    _id: 4,
    name: "T-Shirt",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
  },
  {
    _id: 5,
    name: "Winter coat",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  },
];

export const apiKey = "d264bddd4fea07a187806dc4c6fcc490";
export const locationData = {
  latitude: "39.742043",
  longitude: "-104.991531",
};
