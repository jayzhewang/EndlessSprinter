const image = new Image();
image.src = 'sprinter.png';

class Sprinter {
  constructor(){
    this.x = 75;
    this.y = 10;
    this.width = 32;
    this.height = 32;
    this.maxY = this.y - 200;
    this.originalY = this.y;
    this.jumped = false;
    this.action = '';

    this.velocity = 4;
    this.startPixels = [
      0,0,0,0,
      66,66,66,66,
      264,264,264,264,
      132,132,132,132,
      198,198,198,198,
      330,330,330,330,
      396,396,396,396,
      594,594,594,594,
      528,528,528,528,
      462,462,462,462
    ];
    this.startIdx = 0;
  }

  draw(ctx){
    if(this.action === 'rising'){
      ctx.drawImage(
        image,
        this.startPixels[0],
        0,
        66,
        71,
        this.x,
        this.y,
        this.width,
        this.height
      );
    } else if(this.action === 'falling'){
      ctx.drawImage(
        image,
        this.startPixels[9],
        0,
        66,
        71,
        this.x,
        this.y,
        this.width,
        this.height
      );
    } else {
      ctx.drawImage(
        image,
        this.startPixels[this.startIdx],
        0,
        66,
        71,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }

    if(this.startIdx <= 40){
      this.startIdx += 1;
    } else {
      this.startIdx = 0;
    }
  }

  getVelocityRise(){
    if (this.y >= ((this.originalY - this.maxY) * 9 / 10) + this.maxY){
      this.velocity = 20;
    } else if (this.y >= ((this.originalY - this.maxY) * 8 / 10) + this.maxY){
      this.velocity = 18;
    } else if (this.y >= ((this.originalY - this.maxY) * 7 / 10) + this.maxY){
      this.velocity = 16;
    } else if (this.y >= ((this.originalY - this.maxY) * 6 / 10) + this.maxY){
      this.velocity = 12;
    } else if (this.y >= ((this.originalY - this.maxY) * 5 / 10) + this.maxY){
      this.velocity = 8;
    } else if (this.y >= ((this.originalY - this.maxY) * 4 / 10) + this.maxY){
      this.velocity = 6;
    } else if (this.y >= ((this.originalY - this.maxY) * 3 / 10) + this.maxY){
      this.velocity = 6;
    } else if (this.y >= ((this.originalY - this.maxY) * 2 / 10) + this.maxY){
      this.velocity = 4;
    } else if (this.y >= ((this.originalY - this.maxY) * 1 / 10) + this.maxY){
      this.velocity = 2;
    }
  }

  getVelocityFall(){
    if (this.y > this.originalY){
      this.velocity = 6;
    } else if (this.y >= ((this.originalY - this.maxY) * 98 / 100) + this.maxY){
      this.velocity = 2;
    } else if (this.y >= ((this.originalY - this.maxY) * 9 / 10) + this.maxY){
      this.velocity = 8;
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
      this.velocity = 4;
    } else if (this.y >= ((this.originalY - this.maxY) * 1 / 10) + this.maxY){
      this.velocity = 4;
    }
  }

  rise(){
    if(this.action !== 'rising'){
      this.action = 'rising';
    }
    this.getVelocityRise();
    this.y -= this.velocity;
  }

  fall(isLanded){
    if( !isLanded ){
      if(this.action !== 'falling'){
        this.action = 'falling';
      }
      this.getVelocityFall();
      this.y += this.velocity;
    } else {
      this.action = '';
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

  SprinterExplodeCoords(){
    return [
      this.x,
      this.y,
      this.width,
      this.height
    ];
  }
}

export default Sprinter;
