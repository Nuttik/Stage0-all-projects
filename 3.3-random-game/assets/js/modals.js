// -- Элементы DOM ---
const recordsButton = document.getElementById("records-button");
const modalRecords = document.querySelector(".game-records.modal");
const gameOverPopUp = document.getElementById("game-over");
const listTableRecords = document.querySelectorAll(".result-table");

function openRecordsModal(event) {
  modalRecords.classList.remove("hidden");
  if (recordsList) {
    fillRecord();
  }
}
function closeModal(event) {
  let closeButton = this.querySelector(".modal__close-button");
  if (event.target == closeButton) {
    this.classList.add("hidden");
  }
  if (event.target.classList.contains("game-over_close-button")) {
    claerCanvas();
    startButtonMain.classList.remove("hidden");
    gameWrapper.classList.add("game_before-start");
  }
}

function fillRecord() {
  listTableRecords.forEach((table) => {
    let isUserScore = true;
    table.querySelectorAll("li").forEach((elem, index) => {
      if (recordsList) {
        if (recordsList[index]) {
          if (recordsList[index] == score && isUserScore) {
            elem.classList.add("user-score");
            isUserScore = false;
            elem.innerHTML = recordsList[index];
            addCongratulation(elem, index);
          } else if (
            recordsList[index] != score &&
            elem.classList.contains("user-score")
          ) {
            elem.classList.remove("user-score");
            elem.innerHTML = recordsList[index];
          } else {
            elem.innerHTML = recordsList[index];
          }
        } else {
          elem.innerHTML = "0";
        }
      } else {
        elem.innerHTML = "0";
      }
    });
  });
}

function addCongratulation(li, index) {
  let listCongratulation = [
    "Best!",
    "Perfect!",
    "Excellent!",
    "Amazing!",
    "It's cool!",
    "Great!",
    "Good result!",
    "Good!",
    "I believe in you",
    "You can more",
  ];
  let congratulation = listCongratulation[index];
  let span = document.createElement("span");
  span.innerHTML = congratulation;
  li.append(span);
}

recordsButton.addEventListener("click", openRecordsModal);
modalRecords.addEventListener("click", closeModal);
gameOverPopUp.addEventListener("click", closeModal);
