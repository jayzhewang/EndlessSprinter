/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _game = __webpack_require__(1);
	
	var _game2 = _interopRequireDefault(_game);
	
	var _game_view = __webpack_require__(6);
	
	var _game_view2 = _interopRequireDefault(_game_view);
	
	var _demension = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener('DOMContentLoaded', function () {
	  var canvasEl = document.getElementsByTagName('canvas')[0];
	
	  canvasEl.width = _demension.gameDemension[0];
	  canvasEl.height = _demension.gameDemension[1];
	
	  var ctx = canvasEl.getContext('2d');
	  var game = new _game2.default();
	  new _game_view2.default(game, ctx).start();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _level_one = __webpack_require__(2);
	
	var _sprinter = __webpack_require__(4);
	
	var _sprinter2 = _interopRequireDefault(_sprinter);
	
	var _land = __webpack_require__(5);
	
	var _land2 = _interopRequireDefault(_land);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Game = function () {
	  function Game() {
	    _classCallCheck(this, Game);
	
	    this.sprinter = new _sprinter2.default();
	    this.land = new _land2.default(_level_one.LevelOne);
	  }
	
	  _createClass(Game, [{
	    key: 'step',
	    value: function step() {
	      this.land.step();
	    }
	  }, {
	    key: 'move',
	    value: function move() {}
	  }, {
	    key: 'checkCollisions',
	    value: function checkCollisions() {}
	  }, {
	    key: 'allObjects',
	    value: function allObjects() {
	      return [].concat([this.sprinter], [this.land]);
	    }
	  }, {
	    key: 'draw',
	    value: function draw(ctx) {
	      ctx.clearRect(0, 0, 1334, 750);
	      ctx.fillStyle = '#f2f2f2';
	      ctx.fillRect(0, 0, 1334, 750);
	
	      this.allObjects().forEach(function (obj) {
	        obj.draw(ctx);
	      });
	    }
	  }]);
	
	  return Game;
	}();
	
	exports.default = Game;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.LevelOne = undefined;
	
	var _demension = __webpack_require__(3);
	
	var LevelOne = exports.LevelOne = [{ x: _demension.gameDemension[0] / 10 * 0, y: 500, width: 100, height: 250 }, { x: _demension.gameDemension[0] / 10 * 1, y: 500, width: 100, height: 250 }, { x: _demension.gameDemension[0] / 10 * 2, y: 500, width: 100, height: 250 }, { x: _demension.gameDemension[0] / 10 * 3, y: 500, width: 100, height: 250 }, { x: _demension.gameDemension[0] / 10 * 4, y: 500, width: 100, height: 250 }, { x: _demension.gameDemension[0] / 10 * 5, y: 500, width: 100, height: 250 }, { x: _demension.gameDemension[0] / 10 * 6, y: 500, width: 100, height: 250 }, { x: _demension.gameDemension[0] / 10 * 7, y: 500, width: 100, height: 250 }, { x: _demension.gameDemension[0] / 10 * 8, y: 500, width: 100, height: 250 }, { x: _demension.gameDemension[0] / 10 * 9, y: 500, width: 100, height: 250 }, { x: _demension.gameDemension[0] / 10 * 9, y: 500, width: 100, height: 250 }, { x: _demension.gameDemension[0] / 10 * 9, y: 500, width: 100, height: 250 }, { x: _demension.gameDemension[0] / 10 * 9, y: 500, width: 100, height: 250 }, { x: _demension.gameDemension[0] / 10 * 9, y: 500, width: 100, height: 250 }, { x: _demension.gameDemension[0] / 10 * 9, y: 500, width: 100, height: 250 }, { x: _demension.gameDemension[0] / 10 * 9, y: 500, width: 100, height: 250 }, { x: _demension.gameDemension[0] / 10 * 9, y: 500, width: 100, height: 250 }, { x: _demension.gameDemension[0] / 10 * 9, y: 500, width: 100, height: 250 }, { x: _demension.gameDemension[0] / 10 * 9, y: 500, width: 100, height: 250 }, { x: _demension.gameDemension[0] / 10 * 9, y: 500, width: 100, height: 250 }];

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var gameDemension = exports.gameDemension = [1334, 750];

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Sprinter = function () {
	  function Sprinter() {
	    _classCallCheck(this, Sprinter);
	
	    this.x = 0;
	    this.y = 400;
	    this.jumped = false;
	  }
	
	  _createClass(Sprinter, [{
	    key: 'jump',
	    value: function jump() {
	      var _this = this;
	
	      var originalY = this.y;
	      var that = this;
	      if (this.jumped === false) {
	        (function () {
	          _this.y = _this.y - 300;
	          var fall = function fall() {
	            return setInterval(function () {
	              if (originalY > that.y) {
	                that.jumped = true;
	                that.y += 1;
	              } else {
	                that.jumped = false;
	                clearInterval(fall);
	              }
	            }, 10);
	          };
	          fall();
	        })();
	      }
	    }
	  }, {
	    key: 'draw',
	    value: function draw(ctx) {
	      ctx.fillStyle = 'green';
	      ctx.fillRect(this.x, this.y, 100, 100);
	    }
	  }]);
	
	  return Sprinter;
	}();
	
	exports.default = Sprinter;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Land = function () {
	  function Land(currentLand) {
	    _classCallCheck(this, Land);
	
	    this.currentLand = currentLand;
	    this.land = [];
	
	    this.loadLand();
	    this.currentPieceNumber = 9;
	  }
	
	  _createClass(Land, [{
	    key: 'loadLand',
	    value: function loadLand() {
	      for (var i = 0; i < 10; i++) {
	        this.land.push(this.currentLand[i]);
	      }
	    }
	  }, {
	    key: 'step',
	    value: function step() {
	      var that = this;
	      setInterval(function () {
	        that.move();
	        if (that.land[0].x < -9) {
	          that.currentPieceNumber += 1;
	          that.queue();
	        }
	      }, 1000);
	    }
	  }, {
	    key: 'move',
	    value: function move() {
	      var _this = this;
	
	      this.land.forEach(function (piece, i) {
	        _this.land[i].x -= 1;
	      });
	    }
	  }, {
	    key: 'queue',
	    value: function queue() {
	      this.land.shift();
	      this.land.push(this.currentLand[this.currentPieceNumber]);
	    }
	  }, {
	    key: 'draw',
	    value: function draw(ctx) {
	      ctx.fillStyle = 'pink';
	      this.land.forEach(function (piece) {
	        ctx.fillStyle = 'pink';
	        ctx.fillRect(piece.x, piece.y, piece.width, piece.height);
	      });
	    }
	  }]);
	
	  return Land;
	}();
	
	exports.default = Land;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GameView = function () {
	  function GameView(game, ctx) {
	    _classCallCheck(this, GameView);
	
	    this.game = game;
	    this.ctx = ctx;
	  }
	
	  _createClass(GameView, [{
	    key: 'bindKeyHandlers',
	    value: function bindKeyHandlers() {
	      var _this = this;
	
	      key('space', function () {
	        _this.game.sprinter.jump();
	      });
	    }
	  }, {
	    key: 'start',
	    value: function start() {
	      this.bindKeyHandlers();
	      this.lastTime = 0;
	
	      requestAnimationFrame(this.animate.bind(this));
	    }
	  }, {
	    key: 'animate',
	    value: function animate(time) {
	      var timeDelta = time - this.lastTime;
	      this.game.step(timeDelta);
	      this.game.draw(this.ctx);
	      this.lastTime = time;
	
	      requestAnimationFrame(this.animate.bind(this));
	    }
	  }]);
	
	  return GameView;
	}();
	
	exports.default = GameView;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map