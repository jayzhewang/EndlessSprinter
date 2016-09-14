import { LevelOne } from './levels/level_one';
import Sprinter from './sprinter';
import Land from './land';

class Game {
  constructor(){
    this.sprinter = new Sprinter();
    this.land = new Land(LevelOne);
  }

  step(){
    this.land.step();
  }

  move(){

  }

  checkCollisions(){

  }

  allObjects(){
    return [].concat([this.sprinter], [this.land]);
  }

  draw(ctx){
    ctx.clearRect(0, 0, 1334, 750);
    ctx.fillStyle = '#f2f2f2';
    ctx.fillRect(0, 0, 1334, 750);

    this.allObjects().forEach(obj=>{
      obj.draw(ctx);
    });
  }
}

export default Game;
