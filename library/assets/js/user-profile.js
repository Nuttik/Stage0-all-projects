//const modalProfile = document.getElementById("modalProfile"); объявлена в modal-windows.js

const userAvatar = modalProfile.querySelector(".user-avatar");
const userName = modalProfile.querySelector(".user-name");
const coutnVisits = modalProfile.querySelector(".visits .info-count");
const coutnBooks = modalProfile.querySelector(".books .info-count");
const cardNumber = modalProfile.querySelector(
  ".profile__card .profile__card-number"
);
const booksRentedList = modalProfile.querySelector(
  "ul.profile__rented-books-list"
);

userAvatar.innerHTML =
  localStorage.getItem("firstName").slice(0, 1) +
  localStorage.getItem("lastName").slice(0, 1);

userName.innerHTML =
  localStorage.getItem("firstName") + " " + localStorage.getItem("lastName");

coutnVisits.innerHTML = localStorage.getItem("visits");

cardNumber.innerHTML = localStorage.getItem("cardNumber");

coutnBooks.innerHTML = localStorage.getItem("countBooks");

//доработать добавление книг в список!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function createdBooksRentedList() {
  if (!localStorage.getItem("rentedBooks")) {
    booksRentedList.innerHTML = "<li>You don't have any books yet</li>";
  } else {
    newUser.rentedBooks.forEach((book) => {
      booksRentedList.innerHTML += book;
    });
  }
}

//обновляю данные при каждом открытие профиля
function updateProfileData() {
  createdBooksRentedList();
  coutnVisits.innerHTML = localStorage.getItem("visits");
  coutnBooks.innerHTML = localStorage.getItem("countBooks");
}

buttonsOpenProfile.forEach((link) => {
  link.addEventListener("click", updateProfileData);
});

//копирую номер карты в буфер обмена
function copyCardNumber() {
  let copyLink = document.getElementById("copy");
  copyLink.addEventListener("click", () => {
    let cardNumber = localStorage.getItem("cardNumber").toUpperCase();

    navigator.clipboard
      .writeText(cardNumber)
      .then(() => {})
      .catch((err) => {
        console.error("Error in copying text: ", err);
      });
  });
}
copyCardNumber();
