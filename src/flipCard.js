import { cards } from './game.js';

// Função para virar a carta
export function flipCard(card) {

    // Verifica se a carta já está virada
    if (card.classList.contains("flipped")) return;
  
    // Adiciona a classe para aplicar o efeito de virar
    card.classList.add("flipped");

    // Seleciona os elementos da frente e de trás da carta
    const front = card.querySelector(".card-front");
    const back = card.querySelector(".card-back");
    const cardValue = card.dataset.value;
    
    const matchedCard = cards.find(c => {
      return c.value.toLowerCase() === cardValue.trim().toLowerCase();
    });
    // Exibe a imagem da carta caso ela exista e esteja carregada
    if (matchedCard) {  
      back.style.backgroundImage = `url("${matchedCard.img}")`;
      front.textContent = "";
      console.log(`Imagem aplicada: ${matchedCard.img}`);
    } else {
      console.error(`Erro: Carta com valor ${cardValue} não encontrada no array.`);
  }
}
  
  // Função para desvirar a carta
export function unflipCard(card) {
    if (!card) return; // Verifica se a carta é nula antes de continuar
  
    card.classList.remove("flipped"); // Remove a classe "flipped"
  
    const front = card.querySelector(".card-front");
    const back = card.querySelector(".card-back");
  
    // Esconde a imagem da carta novamente
    const cardImage = back.querySelector(".card-image");
    if (cardImage) {
      cardImage.style.display = "none"; // Oculta a imagem
    }
  
    // Restaura o texto padrão "?" na frente da carta
    front.textContent = "?";
  }
  