import playList from './playList.js';
const play = document.querySelector(".play")
const playPrevBtn = document.querySelector(".play-prev")
const playNextBtn = document.querySelector(".play-next")
const playListContainer = document.querySelector(".play-list")
const songLength = document.querySelector(".songLength")
const nameSong = document.querySelector(".nameSong")


let isPlay = false;
let playNum = 0;


const audio = new Audio();


function playAudio() {
  if (!isPlay) {
    audio.src = playList[playNum].src
    audio.currentTime = 0;
    audio.play();
    addActive()
    isPlay = true
    nameSong.textContent = playList[playNum].title
    divList.forEach(el => {
      el.classList.remove("imgActive")
    })
    divList[playNum].classList.add("imgActive")
  } else {
    audio.pause();
    isPlay = false;
    divList.forEach(el => {
      el.classList.remove("imgActive")
    })
  }
  play.classList.toggle("pause")

}


play.addEventListener("click", playAudio)
playPrevBtn.addEventListener("click", playPrev)
playNextBtn.addEventListener("click", playNext)
audio.addEventListener("ended", playNext)

function playNext() {
  if (playNum == playList.length - 1) { playNum = 0 } else {
    playNum++
  }
  if (isPlay) {
    audio.src = playList[playNum].src
    audio.currentTime = 0;
    audio.play();
    divList.forEach(el => {
      el.classList.remove("imgActive")
    })
    divList[playNum].classList.add("imgActive")
  }
  nameSong.textContent = playList[playNum].title
  addActive()
}

function playPrev() {
  if (playNum == 0) { playNum = playList.length - 1 } else {
    playNum--
  }
  if (isPlay) {
    audio.src = playList[playNum].src
    audio.currentTime = 0;
    audio.play();
    divList.forEach(el => {
      el.classList.remove("imgActive")
    })
    divList[playNum].classList.add("imgActive")
  }
  nameSong.textContent = playList[playNum].title
  addActive()
}

for (let i = 0; i < playList.length; i++) {
  // playList.forEach(el => {
  const li = document.createElement('li');
  const div = document.createElement("div")
  div.classList.add("imgMarker")
  div.setAttribute("data-number", `${i}`)
  li.classList.add("play-item")
  li.textContent = playList[i].title
  li.prepend(div)
  playListContainer.append(li)
  // })
}

const liList = document.querySelectorAll('.play-item');
const divList = document.querySelectorAll('.imgMarker');

function addActive() {
  liList.forEach(el => {
    el.classList.remove("item-active")
  })
  liList[playNum].classList.add("item-active")
}

audio.addEventListener("loadeddata", getTime)

function getTime() {
  songLength.textContent = getTimeCodeFromNum(audio.duration);
}

function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}

const timeline = document.querySelector(".timeline");
timeline.addEventListener("click", e => {
  const timelineWidth = window.getComputedStyle(timeline).width;
  const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
  audio.currentTime = timeToSeek;
}, false);

setInterval(() => {
  const progressBar = document.querySelector(".progress");
  progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
  document.querySelector(".current").textContent = getTimeCodeFromNum(
    audio.currentTime
  );
}, 500);


const volumeSlider = document.querySelector(".volume-slider");
volumeSlider.addEventListener('click', e => {
  const sliderWidth = window.getComputedStyle(volumeSlider).width;
  const newVolume = e.offsetX / parseInt(sliderWidth);
  audio.volume = newVolume;
  document.querySelector(".volume-percentage").style.width = newVolume * 100 + '%';
}, false)

document.querySelector(".volume-button").addEventListener("click", () => {
  const volumeEl = document.querySelector(".volume");
  audio.muted = !audio.muted;
  if (audio.muted) {
    volumeEl.classList.remove("icono-volumeMedium");
    volumeEl.classList.add("icono-volumeMute");
  } else {
    volumeEl.classList.add("icono-volumeMedium");
    volumeEl.classList.remove("icono-volumeMute");
  }
});


divList.forEach(el => {
  el.addEventListener("click", changeActive)
})

function changeActive(e) {
  if (!isPlay) {
    playNum = e.target.getAttribute("data-number")
    audio.src = playList[playNum].src
    audio.currentTime = 0;
    audio.play();
    addActive()
    isPlay = true
    nameSong.textContent = playList[playNum].title
    divList.forEach(el => {
      el.classList.remove("imgActive")
    })
    e.target.classList.add("imgActive")

  } else {
    audio.pause();
    isPlay = false;
    divList.forEach(el => {
      el.classList.remove("imgActive")
    })
  }
  play.classList.toggle("pause")
}