import { state } from "./settings.js";
const quote = document.querySelector(".quote")
const author = document.querySelector(".author")
const changeQuote = document.querySelector(".change-quote")
let randomNum

function getRandomNum(min, max) {
  min = Math.ceil(1);
  max = Math.floor(10);
  randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function getQuotes() {
  getRandomNum()
  const url = `../json/quotes-${state.language}.json`;
  const res = await fetch(url);
  let data = await res.json();

  quote.textContent = `"${data[randomNum].q}"`
  author.textContent = `${data[randomNum].a}`
}

getQuotes()
changeQuote.addEventListener("click", getQuotes)