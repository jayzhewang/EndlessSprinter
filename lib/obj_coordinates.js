export const sideLandCoords = function(land){
  const sides = [];
  const l = land.currentLand;
  for(let i = 0; i < l.length / 3; i ++){
    const pieceSideX = l[i].x;
    const pieceTopY = l[i].y + 1;
    const pieceBottomY = l[i].y + l[i].height - 1;

    sides.push([[pieceSideX, pieceTopY], [pieceSideX, pieceBottomY]]);
  }
  return sides;
};

export const topLandCoords = function(land){
  const tops = [];
  const l = land.currentLand;
  for(let i = 0; i < l.length / 3; i ++){
    const pieceY = l[i].y;
    const pieceLeftX = l[i].x;
    const pieceRightX = l[i].x + l[i].width;

    tops.push([[pieceLeftX, pieceY], [pieceRightX, pieceY]]);
  }
  return tops;
};

export const riverCoords = function(river){
  return [river.y];
};
