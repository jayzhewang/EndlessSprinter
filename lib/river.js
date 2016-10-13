class River {
  constructor(){
    this.x = 0;
    this.y = 450;
    this.width = 800;
    this.height = 50;
  }

  draw(ctx){
    ctx.fillStyle = '#add8e6';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = '#cde7f0';
    ctx.fillRect(this.x, this.y, this.width, this.height * 0.2);
    ctx.fillStyle = '#bddfeb';
    ctx.fillRect(this.x, (this.y + this.height * 0.2), this.width, this.height * 0.2);
  }
}

export default River;
