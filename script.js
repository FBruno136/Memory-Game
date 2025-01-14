// Lista de cartas com valores e imagens personalizadas
const cards = [
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
  let imageLoadError = false; // Verifica se houve erro no carregamento da imagem
  
  const gameContainer = document.getElementById("game-container");
  const movesDisplay = document.getElementById("moves");
  const congratulations = document.getElementById("congratulations");
  
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  
  function createCard(cardData) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = cardData.value;

    // Parte de trás da carta
    const back = document.createElement("div");
    back.classList.add("card-back");

    // Parte da frente da carta (antes de virar)
    const front = document.createElement("div");
    front.classList.add("card-front");

    // Imagem padrão (antes de virar)
    const defaultImage = document.createElement("img");
    defaultImage.src = "images/fundo.png"; // Caminho para a imagem padrão
    defaultImage.classList.add("default-image");
    defaultImage.alt = "?";

    // Fallback caso a imagem padrão falhe
    defaultImage.onerror = () => {
        defaultImage.src = "";
        defaultImage.alt = "?";
        defaultImage.textContent = "?"; // Mostra "?" no lugar
    };

    // Imagem personalizada ou letra (após virar)
    const cardImage = document.createElement("img");
    cardImage.src = cardData.img;
    cardImage.classList.add("card-image");
    cardImage.style.display = "none"; // Oculta até a carta ser virada

    cardImage.onerror = () => {
        cardImage.style.display = "none";
        front.textContent = cardData.value; // Mostra a letra se a imagem falhar
        imageLoadError = true;
        showImageLoadError();
    };

    front.appendChild(defaultImage);
    back.appendChild(cardImage);
    card.appendChild(back);
    card.appendChild(front);

    card.addEventListener("click", flipCard);
    return card;
}
  
  function flipCard() {
    if (this.classList.contains("flipped") || secondCard) return;
  
    this.classList.add("flipped");
  
    const front = this.querySelector(".card-front");
    const back = this.querySelector(".card-back");
    const cardImage = back.querySelector(".card-image");
  
    if (cardImage && cardImage.complete && cardImage.style.display !== "none") {
      cardImage.style.display = "block"; // Mostra a imagem
      front.textContent = ""; // Remove o "?"
    } else {
      front.textContent = this.dataset.value; // Mostra a letra
    }
  
    if (!firstCard) {
      firstCard = this;
    } else {
      secondCard = this;
      moves++;
      movesDisplay.textContent = `Jogadas: ${moves}`;
      checkMatch();
    }
  }
  
  function checkMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
      matchedPairs++;
      resetCards();
      if (matchedPairs === cards.length / 2) {
        showCongratulations();
      }
    } else {
      // Vira as cartas de volta após 1 segundo
      setTimeout(() => {
          firstCard.classList.remove("flipped");
          secondCard.classList.remove("flipped");
          firstCard = null;
          secondCard = null; // Reinicia as cartas para a próxima jogada
      }, 1000);
    }
  }

  function showImageLoadError() {
    const chatBox = document.getElementById("chat-box");
    chatBox.style.display = "block";
  }
  
  function startGame() {
    const shuffledCards = shuffle(cards);
    shuffledCards.forEach(value => {
      const card = createCard(value);
      gameContainer.appendChild(card);
    });
  }
  
  function resetCards() {
    firstCard = null;
    secondCard = null;
  }
  
  function showCongratulations() {
    congratulations.style.display = "block";
    setTimeout(() => {
      congratulations.style.display = "none";
    }, 5000); // Esconde o efeito após 5 segundos
  }
  
  function restartGame() {
    gameContainer.innerHTML = "";
    moves = 0;
    matchedPairs = 0;
    movesDisplay.textContent = `Jogadas: ${moves}`;
    congratulations.style.display = "none";
    startGame();
  }
  
  startGame();
  