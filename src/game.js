import { createCard } from './card.js';
import { shuffle } from './utils.js';
import { flipCard, unflipCard } from './flipCard.js';

//Um array de objetos, onde cada objeto representa uma carta
export const cards = [
  { value: "A", img: "images/copas.png" },
  { value: "A", img: "images/copas.png" },
  { value: "B", img: "images/espada.png" },
  { value: "B", img: "images/espada.png" },
  { value: "C", img: "images/ouro.png" },
  { value: "C", img: "images/ouro.png" },
  { value: "D", img: "images/paus.png" },
  { value: "D", img: "images/paus.png" },
];


let firstCard = null;
let secondCard = null;
let moves = 0;
let matchedPairs = 0;

const gameContainer = document.getElementById('game-container');
const movesDisplay = document.getElementById('moves');
const congratulations = document.getElementById('congratulations');

export function startGame() {
  resetGameState();
  const shuffledCards = shuffle(cards);
  shuffledCards.forEach((cardData) => {
    const card = createCard(cardData, handleCardFlip);
    gameContainer.appendChild(card);
  });
}

function handleCardFlip(card) {
  // Evita selecionar a mesma carta duas vezes
  if (card === firstCard || card.classList.contains("flipped")) return;

  // Vira a carta
  flipCard(card);

  // Define a primeira ou segunda carta
  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;

  // Incrementa as jogadas
  moves++;
  movesDisplay.textContent = `Jogadas: ${moves}`;

  // Checa se as cartas combinam
  checkMatch();
}

function checkMatch() {
  if (!firstCard || !secondCard) return; // Verifica se as cartas estão definidas

  if (firstCard.dataset.value === secondCard.dataset.value) {
    matchedPairs++;
    resetCards();
    if (matchedPairs === cards.length / 2) {
      showCongratulations();
    }
  } else {
    // Vira as cartas de volta após 1 segundo
    setTimeout(() => {
      unflipCard(firstCard);
      unflipCard(secondCard);
      resetCards();
    }, 1000);
  }
}

function resetCards() {
  firstCard = null;
  secondCard = null;
}


function resetGameState() {
  gameContainer.innerHTML = '';
  moves = 0;
  matchedPairs = 0;
  movesDisplay.textContent = `Jogadas: ${moves}`;
  congratulations.style.display = 'none';
}

function showCongratulations() {
  congratulations.style.display = 'block';
  setTimeout(() => {
    congratulations.style.display = 'none';
  }, 5000);
}

export function restartGame() {
  startGame();
}
