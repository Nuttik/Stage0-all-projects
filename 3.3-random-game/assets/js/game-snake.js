// -- Элементы DOM ---
let canvas = document.getElementById("game-field");
let startButtons = document.querySelectorAll(".button-play");
let startButtonMain = document.getElementById("button-start");
let gameWrapper = document.getElementById("game");
let contrlsButtons = document.querySelector(".contrls__buttons");
let buttonUp = document.getElementById("buttonUp");
let buttonDown = document.getElementById("buttonDown");
let buttonLeft = document.getElementById("buttonLeft");
let buttonRight = document.getElementById("buttonRight");

let ctx = canvas.getContext("2d");

// --- Глобальные переменные ---
let isPlay = false;
let score;
let lives;

let elemSize = 64;
let tick;
let snake = {
  parts: [
    { x: 5, y: 6 },
    { x: 4, y: 6 },
    { x: 3, y: 6 },
  ],
  direction: "East", // возможные направления "East", "North", "West", "South"
};

// --- Отрисовка элементов игры ----

function drawElem(elem, src, cropX, cropY) {
  let x = elem.x * elemSize;
  let y = elem.y * elemSize;
  var img = new Image(); // Создаёт новый элемент изображения
  img.src = src; // Устанавливает путь
  img.addEventListener(
    "load",
    function () {
      ctx.drawImage(
        img,
        cropX,
        cropY,
        elemSize,
        elemSize,
        x,
        y,
        elemSize,
        elemSize
      );
    },
    false
  );
}

function drawSnake() {
  snake.parts.forEach((item, index, array) => {
    if (index == 0) {
      switch (snake.direction) {
        case "East":
          drawElem(item, "assets/images/sprite-snake.svg", 240, 0);
          break;

        case "North":
          drawElem(item, "assets/images/sprite-snake.svg", 0, 0);
          break;

        case "West":
          drawElem(item, "assets/images/sprite-snake.svg", 80, 0);
          break;

        case "South":
          drawElem(item, "assets/images/sprite-snake.svg", 160, 0);
          break;
      }
    } else if (index == array.length - 1) {
      if (item.x + 1 == array[index - 1].x) {
        drawElem(item, "assets/images/sprite-snake.svg", 240, 240);
      }
      if (item.x - 1 == array[index - 1].x) {
        drawElem(item, "assets/images/sprite-snake.svg", 80, 240);
      }
      if (item.y + 1 == array[index - 1].y) {
        drawElem(item, "assets/images/sprite-snake.svg", 0, 240);
      }
      if (item.y - 1 == array[index - 1].y) {
        drawElem(item, "assets/images/sprite-snake.svg", 160, 240);
      }
    } else {
      //идет по прямой
      if (item.x + 1 == array[index - 1].x && item.y == array[index - 1].y) {
        drawElem(item, "assets/images/sprite-snake.svg", 240, 320);
      }
      if (item.x - 1 == array[index - 1].x && item.y == array[index - 1].y) {
        drawElem(item, "assets/images/sprite-snake.svg", 80, 320);
      }
      if (item.y + 1 == array[index - 1].y && item.x == array[index - 1].x) {
        drawElem(item, "assets/images/sprite-snake.svg", 0, 320);
      }
      if (item.y - 1 == array[index - 1].y && item.x == array[index - 1].x) {
        drawElem(item, "assets/images/sprite-snake.svg", 160, 320);
      }
      //поворачивает
      //угол нижний правый
      if (
        (item.x + 1 == array[index + 1].x &&
          item.y + 1 == array[index - 1].y) ||
        (item.x + 1 == array[index - 1].x && item.y + 1 == array[index + 1].y)
      ) {
        drawElem(item, "assets/images/sprite-snake.svg", 0, 400);
      }
      //угол верхний левый
      if (
        (item.x - 1 == array[index + 1].x &&
          item.y - 1 == array[index - 1].y) ||
        (item.x - 1 == array[index - 1].x && item.y - 1 == array[index + 1].y)
      ) {
        drawElem(item, "assets/images/sprite-snake.svg", 80, 400);
      }
      // угол нижний левый
      if (
        (item.x - 1 == array[index - 1].x &&
          item.y + 1 == array[index + 1].y) ||
        (item.x - 1 == array[index + 1].x && item.y + 1 == array[index - 1].y)
      ) {
        drawElem(item, "assets/images/sprite-snake.svg", 160, 400);
      }
      //угол верхний правый
      if (
        (item.x + 1 == array[index - 1].x &&
          item.y - 1 == array[index + 1].y) ||
        (item.x + 1 == array[index + 1].x && item.y - 1 == array[index - 1].y)
      ) {
        drawElem(item, "assets/images/sprite-snake.svg", 240, 400);
      }
    }
  });
}

// Движение змейки
function nextLocation() {
  let snakeHead = snake.parts[0];
  let nextX = snakeHead.x;
  let nextY = snakeHead.y;
  if (snake.direction === "East") {
    nextX++;
  } else if (snake.direction === "North") {
    nextY++;
  } else if (snake.direction === "West") {
    nextX--;
  } else if (snake.direction === "South") {
    nextY--;
  }
  return { x: nextX, y: nextY };
}

function moveSnake() {
  snake.parts.forEach((rect) => {
    ctx.clearRect(
      rect.x * elemSize,
      rect.y * elemSize,
      rect.x * elemSize + elemSize,
      rect.y * elemSize + elemSize
    );
  });
  snake.parts.unshift(nextLocation());
  snake.parts.pop();
  drawSnake();
}

// тики для бесконечного движения змейки
function startTick(func) {
  tick = setInterval(func, 500);
}
function stopTick() {
  clearTimeout(tick);
}

// Управление змейкой
// клавиатура
function controlSnakeWithKey(event) {
  if (isPlay == true) {
    if (event.code == "ArrowUp" || event.code == "KeyW") {
      snake.direction = "South";
      event.preventDefault();
    } else if (event.code == "ArrowRight" || event.code == "KeyD") {
      snake.direction = "East";
      event.preventDefault();
    } else if (event.code == "ArrowDown" || event.code == "KeyS") {
      snake.direction = "North";
      event.preventDefault();
    } else if (event.code == "ArrowLeft" || event.code == "KeyA") {
      snake.direction = "West";
      event.preventDefault();
    }
  }
}
// по клику на стрелки на экране
function controlSnakeWithButton(event) {
  if (isPlay == true) {
    if (event.target == buttonUp) {
      snake.direction = "South";
    } else if (event.target == buttonRight) {
      snake.direction = "East";
    } else if (event.target == buttonDown) {
      snake.direction = "North";
    } else if (event.target == buttonLeft) {
      snake.direction = "West";
    }
  }
}
document.addEventListener("keydown", controlSnakeWithKey);
contrlsButtons.addEventListener("click", controlSnakeWithButton);

// -- Старт игры
function startGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  isPlay = true;
  lives = 3;
  score = 0;

  startTick(moveSnake);
}

function clickButtonPlay(event) {
  let button = event.target;
  gameWrapper.classList.remove("game_before-start");
  button.classList.add("hidden");

  startGame();
}

startButtons.forEach((button) => {
  button.addEventListener("click", clickButtonPlay);
});

function pressEnterStart(event) {
  if (
    event.key == "Enter" &&
    gameWrapper.classList.contains("game_before-start")
  ) {
    gameWrapper.classList.remove("game_before-start");
    startButtonMain.classList.add("hidden");
    startGame();
  }
}
document.addEventListener("keydown", pressEnterStart);
