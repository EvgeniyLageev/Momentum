import { showHello } from "./hello.js";
import { state } from "./settings.js";


const time = document.querySelector('.time');
const date = document.querySelector('.date');
const options = { month: 'long', day: 'numeric', timeZone: 'UTC' };
const en = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const ru = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]



function showTime() {
  const currentDate = new Date();
  const hours = currentDate.getHours()
  const minutes = currentDate.getMinutes()
  const seconds = currentDate.getSeconds()
  time.textContent = `${(hours < 10) ? "0" + hours : hours} : ${(minutes < 10) ? "0" + minutes : minutes} : ${(seconds < 10) ? "0" + seconds : seconds}`;
  showDate()
  showHello()
  setTimeout(showTime, 1000);
}
showTime();

function showDate() {
  const currentDate = new Date();
  date.textContent = `${(state.language === "en" ? en : ru)[currentDate.getDay()]}, ${currentDate.toLocaleDateString(`${state.language}-US`, options)}`;
}