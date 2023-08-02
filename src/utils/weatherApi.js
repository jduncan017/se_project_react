import { apiKey, locationData, images } from "./contants";

function setTempCategory(temp) {
  if (temp >= 86) {
    return "hot";
  } else if (temp >= 66 && temp <= 85) {
    return "warm";
  } else if (temp <= 65) {
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
  const temp = data && data.main ? data.main.temp : "null";
  const tempCategory = setTempCategory(temp);
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
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${locationData.latitude}&lon=${locationData.longitude}&units=imperial&appid=${apiKey}`
    );
    const data = await response.json();
    return extractWeatherData(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

export default weatherApiRequest;
