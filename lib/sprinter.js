class Sprinter {
  constructor(){
    this.x = 0;
    this.y = 400;
    this.jumped = false;
  }

  jump(){
    const originalY = this.y;
    let that = this;
    if(this.jumped === false){
      this.y = this.y - 300;
      const fall = () => (setInterval(()=>{
        if(originalY > that.y){
          that.jumped = true;
          that.y += 1;
        } else {
          that.jumped = false;
          clearInterval(fall);
        }
      }, 10));
      fall();
    }
  }

  draw(ctx){
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, 100, 100);
  }
}

export default Sprinter;
