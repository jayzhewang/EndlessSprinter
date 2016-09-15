export const sideLandCoords = function(land){
  const sides = [];

  land.currentLand.forEach(piece=>{
    const pieceSideX = piece.x;
    const pieceTopY = piece.y + 1;
    const pieceBottomY = piece.y + piece.height - 1;

    sides.push([[pieceSideX, pieceTopY], [pieceSideX, pieceBottomY]]);
  });
  return sides;
};

export const topLandCoords = function(land){
  const tops = [];

  land.currentLand.forEach(piece=>{
    const pieceY = piece.y;
    const pieceLeftX = piece.x;
    const pieceRightX = piece.x + piece.width;

    tops.push([[pieceLeftX, pieceY], [pieceRightX, pieceY]]);
  });
  return tops;
};

export const riverCoords = function(river){
    return [];
};
