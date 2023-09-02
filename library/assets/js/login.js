const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

function User(firstName, lastName, mail, password) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.mail = mail;
  this.password = password;
  this.visits = 1;
  this.cardNumber = ""; //ПОсле покупки BUY A LIBRARY CARD - Будет сгенерирован девятизначный Card Number случайным образом в формате 16-ричного числа.
  this.rentedBooks = [];

  //методы
  this.register = () => {
    localStorage.setItem("firstName", this.firstName);
    localStorage.setItem("lastName", this.lastName);
    localStorage.setItem("mail", this.mail);
    localStorage.setItem("password", this.password);
    this.logIn();
    localStorage.setItem("visits", this.visits);
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
    localStorage.setItem("rentedBooks", this.rentedBooks);
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
  localStorage.setItem("isLogin", "false");
  event.preventDefault();
}

document.getElementById("logOut").addEventListener("click", logUot);

function loginUser(event, login, password) {
  let errorMes = loginForm.querySelector(".error-m");
  if (!errorMes.classList.contains("hidden")) {
    errorMes.classList.add("hidden");
  }

  if (
    login === localStorage.getItem("mail") ||
    login === localStorage.getItem("cardNumber")
  ) {
    if (password === localStorage.getItem("password")) {
      //создать новый юзер и копировать в него все локальные данные
      newUser = new User(
        localStorage.getItem("firstName"),
        localStorage.getItem("lastName"),
        localStorage.getItem("mail"),
        localStorage.getItem("password")
      );
      newUser.logIn();
      newUser.visits = localStorage.getItem("visits");
      +1;
      localStorage.setItem("visits", this.visits);

      if (localStorage.getItem("cardNumber")) {
        newUser.cardNumber = localStorage.getItem("cardNumber");
      }
      if (localStorage.getItem("rentedBooks")) {
        newUser.rentedBooks = localStorage.getItem("rentedBooks");
      }
    }
    event.target.closest(".modal").classList.add("hidden");
    loginForm.login.value = ""; //сбрасываю значения полей
    loginForm.loginpassword.value = ""; //сбрасываю значения полей
  } else {
    if (errorMes.classList.contains("hidden")) {
      errorMes.classList.remove("hidden");
    }
    return false;
  }

  loginForm.login.value = ""; //сбрасываю значения полей
  loginForm.loginpassword.value = ""; //сбрасываю значения полей
}

loginForm.onsubmit = (event) => {
  loginUser(event, loginForm.login.value, loginForm.loginpassword.value);
};
