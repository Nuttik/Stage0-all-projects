function SortingSlider(id) {
  this.slider = document.getElementById(id);
  this.buttons = Array.from(this.slider.querySelectorAll("label"));
  this.booksList = Array.from(this.slider.querySelectorAll(".book"));

  this.seasons = {
    winter: [],
    spring: [],
    summer: [],
    autumn: [],
  };

  this.seasons.winter = this.booksList.filter((book) => {
    if (book.dataset.season == "winter") {
      return book;
    }
  });

  this.seasons.spring = this.booksList.filter((book) => {
    if (book.dataset.season == "spring") {
      return book;
    }
  });

  this.seasons.summer = this.booksList.filter((book) => {
    if (book.dataset.season == "summer") {
      return book;
    }
  });

  this.seasons.autumn = this.booksList.filter((book) => {
    if (book.dataset.season == "autumn") {
      return book;
    }
  });

  this.visibleBooks = this.booksList.filter((book) => {
    if (!book.classList.contains("hidden")) {
      return book;
    }
  });

  this.sorting = (event) => {
    let season = event.target.getAttribute("For");
    this.visibleBooks.forEach((book) => {
      book.classList.toggle("hidden");
      book.classList.remove("opasity-start");
      book.classList.add("opasity-end");
    });
    for (let key in this.seasons) {
      if (key == season) {
        this.visibleBooks = this.seasons[key];
        console.log(this.seasons[key]);
        this.seasons[key].forEach((book) => {
          book.classList.toggle("hidden");
          book.classList.add("opasity-start");
          if (book.classList.contains("opasity-end")) {
            book.classList.remove("opasity-end");
          }
        });
      }
    }
    //чтобы отработала анимация затухания нужно:
    //к текущим this.visibleBooks добавить класс "opasity-end" и повесить событие "animationend".
    //только когда анимация закончится добавлять текущим хидден и менять остальные классы
  };

  this.buttons.forEach((button) =>
    button.addEventListener("click", this.sorting)
  );
}

let favoritesSeason = new SortingSlider("favorites");
