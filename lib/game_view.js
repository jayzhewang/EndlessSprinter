class GameView{
  constructor(game, ctx){
    this.game = game;
    this.ctx = ctx;
  }

  bindKeyHandlers(){
    key('space', () => { setInterval(this.game.sprinterJump(), 5)} );
  }

  start(){
    this.bindKeyHandlers();
    this.lastTime = 0;

    setInterval(this.animate.bind(this), 10);
  }

  animate(time){
    // const timeDelta = time - this.lastTime;
    const game = this.game.isOver();
    if( !this.game.isOver() ){
      this.game.step();
      // this.game.landStep();
      // this.game.sprinterFall();
      this.game.draw(this.ctx);
    }
    // this.lastTime = time;
  }
}

export default GameView;
