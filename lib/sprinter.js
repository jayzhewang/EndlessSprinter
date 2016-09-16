class Sprinter {
  constructor(){
    this.x = 100;
    this.y = 340;
    this.width = 100;
    this.height = 100;
    this.maxY = this.y - 300;
    this.originalY = this.y;
    this.jumped = false;
    // this.gravity = -9.8;

    this.velocity = 4;
  }

  getRiseVelocity(){
    if (this.y >= ((this.originalY - this.maxY) * 99 / 100) + this.maxY){
      this.velocity = 10;
    } else if (this.y >= ((this.originalY - this.maxY) * 9 / 10) + this.maxY){
      this.velocity = 10;
    } else if (this.y >= ((this.originalY - this.maxY) * 8 / 10) + this.maxY){
      this.velocity = 10;
    } else if (this.y >= ((this.originalY - this.maxY) * 7 / 10) + this.maxY){
      this.velocity = 10;
    } else if (this.y >= ((this.originalY - this.maxY) * 6 / 10) + this.maxY){
      this.velocity = 10;
    } else if (this.y >= ((this.originalY - this.maxY) * 5 / 10) + this.maxY){
      this.velocity = 10;
    } else if (this.y >= ((this.originalY - this.maxY) * 4 / 10) + this.maxY){
      this.velocity = 5;
    } else if (this.y >= ((this.originalY - this.maxY) * 3 / 10) + this.maxY){
      this.velocity = 5;
    } else if (this.y >= ((this.originalY - this.maxY) * 2 / 10) + this.maxY){
      this.velocity = 5;
    } else if (this.y >= ((this.originalY - this.maxY) * 1 / 10) + this.maxY){
      this.velocity = 3;
    }
  }



  rise(){
    this.getRiseVelocity();
    this.y -= this.velocity;
  }

  fall(isLanded){
    if( !isLanded ){
      this.y += 4;
    } else {
      this.jumped = false;
    }
  }

  SprinterCoordinates(){
    return [
      this.x,
      this.x + this.width,
      this.y,
      this.y + this.height
    ];
  }

  draw(ctx){
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export default Sprinter;
