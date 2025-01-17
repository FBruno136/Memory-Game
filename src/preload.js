// preload.js

import { showChatError } from './chaterro.js';

function preloadImages(imagePaths) {
  imagePaths.forEach(imagePath => {
    const img = new Image();
    img.src = imagePath;

    img.onerror = () => {
      showChatError(`Erro ao carregar a imagem: ${imagePath}`);
    };
  });
}

const requiredImages = ['images/fundo.png']; // Adicione outras imagens conforme necessário
window.addEventListener('load', () => preloadImages(requiredImages));
