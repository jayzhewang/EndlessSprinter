import Game from './game';
import GameView from './game_view';
import { gameDemension } from './demension';

document.addEventListener('DOMContentLoaded', function(){
  const canvasEl = document.getElementsByTagName('canvas')[0];

  canvasEl.width = gameDemension[0];
  canvasEl.height = gameDemension[1];

  const ctx = canvasEl.getContext('2d');
  const game = new Game();
  new GameView(game, ctx).start();
});
