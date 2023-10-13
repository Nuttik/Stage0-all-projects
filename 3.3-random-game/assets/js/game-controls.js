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

//Старт игры

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

function clickButtonPlay(event) {
  gameWrapper.classList.remove("game_before-start");
  startGame(3, 0);
  startButtonMain.classList.add("hidden");
}

startButtons.forEach((button) => {
  button.addEventListener("click", clickButtonPlay);
});
