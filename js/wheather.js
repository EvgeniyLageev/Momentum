import { state } from "./settings.js";

const weatherIcon = document.querySelector('.weather-icon');
const weatherError = document.querySelector('.weather-error');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');

export async function getWeather() {

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${state.language}&appid=352b9e21ac3d7434a5fb6fc76903d8e0&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  weatherIcon.className = 'weather-icon owf';
  weatherError.textContent = ""

  try {
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `${state.language === "en" ? "Wind" : "Ветер"}: ${Math.round(data.wind.speed)} ${state.language === "en" ? "m/s" : "м/с"}`;
    humidity.textContent = `${state.language === "en" ? "Humidity" : "Влажность"}: ${Math.round(data.main.humidity)}%`;
  } catch {
    weatherIcon.className = "";
    temperature.textContent = "";
    weatherDescription.textContent = "";
    wind.textContent = "";
    humidity.textContent = "";
    weatherError.textContent = data.message
  }
}

city.addEventListener("change", getWeather)

function setLocalStorage() {
  localStorage.setItem('city', city.value ? city.value : (state.language === "en") ? "Minsk" : "Минск");
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  } else {
    city.value = state.language === "en" ? "Minsk" : "Минск";
  }
}
window.addEventListener('load', getLocalStorage)