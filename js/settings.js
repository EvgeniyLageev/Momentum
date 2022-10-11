import { getWeather } from "./wheather.js";
const settingsDiv = document.querySelector(".settingsDiv")
const settingsUl = document.querySelector(".settingsUl")

export let state = {
  language: "en",
  photoSource: 'github',
  time: true,
  date: true,
  helloWrapper: true,
  quoteContainer: true,
  weather: true,
  player: true,
  todoName: true
}

import { getQuotes } from "./quotes.js";

settingsDiv.addEventListener("click", (e) => {
  settingsUl.classList.toggle("settingsUlActive")
})



settingsUl.addEventListener("change", (e) => {
  if (e.target && e.target.matches("input") && e.target.dataset.name !== "language") {

    document.querySelector(`.${e.target.dataset.name}`).classList.toggle("hidden")
    state[e.target.dataset.name] = !state[e.target.dataset.name]
  }

  if (e.target.dataset.name === "todoName") {
    document.querySelector(".wrapper2").classList.remove("wrapper2Active")
  }

  if (e.target.dataset.name === "language") {
    if (state[e.target.dataset.name] === "ru") { state[e.target.dataset.name] = "en" } else {
      state[e.target.dataset.name] = "ru"
    }
    getQuotes()
    getWeather()
  }
  setLocalStorage()
  changeLanguage()
})



function setLocalStorage() {
  localStorage.setItem('state', JSON.stringify(state));
}
window.addEventListener('beforeunload', setLocalStorage)


function getLocalStorage() {
  if (localStorage.getItem('state')) {
    state = JSON.parse(localStorage.getItem('state'));
    getWeather()
  }
  addHidden()
  changeLanguage()
  getQuotes()
}
window.addEventListener('load', getLocalStorage)




function addHidden() {
  let inputSettings = document.querySelectorAll(".inputSettings")

  for (let key in state) {
    if (state[key] === true) {
      document.querySelector(`.${key}`).classList.remove("hidden")
      inputSettings.forEach(el => {
        if (el.dataset.name === key) { el.setAttribute("checked", "checked") }
      })
    }
    if (state[key] === false) { document.querySelector(`.${key}`).classList.add("hidden") }
    if (state[key] === "ru") { document.getElementById("slideThree0").setAttribute("checked", "checked") }
  }
}

function changeLanguage() {
  document.getElementById("settingsLiLanguage").textContent = state.language === "en" ? "Language" : "Язык";
  document.getElementById("settingsLiTime").textContent = state.language === "en" ? "Time" : "Время";
  document.getElementById("settingsLiDate").textContent = state.language === "en" ? "Date" : "Дата";
  document.getElementById("settingsLiGreeting").textContent = state.language === "en" ? "Greeting" : "Приветствие";
  document.getElementById("settingsLiQuotes").textContent = state.language === "en" ? "Quotes" : "Цитаты";
  document.getElementById("settingsLiWeather").textContent = state.language === "en" ? "Weather" : "Погода";
  document.getElementById("settingsLiAudio").textContent = state.language === "en" ? "Audio" : "Аудио";
  document.getElementById("settingsLiTodo").textContent = state.language === "en" ? "Todo" : "Список дел";
}