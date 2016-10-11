class River {
  constructor(){
    this.x = 0;
    this.y = 400;
    this.width = 800;
    this.height = 100;
  }

  draw(ctx){
    ctx.fillStyle = '#add8e6';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export default River;
