const modalRecords = document.querySelector(".game-records.modal");
const gameOverPopUp = document.getElementById("game-over");

function openRecordsModal(event) {
  modalRecords.classList.remove("hidden");
  if (recordsList) {
    fillRecord();
  }
}
function closeModal(event) {
  let closeButton = this.querySelector(".modal__close-button");
  console.log(closeButton);
  if (event.target == closeButton) {
    this.classList.add("hidden");
  }
  if (closeButton.classList.contains("game-over_close-button")) {
    claerCanvas();
    gameWrapper.classList.add("game_before-start");
    startButtonMain.classList.remove("hidden");
  }
}
recordsButton.addEventListener("click", openRecordsModal);
modalRecords.addEventListener("click", closeModal);

gameOverPopUp.addEventListener("click", closeModal);
