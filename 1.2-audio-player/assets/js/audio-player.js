//Элементы DOM

const audio = new Audio();
const playBtn = document.querySelector(".audio-player__play-btn");
const nextBtn = document.querySelector(".audio-player__next-btn");
const prevBtn = document.querySelector(".audio-player__prev-btn");
const trackTitle = document.querySelector(".track-title");
const trackArtist = document.querySelector(".track-artist");
const trackImg = document.querySelector(".audio-player__track-img");
const progressFilled = document.querySelector(".progress__filled input");
const currentTimeFielf = document.querySelector(".progress__time-current");
const endTimeFielf = document.querySelector(".progress__time-end");

//Глобальные переменные

let isPlay = false;
let currentIndex = 0; // индекс звучащей песни;
let currentTime = 0;
let tick;
let tickProgress;

//Список треков

const playList = [
  {
    artist: "David Bowie",
    title: "Life On Mars",
    duration: 217,
    cover: "assets/images/covers/1.jpg",
    audioPath: "assets/audio/DavidBowie-LifeOnMars.mp3",
  },
  {
    artist: "Bob Dylan",
    title: "Knockin On Heavens Door",
    duration: 149,
    cover: "assets/images/covers/2.jpg",
    audioPath: "assets/audio/BobDylan-KnockinOnHeavensDoor.mp3",
  },
  {
    artist: "Queen",
    title: "Love of my life",
    duration: 261,
    cover: "assets/images/covers/3.jpg",
    audioPath: "assets/audio/Queen-Loveofmylife.mp3",
  },
];

//Функции

function playAudio() {
  audio.src = playList[currentIndex].audioPath;
  isPlay = true;
  if (Math.round(currentTime) == playList[currentIndex].duration) {
    audio.currentTime = 0;
  } else {
    audio.currentTime = progressFilled.value;
  }

  audio.play();

  if (!playBtn.classList.contains("pause-btn")) {
    playBtn.classList.toggle("pause-btn");
  }
  setProgresField();
  showTrackInfo();
  showTrackCover();
  fillTimeField(endTimeFielf, playList[currentIndex].duration);
}
function pauseAudio() {
  isPlay = false;
  audio.pause();
  playBtn.classList.toggle("pause-btn");

  stopTick();
  clearInterval(tickProgress);
}

function clickPlayBtn() {
  if (isPlay) {
    pauseAudio();
  } else if (!isPlay) {
    playAudio();
  }
}

function playNextAudio() {
  clearInterval(tick);
  if (currentIndex < playList.length - 1) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  currentTime = 0;
  progressFilled.value = 0;
  playAudio();
  changeBodyBg()
}
function playPrevAudio() {
  clearInterval(tick);
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = playList.length - 1;
  }
  currentTime = 0;
  progressFilled.value = 0;
  playAudio();
  changeBodyBg()
}

function showTrackInfo() {
  trackTitle.innerHTML = playList[currentIndex].title;
  trackArtist.innerHTML = playList[currentIndex].artist;
}

function showTrackCover() {
  trackImg.style.background =
    "url('" + playList[currentIndex].cover + "') no-repeat center";
  trackImg.style.backgroundSize = "cover";
}

function startScreen() {
  showTrackInfo();
  showTrackCover();
  fillTimeField(currentTimeFielf, currentTime);
  fillTimeField(endTimeFielf, playList[currentIndex].duration);
  setProgresField();
  changeBodyBg();
}

function fillTimeField(field, time) {
  let min = 0;
  let sec = 0;
  let duration = time;
  sec =
    duration % 60 < 10
      ? "0" + Math.floor(duration % 60)
      : Math.floor(duration % 60);
  min =
    Math.floor(duration / 60) < 10
      ? "0" + Math.floor(duration / 60)
      : Math.floor(duration / 60);
  field.innerHTML = min + ":" + sec;
}

function setProgresField() {
  progressFilled.max = playList[currentIndex].duration;

  if (isPlay) {
    tick = setInterval(function () {
      currentTime = audio.currentTime;
      progressFilled.value = currentTime;
      fillTimeField(currentTimeFielf, Math.floor(currentTime));
    }, 1);
  } else if (currentTime == 0) {
    progressFilled.value = 0;
  }
}

function moveProgressValue() {
  if (progressFilled.value != 0) {
    currentTime = progressFilled.value;
    fillTimeField(currentTimeFielf, Math.floor(currentTime));
    if (isPlay) {
      playAudio();
    }
  }
}
function stopTick() {
  if (progressFilled.value != 0 || audio.currentTime != 0) {
    clearInterval(tick);
  }
}

function changeBodyBg(){
  document.body.style.backgroundImage =
  "url('" + playList[currentIndex].cover + "')";
}

//Подключение функций
startScreen();
playBtn.addEventListener("click", clickPlayBtn);
nextBtn.addEventListener("click", playNextAudio);
prevBtn.addEventListener("click", playPrevAudio);
progressFilled.addEventListener("mousedown", stopTick);
progressFilled.addEventListener("touchstart", stopTick);
progressFilled.addEventListener("mouseup", moveProgressValue);
progressFilled.addEventListener("touchend", moveProgressValue);
