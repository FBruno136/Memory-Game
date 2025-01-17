import { showChatError } from './chaterro.js';

export function createCard(cardData, flipCardHandler) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.value = cardData.value;

  // Parte de trás da carta
  const back = document.createElement('div');
  back.classList.add('card-back');

  // Parte da frente da carta (antes de virar)
  const front = document.createElement('div');
  front.classList.add('card-front');

  // Imagem padrão (antes de virar)
  const defaultImage = document.createElement('img');
  defaultImage.src = 'images/fundo.png';
  defaultImage.classList.add("default-image");
  defaultImage.alt = "?";
  defaultImage.onerror = () => showChatError('Erro ao carregar a imagem de fundo.');

  // Imagem personalizada ou letra (após virar)
  const cardImage = document.createElement('img');
  cardImage.src = cardData.img;
  cardImage.classList.add("card-image");
  cardImage.alt = cardData.value;
  cardImage.style.display = "none"; // Oculta até a carta ser virada

  cardImage.onerror = () => {
    cardImage.style.display = 'none';
    front.textContent = cardData.value;
    showChatError(`Erro ao carregar a imagem: ${cardData.img}`);
  };

  back.appendChild(cardImage);
  front.appendChild(defaultImage);
  card.appendChild(back);
  card.appendChild(front);

  // Adiciona o evento de clique para lidar com o flip da carta
  card.addEventListener("click", () => flipCardHandler(card));

  return card;
}
