angular.module('chess', ['piece'])
  .controller('ChessController', ['pieces', function(pieces) {
    var chess = this;
    chess.selected = false;
    chess.selectedSquare = null;
    chess.squares = getSquares();
    chess.pieces = pieces;

    angular.forEach(chess.pieces, function(piece) {
        chess.squares[piece.initialPositionY][piece.initialPositionX].piece = piece;
    });

    function getSquares() {
    	var squares = [];
	    var squareColor = 1;
	    for (var i = 0; i < 8; i++) {
	   		squares[i] = [];
	   		for (var j = 0; j < 8; j++) {
		   		squares[i][j] = {color: squareColor == 1 ? 'white' : 'black', piece : null, possibleMove: '', current: '', position: j+','+i};
		   		squareColor = squareColor == 1 ? 0 : 1;
		   	}
		   	squareColor = squareColor == 1 ? 0 : 1;
	   	}
	   	return squares;
	}

	chess.action = function(square) {
		if(!chess.selected) {
			if(square.piece) {
				showPossibleMoves(square);
				chess.selected = true;
				chess.selectedSquare = square;
			}			
		} else {
			var possibleMoves = chess.selectedSquare.piece.getPossibleMoves(chess.squares);
			angular.forEach(possibleMoves, function(move) {
				if(square.position == move) {

					var from = chess.selectedSquare.position.split(',');
					var to = square.position.split(',');
					chess.selectedSquare.piece.positionX = parseInt(to[0], 10);
					chess.selectedSquare.piece.positionY = parseInt(to[1], 10);
					chess.squares[to[1]][to[0]].piece = chess.selectedSquare.piece;
					chess.squares[from[1]][from[0]].piece = null;
				}			
			});
			chess.selected = false;
			chess.selectedSquare.current = '';
			chess.selectedSquare = null;
			clearPossibleMoves();
		}
	}

	showPossibleMoves = function(square) {
		var possibleMoves = square.piece.getPossibleMoves(chess.squares);
		square.current = 'current';
		angular.forEach(possibleMoves, function(move) {
			var positions = move.split(',');
			chess.squares[positions[1]][positions[0]].possibleMove = 'possibleMove';
		});
	};

	clearPossibleMoves = function() {
	    for (var i = 0; i < 8; i++) {
	   		for (var j = 0; j < 8; j++) {
		   		chess.squares[i][j].possibleMove = '';
		   	}
	   	}
	};
}]);