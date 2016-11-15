var Board = require('./board.js');
var Players = require('./players.js');

function createBoard(rows, columns, dangerFactor) {
  rows = rows ? rows : 12;
  columns = columns ? columns : 12;
  dangerFactor = dangerFactor ? dangerFactor : 0.2;

  var board = new Board();
  board.generate(rows, columns, dangerFactor);
  console.log('created newboard');

  return board;
};

function createPlayers() {
  var players = new Players();
  return players
};

var GameManager = function() {
  this.rooms = {};
  this.roomCount = 0;
};

GameManager.prototype.createRoom = function(roomName) {

  var board = createBoard();
  var players = createPlayers();
  this.rooms[roomName] = {board, players};

  console.log('created new room ', this.rooms[roomName]);
};


// Generate Players object to manage player locations and potentially status.

module.exports = GameManager;

// uncomment for example
// var gameManager = new GameManager();
// gameManager.createRoom('newRoom');
// gameManager.createRoom('anotherRoom');
// console.log(gameManager.rooms);

