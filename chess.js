angular.module('chess', ['piece', 'game-play'])
  .controller('ChessController', ['pieceService', 'playService', function(pieceService, playService) {
    
    this.squares = playService.getChessBoard();
    this.turn = playService.getTurn();

	this.action = function(square) {
		if(!playService.isSelected()) {
			if(square.piece && playService.validTurn(square.piece.color)) {
				playService.selectAndShowPossibleMoves(square);
			}			
		} else {
			playService.move(square);
			playService.unselectAndClearPossibleMoves();
		}
	}

	this.undo = function() {
		playService.undo();
	}

}]);