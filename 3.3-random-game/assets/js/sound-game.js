const sounds = [
  {
    title: "mainTheme",
    src: "assets/sounds/main-theme.mp3",
    volume: 0.3,
    isLoop: true,
  },
  {
    title: "bonus",
    src: "assets/sounds/eating.mp3",
    volume: 0.5,
    isLoop: false,
  },
  {
    title: "crash ",
    src: "assets/sounds/crash.mp3",
    volume: 0.5,
    isLoop: false,
  },
  {
    title: "gameOver",
    src: "assets/sounds/game-over.mp3",
    volume: 0.5,
    isLoop: false,
  },
  {
    title: "aw",
    src: "assets/sounds/aw.mp3",
    volume: 0.8,
    isLoop: false,
  },
];

let soundsArray;

function addSounds(sounds) {
  soundsArray = sounds.map((sound, index) => {
    audio = new Audio();
    audio.src = sound.src;
    audio.volume = sound.volume;
    audio.loop = sound.isLoop;
    audio.title = sound.title;
    return audio;
  });
}

addSounds(sounds);

const soundMaimTheme = soundsArray[0];
const bonus = soundsArray[1];
const crash = soundsArray[2];
const gameOver = soundsArray[3];
const aw = soundsArray[4];
