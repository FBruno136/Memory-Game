import { cards } from './game.js';

function loadImage(imgElement, imagePath, errorImagePath) {
  imgElement.src = imagePath;
  imgElement.onerror = () => {
      imgElement.src = errorImagePath;
  };
}

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
      const backImage = back.querySelector(".card-image");
      if (backImage) {
        loadImage(backImage, matchedCard.img, matchedCard.errorImg);
      } else {
        back.style.backgroundImage = `url("${matchedCard.img}")`;
    }
    front.textContent = "";
    console.log(`Imagem aplicada: ${matchedCard.img}`);
      
      if (back.querySelector(".card-image")) {
        back.querySelector(".card-image").style.display = "block"; // Exibe a imagem
        
      }
    } else {
      console.error(`Erro: Carta com valor ${cardValue} não encontrada no array.`);
      front.texxtContent = cardValue;
      console.log(`Texto aplicado: ${cardValue}`);
  }
}
  
  // Função para desvirar a carta
export function unflipCard(card) {
    if (!card) return; 
  
    card.classList.remove("flipped"); 
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
  