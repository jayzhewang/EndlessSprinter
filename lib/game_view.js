class GameView{
  constructor(game, ctx){
    this.game = game;
    this.ctx = ctx;
    this.gamePaused = false;
  }

  bindKeyHandlers(){
    key('space', () => {this.game.sprinterJump();});
    key('enter', () => {this.toggleGame();});
  }

  toggleGame() {
    if (this.gamePaused) {
      this.gamePaused = false;
    } else {
      this.gamePaused = true;
    }
  }

  start(){
    this.bindKeyHandlers();
    this.lastTime = 0;
    this.gameStart = setInterval(this.animate.bind(this), 10);
    this.gameStart();
  }

  animate(){
    if(this.gamePaused){
      this.clearInterval(this.gameStart);
    }
    const game = this.game.isOver();
    if( !this.game.isOver() ){
      this.game.step();
      this.game.draw(this.ctx);
    }
  }
}

export default GameView;
