class Land {
  constructor(land){
    this.Land = land;
    this.currentLand = [];

    this.loadLand();
    this.currentPieceNumber = 9;
  }

  loadLand(){
    for(let i = 0; i < 10; i ++){
      this.currentLand.push(this.Land[i]);
    }
  }

  step(){
    this.move();
    if (this.currentLand[0].x < -9){
      this.currentPieceNumber += 1;
      this.queue();
    }
  }

  move(){
    this.currentLand.forEach((piece, i)=>{
      this.currentLand[i].x -= 3;
    });
  }

  queue(){
    this.currentLand.shift();
    this.currentLand.push(this.Land[this.currentPieceNumber]);
  }

  draw(ctx){
    ctx.fillStyle = 'pink';
    this.currentLand.forEach(piece=>{
      ctx.fillStyle = 'pink';
      ctx.fillRect(piece.x, piece.y, piece.width, piece.height);
    });
  }


}

export default Land;
