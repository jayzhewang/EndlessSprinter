const explosion = new Image();
explosion.src = 'explosion.png';
const explodeCoords = [
  [0,1],
  [96, 1],
  [192, 1],
  [288, 1],
  [384, 1],
  [0,97],
  [96, 97],
  [192, 97],
  [288, 97],
  [384, 97],
  [0,193],
  [96, 193],
  [192, 193],
  [288, 193],
  [384, 193],
  [480, 288]
];

class GameView{
  constructor(game, ctx){
    this.game = game;
    this.ctx = ctx;
    this.gamePaused = false;
    this.explode = this.explode.bind(this);
  }

  bindKeyHandlers(){
    key('space', e => {
      e.preventDefault();
      this.game.sprinterJump();
    });
    key('enter', e => {
      e.preventDefault();
      this.toggleGame();
    });
  }

  toggleGame() {
    if (this.gamePaused) {
      this.gamePaused = false;
      this.gameStart = setInterval(this.animate.bind(this), 10);
    } else {
      this.gamePaused = true;
    }
  }

  start(){
    this.bindKeyHandlers();
    this.gameStart = setInterval(this.animate.bind(this), 10);
  }

  animate(){
    if(this.gamePaused){
      clearInterval(this.gameStart);
    }
    if( !this.game.isOver() ){
      this.game.step();
      this.game.draw(this.ctx);
    } else {
      clearInterval(this.gameStart);
      this.sprinterCoords = this.game.sprinter.SprinterExplodeCoords();
      this.idx = 0;
      this.gameExplode = setInterval(this.explode, 100);
    }
  }

  explode(){
      this.ctx.clearRect(
        this.sprinterCoords[0] - 45,
        this.sprinterCoords[1] - 45,
        this.sprinterCoords[2] + 45,
        this.sprinterCoords[3] + 45
      );
      this.ctx.fillStyle = '#f2f2f2';
      this.ctx.fillRect(
        this.sprinterCoords[0] - 45,
        this.sprinterCoords[1] - 45,
        this.sprinterCoords[2] + 45,
        this.sprinterCoords[3] + 45
      );
      this.ctx.drawImage(
        explosion,
        explodeCoords[this.idx][0],
        explodeCoords[this.idx][1],
        95,
        95,
        this.sprinterCoords[0] - 45,
        this.sprinterCoords[1] - 45,
        this.sprinterCoords[2] + 45,
        this.sprinterCoords[3] + 45
      );
    if(this.idx === 15){
      clearInterval(this.gameExplode);
    } else {
      this.idx += 1;
    }
  }
}

export default GameView;
