// socket helper function: drop flag
module.exports = function(io, board, data) {
  var playerId = data[0];
  var location = data[1];

  if ( board.board[location.y][location.x].status === 0 ) {
    // if the flag is dropped at a correct place
    if ( board.board[location.y][location.x].val === 9 ) {
      board.board[location.y][location.x].status = 1;
      //update board
      board.minesLeft--;
      console.log('mines left: ', board.minesLeft);
      io.emit('countMines', board.minesLeft);
      io.emit('updateBoard', board.board);
      //update score
      console.log('playerId: ', playerId);
      io.emit('updateScore', {id: playerId, scoreChange: scoreRightFlag});
    } else {
    // if the flag is dropped at a wrong place
      board.board[location.y][location.x].status = 3;
      //update board
      io.emit('updateBoard', board.board);
      //update score
      console.log('playerId: ', playerId);
      io.emit('updateScore', {id: playerId, scoreChange: scoreWrongFlag});
      //after 0.3, reset the corresponing grid to initial
      setTimeout(() => {
        board.board[location.y][location.x].status = 0;
        io.emit('updateBoard', board.board);
      }, 300);
    }
    if (board.minesLeft === 0){
      board.generate();
    }
  }
};