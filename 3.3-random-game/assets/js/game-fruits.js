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
      drawElem(fruit[1], 0, 480);
      break;

    case "pears":
      drawElem(fruit[1], 80, 480);
      break;

    case "bananas":
      drawElem(fruit[1], 160, 480);
      break;
  }
}
function addFruit() {
  if (timer % 150 == 0) {
    drawNewFruit();
  }
}

function removeFruit(next) {
  let nextFruitType = isNextFruit(next)[0];
  let indexFruit = isNextFruit(next)[1];
  fruits[nextFruitType].splice(indexFruit, 1);
}

function drawAllFruit() {
  for (let fruit in fruits) {
    if (fruits[fruit].length > 0) {
      fruits[fruit].forEach((coord) => {
        switch (fruit) {
          case "apples":
            drawElem(coord, 0, 480);
            break;

          case "pears":
            drawElem(coord, 80, 480);
            break;

          case "bananas":
            drawElem(coord, 160, 480);
            break;
        }
      });
    }
  }
}
