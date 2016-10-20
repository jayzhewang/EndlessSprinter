<h1>Endless Sprinter</h1>
<a href='https://jz-wang.github.io/'>Play</a>
<p>A browser runner game.</p>
<p>Built with vanilla JS, canvas, html and css.</p>
<p>Fun, challenging, rewarding.</p>

<h1>Features</h1>
<p>Simulated physics. Pause/Resume.</p>
<img src='http://res.cloudinary.com/cloudlicious/image/upload/v1476988205/esgame_gyyafl.png'
     width='400'
     height='273'/>
<p>Leaderboard.</p>
<img src='http://res.cloudinary.com/cloudlicious/image/upload/v1476988364/esscore_lw2dwk.png'
     width='200'
     height='261'/>

<h1>Implementations</h1>
<p>The level is contained in a level object. The screen is split into 10 sections, each sub-array in the level object is 1 section of the screen, called a land pice. 12 land pieces are loaded at a time into a queue. When the first piece of the queue has moved far enough off of the screen, it is shifted and another piece is loaded.</p>

```javascript
queue(){
  this.currentLand.shift();
  if(this.currentPieceNumber === this.Land.length - 1){
     this.currentLand.push(Object.assign({}, this.Land[this.currentPieceNumber]));
     this.currentPieceNumber = 9;
  }
  ...
}
```

<p>The jumping physics is simulated, and according to current y height of the sprinter, velocity is determined.</p>

```javascript
fall(isLanded){
  if( !isLanded ){
    if(this.action !== 'falling'){
       this.action = 'falling';
    }
    this.getVelocityFall();
    this.y += this.velocity;
  } else {
    this.action = '';
    this.jumped = false;
  }
}
```

<p>Collision detection is accomplished by comparing coordinates of objects in a small area around the sprinter.</p>

```javascript
checkCollision(){
  const slc = sideLandCoords(this.land);
  const rc = riverCoords(this.river);
  const spc = this.getSprinterCoords();
  if( this.isCollideWithSide(slc, spc) || this.isCollideWithRiver(rc, spc) ){
    this.gameOver = true;
    return 'has collided';
  }
  return 'no collision';
}
```

<p>High scores are fetched and saved from a rails server. Rack middleware 'rack-cors' is used on the server-end to enable cross origin resource sharing.</p>

```ruby
config.middleware.insert_before ActionDispatch::Static, Rack::Cors do
  allow do
    origins '*'
    resource '*', :headers => :any, :methods => [:get, :post]
  end
end
```

<h1>Future Improvements</h1>
<ol>
  <li type='I'>Create in game obstacles to jump over.</li>
  <li type='I'>Create coins and power ups.</li>
  <li type='I'>Create more subsequent level designs.</li>
  <li type='I'>Improve design of templates/sprite sheets.</li>
</ol>
