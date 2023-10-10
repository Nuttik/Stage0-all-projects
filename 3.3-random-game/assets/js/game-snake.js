/* Баги: 
 -- змейка мигает из-за очищения ее тела при отрисовки перемещения
 -- фрукты мигают. из-за разных сетинтервалов их затирает стирание теле змейки при перемещении. 
 Но иногда очищается и фрукт на позиции где змейка еще не была, 
 НО при отключении очистки тела змейки фрукты перестают исчезать 
*/

// -- Элементы DOM ---
const canvas = document.getElementById("game-field");
const startButtons = document.querySelectorAll(".button-play");
const startButtonMain = document.getElementById("button-start");
const gameWrapper = document.getElementById("game");
const contrlsButtons = document.querySelector(".contrls__buttons");
const buttonUp = document.getElementById("buttonUp");
const buttonDown = document.getElementById("buttonDown");
const buttonLeft = document.getElementById("buttonLeft");
const buttonRight = document.getElementById("buttonRight");
const gameOverPopUp = document.getElementById("game-over");

const ctx = canvas.getContext("2d");

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

function drawSnake(imgSrc) {
  snake.parts.forEach((item, index, array) => {
    if (index == 0) {
      switch (snake.direction) {
        case "East":
          if (isCrashSnake == true) {
            drawElem(item, "assets/images/sprite-snake.svg", 240, 80);
          } else {
            drawElem(item, "assets/images/sprite-snake.svg", 240, 0);
          }

          break;

        case "North":
          if (isCrashSnake == true) {
            drawElem(item, "assets/images/sprite-snake.svg", 0, 80);
          } else {
            drawElem(item, "assets/images/sprite-snake.svg", 0, 0);
          }
          break;

        case "West":
          if (isCrashSnake == true) {
            drawElem(item, "assets/images/sprite-snake.svg", 80, 80);
          } else {
            drawElem(item, "assets/images/sprite-snake.svg", 80, 0);
          }
          break;

        case "South":
          if (isCrashSnake == true) {
            drawElem(item, "assets/images/sprite-snake.svg", 160, 80);
          } else {
            drawElem(item, "assets/images/sprite-snake.svg", 160, 0);
          }
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

function drawAllFruit() {
  for (let fruit in fruits) {
    if (fruits[fruit].length > 0) {
      fruits[fruit].forEach((coord) => {
        switch (fruit) {
          case "apples":
            drawElem(coord, "assets/images/sprite-snake.svg", 0, 480);
            break;

          case "pears":
            drawElem(coord, "assets/images/sprite-snake.svg", 80, 480);
            break;

          case "bananas":
            drawElem(coord, "assets/images/sprite-snake.svg", 160, 480);
            break;
        }
      });
    }
  }

// тики для бесконечного движения змейки
function startTick() {
  tick = setInterval(function () {
    moveSnake();
    drawSnake();
    drawAllFruit();
  }, 300);
}
function stopTick() {
  clearInterval(tick);
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
    //ЗАТИРАЕТ ФРУКТЫ!!!!!!!!!!!
    ctx.clearRect(
      rect.x * elemSize,
      rect.y * elemSize,
      rect.x * elemSize + elemSize,
      rect.y * elemSize + elemSize
    );
  });

  let next = nextLocation();
  if (isNextWall(next) || isNextTail(next)) {
    crashSnake();
  } else {
    snake.parts.unshift(next);
    snake.parts.pop();
  }
}

// Змейка врезается в препятствие
function crashSnake() {
  stopTick();
  lives = lives - 1;
  isCrashSnake = true;

  if (lives > 0) {
    setTimeout(function () {
      startGame(lives, score);
    }, 1000);
  }
  if (lives == 0) {
    gameOverPopUp.classList.remove("hidden");
  }
  clearInterval(intervalAddFruit); //остановка отрисовки фруктов
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

// Фрукты

function newFruit() {
  //выбираем какой фрукт добавляем из объекта fruit
  let num = Math.floor(Math.random() * 3);
  let typeFruit = Object.keys(fruits)[num];

  //выбираем рандомное свободное место на поле (где нет змейки)
  let fruitLocation = randomFreeCoordinates(typeFruit);

  //пушим координаты в объект фруктов по нужному типу
  fruits[typeFruit].push(fruitLocation);

  //возвращаем массив [тип фрукта, позицию]
  return [typeFruit, fruitLocation];
}

function randomFreeCoordinates(typeFruit) {
  //выбираем рандомное свободное место на поле (где нет змейки)
  let maxX = 10;
  let maxY = 10;
  let randX = Math.floor(Math.random() * maxX + 1);
  let randY = Math.floor(Math.random() * maxY + 1);
  let isFree = true;

  snake.parts.forEach((part) => {
    if (part.x === randX && part.y === randY) {
      isFree = false;
    }
  });
  if (isFree == true) {
    for (key in fruits) {
      fruits[key].forEach((fruit) => {
        if (fruit.x === randX && fruit.y === randY) {
          isFree = false;
        }
      });
    }
  }
  return isFree === true
    ? { x: randX, y: randY }
    : randomFreeCoordinates(typeFruit);
}
function drawNewFruit() {
  let fruit = newFruit();
  switch (fruit[0]) {
    case "apples":
      drawElem(fruit[1], "assets/images/sprite-snake.svg", 0, 480);
      break;

    case "pears":
      drawElem(fruit[1], "assets/images/sprite-snake.svg", 80, 480);
      break;

    case "bananas":
      drawElem(fruit[1], "assets/images/sprite-snake.svg", 160, 480);
      break;
  }
}
function addFruit() {
  if (isPlay === true && isCrashSnake === false) {
    intervalAddFruit = setInterval(drawNewFruit, 2000); //СТИРАЕТСЯ ИЗ_ЗА СЕТИНТЕРВАЛА ТАМ, ГДЕ ЗМЕЙКА БЫЛА 4 СЕКУНДЫ НАЗАД
  }
}

// Управление змейкой
// клавиатура
function controlSnakeWithKey(event) {
  if (isPlay == true) {
    if (
      (event.code == "ArrowUp" || event.code == "KeyW") &&
      snake.direction != "North"
    ) {
      snake.direction = "South";
    } else if (
      (event.code == "ArrowRight" || event.code == "KeyD") &&
      snake.direction != "West"
    ) {
      snake.direction = "East";
    } else if (
      (event.code == "ArrowDown" || event.code == "KeyS") &&
      snake.direction != "South"
    ) {
      snake.direction = "North";
    } else if (
      (event.code == "ArrowLeft" || event.code == "KeyA") &&
      snake.direction != "East"
    ) {
      snake.direction = "West";
    }

    if (
      event.code == "ArrowUp" ||
      event.code == "ArrowRight" ||
      event.code == "ArrowDown" ||
      event.code == "ArrowLeft"
    ) {
      event.preventDefault();
    }
  }
}
// по клику на стрелки на экране
function controlSnakeWithButton(event) {
  if (isPlay == true) {
    if (event.target == buttonUp && snake.direction != "North") {
      snake.direction = "South";
    } else if (event.target == buttonRight && snake.direction != "West") {
      snake.direction = "East";
    } else if (event.target == buttonDown && snake.direction != "South") {
      snake.direction = "North";
    } else if (event.target == buttonLeft && snake.direction != "East") {
      snake.direction = "West";
    }
  }
}
document.addEventListener("keydown", controlSnakeWithKey);
contrlsButtons.addEventListener("click", controlSnakeWithButton);

// -- Старт игры
function startGame(countLives, countScore) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snake = {
    parts: [
      { x: 5, y: 5 },
      { x: 4, y: 5 },
      { x: 3, y: 5 },
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

  if (!gameOverPopUp.classList.contains("hidden")) {
    gameOverPopUp.classList.add("hidden");
  }

  startTick();
  addFruit();
}

function clickButtonPlay(event) {
  gameWrapper.classList.remove("game_before-start");
  startButtonMain.classList.add("hidden");
  startGame(3, 0);
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
    startGame(3, 0);
  }
}
document.addEventListener("keydown", pressEnterStart);
