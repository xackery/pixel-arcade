import { createGame, onResize } from "./game";

window.onload = () => {
 
  createGame();

  window.addEventListener('resize', onResize);
  onResize();
};