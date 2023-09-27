//---Элементы DOM---//
const search = document.getElementById("search");
const input = search.querySelector("input");
const searchButton = search.querySelector(".search__icon");
const galery = document.getElementById("galery");
const buttonMore = galery.querySelector(".button");
const galeryImageList = galery.querySelector(".galery__img-list");

//---Глобальные переменные---//
let query;
let count = 9;

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
    query = "photo";
  }

  getData();
}

function increaseCount() {
  count += 9;
  getData();
}

function createImage(data) {
  for (let i = 0; i < data.results.length; i++) {
    const urlSmallImg = data.results[i].urls.small;
    const imgAlt = data.results[i].alt_description;
    const img = `<li class="galery__item"><img class="galery__img" src=${urlSmallImg} alt="${imgAlt}"></li>`;
    galeryImageList.insertAdjacentHTML("beforeend", img);
  }
}
function clearImageList() {
  galeryImageList.innerHTML = "";
}

async function getData() {
  const url =
    "https://api.unsplash.com/search/photos?query=" +
    query +
    "&per_page=" +
    count +
    "&orientation=landscape&client_id=Z5ocwIy6zQdB2J-rFSJY20wNoPDYrqUXiJAWFviTUfQ";

  const join = await fetch(url);
  const data = await join.json();

  clearImageList();
  createImage(data);

  console.log(url);
  console.log(data);

  //путь к миниатюре data.results[i].urls.small;
  //путь к среднему размеру data.results[1].urls.regular
  //вызов функций использующих data
}

//---вызов функций---//
startSeach();

addInputClassActive();

//поиск по клику на иконку
searchButton.onclick = startSeach;

//поиск по нажатию на пробел
document.addEventListener("keydown", function (event) {
  if (event.code === "Enter") {
    startSeach();
  }
});

buttonMore.addEventListener("click", increaseCount);
