import { Level } from './levels/level_one';
import Sprinter from './sprinter';
import Land from './land';
import River from './river';
import { topLandCoords, sideLandCoords, riverCoords } from './obj_coordinates';

class Game {
  constructor(){
    this.startTime = new Date();
    this.land = new Land(Level);
    this.sprinter = new Sprinter();
    this.river = new River();
    this.gameOver = false;
    this.sprinterAction = this.sprinterFall;
    this.score = 0;
  }

  step(){
    this.sprinterOnLand = this.isLanded(topLandCoords(this.land));
    this.sprinterAction();
    this.landStep();
  }

  landStep(){
    this.land.step();
    this.checkCollision();
  }

  checkCollision(){
    const slc = sideLandCoords(this.land);
    const rc = riverCoords(this.river);
    const spc = this.getSprinterCoords();

    if( this.isCollideWithSide(slc, spc) || this.isCollideWithRiver(rc, spc) ){
      this.gameOver = true;
      return 'has collided';
    }
    return 'no collision';
  }

  sprinterJump(){
    if(!this.sprinter.jumped &&
       this.sprinterOnLand){
      this.sprinter.jumped = true;
      this.sprinterAction = this.sprinterRise;
    }
  }

  sprinterFall(){
      this.sprinter.fall(this.sprinterOnLand);
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

  isCollideWithSide(sideCoords, spc){
    for(let i = 0; i < sideCoords.length; i++){
      const landTopY = sideCoords[i][0][1];
      const landBottomY = sideCoords[i][1][1];
      const landX = sideCoords[i][0][0];

      if(
        (spc.sprinterTopY >= landTopY + 2 &&
         spc.sprinterTopY <= landBottomY - 2 &&
         (spc.sprinterX >= landX - 1 && spc.sprinterX <= landX) ) ||
        (spc.sprinterBottomY >= landTopY + 2 &&
         spc.sprinterBottomY <= landBottomY - 2 &&
         (spc.sprinterX >= landX - 1 && spc.sprinterX <= landX) )
       ){ return true; }
    }
    return false;
  }

  isCollideWithRiver(rCoords, spc){
    if(spc.sprinterBottomY <= rCoords[0] + 8 &&
       spc.sprinterBottomY >= rCoords[0] - 2){
         return true;
      }
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
          this.between(spc.sprinterY, landY - 2, landY + 2)) ||
         (spc.sprinterRightX >= landLeftX &&
          spc.sprinterRightX <= landRightX &&
          this.between(spc.sprinterY, landY - 2, landY + 2))
        ){
          this.sprinter.originalY = landY;
          this.sprinter.maxY = landY - 200;
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
    return [].concat([this.sprinter], [this.land], [this.river]);
  }

  between(x, min, max) {
    return (x >= min && x <= max);
  }

  draw(ctx){
    let elapsedTime = new Date();
    this. score += 1;
    ctx.clearRect(0, 0, 1334, 750);
    ctx.fillStyle = '#f2f2f2';
    ctx.fillRect(0, 0, 1334, 750);
    ctx.font = "50px Georgia";
    ctx.strokeText(`score: ${Math.floor(this.score / 30)}`, 570, 40);
    this.allObjects().forEach(obj=>{
      obj.draw(ctx);
    });
  }
}

export default Game;
