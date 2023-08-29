function SortingSlider(id) {
  this.slider = document.getElementById(id);
  this.buttons = Array.from(this.slider.querySelectorAll("label"));
  this.booksList = Array.from(this.slider.querySelectorAll(".book"));
  this.toolsbar = this.slider.querySelector("form");

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
      book.classList.add("opasity-end");

      if (book.classList.contains("opasity-start")) {
        book.classList.remove("opasity-start");
      }

      setTimeout((event) => {
        book.classList.toggle("hidden");
        book.classList.remove("opasity-end");

        for (let key in this.seasons) {
          if (key == season) {
            this.visibleBooks = this.seasons[key];

            this.seasons[key].forEach((item) => {
              item.classList.remove("hidden");
              item.classList.add("opasity-start");
              if (item.classList.contains("opasity-end")) {
                item.classList.remove("opasity-end");
              }
            });
          }
        }
      }, 1350);
    });
  };

  this.buttons.forEach((button) =>
    button.addEventListener("click", this.sorting)
  );

  this.stikcToolsBar = () => {
    let coordinates = this.toolsbar.getBoundingClientRect();
    let clientY = coordinates.y;
    if (clientY < 0) {
      this.toolsbar.style.position = "sticky";
      this.toolsbar.style.top = "0";
      this.toolsbar.style.paddingBottom = "1rem";
    }
  };
  window.addEventListener("scroll", this.stikcToolsBar);
}

let favoritesSeason = new SortingSlider("favorites");
