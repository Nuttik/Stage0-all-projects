const mobileMenu = document.querySelector(".nav-mobile");
const burgerIco = document.querySelector(".burger-ico");
const mobileMenuWrapper = document.querySelector(".nav-mobile-wrapper");
const wrapperBg = document.querySelector(".wrapper-bg");
const input = mobileMenu.querySelector("input");
const profileIcon = document.querySelector(".profile-menu__ico");
const menuLinks = document.querySelectorAll(
  ".nav__link-list_mobile .nav__item a"
);

mobileMenu.onclick = function (event) {
  let label = event.target.closest("label");

  if (label) {
    mobileMenuWrapper.classList.toggle("close");
    mobileMenuWrapper.classList.toggle("open");
    wrapperBg.classList.toggle("wrapper-bg_open");
    burgerIco.classList.toggle("fixed");
    profileIcon.classList.toggle("fixed");
  }
  if (
    !mobileMenuWrapper.contains(event.target) ||
    event.target.closest("a") ||
    event.target.closest("label")
  ) {
    mobileMenuWrapper.classList.toggle("close");
    mobileMenuWrapper.classList.toggle("open");
    burgerIco.classList.toggle("fixed");
    profileIcon.classList.toggle("fixed");
    wrapperBg.classList.toggle("wrapper-bg_open");
    input.checked = !input.checked;
  }
};
