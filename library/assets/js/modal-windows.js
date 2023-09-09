//Закрытие модальных окон по клику на крестик
const modalsList = Array.from(document.querySelectorAll(".modal"));

modalsList.forEach((modal) => {
  const modalWindow = modal.querySelector(".modal__window");
  const closeButton = modal.querySelector(".modal__closeButton");
  const submitButton = modal.querySelector(".button");
  modal.addEventListener("click", (event) => {
    if (
      !modalWindow.contains(event.target) ||
      event.target == closeButton ||
      event.target.closest("a")
    ) {
      modal.classList.add("hidden");
    }
  });
});

//вызов модальных окон по клику на соответствующие кнопки/ссылки
const buttonsOpenRegister = Array.from(
  document.querySelectorAll(".openModalRegister")
);

const buttonsOpenLogin = Array.from(
  document.querySelectorAll(".openModalLogin")
);
const buttonsOpenProfile = Array.from(
  document.querySelectorAll(".openModalProfile")
);
const modalLogin = document.getElementById("modalLogin");
const modalRegister = document.getElementById("modalRegister");
const modalProfile = document.getElementById("modalProfile");

function openModal(arrayLinks, modal) {
  arrayLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      modal.classList.remove("hidden");
      event.preventDefault();
    });
  });
}
openModal(buttonsOpenLogin, modalLogin);
openModal(buttonsOpenRegister, modalRegister);
openModal(buttonsOpenProfile, modalProfile);

//вызов модальных окон для незарегистированных пользователей по клику на кнопку Bye
const buttonsByeList = Array.from(
  document.getElementById("favorites").querySelectorAll(".button")
);

function showModalLogin(event) {
  let errorMes = loginForm.querySelector(".error-m");
  if (!errorMes.classList.contains("hidden")) {
    errorMes.classList.add("hidden");
  }
  if (localStorage.getItem("isLogin") == "false") {
    modalLogin.classList.remove("hidden");
    event.preventDefault();
  }
  event.preventDefault();
}
const modalBuyCard = document.getElementById("modalBuyCard");

function showModalBuy(event) {
  let errorMes = loginForm.querySelector(".error-m");
  if (!errorMes.classList.contains("hidden")) {
    errorMes.classList.add("hidden");
  }
  if (localStorage.getItem("isLogin") == "true") {
    modalBuyCard.classList.remove("hidden");
    event.preventDefault();
  }
  event.preventDefault();
}

function changeModalOnbuttonsByeList() {
  buttonsByeList.forEach((button) => {
    if (localStorage.getItem("isLogin") == "false") {
      button.addEventListener("click", showModalLogin);
    } else if (
      localStorage.getItem("isLogin") == "true" &&
      localStorage.getItem("hasCard") == "false"
    ) {
      button.addEventListener("click", showModalBuy);
    } else if (
      localStorage.getItem("isLogin") == "true" &&
      localStorage.getItem("hasCard") == "true"
    ) {
      button.removeEventListener("click", showModalBuy);
    }
  });
}
changeModalOnbuttonsByeList();
