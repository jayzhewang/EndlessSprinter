const explosion = new Image();
explosion.src = 'explosion.png';
const explodeCoords = [
  [0,1],
  [96, 1],
  [192, 1],
  [288, 1],
  [384, 1],
  [0,97],
  [96, 97],
  [192, 97],
  [288, 97],
  [384, 97],
  [0,193],
  [96, 193],
  [192, 193],
  [288, 193],
  [384, 193],
  [480, 288]
];

class GameView{
  constructor(game, ctx){
    this.game = game;
    this.ctx = ctx;
    this.gamePaused = false;
    this.highScores = [];
    this.newHighScoreCreated = false;
    this.displayForm = false;

    this.explode = this.explode.bind(this);
    this.reDisplayHighScores = this.reDisplayHighScores.bind(this);
    this.displayHighScores = this.displayHighScores.bind(this);
    this.explode = this.explode.bind(this);
    this.showScoreForm = this.showScoreForm.bind(this);
    this.fetchScores();
  }

  bindKeyHandlers(){
    key('space', e => {
      e.preventDefault();
      this.game.sprinterJump();
    });
    key('enter', e => {
      e.preventDefault();
      this.toggleGame();
    });
  }

  displayHighScores(highScores){
    let scores = highScores;
    if(scores){
      this.highScores = scores;
    } else {
      scores = this.highScores;
    }
    $('.info-inner').append(`
      <div class='highscores'>
        <table class='highscores-table' align='center'>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </table>
      </div>
    `);
    $('.info-inner').append(`
      <div class='restart'>
        <div type="submit" onClick="window.location.reload()">Restart</div>
      </div>
    `);
    $('.info-inner').addClass('info-inner-show');

    let scoreSection = $('.highscores-table');
    for(let i = 0; i < 10; i++){
      if(scores[i]['name'] === 'player'){
        scoreSection.append(`
        <tr id='default-player'>
          <td>${i + 1}</td>
          <td>${scores[i]['name']}</td>
          <td>${this.scorePadding(scores[i]['score'])}</td>
        </tr>
        `);
      } else {
      scoreSection.append(`
        <tr>
          <td>${i + 1}</td>
          <td>${scores[i]['name']}</td>
          <td>${this.scorePadding(scores[i]['score'])}</td>
        </tr>
        `);
    }
    }

    if(this.newHighScoreCreated && this.displayForm){
      this.showScoreForm();
    }
  }

  scorePadding(score){
    let padded = '0000' + score;
    return padded.slice(padded.length - 5, 6);
  }

  reDisplayHighScores(score){
    this.displayForm = false;
    $("form").remove();
    $('.info-inner').empty();
    for(let i = 0; i < this.highScores.length; i++){
      if(this.highScores[i]['score'] < score['score']){
        this.highScores.splice(i, 0, score);
        break;
      }
    }
    this.displayHighScores();
  }

  fetchScores(){
    $.ajax({
      method: 'GET',
      url: 'https://esrails.herokuapp.com/scores/',
      success: scores => {
        this.highScores = scores;
      }
    });
  }

  createScore(player, score){
    $.ajax({
      method: 'POST',
      data: {
        name: player,
        score: score
      },
      dataType: 'json',
      url: 'https://esrails.herokuapp.com/scores',
      success: singleScore => {
        this.reDisplayHighScores(singleScore);
      }
    });
  }

  showScoreForm(){
    let scoreSection = $('.highscores');
    scoreSection.append(`
      <form>
        <div class='submission'>
          <input id='nameinput' type='text' placeholder='Enter your name'>
          <input id='submit' type='submit' value='submit'>
        </div>
      </form>`
    );
    $("form").submit(e=>{
      e.preventDefault();
      let userInput = $("#nameinput").val();
      if(userInput.length > 2 && userInput.length < 9){
        $("form").remove();
        this.createScore(userInput, this.game.endScore);
      } else {
        alert('Your name must be 3 to 8 characters!');
      }
    });
  }

  compareScores(){
    for(let i = 0; i < this.highScores.length; i++){
      if(this.highScores.length === 0 ||
         this.highScores[i]['score'] < this.game.endScore){
        this.newHighScoreCreated = true;
        this.displayForm = true;
        return true;
      }
    }
    return false;
  }

  toggleGame() {
    if (this.gamePaused) {
      this.gamePaused = false;
      this.gameStart = setInterval(this.animate.bind(this), 10);
    } else {
      this.gamePaused = true;
    }
  }

  start(){
    this.bindKeyHandlers();
    this.gameStart = setInterval(this.animate.bind(this), 10);
  }

  animate(){
    if(this.gamePaused){
      clearInterval(this.gameStart);
    }
    if( !this.game.isOver() ){
      this.game.step();
      this.game.draw(this.ctx);
    } else {
      clearInterval(this.gameStart);
      this.sprinterCoords = this.game.sprinter.SprinterExplodeCoords();
      this.idx = 0;
      this.gameExplode = setInterval(this.explode, 100);
      if(this.compareScores()){
        this.ctx.fillStyle = "#ff0000";
        this.ctx.font = "30px Arial";
        this.ctx.fillText(`Congratulations! New High Score!`, 175, 100);
      } else {
        this.ctx.fillStyle = "#ff69b4";
        this.ctx.font = "30px Arial";
        this.ctx.fillText(`Better Luck Next Time!`, 245, 100);
      }
    }
  }

  explode(){
      this.ctx.clearRect(
        this.sprinterCoords[0] - 40,
        this.sprinterCoords[1] - 40,
        this.sprinterCoords[2] + 40,
        this.sprinterCoords[3] + 40
      );
      this.ctx.fillStyle = '#fafafa';
      this.ctx.fillRect(
        this.sprinterCoords[0] - 40,
        this.sprinterCoords[1] - 40,
        this.sprinterCoords[2] + 40,
        this.sprinterCoords[3] + 40
      );
      this.ctx.drawImage(
        explosion,
        explodeCoords[this.idx][0],
        explodeCoords[this.idx][1],
        95,
        95,
        this.sprinterCoords[0] - 40,
        this.sprinterCoords[1] - 40,
        this.sprinterCoords[2] + 40,
        this.sprinterCoords[3] + 40
      );
    if(this.idx === 15){
      clearInterval(this.gameExplode);
      this.displayHighScores(this.highScores);
    } else {
      this.idx += 1;
    }
  }
}

export default GameView;
