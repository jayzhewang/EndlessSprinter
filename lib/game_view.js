class GameView{
  constructor(game, ctx){
    this.game = game;
    this.ctx = ctx;
  }

  bindKeyHandlers(){
    key('space', () => { this.game.sprinter.jump() });
  }

  start(){
    this.bindKeyHandlers();
    this.lastTime = 0;

    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time){
    const timeDelta = time - this.lastTime;
    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }
}

export default GameView;
