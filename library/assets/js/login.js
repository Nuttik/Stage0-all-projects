const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

function User(firstName, lastName, mail, password) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.mail = mail;
  this.password = password;
  this.visits = 1;
  this.cardNumber = "";
  this.rentedBooks = [];

  //методы
  this.register = () => {
    localStorage.setItem("firstName", this.firstName);
    localStorage.setItem("lastName", this.lastName);
    localStorage.setItem("mail", this.mail);
    localStorage.setItem("password", this.password);
    localStorage.setItem("visits", this.visits);
    this.generateCardNumber = () => {
      let result = [];
      let hexRef = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
      ];
      for (let n = 0; n < 10; n++) {
        result.push(hexRef[Math.floor(Math.random() * 16)]);
      }
      return result.join("");
    };
    this.cardNumber = this.generateCardNumber();
    localStorage.setItem("cardNumber", this.cardNumber);
    this.logIn();
  };
  this.logIn = () => {
    localStorage.setItem("isLogin", true);
    changeIco();
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
  newUser.register();
  event.target.closest(".modal").classList.add("hidden");
  return false;
};

function changeIco() {
  let ico = document.querySelector(".profile-menu__ico i");
  let UserInitials =
    localStorage.getItem("firstName").slice(0, 1) +
    localStorage.getItem("lastName").slice(0, 1);

  if (localStorage.getItem("isLogin") == "true") {
    ico.classList.remove("profil-ico__img");
    ico.classList.add("profil-ico__name");
    ico.innerHTML = UserInitials;
    ico.title =
      localStorage.getItem("firstName") +
      " " +
      localStorage.getItem("lastName");
  }
  if (localStorage.getItem("isLogin") == "false") {
    ico.classList.add("profil-ico__img");
    ico.classList.remove("profil-ico__name");
    ico.innerHTML = "";
    ico.title = "";
  }
}

function logUot(event) {
  localStorage.setItem("isLogin", false);
  changeIco();
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
    localStorage.getItem("cardNumber ") == login
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
      event.target.closest(".modal").classList.add("hidden");
      newUser.visits = Number(localStorage.getItem("visits")) + 1;
      localStorage.setItem("visits", newUser.visits);
      newUser.cardNumber = localStorage.getItem("cardNumber");

      if (localStorage.getItem("cardNumber")) {
        newUser.cardNumber = localStorage.getItem("cardNumber");
      }
      if (localStorage.getItem("rentedBooks")) {
        newUser.rentedBooks = localStorage.getItem("rentedBooks");
      }
    }
    loginForm.login.value = ""; //сбрасываю значения полей
    loginForm.loginpassword.value = ""; //сбрасываю значения полей
    changeIco();
    return false;
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

changeIco();
