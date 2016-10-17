sideCoordinates(){
  return [
    [this.x + this.width, this.y],
    [this.x + this.width, this.y + this.height]
  ];
}
bottomCoordinates(){
  const bottomY = this.y + this.height;
  const bottomCoord = [[this.x, bottomY]];

  for(let i = 1; i <= this.width; i ++){
    bottomCoord.push([this.x + i, bottomY]);
  }
  return bottomCoord;
}

sideCoordinates(){
  const sideX = this.x + this.width;
  const sideCoord = [[sideX, this.y]];

  for(let i = 1; i <= this.height; i ++){
    sideCoord.push([sideX, this.y + i]);
  }
  return sideCoord;
}
