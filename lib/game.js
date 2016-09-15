import { Level } from './levels/level_one';
import Sprinter from './sprinter';
import Land from './land';
import { topLandCoords, sideLandCoords, riverCoords } from './obj_coordinates';

class Game {
  constructor(){
    this.land = new Land(Level);
    this.sprinter = new Sprinter();
    this.gameOver = false;
  }

  landStep(){
    this.land.step();
    this.checkCollision();
  }

  sprinterFall(){
      this.sprinter.fall(
        this.isLanded(
          topLandCoords(this.land)
        )
    );
  }

  sprinterJump(){
    this.sprinter.jump();
  }

  checkCollision(){
    const slc = sideLandCoords(this.land);
    const rc = riverCoords();

    if( this.isCollideWithSide(slc) || this.isCollideWithRiver(rc) ){
      this.gameOver = true;
      return 'has collided';
    }
    return 'no collision';
  }

  isOver(){
    return this.gameOver;
  }

  isCollideWithSide(sideCoords){
    const spc = this.getSprinterCoords();

    for(let i = 0; i < sideCoords.length; i++){
      const landTopY = sideCoords[i][0][1];
      const landBottomY = sideCoords[i][1][1];
      const landX = sideCoords[i][0][0];

      debugger;
      if(
        (spc.sprinterTopY >= landTopY &&
         spc.sprinterTopY <= landBottomY &&
         (spc.sprinterX >= landX - 1 && spc.sprinterX <= landX) ) ||
        (spc.sprinterBottomY >= landTopY &&
         spc.sprinterBottomY <= landBottomY &&
         (spc.sprinterX >= landX - 1 && spc.sprinterX <= landX) )
       ){ return true; }
    }
    return false;
  }

  isCollideWithRiver(){
    return false;
  }

  isLanded(topCoords){
    const spc = this.getSprinterCoords();

    for(let i = 0; i < topCoords.length; i ++){
      const landLeftX = topCoords[i][0][0];
      const landRightX = topCoords[i][1][0];
      const landY = topCoords[i][0][1];

      if(
         (spc.sprinterLeftX >= landLeftX &&
          spc.sprinterLeftX <= landRightX &&
          spc.sprinterY === landY) ||
         (spc.sprinterRightX >= landLeftX &&
          spc.sprinterRightX <= landRightX &&
          spc.sprinterY === landY)
        ){ return true; }
    }
    return false;
  }

  getSprinterCoords(){
    const sprinterCoords = this.sprinter.SprinterCoordinates();
    return {
      sprinterLeftX: sprinterCoords[0],
      sprinterRightX: sprinterCoords[1],
      sprinterY: sprinterCoords[3],
      sprinterTopY: sprinterCoords[2],
      sprinterBottomY: sprinterCoords[3],
      sprinterX: sprinterCoords[1]
    };
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
