import { getTimeOfDay } from "./hello.js";
const wrapper = document.querySelector(".wrapper")
const sliderPrev = document.querySelector(".sliderPrev")
sliderPrev.addEventListener("click", getSlidePrev)
const sliderNext = document.querySelector(".sliderNext")
sliderNext.addEventListener("click", getSlideNext)

let randomNum


function getRandomNum(min, max) {
  min = Math.ceil(1);
  max = Math.floor(20);
  randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  // randomNum = Math.floor(Math.random() * (Math.floor(20) - Math.ceil(1) + 1)) + Math.ceil(1);
}


function setBg() {
  document.querySelector(".inputSelect").value === "Github"
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/EvgeniyLageev/momentum-backgrounds/main/${getTimeOfDay()}/${randomNum < 10 ? "0" + randomNum : randomNum}.webp`
  img.onload = () => {
    wrapper.style.backgroundImage = `url("https://raw.githubusercontent.com/EvgeniyLageev/momentum-backgrounds/main/${getTimeOfDay()}/${randomNum < 10 ? "0" + randomNum : randomNum}.webp")`
  };
}


getRandomNum()


function getSlideNext() {
  if (randomNum == 20) { randomNum = 1 } else {
    randomNum++
  }
  chooseSource()
}

function getSlidePrev() {
  if (randomNum == 1) { randomNum = 20 } else {
    randomNum--
  }
  chooseSource()
}

// async function setBgUnsplash() {
//   const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${getTimeOfDay()}&client_id=QmgkLwumbx8tBIOkVGYspHahY_C974VGpWnJxw5COyo`;
//   const res = await fetch(url);
//   const data = await res.json();
//   try {
//     wrapper.style.backgroundImage = `url("${data.urls.regular}")`
//   } catch {
//     setBg()
//   }
// }

async function setBgUnsplash() {
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${getTimeOfDay()}&client_id=QmgkLwumbx8tBIOkVGYspHahY_C974VGpWnJxw5COyo`;
  const res = await fetch(url);
  const data = await res.json();
  const img2 = new Image()
  img2.src = data.urls.regular;
  img2.onload = () => {
    try {
      wrapper.style.backgroundImage = `url("${img2.src}")`
    } catch {
      setBg()
    }
  };
}

async function setBgFlickr() {
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=98544aae0225e383e759f18ecee3aa90&tags=${getTimeOfDay()}&extras=url_l&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  const data = await res.json();
  const img3 = new Image()
  img3.src = data.photos.photo[randomNum].url_l;
  img3.onload = () => {
    wrapper.style.backgroundImage = `url("${img3.src}")`
  }
}

function chooseSource() {
  if (document.querySelector(".inputSelect").value === "Github") {
    setBg()
  }
  if (document.querySelector(".inputSelect").value === "Unsplash") {
    setBgUnsplash()
  }
  if (document.querySelector(".inputSelect").value === "Flickr") {
    setBgFlickr()
  }
}

document.querySelector(".inputSelect").addEventListener("change", chooseSource)

function setLocalStorage() {
  localStorage.setItem('select', document.querySelector(".inputSelect").value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if (localStorage.getItem('select')) {
    document.querySelector(".inputSelect").value = localStorage.getItem('select');
  } else {
    document.querySelector(".inputSelect").value === "Github";
  }
  chooseSource()
}
window.addEventListener('load', getLocalStorage)