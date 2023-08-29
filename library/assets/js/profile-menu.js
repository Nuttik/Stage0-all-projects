function openMenu(menu) {
  //сделать чтобы изменения классов оберток меню касалось обоих и дла залогиненого и разлогиненого wrapper

  const labelIco = menu.querySelector(".menu__ico");
  const menuWrapper = menu.querySelector(".menu__wrapper");
  const input = menu.querySelector("input");
  const menuLinks = menuWrapper.querySelectorAll("a");
  const mobileMenuWrapper = document.querySelector(".nav-mobile-wrapper");
  const menuList = menuWrapper.querySelectorAll(".menu");

  const linkLogin = menu.querySelector('a[href="#login"]');
  const linkRegister = menu.querySelector('a[href="#register"]');
  const modalLogin = document.getElementById("modalLogin");
  const modalRegister = document.getElementById("modalRegister");

  if (localStorage.getItem("isLogin") == "true") {
    Array.from(menuList).forEach((item) => {
      item.classList.toggle("hidden");
    });
  }

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
