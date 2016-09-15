class Sprinter {
  constructor(){
    this.x = 100;
    this.y = 350;
    this.width = 100;
    this.height = 100;
    this.jumped = false;
  }

  jump(){
    if(this.jumped === false){
      this.jumped = true;
      this.y = this.y - 300;
      this.fall();
    }
  }

  fall(isLanded){
    if( !isLanded ){
      this.y += 1;
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
