class Land {
  constructor(currentLand){
    this.currentLand = currentLand;
    this.land = [];

    this.loadLand();
    this.currentPieceNumber = 9;
  }

  loadLand(){
    for(let i = 0; i < 10; i ++){
      this.land.push(this.currentLand[i]);
    }
  }

  step(){
    let that = this;
    setInterval(()=>{
      that.move();
      if (that.land[0].x < -9){
        that.currentPieceNumber += 1;
        that.queue();
      }
    }, 1000);
  }

  move(){
    this.land.forEach((piece, i)=>{
      this.land[i].x -= 1;
    });
  }

  queue(){
    this.land.shift();
    this.land.push(this.currentLand[this.currentPieceNumber]);
  }

  draw(ctx){
    ctx.fillStyle = 'pink';
    this.land.forEach(piece=>{
      ctx.fillStyle = 'pink';
      ctx.fillRect(piece.x, piece.y, piece.width, piece.height);
    });
  }


}

export default Land;
