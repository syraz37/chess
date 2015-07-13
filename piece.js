angular.module('piece', [])
	.service('pieceService', function pieceService() {


		var BlackPwan = function(x, y, init) {

			this.name = 'pwan';
			this.color = 'black';
			if(init) {
				this.initialPositionX = x;
				this.initialPositionY = y;
			}
			this.positionX = x;
			this.positionY = y;
			this.html = '\u265F';
			this.getPossibleMoves = function(squares) {
				var moves = [];
				if(this.positionY == 1) {
					if(squares[3][this.positionX].piece == null)
						moves.push(this.positionX + ",3");
				}
				if(squares[this.positionY + 1][this.positionX].piece == null)
					moves.push(this.positionX + "," + (this.positionY + 1));
				
				if(squares[this.positionY + 1][this.positionX - 1] && squares[this.positionY + 1][this.positionX - 1].piece && squares[this.positionY + 1][this.positionX - 1].piece.color == 'white') {
					moves.push((this.positionX - 1) + "," + (this.positionY + 1));
				}
				if(squares[this.positionY + 1][this.positionX + 1] && squares[this.positionY + 1][this.positionX + 1].piece && squares[this.positionY + 1][this.positionX + 1].piece.color == 'white') {
					moves.push((this.positionX + 1) + "," + (this.positionY + 1));
				}
				return moves;
			}
		};

		var WhitePwan = function(x, y, init) {
			this.name = 'pwan';
			this.color = 'white';
			if(init) {
				this.initialPositionX = x;
				this.initialPositionY = y;
			}
			this.positionX = x;
			this.positionY = y;
			this.html = '\u2659';
			this.getPossibleMoves = function(squares) {
				var moves = [];
				if(this.positionY == 6) {
					if(squares[4][this.positionX].piece == null)
						moves.push(this.positionX + ",4");
				}
				if(squares[this.positionY - 1][this.positionX].piece == null)
					moves.push(this.positionX + "," + (this.positionY - 1));

				if(squares[this.positionY - 1][this.positionX - 1] && squares[this.positionY - 1][this.positionX - 1].piece && squares[this.positionY - 1][this.positionX - 1].piece.color == 'black') {
					moves.push((this.positionX - 1) + "," + (this.positionY - 1));
				}
				if(squares[this.positionY - 1][this.positionX + 1] && squares[this.positionY - 1][this.positionX + 1].piece && squares[this.positionY - 1][this.positionX + 1].piece.color == 'black') {
					moves.push((this.positionX + 1) + "," + (this.positionY - 1));
				}
				return moves;
			}
		};

		var Rook = function(x, y, color, init) {
			this.name = 'rook';
			this.color = color;
			if(init) {
				this.initialPositionX = x;
				this.initialPositionY = y;
			}
			this.positionX = x;
			this.positionY = y;
			this.html = String.fromCharCode(0x265C -  (color == 'black' ? 0x0 : 0x6));
			this.getPossibleMoves = function(squares) {
				return rookPossibleMoves(this, squares);
			}
		};

		var knight = function(x, y, color, init) {
			this.name = 'knight';
			this.color = color;
			if(init) {
				this.initialPositionX = x;
				this.initialPositionY = y;
			}
			this.positionX = x;
			this.positionY = y;
			this.html = String.fromCharCode(0x265E - (color == 'black' ? 0x0 : 0x6));
			this.getPossibleMoves = function(squares) {
				var moves = [];
				for(var i = -2; i <=2; i++) {
					if(i == 0) continue;

					for(var j = 0; j < 2; j++) {
						var x = this.positionX + i;
						var y = this.positionY + (j == 0 ? (i%2 == 0 ? -1 : -2) : (i%2 == 0 ? 1 : 2));
						if(x < 8 && y < 8 && x >=0 && y >= 0) {
							if(squares[y][x].piece == null || squares[y][x].piece.color != this.color) {
								moves.push(x + "," + y);
							}	
						}
					}
				}
				return moves;
			}
		};

		var Bishop = function (x, y, color, init) {
			this.name = 'bishop';
			this.color = color;
			if(init) {
				this.initialPositionX = x;
				this.initialPositionY = y;
			}
			this.positionX = x;
			this.positionY = y;
			this.html = String.fromCharCode(0x265D - (color == 'black' ? 0x0 : 0x6));
			this.getPossibleMoves = function(squares) {
				return bishopPossibleMoves(this, squares);
			}
		};

		var Queen = function (x, y, color, init) {
			this.name = 'queen';
			this.color = color;
			if(init) {
				this.initialPositionX = x;
				this.initialPositionY = y;
			}
			this.positionX = x;
			this.positionY = y;
			this.html = String.fromCharCode(0x265B - (color == 'black' ? 0x0 : 0x6));
			this.getPossibleMoves = function(squares) {
				var moves1 = rookPossibleMoves(this, squares);
				var moves2 = bishopPossibleMoves(this, squares);
				return moves1.concat(moves2);
			}
		};

		var King = function (x, y, color, init) {
			this.name = 'king';
			this.color = color;
			if(init) {
				this.initialPositionX = x;
				this.initialPositionY = y;
			}
			this.positionX = x;
			this.positionY = y;
			this.html = String.fromCharCode(0x265A - (color == 'black' ? 0x0 : 0x6));
			this.getPossibleMoves = function(squares) {
				var moves = [];
				for(var i = -1; i <= 1; i++) {
					for(var j = -1; j <= 1; j++) {
						if(i == 0 && j == 0) continue;
						var x = this.positionX + i;
						var y = this.positionY + j;
						if(x < 8 && y < 8 && x >=0 && y >= 0) {
							if(squares[y][x].piece == null || squares[y][x].piece.color != this.color) {
								moves.push(x + "," + y);
							}	
						}
					}
				}
				return moves;
			}
		};

		this.getAllPieces = function() {
			var pieces = [];
			for (var i = 0; i < 8; i++) {
				pieces[i] = new BlackPwan(i, 1, true);
				pieces[i+8] = new WhitePwan(i, 6, true);
			};
			i = 16;
			var color = 'black';
			for (var j = 0; j < 8; j += 7) {
				for(var k = 0; k < 8; k += 7) {
					pieces[i++] = new Rook(k-0, j, color, true);
					pieces[i++] = new knight(k== 0 ? 1 : k-1, j, color, true);
					pieces[i++] = new Bishop(k== 0 ? 2 : k-2, j, color, true);
				}
				pieces[i++] = new Queen(3, j, color, true);
				pieces[i++] = new King(4, j, color, true);
				color = 'white';
			};
			return pieces;
		}

		function rookPossibleMoves(piece, squares) {
			var moves = [];
			for(var i = piece.positionY + 1; i < 8; i++) {
				if(squares[i][piece.positionX].piece == null) {
					moves.push(piece.positionX + "," + i);
				} else if(squares[i][piece.positionX].piece.color == piece.color) {
					break;
				} else {
					moves.push(piece.positionX + "," + i);
					break;
				}
			}
			for(var i = piece.positionY - 1; i >= 0; i--) {
				if(squares[i][piece.positionX].piece == null) {
					moves.push(piece.positionX + "," + i);
				} else if(squares[i][piece.positionX].piece.color == piece.color) {
					break;
				} else {
					moves.push(piece.positionX + "," + i);
					break;
				}
			}
			for(var i = piece.positionX + 1; i < 8; i++) {
				if(squares[piece.positionY][i].piece == null) {
					moves.push(i + "," + piece.positionY);
				} else if(squares[piece.positionY][i].piece.color == piece.color) {
					break;
				} else {
					moves.push(i + "," + piece.positionY);
					break;
				}
			}
			for(var i = piece.positionX - 1; i >= 0; i--) {
				if(squares[piece.positionY][i].piece == null) {
					moves.push(i + "," + piece.positionY);
				} else if(squares[piece.positionY][i].piece.color == piece.color) {
					break;
				} else {
					moves.push(i + "," + piece.positionY);
					break;
				}
			}
			return moves;
		}

		function bishopPossibleMoves(piece, squares) {
			var moves = [];
			for(var x = piece.positionX + 1, y = piece.positionY + 1; x < 8 && y < 8; x++, y++) {
				if(squares[y][x].piece == null) {
					moves.push(x + "," + y);
				} else if(squares[y][x].piece.color == piece.color) {
					break;
				} else {
					moves.push(x + "," + y);
					break;
				}
			}
			for(var x = piece.positionX + 1, y = piece.positionY - 1; x < 8 && y >= 0; x++, y--) {
				if(squares[y][x].piece == null) {
					moves.push(x + "," + y);
				} else if(squares[y][x].piece.color == piece.color) {
					break;
				} else {
					moves.push(x + "," + y);
					break;
				}
			}
			for(var x = piece.positionX - 1, y = piece.positionY + 1; x >= 0 && y < 8; x--, y++) {
				if(squares[y][x].piece == null) {
					moves.push(x + "," + y);
				} else if(squares[y][x].piece.color == piece.color) {
					break;
				} else {
					moves.push(x + "," + y);
					break;
				}
			}
			for(var x = piece.positionX - 1, y = piece.positionY - 1; x >= 0 && y >= 0; x--, y--) {
				if(squares[y][x].piece == null) {
					moves.push(x + "," + y);
				} else if(squares[y][x].piece.color == piece.color) {
					break;
				} else {
					moves.push(x + "," + y);
					break;
				}
			}
			return moves;
		}

		this.createPiece = function(type, x, y) {
			switch(type.name) {
				case 'pwan':
					return type.color == 'black' ? new BlackPwan(x, y) : new WhitePwan(x, y);
				case 'rook':
					return new Rook(x, y, type.color);
				case 'knight':
					return new Knight(x, y, type.color);
				case 'bishop':
					return new Bishop(x, y, type.color);
				case 'queen':
					return new Queen(x, y, type.color);
				case 'king':
					return new King(x, y, type.color);
			}
		}
	});