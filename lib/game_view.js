class GameView{
  constructor(game, ctx){
    this.game = game;
    this.ctx = ctx;
    this.gamePaused = false;
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
    const game = this.game.isOver();
    if( !this.game.isOver() ){
      this.game.step();
      this.game.draw(this.ctx);
    }
  }
}

export default GameView;
