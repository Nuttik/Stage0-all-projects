//---Элементы DOM---//
const search = document.getElementById("search");
const input = search.querySelector("input");
const searchButton = search.querySelector(".search__icon");
const gallery = document.getElementById("gallery");
const buttonMore = gallery.querySelector(".button");
const galleryImageList = gallery.querySelector(".gallery__img-list");
const modal = document.getElementById("gallery-modal");
const modalContainer = modal.querySelector(".modal__container");

//---Глобальные переменные---//
let query;
let count = 12;
let moreCount = 9;
let pageNumber;

//---Функции---//
function addInputClassActive() {
  input.addEventListener("focus", function () {
    search.classList.add("active");
  });
  input.addEventListener("blur", function () {
    search.classList.remove("active");
  });
}

function startSeach() {
  if (input.value != "") {
    query = input.value;
  } else {
    query = "random";
  }

  getData();
}

async function increaseCount() {
  pageNumber += 6;
  const url =
    "https://api.unsplash.com/search/photos?query=" +
    query +
    "&per_page=" +
    moreCount +
    "&page=" +
    pageNumber +
    "&orientation=landscape&client_id=Z5ocwIy6zQdB2J-rFSJY20wNoPDYrqUXiJAWFviTUfQ";

  const join = await fetch(url);
  const data = await join.json();

  createImage(data);
  openModal();
  closeModal();
}

function createImage(data) {
  if (data.results.length < 1) {
    let message = `<p class="gallery__message">Oooops... Nothing was found for your request.</p>`;
    galleryImageList.insertAdjacentHTML("beforeend", message);
    buttonMore.disabled = true;
  } else {
    for (let i = 0; i < data.results.length; i++) {
      const urlSmallImg = data.results[i].urls.small;
      const imgAlt = data.results[i].alt_description;
      const img = `<li class="gallery__item"><img class="gallery__img" src=${urlSmallImg} alt="${imgAlt}" title="Click to enlarge"></li>`;
      galleryImageList.insertAdjacentHTML("beforeend", img);
      buttonMore.disabled = false;
    }
  }
}

function clearImageList() {
  galleryImageList.innerHTML = "";
}

async function getData() {
  pageNumber = Math.floor(Math.random() * 30);
  const url =
    "https://api.unsplash.com/search/photos?query=" +
    query +
    "&per_page=" +
    count +
    "&page=" +
    pageNumber +
    "&orientation=landscape&client_id=Z5ocwIy6zQdB2J-rFSJY20wNoPDYrqUXiJAWFviTUfQ";
  const join = await fetch(url);
  const data = await join.json();

  clearImageList();
  createImage(data);
  openModal();
  closeModal();

  //путь к миниатюре data.results[i].urls.small;
  //путь к среднему размеру data.results[1].urls.regular
}

function addImagesInModal(event) {
  modal.classList.remove("hidden");
  let url = event.target.src.replace("&w=400", "&w=1080");
  let alt = event.target.alt;
  let img = `<img class="modal__img" src=${url} alt="${alt}" />`;
  modalContainer.insertAdjacentHTML("beforeend", img);
}

function openModal() {
  const imageList = document.querySelectorAll(".gallery__img");
  imageList.forEach(function (img) {
    img.addEventListener("click", addImagesInModal);
  });
}

function closeModal() {
  const butonClose = modal.querySelector(".modal__closeButton");
  modal.addEventListener("click", function (event) {
    if (event.target == butonClose || !event.target.closest(".modal__window")) {
      modal.classList.add("hidden");
      modalContainer.innerHTML = "";
    }
  });
}

//let event = new Event("focus");
//elem.dispatchEvent(event);

//---вызов стартовых функций---//
startSeach();
addInputClassActive();
buttonMore.addEventListener("click", increaseCount);

//поиск по клику на иконку
searchButton.onclick = startSeach;

//поиск по нажатию на 'enter'
document.addEventListener("keyup", function (event) {
  if (event.code === "Enter") {
    startSeach();
  }
});
