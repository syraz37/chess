angular.module('chessApp', [])
  .controller('ChessController', function() {
    var chess = this;
    chess.selected = false;
    chess.selectedSquare = null;
    chess.squares = getSquares();
    chess.pieces = getPieces();

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

	function getPieces() {
		var pieces = [];
		for (var i = 0; i < 8; i++) {
			pieces[i] = {
				name: 'pwan',
				color: 'black',
				initialPositionX: i,
				initialPositionY: 1,
				positionX: i,
				positionY: 1,
				html: '\u265F',
				getPossibleMoves: function() {
					var moves = [];
					if(this.positionY == 1) {
						moves.push(this.positionX + ",3");
					}
					moves.push(this.positionX + "," + (this.positionY + 1));
					// if(chess.squares[this.positionY - 1][this.positionX - 1].piece.color == 'white') {
					// 	moves.push()
					// }
					return moves;
				}
			}
			pieces[i+8] = {
				name: 'pwan',
				color: 'white',
				initialPositionX: i,
				initialPositionY: 6,
				positionX: i,
				positionY: 6,
				html: '\u2659',
				getPossibleMoves: function() {
					var moves = [];
					if(this.positionY == 6) {
						if(chess.squares[4][this.positionX].piece == null)
							moves.push(this.positionX + ",4");
					}
					if(chess.squares[this.positionY - 1][this.positionX].piece == null)
						moves.push(this.positionX + "," + (this.positionY - 1));

					if(chess.squares[this.positionY - 1][this.positionX - 1] && chess.squares[this.positionY - 1][this.positionX - 1].piece && chess.squares[this.positionY - 1][this.positionX - 1].piece.color == 'black') {
						moves.push((this.positionX - 1) + "," + (this.positionY - 1));
					}
					if(chess.squares[this.positionY - 1][this.positionX + 1] && chess.squares[this.positionY - 1][this.positionX + 1].piece && chess.squares[this.positionY - 1][this.positionX + 1].piece.color == 'black') {
						moves.push((this.positionX + 1) + "," + (this.positionY - 1));
					}
					return moves;
				}
			}
		};
		i = 16;
		var color = 'black';
		for (var j = 0; j < 8; j += 7) {
			htmlCodeDiff = j == 0 ? 0x0 : 0x6;
			for(var k = 0; k < 8; k += 7) {
				pieces[i++] = {
					name: 'rook',
					color: color,
					initialPositionX: k-0,
					initialPositionY: j,
					html: String.fromCharCode(0x265C - htmlCodeDiff)
				}
				pieces[i++] = {
					name: 'knight',
					color: color,
					initialPositionX: k== 0 ? 1 : k-1,
					initialPositionY: j,
					html: String.fromCharCode(0x265E - htmlCodeDiff)
				}
				pieces[i++] = {
					name: 'bishop',
					color: color,
					initialPositionX: k== 0 ? 2 : k-2,
					initialPositionY: j,
					html: String.fromCharCode(0x265D - htmlCodeDiff)
				}
			}
			pieces[i++] = {
				name: 'queen',
				color: color,
				initialPositionX: 3,
				initialPositionY: j,
				html: String.fromCharCode(0x265B - htmlCodeDiff)
			}
			pieces[i++] = {
				name: 'king',
				color: color,
				initialPositionX: 4,
				initialPositionY: j,
				html: String.fromCharCode(0x265B - htmlCodeDiff)
			}
			color = 'white';
		};
		return pieces;
	}

	chess.action = function(square) {
		if(!chess.selected) {
			if(square.piece) {
				showPossibleMoves(square);
				chess.selected = true;
				chess.selectedSquare = square;
			}			
		} else {
			var possibleMoves = chess.selectedSquare.piece.getPossibleMoves();
			angular.forEach(possibleMoves, function(move) {
				if(square.position == move) {

					var from = chess.selectedSquare.position.split(',');
					var to = square.position.split(',');
					chess.selectedSquare.piece.positionX = parseInt(to[0], 10);
					chess.selectedSquare.piece.positionY = parseInt(to[1], 10);
					chess.squares[to[1]][to[0]].piece = chess.selectedSquare.piece;
					chess.squares[from[1]][from[0]].piece = null;
					console.log(chess.pieces.length);
				}			
			});
			chess.selected = false;
			chess.selectedSquare.current = '';
			chess.selectedSquare = null;
			clearPossibleMoves();
		}
	}

	showPossibleMoves = function(square) {
		var possibleMoves = square.piece.getPossibleMoves();
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

});