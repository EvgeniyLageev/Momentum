import { state } from "./settings.js";
const hello = document.querySelector('.hello');
const name = document.querySelector('.name');

export function getTimeOfDay() {
  const currentDate = new Date();
  const hours = currentDate.getHours()

  if (hours >= 6 && hours < 12) { return "morning" };
  if (hours >= 12 && hours < 18) { return "afternoon" };
  if (hours >= 18 && hours < 24) { return "evening" };
  if (hours >= 0 && hours < 6) { return "night" };
}


export function showHello() {
  // hello.textContent = `Good ${getTimeOfDay()},`

  if (getTimeOfDay() === "morning") { hello.textContent = `${state.language === "en" ? "Good" : "Доброе"} ${state.language === "en" ? "morning" : "утро"}` }
  if (getTimeOfDay() === "afternoon") { hello.textContent = `${state.language === "en" ? "Good" : "Добрый"} ${state.language === "en" ? "afternoon" : "день"}` }
  if (getTimeOfDay() === "evening") { hello.textContent = `${state.language === "en" ? "Good" : "Добрый"} ${state.language === "en" ? "evening" : "вечер"}` }
  if (getTimeOfDay() === "night") { hello.textContent = `${state.language === "en" ? "Good" : "Доброй"} ${state.language === "en" ? "night" : "ночи"}` }
  name.placeholder = state.language === "en" ? "[Enter name]" : "[Введите имя]"
}

function setLocalStorage() {
  localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
}
window.addEventListener('load', getLocalStorage)
