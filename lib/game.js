import { Level } from './levels/level_one';
import Sprinter from './sprinter';
import Land from './land';
import { topLandCoords, sideLandCoords, riverCoords } from './obj_coordinates';

class Game {
  constructor(){
    this.land = new Land(Level);
    this.sprinter = new Sprinter();
    this.gameOver = false;
    this.sprinterAction = this.sprinterFall;
  }

  step(){
    this.sprinterAction();
    this.landStep();
  }

  landStep(){
    this.land.step();
    this.checkCollision();
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

  sprinterJump(){
    if(this.sprinter.jumped === false){
      this.sprinter.jumped = true;
      this.sprinterAction = this.sprinterRise;
    }
  }

  sprinterFall(){
      this.sprinter.fall(
        this.isLanded(
          topLandCoords(this.land)
        )
    );
  }

  sprinterRise(){
    if(this.sprinter.y > this.sprinter.maxY){
      this.sprinter.rise();
    } else {
      this.sprinterAction = this.sprinterFall;
    }
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

      if(
        (spc.sprinterTopY >= landTopY + 3 &&
         spc.sprinterTopY <= landBottomY - 3 &&
         (spc.sprinterX >= landX - 1 && spc.sprinterX <= landX) ) ||
        (spc.sprinterBottomY >= landTopY + 3 &&
         spc.sprinterBottomY <= landBottomY - 3 &&
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
          this.between(spc.sprinterY, landY, landY + 3)) ||
         (spc.sprinterRightX >= landLeftX &&
          spc.sprinterRightX <= landRightX &&
          this.between(spc.sprinterY, landY, landY + 3))
        ){
          this.sprinter.originalY = this.sprinter.y;

          return true;
        }
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

  between(x, min, max) {
    return (x >= min && x <= max);
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
