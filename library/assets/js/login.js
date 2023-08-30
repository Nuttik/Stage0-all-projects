const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

function User(firstName, lastName, mail, password) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.mail = mail;
  this.password = password;
  this.visits = 0;
  this.cardNumber = ""; //ПОсле покупки BUY A LIBRARY CARD - Будет сгенерирован девятизначный Card Number случайным образом в формате 16-ричного числа.
  this.rentedBooks = [];

  //методы
  this.register = () => {
    localStorage.setItem("firstName", this.firstName);
    localStorage.setItem("lastName", this.lastName);
    localStorage.setItem("mail", this.mail);
    localStorage.setItem("password", this.password);
    this.logIn();
  };
  this.logIn = () => {
    localStorage.setItem("isLogin", "true");
  };
  this.getBook = (book) => {
    let ownBook = {
      title: book.querySelector(".book__name"),
      autor: book.querySelector(".book__autor").slice(3),
    };
    this.rentedBooks.push(ownBook);
  };

  this.coutnBooks = () => {
    return this.rentedBooks.leght;
  };

  this.register();
}

let newUser;

registerForm.onsubmit = (event) => {
  let firstName = registerForm.firstName.value;
  let lastName = registerForm.lastName.value;
  let mail = registerForm.mail.value;
  let password = registerForm.password.value;

  if (firstName == "" || lastName == "" || mail == "" || password == "") {
    return false;
  }
  newUser = new User(firstName, lastName, mail, password);
  return false;
};

function logUot(event) {
  console.log("123");
  localStorage.setItem("isLogin", "false");
  event.preventDefault();
}

document.getElementById("logOut").addEventListener("click", logUot);
/*
function logIn(login, password) {
  if (
    login === localStorage.getItem("mail") ||
    login === localStorage.getItem("cardNumber")
  ) {
    if (password === localStorage.getItem("password")) {
      localStorage.setItem("isLogin", "true");
      //создать новый юзер и копировать в него все локальные данные
    }
  }
}*/
