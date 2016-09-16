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
	
	var _game_view = __webpack_require__(7);
	
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
	
	var _obj_coordinates = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Game = function () {
	  function Game() {
	    _classCallCheck(this, Game);
	
	    this.land = new _land2.default(_level_one.Level);
	    this.sprinter = new _sprinter2.default();
	    this.gameOver = false;
	    this.sprinterAction = this.sprinterFall;
	  }
	
	  _createClass(Game, [{
	    key: 'step',
	    value: function step() {
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
	      var rc = (0, _obj_coordinates.riverCoords)();
	
	      if (this.isCollideWithSide(slc) || this.isCollideWithRiver(rc)) {
	        this.gameOver = true;
	        return 'has collided';
	      }
	      return 'no collision';
	    }
	  }, {
	    key: 'sprinterJump',
	    value: function sprinterJump() {
	      if (this.sprinter.jumped === false) {
	        this.sprinter.jumped = true;
	        this.sprinterAction = this.sprinterRise;
	      }
	    }
	  }, {
	    key: 'sprinterFall',
	    value: function sprinterFall() {
	      this.sprinter.fall(this.isLanded((0, _obj_coordinates.topLandCoords)(this.land)));
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
	    value: function isCollideWithSide(sideCoords) {
	      var spc = this.getSprinterCoords();
	
	      for (var i = 0; i < sideCoords.length; i++) {
	        var landTopY = sideCoords[i][0][1];
	        var landBottomY = sideCoords[i][1][1];
	        var landX = sideCoords[i][0][0];
	
	        if (spc.sprinterTopY >= landTopY + 3 && spc.sprinterTopY <= landBottomY - 3 && spc.sprinterX >= landX - 1 && spc.sprinterX <= landX || spc.sprinterBottomY >= landTopY + 3 && spc.sprinterBottomY <= landBottomY - 3 && spc.sprinterX >= landX - 1 && spc.sprinterX <= landX) {
	          return true;
	        }
	      }
	      return false;
	    }
	  }, {
	    key: 'isCollideWithRiver',
	    value: function isCollideWithRiver() {
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
	
	        if (spc.sprinterLeftX >= landLeftX && spc.sprinterLeftX <= landRightX && this.between(spc.sprinterY, landY, landY + 3) || spc.sprinterRightX >= landLeftX && spc.sprinterRightX <= landRightX && this.between(spc.sprinterY, landY, landY + 3)) {
	          this.sprinter.originalY = this.sprinter.y;
	
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
	      return [].concat([this.sprinter], [this.land]);
	    }
	  }, {
	    key: 'between',
	    value: function between(x, min, max) {
	      return x >= min && x <= max;
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
	exports.Level = undefined;
	
	var _demension = __webpack_require__(3);
	
	var Level = exports.Level = [{ x: Math.floor(_demension.gameDemension[0] / 10 * 0), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 1), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 2), y: 500, width: 100, height: 100 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 3), y: 500, width: 100, height: 100 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 4), y: 600, width: 100, height: 150 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 5), y: 600, width: 100, height: 150 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 6), y: 500, width: 0, height: 0 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 7), y: 500, width: 0, height: 0 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 8), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 0, height: 0 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 0, height: 0 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 400, width: 100, height: 350 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 400, width: 100, height: 350 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 600, width: 100, height: 100 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 600, width: 100, height: 100 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 0, height: 0 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 0, height: 0 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 0, height: 0 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 0, height: 0 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }, { x: Math.floor(_demension.gameDemension[0] / 10 * 9), y: 500, width: 100, height: 250 }];

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
	
	    this.x = 100;
	    this.y = 340;
	    this.width = 100;
	    this.height = 100;
	    this.maxY = this.y - 300;
	    this.originalY = this.y;
	    this.jumped = false;
	    // this.gravity = -9.8;
	
	    this.velocity = 4;
	  }
	
	  _createClass(Sprinter, [{
	    key: 'getRiseVelocity',
	    value: function getRiseVelocity() {
	      if (this.y >= (this.originalY - this.maxY) * 99 / 100 + this.maxY) {
	        this.velocity = 10;
	      } else if (this.y >= (this.originalY - this.maxY) * 9 / 10 + this.maxY) {
	        this.velocity = 10;
	      } else if (this.y >= (this.originalY - this.maxY) * 8 / 10 + this.maxY) {
	        this.velocity = 10;
	      } else if (this.y >= (this.originalY - this.maxY) * 7 / 10 + this.maxY) {
	        this.velocity = 10;
	      } else if (this.y >= (this.originalY - this.maxY) * 6 / 10 + this.maxY) {
	        this.velocity = 10;
	      } else if (this.y >= (this.originalY - this.maxY) * 5 / 10 + this.maxY) {
	        this.velocity = 10;
	      } else if (this.y >= (this.originalY - this.maxY) * 4 / 10 + this.maxY) {
	        this.velocity = 5;
	      } else if (this.y >= (this.originalY - this.maxY) * 3 / 10 + this.maxY) {
	        this.velocity = 5;
	      } else if (this.y >= (this.originalY - this.maxY) * 2 / 10 + this.maxY) {
	        this.velocity = 5;
	      } else if (this.y >= (this.originalY - this.maxY) * 1 / 10 + this.maxY) {
	        this.velocity = 3;
	      }
	    }
	  }, {
	    key: 'rise',
	    value: function rise() {
	      this.getRiseVelocity();
	      this.y -= this.velocity;
	    }
	  }, {
	    key: 'fall',
	    value: function fall(isLanded) {
	      if (!isLanded) {
	        this.y += 4;
	      } else {
	        this.jumped = false;
	      }
	    }
	  }, {
	    key: 'SprinterCoordinates',
	    value: function SprinterCoordinates() {
	      return [this.x, this.x + this.width, this.y, this.y + this.height];
	    }
	  }, {
	    key: 'draw',
	    value: function draw(ctx) {
	      ctx.fillStyle = 'green';
	      ctx.fillRect(this.x, this.y, this.width, this.height);
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
	  function Land(land) {
	    _classCallCheck(this, Land);
	
	    this.Land = land;
	    this.currentLand = [];
	
	    this.loadLand();
	    this.currentPieceNumber = 9;
	  }
	
	  _createClass(Land, [{
	    key: 'loadLand',
	    value: function loadLand() {
	      for (var i = 0; i < 10; i++) {
	        this.currentLand.push(this.Land[i]);
	      }
	    }
	  }, {
	    key: 'step',
	    value: function step() {
	      this.move();
	      if (this.currentLand[0].x < -9) {
	        this.currentPieceNumber += 1;
	        this.queue();
	      }
	    }
	  }, {
	    key: 'move',
	    value: function move() {
	      var _this = this;
	
	      this.currentLand.forEach(function (piece, i) {
	        _this.currentLand[i].x -= 3;
	      });
	    }
	  }, {
	    key: 'queue',
	    value: function queue() {
	      this.currentLand.shift();
	      this.currentLand.push(this.Land[this.currentPieceNumber]);
	    }
	  }, {
	    key: 'draw',
	    value: function draw(ctx) {
	      ctx.fillStyle = 'pink';
	      this.currentLand.forEach(function (piece) {
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

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var sideLandCoords = exports.sideLandCoords = function sideLandCoords(land) {
	  var sides = [];
	
	  land.currentLand.forEach(function (piece) {
	    var pieceSideX = piece.x;
	    var pieceTopY = piece.y + 1;
	    var pieceBottomY = piece.y + piece.height - 1;
	
	    sides.push([[pieceSideX, pieceTopY], [pieceSideX, pieceBottomY]]);
	  });
	  return sides;
	};
	
	var topLandCoords = exports.topLandCoords = function topLandCoords(land) {
	  var tops = [];
	
	  land.currentLand.forEach(function (piece) {
	    var pieceY = piece.y;
	    var pieceLeftX = piece.x;
	    var pieceRightX = piece.x + piece.width;
	
	    tops.push([[pieceLeftX, pieceY], [pieceRightX, pieceY]]);
	  });
	  return tops;
	};
	
	var riverCoords = exports.riverCoords = function riverCoords(river) {
	  return [];
	};

/***/ },
/* 7 */
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
	        setInterval(_this.game.sprinterJump(), 5);
	      });
	    }
	  }, {
	    key: 'start',
	    value: function start() {
	      this.bindKeyHandlers();
	      this.lastTime = 0;
	
	      setInterval(this.animate.bind(this), 10);
	    }
	  }, {
	    key: 'animate',
	    value: function animate(time) {
	      // const timeDelta = time - this.lastTime;
	      var game = this.game.isOver();
	      if (!this.game.isOver()) {
	        this.game.step();
	        // this.game.landStep();
	        // this.game.sprinterFall();
	        this.game.draw(this.ctx);
	      }
	      // this.lastTime = time;
	    }
	  }]);
	
	  return GameView;
	}();
	
	exports.default = GameView;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map