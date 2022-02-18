const game = document.querySelector(".memory-game");
const gameScreen = document.querySelector(".game");
const inner = document.querySelector(".inner");
const loginButton = document.querySelector(".login button");
const firstName = document.querySelector("input[placeholder='Введите имя']");
const lastName = document.querySelector("input[placeholder='Введите фамилию']");
const email = document.querySelector("input[placeholder='Введите email']");
const setting = document.querySelector(".setting");
const difButSmall = document.querySelector(".small");
const difButMedium = document.querySelector(".medium");
const difButLarge = document.querySelector(".large");
const typeCard = document.querySelector(".typeCard");
const cardImg = document.querySelector(".cardImg");
const cardImgArr = cardImg.getElementsByTagName("*");
const name = document.querySelector(".name");
const time = document.querySelector(".time");
const table = document.querySelector("table");
const recordScreen = document.querySelector(".records");

let backImg = "";
let difficult;
let newFirstName;
let newLastName;
let newEmail;
let count = 0;
let records = [];
if (localStorage.getItem("records")) {
  const a = localStorage.getItem("records");
  records = JSON.parse(a);
}
let mas = [
  "assets/img/c6.png",
  "assets/img/c7.png",
  "assets/img/c8.png",
  "assets/img/c9.png",
  "assets/img/ca.png",
  "assets/img/cj.png",
  "assets/img/ck.png",
  "assets/img/ct.png",
  "assets/img/d6.png",
  "assets/img/d7.png",
  "assets/img/d8.png",
  "assets/img/d9.png",
  "assets/img/da.png",
  "assets/img/dj.png",
  "assets/img/dk.png",
  "assets/img/dt.png",
  "assets/img/h6.png",
  "assets/img/h7.png",
  "assets/img/h8.png",
  "assets/img/h9.png",
  "assets/img/ha.png",
  "assets/img/hj.png",
  "assets/img/hk.png",
  "assets/img/ht.png",
  "assets/img/s6.png",
  "assets/img/s7.png",
  "assets/img/s8.png",
  "assets/img/s9.png",
  "assets/img/sa.png",
  "assets/img/sk.png",
  "assets/img/sj.png",
  "assets/img/st.png",
  "assets/img/sq.png",
  "assets/img/cq.png",
  "assets/img/hq.png",
  "assets/img/dq.png"
];
let number = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
login();

function login() {
  loginButton.addEventListener("click", () => {
    if (!firstName.value || !firstName.value || !email.value) {
      alert("Залогиньтесь!");
    } else {
      newFirstName = firstName.value;
      newLastName = lastName.value;
      newEmail = email.value;

      inner.style.display = "none";
      setting.style.display = "flex";

      choseDifficult();
    }
  });
}

function choseDifficult() {
  if (difButSmall) {
    difButSmall.addEventListener("click", () => {
      difficult = 0;
      setting.style.display = "none";
      typeCard.style.display = "block";
    });
  }
  if (difButMedium) {
    difButMedium.addEventListener("click", () => {
      difficult = 1;
      setting.style.display = "none";
      typeCard.style.display = "block";
    });
  }
  if (difButLarge) {
    difButLarge.addEventListener("click", () => {
      difficult = 2;
      setting.style.display = "none";
      typeCard.style.display = "block";
    });
  }
  choseTypeCard();
}
function choseTypeCard() {
  for (let img of cardImgArr) {
    img.addEventListener("click", event => {
      backImg += img.src.slice(img.src.length - 24);

      typeCard.style.display = "none";
      gameScreen.style.display = "flex";

      newGame();
    });
  }
}

function newGame() {
  name.innerText = `${newFirstName} ${newLastName} ${newEmail}`;

  function createCard() {
    const firstCarddiv = document.createElement("div");
    const secondCarddiv = document.createElement("div");
    let randomImg = Math.floor(Math.random() * mas.length);
    const firstImg = document.createElement("img");
    const secondImg = document.createElement("img");
    const firstBackImg = document.createElement("img");
    const secondBackImg = document.createElement("img");

    firstImg.setAttribute("src", `${mas[randomImg]}`);
    secondImg.setAttribute("src", `${mas[randomImg]}`);

    firstBackImg.setAttribute("src", `${backImg}`);
    secondBackImg.setAttribute("src", `${backImg}`);
    firstImg.classList.add("front-face");
    firstBackImg.classList.add("back-face");
    secondImg.classList.add("front-face");
    secondBackImg.classList.add("back-face");
    firstCarddiv.classList.add("memory-card");
    secondCarddiv.classList.add("memory-card");
    firstCarddiv.setAttribute("data-number", `${number}`);
    secondCarddiv.setAttribute("data-number", `${number}`);
    firstCarddiv.append(firstImg, firstBackImg);
    secondCarddiv.append(secondImg, secondBackImg);
    game.append(firstCarddiv, secondCarddiv);
    number++;
    mas.splice(randomImg, 1);
  }
  if (difficult === 0) {
    for (let i = 0; i < 8; i++) {
      game.style.width = "500px";
      createCard();
    }
  } else if (difficult === 1) {
    for (let i = 0; i < 12; i++) {
      game.style.width = "800px";
      createCard();
    }
  } else {
    for (let i = 0; i < 18; i++) {
      game.style.width = "1100px";
      createCard();
    }
  }

  const cards = document.querySelectorAll(".memory-card");
  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flip");

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;

      return;
    }

    secondCard = this;
    checkForMatch();
  }

  function checkForMatch() {
    let isMatch = firstCard.dataset.number === secondCard.dataset.number;

    isMatch ? disableCards() : unflipCards();
  }

  function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    [hasFlippedCard, lockBoard] = [true, true];
    setTimeout(() => {
      firstCard.classList.add("hidden");
      secondCard.classList.add("hidden");
      resetBoard();
    }, 500);
    count++;

    if (count === 8 && difficult === 0) {
      clearTimeout(clocktimer);
      addRecord();
      gameScreen.style.display = "none";
      recordScreen.style.display = "block";
    } else if (count === 12 && difficult === 1) {
      clearTimeout(clocktimer);
      addRecord();
      gameScreen.style.display = "none";
      recordScreen.style.display = "block";
    } else if (count === 18 && difficult === 2) {
      clearTimeout(clocktimer);
      addRecord();
      gameScreen.style.display = "none";
      recordScreen.style.display = "block";
    } else {
    }
  }
  function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");

      resetBoard();
    }, 1500);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  (function shuffle() {
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
    });
  })();
  StartWatch();
  cards.forEach(card => card.addEventListener("click", flipCard));
}
let base = 60;
let clocktimer, dateObj, dh, dm, ds;
let readout = "";
let h = 1,
  m = 1,
  tm = 1,
  s = 0,
  ts = 0,
  ms = 0,
  clock = 0,
  init = 0;

function ClearСlock() {
  clearTimeout(clocktimer);
  h = 1;
  m = 1;
  tm = 1;
  s = 0;
  ts = 0;
  ms = 0;
  init = 0;
  readout = "00:00:00.00";
  document.Time.stopwatch.value = readout;
}

function StartTIME() {
  let cdateObj = new Date();
  let t = cdateObj.getTime() - dateObj.getTime() - s * 1000;
  clock++;
  if (t > 999) {
    s++;
  }
  if (s >= m * base) {
    ts = 0;
    m++;
  } else {
    ts = parseInt(ms / 100 + s);
    if (ts >= base) {
      ts = ts - (m - 1) * base;
    }
  }
  if (m > h * base) {
    tm = 1;
    h++;
  } else {
    tm = parseInt(ms / 100 + m);
    if (tm >= base) {
      tm = tm - (h - 1) * base;
    }
  }
  ms = Math.round(t / 10);
  if (ms > 99) {
    ms = 0;
  }
  if (ms == 0) {
    ms = "00";
  }
  if (ms > 0 && ms <= 9) {
    ms = "0" + ms;
  }
  if (ts > 0) {
    ds = ts;
    if (ts < 10) {
      ds = "0" + ts;
    }
  } else {
    ds = "00";
  }
  dm = tm - 1;
  if (dm > 0) {
    if (dm < 10) {
      dm = "0" + dm;
    }
  } else {
    dm = "00";
  }
  dh = h - 1;
  if (dh > 0) {
    if (dh < 10) {
      dh = "0" + dh;
    }
  } else {
    dh = "00";
  }
  readout = dh + ":" + dm + ":" + ds + "." + ms;
  document.Time.stopwatch.value = readout;
  clocktimer = setTimeout("StartTIME()", 1);
}

function StartWatch() {
  ClearСlock();
  dateObj = new Date();
  StartTIME();
}
function addRecord() {
  player = {
    name: `${newFirstName} ${newLastName}`,
    time: `${readout}`,
    count: `${clock}`
  };
  records.push(player);
  records.sort((prev, next) => prev.count - next.count);
  if (records.length > 10) {
    records.slice(11, 1);
  }
  const data = JSON.stringify(records);
  localStorage.setItem("records", data);

  let i = 1;

  for (let obj of records) {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    td1.innerText = i;
    td2.innerText = `${obj.name}`;
    td3.innerText = `${obj.time}`;
    tr.append(td1, td2, td3);
    table.appendChild(tr);
    i++;
  }
}
