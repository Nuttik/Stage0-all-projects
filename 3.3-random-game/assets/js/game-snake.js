// -- Элементы DOM ---
const canvas = document.getElementById("game-field");
const gameWrapper = document.getElementById("game");
const livesVeiw = document.querySelectorAll(".health-point");

const ctx = canvas.getContext("2d");
const srcSrc = "assets/images/sprite-snake.svg";
let sprite = new Image(); // Создаёт новый элемент изображения
sprite.src = srcSrc; // Устанавливает путь

// --- Глобальные переменные ---
let isPlay = false;
let isCrashSnake = false;
let intervalAddFruit;
let score;
let lives;
let elemSize = 64;
let tick;
let imgSrc;
let snake;
let fruits;
let timer;
let speed;

// --- Отрисовка элементов игры ----
function drawElem(elem, cropX, cropY) {
  let x = elem.x * elemSize;
  let y = elem.y * elemSize;
  ctx.drawImage(
    sprite,
    cropX,
    cropY,
    elemSize,
    elemSize,
    x,
    y,
    elemSize,
    elemSize
  );
}

// тики для бесконечного движения змейки
function startTick() {
  tick = setInterval(function () {
    timer++;
    addFruit();
    moveSnake();
    drawSnake();
    drawAllFruit();
  }, 14);
}
function stopTick() {
  clearInterval(tick);
}

function drawSnake(imgSrc) {
  let next = nextLocation();
  snake.parts.forEach((item, index, array) => {
    if (index == 0) {
      switch (snake.direction) {
        case "East":
          if (isCrashSnake == true) {
            drawElem(item, 240, 80);
          } else if (isNextFruit(next)) {
            drawElem(item, 240, 160);
          } else {
            drawElem(item, 240, 0);
          }

          break;

        case "North":
          if (isCrashSnake == true) {
            drawElem(item, 0, 80);
          } else if (isNextFruit(next)) {
            drawElem(item, 0, 160);
          } else {
            drawElem(item, 0, 0);
          }
          break;

        case "West":
          if (isCrashSnake == true) {
            drawElem(item, 80, 80);
          } else if (isNextFruit(next)) {
            drawElem(item, 80, 160);
          } else {
            drawElem(item, 80, 0);
          }
          break;

        case "South":
          if (isCrashSnake == true) {
            drawElem(item, 160, 80);
          } else if (isNextFruit(next)) {
            drawElem(item, 160, 160);
          } else {
            drawElem(item, 160, 0);
          }
          break;
      }
    } else if (index == array.length - 1) {
      if (item.x + 1 == array[index - 1].x) {
        drawElem(item, 240, 240);
      }
      if (item.x - 1 == array[index - 1].x) {
        drawElem(item, 80, 240);
      }
      if (item.y + 1 == array[index - 1].y) {
        drawElem(item, 0, 240);
      }
      if (item.y - 1 == array[index - 1].y) {
        drawElem(item, 160, 240);
      }
    } else {
      //идет по прямой
      if (item.x + 1 == array[index - 1].x && item.y == array[index - 1].y) {
        drawElem(item, 240, 320);
      }
      if (item.x - 1 == array[index - 1].x && item.y == array[index - 1].y) {
        drawElem(item, 80, 320);
      }
      if (item.y + 1 == array[index - 1].y && item.x == array[index - 1].x) {
        drawElem(item, 0, 320);
      }
      if (item.y - 1 == array[index - 1].y && item.x == array[index - 1].x) {
        drawElem(item, 160, 320);
      }
      //поворачивает
      //угол нижний правый
      if (
        (item.x + 1 == array[index + 1].x &&
          item.y + 1 == array[index - 1].y) ||
        (item.x + 1 == array[index - 1].x && item.y + 1 == array[index + 1].y)
      ) {
        drawElem(item, 0, 400);
      }
      //угол верхний левый
      if (
        (item.x - 1 == array[index + 1].x &&
          item.y - 1 == array[index - 1].y) ||
        (item.x - 1 == array[index - 1].x && item.y - 1 == array[index + 1].y)
      ) {
        drawElem(item, 80, 400);
      }
      // угол нижний левый
      if (
        (item.x - 1 == array[index - 1].x &&
          item.y + 1 == array[index + 1].y) ||
        (item.x - 1 == array[index + 1].x && item.y + 1 == array[index - 1].y)
      ) {
        drawElem(item, 160, 400);
      }
      //угол верхний правый
      if (
        (item.x + 1 == array[index - 1].x &&
          item.y - 1 == array[index + 1].y) ||
        (item.x + 1 == array[index + 1].x && item.y - 1 == array[index - 1].y)
      ) {
        drawElem(item, 240, 400);
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

function claerCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function moveSnake() {
  if (timer % speed == 0) {
    claerCanvas();
    let next = nextLocation();

    if (isNextWall(next) || isNextTail(next)) {
      crashSnake();
    } else {
      if (isNextFruit(next)) {
        //звук
        bonus.currentTime = 0;
        bonus.play();
        //увеличиваем счет в зависимости от типа фрукта
        increaseScore(next);

        //// удаления фрукта, для этого isNextFruit возвращает [тип фрукта,индекс его координат]
        removeFruit(next);

        // увеличение скорости
        if (speed > 5) {
          //добавлена проверка, чтобы исключитьмгновенное повторение шага вперед после съедания
          if ((timer % speed) - 3 != 0) {
            speed = speed - 3;
          } else {
            speed = speed - 4;
          }
        }

        //// Увеличение длинны змейки
        let indexTail = snake.parts.length - 1;
        let tail = snake.parts[indexTail];
        //движется вперед
        if (
          tail.x == snake.parts[indexTail - 1].x + 1 &&
          tail.y == snake.parts[indexTail - 1].y
        ) {
          snake.parts.push({ x: tail.x - 1, y: tail.y });
        }
        //движется назад
        if (
          tail.x == snake.parts[indexTail - 1].x - 1 &&
          tail.y == snake.parts[indexTail - 1].y
        ) {
          snake.parts.push({ x: tail.x + 1, y: tail.y });
        }
        //движется вниз
        if (
          tail.x == snake.parts[indexTail - 1].x &&
          tail.y == snake.parts[indexTail - 1].y + 1
        ) {
          snake.parts.push({ x: tail.x, y: tail.y - 1 });
        }
        //движется вверх
        if (
          tail.x == snake.parts[indexTail - 1].x &&
          tail.y == snake.parts[indexTail - 1].y - 1
        ) {
          snake.parts.push({ x: tail.x, y: tail.y + 1 });
        }
      }
      snake.parts.unshift(next);
      snake.parts.pop();
    }
  }
}

// Змейка врезается в препятствие
function crashSnake() {
  stopTick();
  lives = lives - 1;
  isCrashSnake = true;
  changeLivesVeiw();

  if (lives > 0) {
    setTimeout(function () {
      startGame(lives, score);
    }, 1000);
  }
  if (lives == 0) {
    gameOverPopUp.classList.remove("hidden");
    addRecord();

    //звуки
    soundMaimTheme.pause();
    gameOver.play();
  }
  clearInterval(intervalAddFruit); //остановка отрисовки фруктов

  //звук
  crash.play();
}

function isNextWall(next) {
  if (
    next.x < 0 ||
    next.y < 0 ||
    next.x * elemSize == canvas.width ||
    next.y * elemSize == canvas.height
  ) {
    return true;
  } else return false;
}
function isNextTail(next) {
  let result = false;
  snake.parts.map((item) => {
    if (item.x === next.x && item.y === next.y) {
      result = true;
    }
  });
  return result;
}

function isNextFruit(next) {
  let result = false;
  for (let fruit in fruits) {
    if (fruits[fruit].length > 0) {
      fruits[fruit].forEach((coord, index) => {
        if (coord.x === next.x && coord.y === next.y) {
          result = [fruit, index];
        }
      });
    }
  }
  return result;
}

// -- Старт игры
function startGame(countLives, countScore) {
  claerCanvas();
  snake = {
    parts: [
      { x: 3, y: 5 },
      { x: 2, y: 5 },
      { x: 1, y: 5 },
    ],
    direction: "East", // возможные направления "East", "North", "West", "South"
  };
  fruits = {
    apples: [],
    pears: [],
    bananas: [],
  };
  isPlay = true;
  isCrashSnake = false;
  lives = countLives;
  score = countScore;
  timer = 0;
  speed = 35;

  if (!gameOverPopUp.classList.contains("hidden")) {
    gameOverPopUp.classList.add("hidden");
  }

  changeLivesVeiw();
  changeScoreVeiw();
  startTick();
  addFruit();

  //звук
  soundMaimTheme.play();
}
