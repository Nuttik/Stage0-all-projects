function openMenu(menu) {
  //сделать чтобы изменения классов оберток меню касалось обоих и дла залогиненого и разлогиненого wrapper
  const labelIco = menu.querySelector(".menu__ico");
  const menuWrapper = menu.querySelector(".menu__wrapper");
  const input = menu.querySelector("input");
  const menuLinks = menuWrapper.querySelectorAll("a");
  const mobileMenuWrapper = document.querySelector(".nav-mobile-wrapper");

  menu.onclick = function (event) {
    let label = event.target.closest("label");
    if (label) {
      menuWrapper.classList.toggle("close");
      menuWrapper.classList.toggle("open");
      if (mobileMenuWrapper.classList.contains("open")) {
        mobileMenuWrapper.classList.toggle("close");
        mobileMenuWrapper.classList.toggle("open");
        document.querySelector(".burger-ico").classList.toggle("fixed");
        labelIco.classList.toggle("fixed");
        document
          .querySelector(".wrapper-bg")
          .classList.toggle("wrapper-bg_open");
        document.querySelector(".nav-mobile").querySelector("input").checked =
          !document.querySelector(".nav-mobile").querySelector("input").checked;
      }
    }
    if (event.target.closest("a")) {
      menuWrapper.classList.toggle("close");
      menuWrapper.classList.toggle("open");
    }
    if (!menuWrapper.contains(event.target)) {
      menuWrapper.classList.toggle("close");
      menuWrapper.classList.toggle("open");
    }
  };
}

let menu = document.querySelector(".profile-menu");
menu.addEventListener("click", openMenu(menu));
