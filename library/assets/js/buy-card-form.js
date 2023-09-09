const formBuyCard = document.getElementById("buyCardForm");

function checkCardFormFilling(form) {
  const button = form.buyCardFormButton;
  let fillingForm = false;
  const cardNumber = form.bankCardNumber.value; // 16 смволов и +-3 пробела
  const expirationCodeMounth = form.expirationCode_mounth.value; //2 символа
  const expirationCodeYear = form.expirationCode_year.value; //2 символа
  const cvc = form.bankCardCVC.value; ///3 символа
  const cardholderName = form.name.value; //не проверякм
  const postalCode = form.postalCode.value; //не проверякм
  const userCity = form.city.value; // не проверяем

  function isNumber(value, count) {
    let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let str = value.replace(/\s/g, "");
    if (str.length != count) {
      return false;
    }
    let result = false;
    let array = str.split("");
    for (let i = 0; i < array.length; i++) {
      if (numbers.indexOf(array[i]) >= 0) {
        result = true;
      } else {
        return false;
      }
    }
    return result;
  }

  if (
    cardNumber != "" &&
    expirationCodeMounth != "" &&
    expirationCodeYear != "" &&
    cvc != "" &&
    cardholderName != "" &&
    postalCode != "" &&
    userCity != ""
  ) {
    if (
      isNumber(cardNumber, 16) &&
      isNumber(expirationCodeMounth, 2) &&
      isNumber(expirationCodeYear, 2) &&
      isNumber(cvc, 3)
    ) {
      fillingForm = true;
    }
  } else {
    return false;
  }

  if (fillingForm) {
    localStorage.setItem("hasCard", "true");
    return true;
  }
  return false;
}

formBuyCard.onsubmit = (event) => {
  checkCardFormFilling(formBuyCard);
  if (checkCardFormFilling(formBuyCard)) {
    changeModalOnbuttonsByeList();
    buyBook(booksList);
    modalBuyCard.classList.add("hidden");
  }
  event.preventDefault();
  return false;
};

function claerForm(form) {
  form.reset();
}
