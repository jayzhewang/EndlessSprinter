class Sprinter {
  constructor(){
    this.x = 75;
    this.y = 240;
    this.width = 50;
    this.height = 50;
    this.maxY = this.y - 200;
    this.originalY = this.y;
    this.jumped = false;
    // this.gravity = -9.8;

    this.velocity = 4;
  }

  getVelocityRise(){
    if (this.y >= ((this.originalY - this.maxY) * 9 / 10) + this.maxY){
      this.velocity = 39;
    } else if (this.y >= ((this.originalY - this.maxY) * 8 / 10) + this.maxY){
      this.velocity = 37;
    } else if (this.y >= ((this.originalY - this.maxY) * 7 / 10) + this.maxY){
      this.velocity = 33;
    } else if (this.y >= ((this.originalY - this.maxY) * 6 / 10) + this.maxY){
      this.velocity = 29;
    } else if (this.y >= ((this.originalY - this.maxY) * 5 / 10) + this.maxY){
      this.velocity = 23;
    } else if (this.y >= ((this.originalY - this.maxY) * 4 / 10) + this.maxY){
      this.velocity = 16;
    } else if (this.y >= ((this.originalY - this.maxY) * 3 / 10) + this.maxY){
      this.velocity = 8;
    } else if (this.y >= ((this.originalY - this.maxY) * 2 / 10) + this.maxY){
      this.velocity = 4;
    } else if (this.y >= ((this.originalY - this.maxY) * 1 / 10) + this.maxY){
      this.velocity = 2;
    }
  }

  getVelocityFall(){
    if (this.y > this.originalY){
      this.velocity = 8;
    } else if (this.y >= ((this.originalY - this.maxY) * 98 / 100) + this.maxY){
      this.velocity = 2;
    } else if (this.y >= ((this.originalY - this.maxY) * 9 / 10) + this.maxY){
      this.velocity = 9;
    } else if (this.y >= ((this.originalY - this.maxY) * 8 / 10) + this.maxY){
      this.velocity = 8;
    } else if (this.y >= ((this.originalY - this.maxY) * 7 / 10) + this.maxY){
      this.velocity = 6;
    } else if (this.y >= ((this.originalY - this.maxY) * 6 / 10) + this.maxY){
      this.velocity = 6;
    } else if (this.y >= ((this.originalY - this.maxY) * 5 / 10) + this.maxY){
      this.velocity = 6;
    } else if (this.y >= ((this.originalY - this.maxY) * 4 / 10) + this.maxY){
      this.velocity = 4;
    } else if (this.y >= ((this.originalY - this.maxY) * 3 / 10) + this.maxY){
      this.velocity = 4;
    } else if (this.y >= ((this.originalY - this.maxY) * 2 / 10) + this.maxY){
      this.velocity = 2;
    } else if (this.y >= ((this.originalY - this.maxY) * 1 / 10) + this.maxY){
      this.velocity = 2;
    }
  }

  rise(){
    this.getVelocityRise();
    this.y -= this.velocity;
  }

  fall(isLanded){
    if( !isLanded ){
      this.getVelocityFall();
      this.y += this.velocity;
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
