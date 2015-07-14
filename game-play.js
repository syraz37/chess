angular.module('game-play', ['piece'])
.service('playService', ['pieceService', function playService(pieceService) {

	var chessboard = [];
	var turn =  {color: 'white'};
	var selected = false;
	var selectedSquare = null;
	var possibleMoves = [];
	var gamePlay = [];
	var pieces = null;

    this.getChessBoard = function () {
	    var squareColor = 1;
	    for (var i = 0; i < 8; i++) {
	   		chessboard[i] = [];
	   		for (var j = 0; j < 8; j++) {
		   		chessboard[i][j] = {
		   			color: squareColor == 1 ? 'white' : 'black', 
		   			piece : null, 
		   			possibleMove: '', 
		   			current: '', 
		   			position: {x: j, y: i}
		   		};
		   		squareColor = squareColor == 1 ? 0 : 1;
		   	}
		   	squareColor = squareColor == 1 ? 0 : 1;
	   	}

   	    pieces = pieceService.getAllPieces();

	    angular.forEach(pieces, function(piece) {
	        chessboard[piece.initialPositionY][piece.initialPositionX].piece = piece;
	    });

	   	return chessboard;
	};

	this.validTurn = function(color) {
		return turn.color == color;
	};

	this.move = function(square) {
		angular.forEach(possibleMoves, function(move) {
			if(square.position.x+','+square.position.y == move) {

				movePiece(selectedSquare, square);
				changeTurn();
			}			
		});
	};

	function movePiece(fromSquare, toSquare) {
		var from = fromSquare.position;
		var to = toSquare.position;
		fromSquare.piece.updatePosition(to.x, to.y);
		var killedPiece = chessboard[to.y][to.x].piece ? chessboard[to.y][to.x].piece.id : null;
		var movedPiece = fromSquare.piece.id;
		toSquare.piece = fromSquare.piece;
		fromSquare.piece = null;
		gamePlay.push({
			movedPiece: movedPiece,
			from: from,
			to: to,
			killedPiece: killedPiece
		});
	}

	this.isSelected = function() {
		return selected;
	};

	this.selectAndShowPossibleMoves = function(square) {
		possibleMoves = square.piece.getPossibleMoves(chessboard);
		selected = true;
		selectedSquare = square;
		removeCheckMoves();
		square.current = 'current';
		angular.forEach(possibleMoves, function(move) {
			var positions = move.split(',');
			chessboard[positions[1]][positions[0]].possibleMove = 'possibleMove';
		});
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
			this.unselectAndClearPossibleMoves();
		}
		var move = gamePlay.pop();
		if(move) {
			unmovePiece(move);	
			changeTurn();
		}
	};

	function unmovePiece(move) {
		pieces[move.movedPiece].updatePosition(move.from.x, move.from.y);
		chessboard[move.from.y][move.from.x].piece = pieces[move.movedPiece];
		if(move.killedPiece != null) {
			chessboard[move.to.y][move.to.x].piece = pieces[move.killedPiece];
		} else {
			chessboard[move.to.y][move.to.x].piece = null;
		}
	}

	this.getTurn = function () {
		return turn;
	}

	function changeTurn() {
		turn.color = turn.color == 'white' ? 'black' : 'white';
	}

	function isChecked() {
		if(turn.color == 'black') {
			return pieces['blackking'].isChecked(chessboard);
		} else {
			return pieces['whiteking'].isChecked(chessboard);
		}
	};

	function removeCheckMoves() {
		
		var revisedPossibleMoves = [];
		var undoFx = this.undo;
		angular.forEach(possibleMoves, function(move) {
			var pos = move.split(',');
			movePiece(selectedSquare, chessboard[pos[1]][pos[0]]);
			if(!isChecked()) {
				revisedPossibleMoves.push(move);
			}
			unmovePiece(gamePlay.pop());
		});
		possibleMoves = revisedPossibleMoves;
	};
}]);

//casling, pawn upgrade