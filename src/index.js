import "./style.css";

const activeCards = [];
let gameResult = 0;
let intervalIndex;
let seconds = 0;
let minutes = 0;

// Timer function

const timer = () => {
  const start = () => {
    seconds++;
    if (seconds == 60) {
      minutes++;
      seconds = 0;
    } else if (minutes == 60) {
      minutes = 0;
      seconds = 0;
    }

    document.querySelector(".timer").textContent = `${
      minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  intervalIndex = setInterval(start, 1200);
};

// Check if cards matched

function matchCards() {
  let isMatched = activeCards[0].dataset.name === activeCards[1].dataset.name;
  isMatched
    ? gameResult++
    : activeCards.forEach((card) => card.classList.remove("flip"));

  activeCards.length = 0;
  cards.forEach((card) =>
    !card.classList.contains("flip")
      ? card.addEventListener("click", showCards)
      : null
  );

  if (gameResult === 8) {
    clearInterval(intervalIndex);
    document.querySelector(".result").classList.add("active");
    document.querySelector(".player-time").textContent = `${
      minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
    document.querySelector(".restart").addEventListener("click", () => {
      window.location.reload(true);
    });
  }
}

// Open unopened cards

function showCards() {
  const activeCard = this;
  activeCard.classList.add("flip");

  if (activeCard == activeCards[0]) {
    return;
  }

  if (activeCards.length === 0) {
    activeCards[0] = activeCard;
    return;
  } else {
    cards.forEach((card) => card.removeEventListener("click", showCards));
    activeCards[1] = activeCard;
  }

  setTimeout(matchCards, 1000);
}

// Start/Restart the game: createCards, shuffle, addEventListeners to all cards and set a timer

function createCards() {
  const cards = [
    "wordpress",
    "wordpress",
    "angular",
    "angular",
    "aurelia",
    "aurelia",
    "backbone",
    "backbone",
    "ember",
    "ember",
    "react",
    "react",
    "symfony",
    "symfony",
    "vue",
    "vue",
  ];

  for (let card of cards) {
    const div = document.createElement("div");
    div.innerHTML = `
      <img class="front" src="../dist/image/${card}.png" alt="${card}" />
      <img class="back" src="../dist/image/js-badge.png" alt="Card" />`;

    document.querySelector("section").appendChild(div);
    div.classList.add("card");
    div.setAttribute("data-name", `${card}`);
  }
}

createCards();

const cards = document.querySelectorAll(".card");
cards.forEach((card) => card.addEventListener("click", showCards));

function shuffle() {
  cards.forEach((card) => {
    const position = Math.floor(Math.random() * 16);
    card.style.order = position;
  });
}

shuffle();

document.addEventListener(
  "click",
  (event) => {
    if (event.target.matches(".back")) {
      timer();
    }
  },
  {
    once: true,
  }
);
