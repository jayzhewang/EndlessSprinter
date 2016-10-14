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
	
	var _game_view = __webpack_require__(8);
	
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
	
	var _river = __webpack_require__(6);
	
	var _river2 = _interopRequireDefault(_river);
	
	var _obj_coordinates = __webpack_require__(7);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Game = function () {
	  function Game() {
	    _classCallCheck(this, Game);
	
	    this.startTime = new Date();
	    this.land = new _land2.default(_level_one.Level);
	    this.sprinter = new _sprinter2.default();
	    this.river = new _river2.default();
	    this.gameOver = false;
	    this.sprinterAction = this.sprinterFall;
	    this.score = 0;
	  }
	
	  _createClass(Game, [{
	    key: 'step',
	    value: function step() {
	      this.sprinterOnLand = this.isLanded((0, _obj_coordinates.topLandCoords)(this.land));
	      this.sprinterAction();
	      this.landStep();
	    }
	  }, {
	    key: 'landStep',
	    value: function landStep() {
	      this.land.step();
	      this.checkCollision();
	    }
	  }, {
	    key: 'checkCollision',
	    value: function checkCollision() {
	      var slc = (0, _obj_coordinates.sideLandCoords)(this.land);
	      var rc = (0, _obj_coordinates.riverCoords)(this.river);
	      var spc = this.getSprinterCoords();
	
	      if (this.isCollideWithSide(slc, spc) || this.isCollideWithRiver(rc, spc)) {
	        this.gameOver = true;
	        return 'has collided';
	      }
	      return 'no collision';
	    }
	  }, {
	    key: 'sprinterJump',
	    value: function sprinterJump() {
	      if (!this.sprinter.jumped && this.sprinterOnLand) {
	        this.sprinter.jumped = true;
	        this.sprinterAction = this.sprinterRise;
	      }
	    }
	  }, {
	    key: 'sprinterFall',
	    value: function sprinterFall() {
	      this.sprinter.fall(this.sprinterOnLand);
	    }
	  }, {
	    key: 'sprinterRise',
	    value: function sprinterRise() {
	      if (this.sprinter.y > this.sprinter.maxY) {
	        this.sprinter.rise();
	      } else {
	        this.sprinterAction = this.sprinterFall;
	      }
	    }
	  }, {
	    key: 'isOver',
	    value: function isOver() {
	      return this.gameOver;
	    }
	  }, {
	    key: 'isCollideWithSide',
	    value: function isCollideWithSide(sideCoords, spc) {
	      for (var i = 0; i < sideCoords.length; i++) {
	        var landTopY = sideCoords[i][0][1];
	        var landBottomY = sideCoords[i][1][1];
	        var landX = sideCoords[i][0][0];
	
	        if (spc.sprinterTopY >= landTopY + 2 && spc.sprinterTopY <= landBottomY - 2 && spc.sprinterX >= landX - 1 && spc.sprinterX <= landX || spc.sprinterBottomY >= landTopY + 2 && spc.sprinterBottomY <= landBottomY - 2 && spc.sprinterX >= landX - 1 && spc.sprinterX <= landX) {
	          return true;
	        }
	      }
	      return false;
	    }
	  }, {
	    key: 'isCollideWithRiver',
	    value: function isCollideWithRiver(rCoords, spc) {
	      if (spc.sprinterBottomY <= rCoords[0] + 8 && spc.sprinterBottomY >= rCoords[0] - 2) {
	        return true;
	      }
	      return false;
	    }
	  }, {
	    key: 'isLanded',
	    value: function isLanded(topCoords) {
	      var spc = this.getSprinterCoords();
	
	      for (var i = 0; i < topCoords.length; i++) {
	        var landLeftX = topCoords[i][0][0];
	        var landRightX = topCoords[i][1][0];
	        var landY = topCoords[i][0][1];
	
	        if (spc.sprinterLeftX >= landLeftX && spc.sprinterLeftX <= landRightX && this.between(spc.sprinterY, landY - 2, landY + 2) || spc.sprinterRightX >= landLeftX && spc.sprinterRightX <= landRightX && this.between(spc.sprinterY, landY - 2, landY + 2)) {
	          this.sprinter.originalY = landY;
	          this.sprinter.maxY = landY - 200;
	          return true;
	        }
	      }
	      return false;
	    }
	  }, {
	    key: 'getSprinterCoords',
	    value: function getSprinterCoords() {
	      var sprinterCoords = this.sprinter.SprinterCoordinates();
	      return {
	        sprinterLeftX: sprinterCoords[0],
	        sprinterRightX: sprinterCoords[1],
	        sprinterY: sprinterCoords[3],
	        sprinterTopY: sprinterCoords[2],
	        sprinterBottomY: sprinterCoords[3],
	        sprinterX: sprinterCoords[1]
	      };
	    }
	  }, {
	    key: 'allObjects',
	    value: function allObjects() {
	      return [].concat([this.sprinter], [this.land], [this.river]);
	    }
	  }, {
	    key: 'between',
	    value: function between(x, min, max) {
	      return x >= min && x <= max;
	    }
	  }, {
	    key: 'draw',
	    value: function draw(ctx) {
	      var elapsedTime = new Date();
	      this.score += 1;
	      ctx.clearRect(0, 0, 1334, 750);
	      ctx.fillStyle = '#f2f2f2';
	      ctx.fillRect(0, 0, 1334, 750);
	      ctx.font = "50px Georgia";
	      ctx.strokeText('score: ' + Math.floor(this.score / 30), 570, 40);
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
	exports.Level = undefined;
	
	var _demension = __webpack_require__(3);
	
	var x = _demension.gameDemension[0];
	var Level = exports.Level = [{ x: Math.floor(x / 10 * 0), y: 350, width: 100, height: 100 }, { x: Math.floor(x / 10 * 1), y: 350, width: 100, height: 100 }, { x: Math.floor(x / 10 * 2), y: 350, width: 100, height: 100 }, { x: Math.floor(x / 10 * 3), y: 350, width: 100, height: 100 }, { x: Math.floor(x / 10 * 4), y: 350, width: 100, height: 100 }, { x: Math.floor(x / 10 * 5), y: 350, width: 100, height: 100 }, { x: Math.floor(x / 10 * 6), y: 350, width: 100, height: 100 }, { x: Math.floor(x / 10 * 7), y: 350, width: 100, height: 100 }, { x: Math.floor(x / 10 * 8), y: 350, width: 100, height: 100 }, { x: Math.floor(x / 10 * 9), y: 350, width: 100, height: 100 }, { x: Math.floor(x / 10 * 10), y: 350, width: 100, height: 100 }, { x: Math.floor(x / 10 * 10), y: 350, width: 100, height: 100 }, { x: Math.floor(x / 10 * 10), y: 0, width: 0, height: 0 }, { x: Math.floor(x / 10 * 10), y: 250, width: 100, height: 100 }, { x: Math.floor(x / 10 * 10), y: 300, width: 100, height: 50 }, { x: Math.floor(x / 10 * 10), y: 300, width: 100, height: 50 }, { x: Math.floor(x / 10 * 10), y: 300, width: 100, height: 50 }, { x: Math.floor(x / 10 * 10), y: 250, width: 100, height: 100 }, { x: Math.floor(x / 10 * 10), y: 0, width: 0, height: 0 }, { x: Math.floor(x / 10 * 10), y: 350, width: 100, height: 100 }, { x: Math.floor(x / 10 * 10), y: 350, width: 100, height: 100 }, { x: Math.floor(x / 10 * 10), y: 350, width: 100, height: 100 }, { x: Math.floor(x / 10 * 10), y: 350, width: 100, height: 100 }, { x: Math.floor(x / 10 * 10), y: 350, width: 100, height: 100 }, { x: Math.floor(x / 10 * 10), y: 350, width: 100, height: 100 }, { x: Math.floor(x / 10 * 10), y: 350, width: 100, height: 100 }, { x: Math.floor(x / 10 * 10), y: 0, width: 0, height: 0 }, { x: Math.floor(x / 10 * 10), y: 200, width: 100, height: 100 }, { x: Math.floor(x / 10 * 10), y: 200, width: 100, height: 100 }, { x: Math.floor(x / 10 * 10), y: 200, width: 100, height: 100 }, { x: Math.floor(x / 10 * 10), y: 150, width: 100, height: 100 }, { x: Math.floor(x / 10 * 10), y: 150, width: 100, height: 100 }, { x: Math.floor(x / 10 * 10), y: 0, width: 0, height: 0 }, { x: Math.floor(x / 10 * 10), y: 150, width: 100, height: 300 }, { x: Math.floor(x / 10 * 10), y: 200, width: 100, height: 250 }, { x: Math.floor(x / 10 * 10), y: 250, width: 100, height: 200 }, { x: Math.floor(x / 10 * 10), y: 300, width: 100, height: 150 }, { x: Math.floor(x / 10 * 10), y: 350, width: 100, height: 100 }, { x: Math.floor(x / 10 * 10), y: 350, width: 100, height: 100 }, { x: Math.floor(x / 10 * 10), y: 350, width: 100, height: 100 }, { x: Math.floor(x / 10 * 10), y: 200, width: 100, height: 150 }, { x: Math.floor(x / 10 * 10), y: 0, width: 0, height: 0 }, { x: Math.floor(x / 10 * 10), y: 0, width: 0, height: 0 }, { x: Math.floor(x / 10 * 10), y: 170, width: 100, height: 150 }, { x: Math.floor(x / 10 * 10), y: 170, width: 100, height: 150 }, { x: Math.floor(x / 10 * 10), y: 0, width: 0, height: 0 }, { x: Math.floor(x / 10 * 10), y: 0, width: 0, height: 0 }, { x: Math.floor(x / 10 * 10), y: 350, width: 100, height: 100 }, { x: Math.floor(x / 10 * 10), y: 350, width: 100, height: 100 }, { x: Math.floor(x / 10 * 10), y: 350, width: 100, height: 100 }, { x: Math.floor(x / 10 * 10), y: 350, width: 100, height: 100 }, { x: Math.floor(x / 10 * 10), y: 0, width: 0, height: 0 }, { x: Math.floor(x / 10 * 10), y: 350, width: 100, height: 100 }, { x: Math.floor(x / 10 * 10), y: 350, width: 100, height: 100 }, { x: Math.floor(x / 10 * 10), y: 350, width: 100, height: 100 }, { x: Math.floor(x / 10 * 10), y: 0, width: 0, height: 0 }, { x: Math.floor(x / 10 * 10), y: 350, width: 100, height: 100 }, { x: Math.floor(x / 10 * 10), y: 350, width: 100, height: 100 }, { x: Math.floor(x / 10 * 10), y: 350, width: 100, height: 100 }, { x: Math.floor(x / 10 * 10), y: 350, width: 100, height: 100 }, { x: Math.floor(x / 10 * 10), y: 300, width: 100, height: 150 }, { x: Math.floor(x / 10 * 10), y: 300, width: 100, height: 150 }, { x: Math.floor(x / 10 * 10), y: 300, width: 100, height: 150 }, { x: Math.floor(x / 10 * 10), y: 0, width: 0, height: 0 }, { x: Math.floor(x / 10 * 10), y: 300, width: 100, height: 150 }, { x: Math.floor(x / 10 * 10), y: 0, width: 0, height: 0 }, { x: Math.floor(x / 10 * 10), y: 250, width: 100, height: 200 }, { x: Math.floor(x / 10 * 10), y: 250, width: 100, height: 200 }, { x: Math.floor(x / 10 * 10), y: 0, width: 0, height: 0 }, { x: Math.floor(x / 10 * 10), y: 250, width: 100, height: 200 }, { x: Math.floor(x / 10 * 10), y: 350, width: 100, height: 100 }, { x: Math.floor(x / 10 * 10), y: 350, width: 100, height: 100 }, { x: Math.floor(x / 10 * 10), y: 350, width: 100, height: 100 }, { x: Math.floor(x / 10 * 10), y: 350, width: 100, height: 100 }, { x: Math.floor(x / 10 * 10), y: 350, width: 100, height: 100 }, { x: Math.floor(x / 10 * 10), y: 350, width: 100, height: 100 }, { x: Math.floor(x / 10 * 10), y: 350, width: 100, height: 100 }, { x: Math.floor(x / 10 * 10), y: 350, width: 100, height: 100 }, { x: Math.floor(x / 10 * 10), y: 350, width: 100, height: 100 }, { x: Math.floor(x / 10 * 10), y: 350, width: 100, height: 100 }];

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var gameDemension = exports.gameDemension = [800, 500];

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var image = new Image();
	image.src = 'sprinter.png';
	
	var Sprinter = function () {
	  function Sprinter() {
	    _classCallCheck(this, Sprinter);
	
	    this.x = 75;
	    this.y = 10;
	    this.width = 32;
	    this.height = 32;
	    this.maxY = this.y - 200;
	    this.originalY = this.y;
	    this.jumped = false;
	    this.action = '';
	
	    this.velocity = 4;
	    this.startPixels = [0, 66, 264, 132, 198, 330, 396, 594, 528, 462];
	    this.startIdx = 0;
	    this.slowDownCounter = 0;
	  }
	
	  _createClass(Sprinter, [{
	    key: 'draw',
	    value: function draw(ctx) {
	      if (this.action === 'rising') {
	        ctx.drawImage(image, this.startPixels[0], 0, 66, 71, this.x, this.y, this.width, this.height);
	      } else if (this.action === 'falling') {
	        ctx.drawImage(image, this.startPixels[2], 0, 66, 71, this.x, this.y, this.width, this.height);
	      } else {
	        ctx.drawImage(image, this.startPixels[this.startIdx], 0, 66, 71, this.x, this.y, this.width, this.height);
	      }
	      if (this.slowDownCounter === 5) {
	        if (this.startIdx < 9) {
	          this.startIdx += 1;
	        } else {
	          this.startIdx = 0;
	        }
	        this.slowDownCounter = 0;
	      } else {
	        this.slowDownCounter += 1;
	      }
	    }
	  }, {
	    key: 'getVelocityRise',
	    value: function getVelocityRise() {
	      if (this.y >= (this.originalY - this.maxY) * 9 / 10 + this.maxY) {
	        this.velocity = 20;
	      } else if (this.y >= (this.originalY - this.maxY) * 8 / 10 + this.maxY) {
	        this.velocity = 18;
	      } else if (this.y >= (this.originalY - this.maxY) * 7 / 10 + this.maxY) {
	        this.velocity = 16;
	      } else if (this.y >= (this.originalY - this.maxY) * 6 / 10 + this.maxY) {
	        this.velocity = 12;
	      } else if (this.y >= (this.originalY - this.maxY) * 5 / 10 + this.maxY) {
	        this.velocity = 8;
	      } else if (this.y >= (this.originalY - this.maxY) * 4 / 10 + this.maxY) {
	        this.velocity = 6;
	      } else if (this.y >= (this.originalY - this.maxY) * 3 / 10 + this.maxY) {
	        this.velocity = 6;
	      } else if (this.y >= (this.originalY - this.maxY) * 2 / 10 + this.maxY) {
	        this.velocity = 4;
	      } else if (this.y >= (this.originalY - this.maxY) * 1 / 10 + this.maxY) {
	        this.velocity = 2;
	      }
	    }
	  }, {
	    key: 'getVelocityFall',
	    value: function getVelocityFall() {
	      if (this.y > this.originalY) {
	        this.velocity = 6;
	      } else if (this.y >= (this.originalY - this.maxY) * 98 / 100 + this.maxY) {
	        this.velocity = 2;
	      } else if (this.y >= (this.originalY - this.maxY) * 9 / 10 + this.maxY) {
	        this.velocity = 8;
	      } else if (this.y >= (this.originalY - this.maxY) * 8 / 10 + this.maxY) {
	        this.velocity = 8;
	      } else if (this.y >= (this.originalY - this.maxY) * 7 / 10 + this.maxY) {
	        this.velocity = 6;
	      } else if (this.y >= (this.originalY - this.maxY) * 6 / 10 + this.maxY) {
	        this.velocity = 6;
	      } else if (this.y >= (this.originalY - this.maxY) * 5 / 10 + this.maxY) {
	        this.velocity = 6;
	      } else if (this.y >= (this.originalY - this.maxY) * 4 / 10 + this.maxY) {
	        this.velocity = 4;
	      } else if (this.y >= (this.originalY - this.maxY) * 3 / 10 + this.maxY) {
	        this.velocity = 4;
	      } else if (this.y >= (this.originalY - this.maxY) * 2 / 10 + this.maxY) {
	        this.velocity = 4;
	      } else if (this.y >= (this.originalY - this.maxY) * 1 / 10 + this.maxY) {
	        this.velocity = 4;
	      }
	    }
	  }, {
	    key: 'rise',
	    value: function rise() {
	      if (this.action !== 'rising') {
	        this.action = 'rising';
	      }
	      this.getVelocityRise();
	      this.y -= this.velocity;
	    }
	  }, {
	    key: 'fall',
	    value: function fall(isLanded) {
	      if (!isLanded) {
	        if (this.action !== 'falling') {
	          this.action = 'falling';
	        }
	        this.getVelocityFall();
	        this.y += this.velocity;
	      } else {
	        this.action = '';
	        this.jumped = false;
	      }
	    }
	  }, {
	    key: 'SprinterCoordinates',
	    value: function SprinterCoordinates() {
	      return [this.x, this.x + this.width, this.y, this.y + this.height];
	    }
	  }, {
	    key: 'SprinterExplodeCoords',
	    value: function SprinterExplodeCoords() {
	      return [this.x, this.y, this.width, this.height];
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
	
	var image = new Image();
	image.src = 'land.jpg';
	
	var Land = function () {
	  function Land(land) {
	    _classCallCheck(this, Land);
	
	    this.Land = land;
	    this.currentLand = [];
	
	    this.loadLand();
	    this.currentPieceNumber = 9;
	    this.moveSpeed = 2;
	    this.insaneDisplayed = false;
	  }
	
	  _createClass(Land, [{
	    key: 'loadLand',
	    value: function loadLand() {
	      for (var i = 0; i < 10; i++) {
	        this.currentLand.push(Object.assign({}, this.Land[i]));
	      }
	    }
	  }, {
	    key: 'step',
	    value: function step() {
	      if (this.currentLand[0].x < -100) {
	        this.currentPieceNumber += 1;
	        this.queue();
	      }
	      this.move();
	    }
	  }, {
	    key: 'move',
	    value: function move() {
	      var _this = this;
	
	      this.currentLand.forEach(function (piece, i) {
	        _this.currentLand[i].x -= _this.moveSpeed;
	      });
	    }
	  }, {
	    key: 'queue',
	    value: function queue() {
	      this.currentLand.shift();
	      if (this.currentPieceNumber === this.Land.length - 1) {
	        this.currentLand.push(Object.assign({}, this.Land[this.currentPieceNumber]));
	        this.currentPieceNumber = 9;
	        if (this.moveSpeed < 3.5) {
	          this.moveSpeed += 0.5;
	        }if (this.moveSpeed === 3.5) {
	          this.moveSpeed = 4.5;
	        }
	      } else {
	        this.currentLand.push(Object.assign({}, this.Land[this.currentPieceNumber]));
	      }
	    }
	  }, {
	    key: 'draw',
	    value: function draw(ctx) {
	      if (this.moveSpeed === 2 && this.currentPieceNumber < 20) {
	        ctx.font = "50px Georgia";
	        ctx.strokeText('Level 1', 40, 40);
	      } else if (this.moveSpeed === 2.5 && this.currentPieceNumber < 20) {
	        ctx.font = "50px Georgia";
	        ctx.strokeText('Level 2', 40, 40);
	      } else if (this.moveSpeed === 3 && this.currentPieceNumber < 20) {
	        ctx.font = "50px Georgia";
	        ctx.strokeText('Insane Mode', 40, 40);
	      } else if (this.moveSpeed === 4.5 && this.currentPieceNumber < 20 && !this.insaneDisplayed) {
	        ctx.font = "30px Georgia";
	        ctx.strokeText("Just kidding, Here's Insane Mode.", 40, 40);
	      } else if (this.insaneDisplayed) {
	        ctx.font = "50px Georgia";
	        ctx.strokeText("Keep going champ!", 40, 40);
	      }
	
	      if (this.moveSpeed === 4.5 && this.currentPieceNumber === 78) {
	        this.insaneDisplayed = true;
	      }
	
	      this.currentLand.forEach(function (piece) {
	        ctx.drawImage(image, 16, 0, 80, 100, piece.x, piece.y, piece.width, piece.height);
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
	
	var River = function () {
	  function River() {
	    _classCallCheck(this, River);
	
	    this.x = 0;
	    this.y = 450;
	    this.width = 800;
	    this.height = 50;
	  }
	
	  _createClass(River, [{
	    key: 'draw',
	    value: function draw(ctx) {
	      ctx.fillStyle = '#add8e6';
	      ctx.fillRect(this.x, this.y, this.width, this.height);
	      ctx.fillStyle = '#cde7f0';
	      ctx.fillRect(this.x, this.y, this.width, this.height * 0.2);
	      ctx.fillStyle = '#bddfeb';
	      ctx.fillRect(this.x, this.y + this.height * 0.2, this.width, this.height * 0.2);
	    }
	  }]);
	
	  return River;
	}();
	
	exports.default = River;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var sideLandCoords = exports.sideLandCoords = function sideLandCoords(land) {
	  var sides = [];
	  var l = land.currentLand;
	  for (var i = 0; i < l.length / 3; i++) {
	    var pieceSideX = l[i].x;
	    var pieceTopY = l[i].y + 1;
	    var pieceBottomY = l[i].y + l[i].height - 1;
	
	    sides.push([[pieceSideX, pieceTopY], [pieceSideX, pieceBottomY]]);
	  }
	  return sides;
	};
	
	var topLandCoords = exports.topLandCoords = function topLandCoords(land) {
	  var tops = [];
	  var l = land.currentLand;
	  for (var i = 0; i < l.length / 3; i++) {
	    var pieceY = l[i].y;
	    var pieceLeftX = l[i].x;
	    var pieceRightX = l[i].x + l[i].width;
	
	    tops.push([[pieceLeftX, pieceY], [pieceRightX, pieceY]]);
	  }
	  return tops;
	};
	
	var riverCoords = exports.riverCoords = function riverCoords(river) {
	  return [river.y];
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var explosion = new Image();
	explosion.src = 'explosion.png';
	var explodeCoords = [[0, 1], [96, 1], [192, 1], [288, 1], [384, 1], [0, 97], [96, 97], [192, 97], [288, 97], [384, 97], [0, 193], [96, 193], [192, 193], [288, 193], [384, 193], [480, 288]];
	
	var GameView = function () {
	  function GameView(game, ctx) {
	    _classCallCheck(this, GameView);
	
	    this.game = game;
	    this.ctx = ctx;
	    this.gamePaused = false;
	    this.explode = this.explode.bind(this);
	  }
	
	  _createClass(GameView, [{
	    key: 'bindKeyHandlers',
	    value: function bindKeyHandlers() {
	      var _this = this;
	
	      key('space', function (e) {
	        e.preventDefault();
	        _this.game.sprinterJump();
	      });
	      key('enter', function (e) {
	        e.preventDefault();
	        _this.toggleGame();
	      });
	    }
	  }, {
	    key: 'toggleGame',
	    value: function toggleGame() {
	      if (this.gamePaused) {
	        this.gamePaused = false;
	        this.gameStart = setInterval(this.animate.bind(this), 10);
	      } else {
	        this.gamePaused = true;
	      }
	    }
	  }, {
	    key: 'start',
	    value: function start() {
	      this.bindKeyHandlers();
	      this.gameStart = setInterval(this.animate.bind(this), 10);
	    }
	  }, {
	    key: 'animate',
	    value: function animate() {
	      if (this.gamePaused) {
	        clearInterval(this.gameStart);
	      }
	      if (!this.game.isOver()) {
	        this.game.step();
	        this.game.draw(this.ctx);
	      } else {
	        clearInterval(this.gameStart);
	        this.sprinterCoords = this.game.sprinter.SprinterExplodeCoords();
	        this.idx = 0;
	        this.gameExplode = setInterval(this.explode, 100);
	      }
	    }
	  }, {
	    key: 'explode',
	    value: function explode() {
	      this.ctx.clearRect(this.sprinterCoords[0] - 45, this.sprinterCoords[1] - 45, this.sprinterCoords[2] + 45, this.sprinterCoords[3] + 45);
	      this.ctx.fillStyle = '#f2f2f2';
	      this.ctx.fillRect(this.sprinterCoords[0] - 45, this.sprinterCoords[1] - 45, this.sprinterCoords[2] + 45, this.sprinterCoords[3] + 45);
	      this.ctx.drawImage(explosion, explodeCoords[this.idx][0], explodeCoords[this.idx][1], 95, 95, this.sprinterCoords[0] - 45, this.sprinterCoords[1] - 45, this.sprinterCoords[2] + 45, this.sprinterCoords[3] + 45);
	      if (this.idx === 15) {
	        clearInterval(this.gameExplode);
	      } else {
	        this.idx += 1;
	      }
	    }
	  }]);
	
	  return GameView;
	}();
	
	exports.default = GameView;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map