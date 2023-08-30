function openMenu(menu) {
  //сделать чтобы изменения классов оберток меню касалось обоих и дла залогиненого и разлогиненого wrapper
  const labelIco = menu.querySelector(".menu__ico");
  const menuWrapper = menu.querySelector(".menu__wrapper");
  const mobileMenuWrapper = document.querySelector(".nav-mobile-wrapper");
  const menuList = menuWrapper.querySelectorAll(".menu");
  let count = 0;

  function isLogin() {
    if (localStorage.getItem("isLogin") == "true") {
      document.getElementById("menu-log-out").classList.add("hidden");
      document.getElementById("menu-log-in").classList.remove("hidden");
    } else if (
      localStorage.getItem("isLogin") == "false" ||
      localStorage.getItem("isLogin") == "false"
    ) {
      document.getElementById("menu-log-out").classList.remove("hidden");
      document.getElementById("menu-log-in").classList.add("hidden");
    }
  }

  menu.onclick = function (event) {
    isLogin();
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

openMenu(document.querySelector(".profile-menu"));
