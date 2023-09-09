function Slider(id) {
  //учесть что расстояние справа от  slider__itemlist до slider__wrapper < 0
  //this.imgList.offsetWidth - this.imgList.scrollLeft - this.wrapper.offsetWidth < 0

  //основные переменные
  this.slider = document.getElementById(id);
  this.wrapper = this.slider.querySelector(".slider__wrapper");
  this.imgList = this.wrapper.querySelector(".slider__itemlist");
  this.arrows = this.slider.querySelectorAll(".slider__arrow");
  this.arrowLeft = this.slider.querySelector(".slider__arrow_left");
  this.arrowRight = this.slider.querySelector(".slider__arrow_right");
  this.indicators = this.slider.querySelector(".slider__indicators");
  this.indicatorslRow = this.slider.querySelectorAll(".slider__indicator");
  this.countImgs = this.slider.querySelectorAll(".slider__item").length;
  this.curentIndecator = this.indicatorslRow[0];
  this.imgWidth = this.imgList.querySelector(".slider__item").offsetWidth;
  this.gap = parseInt(
    getComputedStyle(this.imgList.querySelector(".slider__item")).marginRight
  );
  this.translation = this.imgWidth + this.gap;
  this.index = 0;

  this.moveSlider = () => {
    this.imgList.style.transform =
      "translateX(-" + this.translation * this.index + "px)";
  };

  this.isArrowDisable = () => {
    if (this.index == this.countImgs - 2) {
      this.arrowRight.classList.add("disable");
    }
    if (this.index < this.countImgs - 2) {
      this.arrowRight.classList.remove("disable");
    }

    if (this.index < 2) {
      this.arrowLeft.classList.add("disable");
    }
    if (this.index > 1) {
      this.arrowLeft.classList.remove("disable");
    }
  };
  this.isArrowDisable();

  this.changeCurentIndecator = () => {
    this.curentIndecator.classList.add("current");
    let prevIndecator = this.curentIndecator;
    this.curentIndecator = this.indicatorslRow[this.index];
    prevIndecator.classList.remove("current");
    this.curentIndecator.classList.add("current");
  };
  this.changeCurentIndecator();

  this.clickOnArrowRight = (event) => {
    this.imgList.style.transition = "inherit";
    if (
      this.index <= this.countImgs - 2 &&
      this.imgList.offsetWidth -
        this.translation * this.index -
        this.wrapper.offsetWidth >=
        this.imgWidth
    ) {
      this.index += 1;
      this.changeCurentIndecator();
      this.moveSlider();
    }
    if (this.index == this.countImgs - 2) {
      this.arrowRight.classList.add("disable");
    }
    this.isArrowDisable();
  };

  this.clickOnArrowLeft = (event) => {
    if (this.index >= 1) {
      this.imgList.style.transition = "inherit";
      this.index -= 1;
      this.changeCurentIndecator();
      this.moveSlider();
    }
    if (this.index < 2) {
      this.arrowLeft.classList.add("disable");
    }
    this.isArrowDisable();
  };

  this.clickOnIndecatorButton = (event) => {
    let indecator = event.target.closest("li");
    this.index = Array.from(this.indicatorslRow).indexOf(indecator);
    this.changeCurentIndecator();
    this.moveSlider();
    this.isArrowDisable();
  };
}
let aboutSlider = new Slider("sliderAbout");

aboutSlider.arrowRight.addEventListener("click", aboutSlider.clickOnArrowRight);
aboutSlider.arrowLeft.addEventListener("click", aboutSlider.clickOnArrowLeft);
aboutSlider.indicators.addEventListener(
  "click",
  aboutSlider.clickOnIndecatorButton
);
