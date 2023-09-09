const booksList = document.querySelectorAll(".book");
let rentedBooksIndices = localStorage.getItem("book-own").split(",");

function buyBook(booksList) {
  if (
    localStorage.getItem("isLogin") == "true" &&
    localStorage.getItem("hasCard") == "true"
  ) {
    booksList.forEach((book, index) => {
      book.addEventListener("click", (event) => {
        let button = book.querySelector("button");
        let countBooks = localStorage.getItem("countBooks");
        let bookOwn = localStorage.getItem("book-own");

        if (
          event.target == button &&
          localStorage.getItem("hasCard") == "true"
        ) {
          button.disabled = true;
          button.innerHTML = "Own";
          countBooks++;
          localStorage.setItem("countBooks", countBooks);
          fillProfileInfoRow();
          //сохраняем индексы взятых книг
          localStorage.setItem("book-own", index + "," + bookOwn);

          //сохранем названия и автора взятой книги
          let ownBookName =
            book.querySelector(".book__name").innerHTML +
            ", " +
            book.querySelector(".book__autor").innerHTML.slice(3);

          localStorage.setItem(
            "rentedBooks",
            localStorage.getItem("rentedBooks") + "/" + ownBookName
          );
        }
      });
    });
  }
}
function checkConditionBooks() {
  if (localStorage.getItem("isLogin") == "true") {
    if (rentedBooksIndices.length > 1) {
      rentedBooksIndices.forEach((str) => {
        if (str != "") {
          let index = +str;
          let button = booksList[index].querySelector("button");
          button.disabled = true;
          button.innerHTML = "Own";
        }
      });
    }
  } else {
    booksList.forEach((book) => {
      let button = book.querySelector("button");
      button.disabled = false;
      button.innerHTML = "Buy";
    });
  }
}
buyBook(booksList);
checkConditionBooks();
