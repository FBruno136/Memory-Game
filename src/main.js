import { startGame, restartGame } from './game.js';

window.addEventListener('load', () => {
  startGame();

  // Reiniciar o jogo ao pressionar R
  document.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
      restartGame();
    }
  });
});
