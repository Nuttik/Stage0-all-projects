const scoreVeiw = document.querySelectorAll(".scoreCount");

let recordsList = !localStorage.getItem("savedRecords")
  ? false
  : localStorage
      .getItem("savedRecords")
      .split(",")
      .map((item) => {
        return +item;
      });

// Игровой счет
function increaseScore(next) {
  let nextFruitType = isNextFruit(next)[0];
  switch (nextFruitType) {
    case "apples":
      score++;
      break;

    case "pears":
      score = score + 2;
      break;

    case "bananas":
      score = score + 3;
      break;
  }
  //изменение отображаемого счета
  changeScoreVeiw();
}
function changeScoreVeiw() {
  scoreVeiw.forEach((elem) => {
    if (score < 10) {
      elem.innerHTML = "0" + score;
    } else {
      elem.innerHTML = score;
    }
  });
}
function changeLivesVeiw() {
  let lostLive = 3 - lives;
  if (lostLive == 0) {
    livesVeiw.forEach((elem) => {
      if (elem.classList.contains("health-point_lost")) {
        elem.classList.remove("health-point_lost");
      }
    });
  }
  for (let i = 0; i < lostLive; i++) {
    livesVeiw[livesVeiw.length - 1 - i].classList.add("health-point_lost");
  }
}

function addRecord() {
  savedRecords();
  fillRecord();
}

function savedRecords() {
  if (recordsList) {
    recordsList.push(score);
    recordsList = recordsList
      .sort((a, b) => {
        a = a;
        b = b;
        if (a > b) return -1;
        if (a == b) return 0;
        if (a < b) return 1;
      })
      .slice(0, 10);

    localStorage.setItem("savedRecords", recordsList);
  } else if (recordsList == false) {
    localStorage.setItem("savedRecords", score + ",");
    recordsList = localStorage
      .getItem("savedRecords")
      .split(",")
      .map((item) => {
        return +item;
      });
  }
}
