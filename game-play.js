angular.module('game-play', ['piece'])
	.service('playService', ['pieceService', function playService(pieceService) {

		var chessboard = [];
    	var selected = false;
    	var selectedSquare = null;
    	var possibleMoves = [];
    	var gamePlay = [];


	    this.getChessBoard = function () {
		    var squareColor = 1;
		    for (var i = 0; i < 8; i++) {
		   		chessboard[i] = [];
		   		for (var j = 0; j < 8; j++) {
			   		chessboard[i][j] = {color: squareColor == 1 ? 'white' : 'black', piece : null, possibleMove: '', current: '', position: j+','+i};
			   		squareColor = squareColor == 1 ? 0 : 1;
			   	}
			   	squareColor = squareColor == 1 ? 0 : 1;
		   	}

	   	    var pieces = pieceService.getAllPieces();

		    angular.forEach(pieces, function(piece) {
		        chessboard[piece.initialPositionY][piece.initialPositionX].piece = piece;
		    });

		   	return chessboard;
		}

		this.move = function(square) {
			angular.forEach(possibleMoves, function(move) {
				if(square.position == move) {

					var from = selectedSquare.position.split(',');
					var to = square.position.split(',');
					selectedSquare.piece.positionX = parseInt(to[0], 10);
					selectedSquare.piece.positionY = parseInt(to[1], 10);
					var killedPiece = chessboard[to[1]][to[0]].piece ? {name: chessboard[to[1]][to[0]].piece.name, color: chessboard[to[1]][to[0]].piece.color} : null;
					var movedPiece = {name: selectedSquare.piece.name, color: selectedSquare.piece.color};
					chessboard[to[1]][to[0]].piece = selectedSquare.piece;
					chessboard[from[1]][from[0]].piece = null;

					gamePlay.push({
						movedPiece: movedPiece,
						from: from,
						to: to,
						killedPiece: killedPiece
					});
				}			
			});
		};

		this.isSelected = function() {
			return selected;
		};

		this.selectAndShowPossibleMoves = function(square) {
			possibleMoves = square.piece.getPossibleMoves(chessboard);
			square.current = 'current';
			angular.forEach(possibleMoves, function(move) {
				var positions = move.split(',');
				chessboard[positions[1]][positions[0]].possibleMove = 'possibleMove';
			});
			selected = true;
			selectedSquare = square;
		};

		this.unselectAndClearPossibleMoves = function() {
			selected = false;
			selectedSquare.current = '';
			selectedSquare = null;
		    for (var i = 0; i < 8; i++) {
		   		for (var j = 0; j < 8; j++) {
			   		chessboard[i][j].possibleMove = '';
			   	}
		   	}
		};

		this.undo = function() {
			if(selected) {
				this.unselectAndClearPossibleMoves(chessboard);
			}
			var move = gamePlay.pop();
			if(move) {
				var movedPiece = pieceService.createPiece(move.movedPiece, move.from[0], move.from[1]);
				chessboard[move.from[1]][move.from[0]].piece = movedPiece;
				if(move.killedPiece != null) {
					var killedPiece = pieceService.createPiece(move.killedPiece, move.to[0], move.to[1]);	
					chessboard[move.to[1]][move.to[0]].piece = killedPiece;
				} else {
					chessboard[move.to[1]][move.to[0]].piece = null;
				}
			}
		}
	}]);