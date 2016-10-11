class GameView{
  constructor(game, ctx){
    this.game = game;
    this.ctx = ctx;
  }

  bindKeyHandlers(){
    key('space', () => {setInterval(this.game.sprinterJump(), 5)});
  }

  start(){
    this.bindKeyHandlers();
    this.lastTime = 0;

    setInterval(this.animate.bind(this), 5);
  }

  animate(){
    const game = this.game.isOver();
    if( !this.game.isOver() ){
      this.game.step();
      this.game.draw(this.ctx);
    }
  }
}

export default GameView;
