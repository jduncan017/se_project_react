import { apiKey, locationData, images } from "./contants";
import { api } from "./api";

function setTempCategory(tempFarenheit) {
  if (tempFarenheit >= 75) {
    return "hot";
  } else if (tempFarenheit >= 45 && tempFarenheit < 75) {
    return "warm";
  } else if (tempFarenheit < 45) {
    return "cold";
  }
}

function getWeather(weather) {
  switch (weather) {
    case "Clear":
      return "clear";
    case "Clouds":
      return "cloudy";
    case "Rain":
    case "Drizzle":
      return "rain";
    case "Snow":
      return "snow";
    case "Thunderstorm":
    case "Tornado":
      return "storm";
    case "Mist":
    case "Smoke":
    case "Haze":
    case "Fog":
    case "Dust":
    case "Sand":
    case "Ash":
    case "Squall":
      return "fog";
    default:
      return "clear";
  }
}

function getTimeOfDay(data) {
  const currentTime = Date.now() / 1000;
  if (currentTime >= data.sys.sunrise && currentTime <= data.sys.sunset) {
    return "day";
  } else {
    return "night";
  }
}

function extractWeatherData(data) {
  const location = data ? data.name : "null";
  const temp =
    data && data.main
      ? {
          F: Math.round(data.main.temp),
          C: Math.round(((data.main.temp - 32) * 5) / 9),
        }
      : "null";
  const tempCategory = setTempCategory(temp.F);
  const weather = getWeather(data.weather[0].main);
  const dayOrNight = getTimeOfDay(data);
  const weatherImagePath = `${dayOrNight}_${weather}`;
  return {
    location: location,
    temp: temp,
    tempCategory: tempCategory,
    weatherImagePath: images[weatherImagePath],
  };
}

async function weatherApiRequest() {
  try {
    const path = `data/2.5/weather?lat=${locationData.latitude}&lon=${locationData.longitude}&units=imperial&appid=${apiKey}`;
    const res = await api("WEATHER", path);
    return extractWeatherData(res);
  } catch (error) {
    throw new Error(`Error ${error.status}`);
  }
}

export default weatherApiRequest;
