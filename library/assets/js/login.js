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
    localStorage.setItem("rentedBooks", this.rentedBooks);
    localStorage.setItem("countBooks", "0");
    localStorage.setItem("hasCard", "false");
    localStorage.setItem("book-own", "");
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
      for (let n = 0; n < 9; n++) {
        result.push(hexRef[Math.floor(Math.random() * 16)]);
      }
      return result.join("");
    };
    this.cardNumber = this.generateCardNumber();
    localStorage.setItem("cardNumber", this.cardNumber);
    this.logIn();

    checkConditionBooks();
  };
  this.logIn = () => {
    localStorage.setItem("isLogin", true);
    changeIco();
    checkConditionBooks();
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
  let errorMes = registerForm.querySelector(".error-m");
  if (!errorMes.classList.contains("hidden")) {
    errorMes.classList.add("hidden");
  }

  if (firstName == "" || lastName == "" || mail == "" || password == "") {
    return false;
  }
  if (password.length < 8) {
    if (errorMes.classList.contains("hidden")) {
      errorMes.classList.remove("hidden");
    }
    return false;
  }
  newUser = new User(firstName, lastName, mail, password);
  newUser.register();
  showYourLibrarycardInfo();
  changeModalOnbuttonsByeList();
  checkConditionBooks();
  event.target.closest(".modal").classList.add("hidden");
  return false;
};

function changeIco() {
  let ico = document.querySelector(".profile-menu__ico i");
  let menuTilte = document.querySelector(".profile-menu .profile-menu__title");
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
    menuTilte.innerHTML = localStorage.getItem("cardNumber");
    menuTilte.style.fontSize = "0.7rem";
  }
  if (localStorage.getItem("isLogin") == "false") {
    ico.classList.add("profil-ico__img");
    ico.classList.remove("profil-ico__name");
    ico.innerHTML = "";
    ico.title = "";
    menuTilte.innerHTML = "Profile";
    menuTilte.style.fontSize = "1rem";
  }
}

function logUot(event) {
  localStorage.setItem("isLogin", false);
  changeIco();
  showYourLibrarycardInfo();
  changeModalOnbuttonsByeList();
  checkConditionBooks();
  claerForm(formBuyCard);
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
    localStorage.getItem("cardNumber") == login
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
      newUser.rentedBooks = localStorage.getItem("rentedBooks");
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
    showYourLibrarycardInfo();
    changeModalOnbuttonsByeList();
    checkConditionBooks();
    return false;
  } else {
    if (errorMes.classList.contains("hidden")) {
      errorMes.classList.remove("hidden");

      loginForm.login.value = ""; //сбрасываю значения полей
      loginForm.loginpassword.value = ""; //сбрасываю значения полей
    }
    return false;
  }
}

loginForm.onsubmit = (event) => {
  loginUser(event, loginForm.login.value, loginForm.loginpassword.value);
};

changeIco();

//проверка данных по форме Find your Library card для незалогиненного пользователя

const findYourLibraryCardForm = document.querySelector(".form_find-card");

findYourLibraryCardForm.onsubmit = (event) => {
  let readerName = findYourLibraryCardForm.name.value;
  let cardNumber = findYourLibraryCardForm.number.value;
  let button = findYourLibraryCardForm.querySelector(".form_find-card__button");
  let infoRow = findYourLibraryCardForm.querySelector(".form__card-info");
  let infoRowVisits = findYourLibraryCardForm.querySelector(
    ".visits .info-count"
  );
  let infoRowBooks =
    findYourLibraryCardForm.querySelector(".books .info-count");

  let userName = localStorage.getItem("firstName");
  let userSurname = localStorage.getItem("lastName");
  let userNameFull =
    localStorage.getItem("firstName") + " " + localStorage.getItem("lastName");
  let userNameFullReverse =
    localStorage.getItem("lastName") + " " + localStorage.getItem("firstName");
  let userCardNumber = localStorage.getItem("cardNumber");

  if (
    (readerName.toLowerCase() == userName.toLowerCase() ||
      readerName.toLowerCase() == userSurname.toLowerCase() ||
      readerName.toLowerCase() == userNameFull.toLowerCase() ||
      readerName.toLowerCase() == userNameReverseFull.toLowerCase()) &&
    cardNumber.toLowerCase() == userCardNumber.toLowerCase()
  ) {
    //заполняю строку данными визиты и книги
    infoRowVisits.innerHTML = localStorage.getItem("visits");
    infoRowBooks.innerHTML = localStorage.getItem("countBooks");

    button.classList.add("hidden");
    infoRow.classList.remove("hidden");
    setTimeout(() => {
      button.classList.remove("hidden");
      infoRow.classList.add("hidden");
      findYourLibraryCardForm.reset();
    }, 10000);
  }
  event.preventDefault();
  return false;
};

//смена данных по форме Find your Library card для залогиненного пользователя
function showYourLibrarycardInfo() {
  let sectionLibraryCard = document.querySelector(
    ".section-library-card__content"
  );
  let h3 = sectionLibraryCard.querySelector("h3");
  let h4 = sectionLibraryCard.querySelector("h4");
  let text = sectionLibraryCard.querySelector(
    ".section-library-card__collum_get-card p"
  );
  let form = findYourLibraryCardForm;
  let readerName = findYourLibraryCardForm.name;
  let cardNumber = findYourLibraryCardForm.number;
  let button = findYourLibraryCardForm.querySelector(".form_find-card__button");
  let infoRowVisits = findYourLibraryCardForm.querySelector(".form__card-info");

  let buttonLogin = sectionLibraryCard.querySelector(".openModalRegister");
  let buttonReg = sectionLibraryCard.querySelector(".openModalLogin");
  let buttonProgile = sectionLibraryCard.querySelector(".openModalProfile");

  if (localStorage.getItem("isLogin") == "true") {
    fillProfileInfoRow();

    buttonLogin.classList.add("hidden");
    buttonReg.classList.add("hidden");
    buttonProgile.classList.remove("hidden");

    h3.innerHTML = "Your Library card";
    h4.innerHTML = "Visit your profile";
    text.innerHTML =
      "With a digital library card you get free access to the Library’s wide array of digital resources including e-books, databases, educational resources, and more.";
    button.classList.add("hidden");
    infoRowVisits.classList.remove("hidden");
    readerName.value =
      localStorage.getItem("firstName") +
      " " +
      localStorage.getItem("lastName");
    cardNumber.value = localStorage.getItem("cardNumber");
    readerName.disabled = true;
    cardNumber.disabled = true;
  } else {
    if (buttonLogin.classList.contains("hidden")) {
      buttonLogin.classList.remove("hidden");
    }
    if (buttonReg.classList.contains("hidden")) {
      buttonReg.classList.remove("hidden");
    }
    if (!buttonReg.classList.contains("hidden")) {
      buttonProgile.classList.add("hidden");
    }

    h3.innerHTML = "Find your Library card";
    h4.innerHTML = "Get a reader card";
    text.innerHTML =
      "You will be able to see a reader card after logging into account or you can register a new account";
    readerName.disabled = false;
    cardNumber.disabled = false;
    form.reset();
    if (button.classList.contains("hidden")) {
      button.classList.remove("hidden");
    }
    if (!infoRowVisits.classList.contains("hidden")) {
      infoRowVisits.classList.add("hidden");
    }
  }
}
//заполнение данных пользователя
function fillProfileInfoRow() {
  let countVisitsList = document.querySelectorAll(".visits .info-count");
  let countBooksList = document.querySelectorAll(".books .info-count");
  countVisitsList.forEach((elem) => {
    elem.innerHTML = localStorage.getItem("visits");
  });
  countBooksList.forEach((elem) => {
    elem.innerHTML = localStorage.getItem("countBooks");
  });
}

fillProfileInfoRow();
showYourLibrarycardInfo();
