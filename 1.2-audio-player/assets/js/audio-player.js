//Элементы DOM

const audio = new Audio();
const playBtn = document.querySelector(".audio-player__play-btn");
const nextBtn = document.querySelector(".audio-player__next-btn");
const prevBtn = document.querySelector(".audio-player__prev-btn");
const trackTitle = document.querySelector(".track-title");
const trackArtist = document.querySelector(".track-artist");
const trackImg = document.querySelector(".audio-player__track-img");

//Глобальные переменные

let isPlay = false;
let currentIndex = 0; // индекс звучащей песни;

//Список треков

const playList = [
  {
    artist: "David Bowie",
    title: "Life On Mars",
    duration: 218,
    cover: "assets/images/covers/1.jpg",
    audioPath: "assets/audio/DavidBowie-LifeOnMars.mp3",
  },
  {
    artist: "Bob Dylan",
    title: "Knockin On Heavens Door",
    duration: 150,
    cover: "assets/images/covers/2.jpg",
    audioPath: "assets/audio/BobDylan-KnockinOnHeavensDoor.mp3",
  },
  {
    artist: "Queen",
    title: "Love of my life",
    duration: 262,
    cover: "assets/images/covers/3.jpg",
    audioPath: "assets/audio/Queen-Loveofmylife.mp3",
  },
];

//Функции

function playAudio() {
  audio.src = playList[currentIndex].audioPath;
  isPlay = true;
  audio.currentTime = 0;
  audio.play();
  if (!playBtn.classList.contains("pause-btn")) {
    playBtn.classList.toggle("pause-btn");
  }
  showTrackInfo();
  showTrackCover();
}
function pauseAudio() {
  isPlay = false;
  audio.pause();
  playBtn.classList.toggle("pause-btn");
}

function clickPlayBtn() {
  if (isPlay) {
    pauseAudio();
  } else if (!isPlay) {
    playAudio();
  }
}

function playNextAudio() {
  if (currentIndex < playList.length - 1) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  playAudio();
}
function playPrevAudio() {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = playList.length - 1;
  }
  playAudio();
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
}

//Подключение функций
startScreen();
playBtn.addEventListener("click", clickPlayBtn);
nextBtn.addEventListener("click", playNextAudio);
prevBtn.addEventListener("click", playPrevAudio);
