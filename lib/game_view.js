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
    this.showScoreForm = this.showScoreForm.bind(this);
    this.setHighScore = this.setHighScore.bind(this);
    this.createScore = this.createScore.bind(this);
    this.fetchScores();
    this.userInput = '';
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

    let scoreSection = $('.highscores-table');
    for(let i = 0; i < 10; i++){
      let name = scores[i]['name'];
      scoreSection.append(`
        <tr id='player${i}'>
          <td>${i + 1}</td>
          <td>${name}</td>
          <td>${this.scorePadding(scores[i]['score'])}</td>
        </tr>
      `);
      if(name === 'player'){
        $(`#player${i}`).addClass('default-player');
      } else if (name === this.userInput){
        $(`#player${i}`).addClass('highlight');
        setTimeout(function(){
          $(`#player${i}`).removeClass('highlight');
        }, 3000);
      }
    }
    $('.info-inner').addClass('info-inner-show');

    if(this.newHighScoreCreated && this.displayForm){
      this.showScoreForm();
    }
  }

  scorePadding(score){
    let padded = '0000' + score;
    return padded.slice(score.toString().length - 1, padded.length);
  }

  reDisplayHighScores(score){
    this.displayForm = false;
    $('.info-inner').empty();
    for(let i = 0; i < this.highScores.length; i++){
      if(this.highScores[i]['score'] < score['score']){
        this.highScores.splice(i, 0, score);
        break;
      }
    }
    this.displayHighScores(this.highScores);
  }

  fetchScores(){
    $.ajax({
      method: 'GET',
      url: 'https://esrails.herokuapp.com/scores/',
      crossDomain: true,
      success: scores => this.setHighScore(scores)
    });
  }

  setHighScore(scores){
    this.highScores = scores;
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
      crossDomain: true,
      success: singleScore => this.reDisplayHighScores(singleScore)
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
    $("form").submit(function(e){
      e.preventDefault();
      let name = $("#nameinput").val();
      if(name.length > 2 && name.length < 9){
        this.userInput = name;
        $("form").remove();
        this.createScore(this.userInput, this.game.endScore);
      } else {
        alert('Your name must be 3 to 8 characters!');
      }
    }.bind(this));
    $('#nameinput').keypress(e=>{
      if(e.which === 32){
        return false;
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
    if(!this.game.isOver()){
      if (this.gamePaused) {
        this.gamePaused = false;
        this.gameStart = setInterval(this.animate.bind(this), 10);
      } else {
        this.gamePaused = true;
      }
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
