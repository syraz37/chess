angular.module('piece', [])
.service('pieceService', function pieceService() {


	var Pwan = function(id, x, y, color, init) {
		this.id = id;
		this.id = id;
		this.name = 'pwan';
		this.color = color;
		if(init) {
			this.initialPositionX = x;
			this.initialPositionY = y;
		}
		this.positionX = x;
		this.positionY = y;
		this.updatePosition = function(x, y) {
			this.positionX = x;
			this.positionY = y;
		};
		this.html = String.fromCharCode(0x265F -  (this.color == 'black' ? 0x0 : 0x6));
		this.getPossibleMoves = function(squares) {
			var moves = [];

			var dy = this.color == 'black' ? 1 : -1;
			
			if(this.color == 'black' && this.positionY == 1) {
				if(squares[3][this.positionX].piece == null)
					moves.push(this.positionX + ",3");
			}
			if(this.color == 'white' && this.positionY == 6) {
				if(squares[4][this.positionX].piece == null)
					moves.push(this.positionX + ",4");
			}

			if(squares[this.positionY + dy][this.positionX].piece == null) {
				moves.push(this.positionX + "," + (this.positionY + dy));
			}

			if(squares[this.positionY + dy][this.positionX - 1] && squares[this.positionY + dy][this.positionX - 1].piece && squares[this.positionY + dy][this.positionX - 1].piece.color != this.color) {
				moves.push((this.positionX - 1) + "," + (this.positionY + dy));
			}
			if(squares[this.positionY + dy][this.positionX + 1] && squares[this.positionY + dy][this.positionX + 1].piece && squares[this.positionY + dy][this.positionX + 1].piece.color != this.color) {
				moves.push((this.positionX + 1) + "," + (this.positionY + dy));
			}
			return moves;
		}
	};

	var Rook = function(id, x, y, color, init) {
		this.id = id;
		this.name = 'rook';
		this.color = color;
		this.isMoved = false;
		if(init) {
			this.initialPositionX = x;
			this.initialPositionY = y;
		}
		this.positionX = x;
		this.positionY = y;
		this.updatePosition = function(x, y) {
			this.positionX = x;
			this.positionY = y;
			this.isMoved = true;
		};
		this.html = String.fromCharCode(0x265C -  (color == 'black' ? 0x0 : 0x6));
		this.getPossibleMoves = function(squares) {
			return rookPossibleMoves(this, squares);
		}
	};

	var knight = function(id, x, y, color, init) {
		this.id = id;
		this.name = 'knight';
		this.color = color;
		if(init) {
			this.initialPositionX = x;
			this.initialPositionY = y;
		}
		this.positionX = x;
		this.positionY = y;
		this.updatePosition = function(x, y) {
			this.positionX = x;
			this.positionY = y;
		};
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

	var Bishop = function (id, x, y, color, init) {
		this.id = id;
		this.name = 'bishop';
		this.color = color;
		if(init) {
			this.initialPositionX = x;
			this.initialPositionY = y;
		}
		this.positionX = x;
		this.positionY = y;
		this.updatePosition = function(x, y) {
			this.positionX = x;
			this.positionY = y;
		};
		this.html = String.fromCharCode(0x265D - (color == 'black' ? 0x0 : 0x6));
		this.getPossibleMoves = function(squares) {
			return bishopPossibleMoves(this, squares);
		}
	};

	var Queen = function (id, x, y, color, init) {
		this.id = id;
		this.name = 'queen';
		this.color = color;
		if(init) {
			this.initialPositionX = x;
			this.initialPositionY = y;
		}
		this.positionX = x;
		this.positionY = y;
		this.updatePosition = function(x, y) {
			this.positionX = x;
			this.positionY = y;
		};
		this.html = String.fromCharCode(0x265B - (color == 'black' ? 0x0 : 0x6));
		this.getPossibleMoves = function(squares) {
			var moves1 = rookPossibleMoves(this, squares);
			var moves2 = bishopPossibleMoves(this, squares);
			return moves1.concat(moves2);
		}
	};

	var King = function (id, x, y, color, init) {
		this.id = id;
		this.name = 'king';
		this.color = color;
		this.isMoved = false;
		if(init) {
			this.initialPositionX = x;
			this.initialPositionY = y;
			this.isMoved = false;
		}
		this.positionX = x;
		this.positionY = y;
		this.updatePosition = function(x, y) {
			this.positionX = x;
			this.positionY = y;
			this.isMoved = true;
		};
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
		};
		this.isChecked = function (squares) {
			
			var piece = null;

			//check for pieces
			var dy = this.color == 'black' ? 1 : -1;
			if(squares[this.positionY + dy]) {
				square = squares[this.positionY + dy][this.positionX - 1];
				if(square && square.piece && square.piece.name == 'pwan' && square.piece.color != this.color)
					return true;
				square = squares[this.positionY + dy][this.positionX + 1];
				if(square && square.piece && square.piece.name == 'pwan' && square.piece.color != this.color)
					return true;
			}

			//check for knight
			for(var i = -2; i <=2; i++) {
				if(i == 0) continue;
				for(var j = 0; j < 2; j++) {
					var x = this.positionX + i;
					var y = this.positionY + (j == 0 ? (i%2 == 0 ? -1 : -2) : (i%2 == 0 ? 1 : 2));
					if(x < 8 && y < 8 && x >=0 && y >= 0) {
						if(squares[y][x].piece && squares[y][x].piece.name == 'knight' && squares[y][x].piece.color != this.color) {
							return true;
						}	
					}
				}
			}

			//check for bishop/queen
			for(var x = this.positionX + 1, y = this.positionY + 1; x < 8 && y < 8; x++, y++) {
				if(squares[y][x].piece && squares[y][x].piece.color == this.color)
					break;
				if(squares[y][x].piece && (squares[y][x].piece.name == 'queen' || squares[y][x].piece.name == 'bishop') && squares[y][x].piece.color != this.color) {
					return true;
				}
			}
			for(var x = this.positionX + 1, y = this.positionY - 1; x < 8 && y >= 0; x++, y--) {
				if(squares[y][x].piece && squares[y][x].piece.color == this.color)
					break;
				if(squares[y][x].piece && (squares[y][x].piece.name == 'queen' || squares[y][x].piece.name == 'bishop') && squares[y][x].piece.color != this.color) {
					return true;
				}
			}
			for(var x = this.positionX - 1, y = this.positionY + 1; x >= 0 && y < 8; x--, y++) {
				if(squares[y][x].piece && squares[y][x].piece.color == this.color)
					break;
				if(squares[y][x].piece && (squares[y][x].piece.name == 'queen' || squares[y][x].piece.name == 'bishop') && squares[y][x].piece.color != this.color) {
					return true;
				}
			}
			for(var x = this.positionX - 1, y = this.positionY - 1; x >= 0 && y >= 0; x--, y--) {
				if(squares[y][x].piece && squares[y][x].piece.color == this.color)
					break;
				if(squares[y][x].piece && (squares[y][x].piece.name == 'queen' || squares[y][x].piece.name == 'bishop') && squares[y][x].piece.color != this.color) {
					return true;
				}
			}

			//check for rook/queen
			for(var i = this.positionY + 1; i < 8; i++) {
				if(squares[i][this.positionX].piece && squares[i][this.positionX].piece.color == this.color)
					break;
				if(squares[i][this.positionX].piece && (squares[i][this.positionX].piece.name == 'queen' || squares[i][this.positionX].piece.name == 'rook') && squares[i][this.positionX].piece.color != this.color) {
					return true;
				}
			}
			for(var i = this.positionY - 1; i >= 0; i--) {
				if(squares[i][this.positionX].piece && squares[i][this.positionX].piece.color == this.color)
					break;
				if(squares[i][this.positionX].piece && (squares[i][this.positionX].piece.name == 'queen' || squares[i][this.positionX].piece.name == 'rook') && squares[i][this.positionX].piece.color != this.color) {
					return true;
				}
			}
			for(var i = this.positionX + 1; i < 8; i++) {
				if(squares[this.positionY][i].piece && squares[this.positionY][i].piece.color == this.color)
					break;
				if(squares[this.positionY][i].piece && (squares[this.positionY][i].piece.name == 'queen' || squares[this.positionY][i].piece.name == 'rook') && squares[this.positionY][i].piece.color != this.color) {
					return true;
				}
			}
			for(var i = this.positionX - 1; i >= 0; i--) {
				if(squares[this.positionY][i].piece && squares[this.positionY][i].piece.color == this.color)
					break;
				if(squares[this.positionY][i].piece && (squares[this.positionY][i].piece.name == 'queen' || squares[this.positionY][i].piece.name == 'rook') && squares[this.positionY][i].piece.color != this.color) {
					return true;
				}
			}

			//check for king
			for(var i = -1; i <= 1; i++) {
				for(var j = -1; j <= 1; j++) {
					if(i == 0 && j == 0) continue;
					var x = this.positionX + i;
					var y = this.positionY + j;
					if(x < 8 && y < 8 && x >=0 && y >= 0) {
						if(squares[y][x].piece && squares[y][x].piece.name == 'king' && squares[y][x].piece.color != this.color) {
							return true;
						}
					}
				}
			}

			return false;
		}
	};

	this.getAllPieces = function() {
		var pieces = {};
		// for (var i = 0; i < 8; i++) {
		// 	pieces['blackpwan' + i] = new Pwan('blackpwan' + i, i, 1, 'black', true);
		// 	pieces['whitepwan' + i] = new Pwan('whitepwan' + i, i, 6, 'white', true);
		// };
		var color = 'black';
		for (var j = 0; j < 8; j += 7) {
			for(var k = 0; k < 8; k += 7) {
				pieces[color+'rook'+k] = new Rook(color+'rook'+k, k-0, j, color, true);
				pieces[color+'knight'+k] = new knight(color+'knight'+k, k== 0 ? 1 : k-1, j, color, true);
				pieces[color+'bishop'+k] = new Bishop(color+'bishop'+k, k== 0 ? 2 : k-2, j, color, true);
			}
			pieces[color+'queen'] = new Queen(color+'queen', 3, j, color, true);
			pieces[color+'king'] = new King(color+'king', 4, j, color, true);
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
		var randNo = Math.floor((Math.random() * 1000) + 8);
		switch(type.name) {
			case 'pwan':
				return new Pwan(type.color+type.name+randNo, x, y, type.color);
			case 'rook':
				return new Rook(type.color+type.name+randNo, x, y, type.color);
			case 'knight':
				return new Knight(type.color+type.name+randNo, x, y, type.color);
			case 'bishop':
				return new Bishop(type.color+type.name+randNo, x, y, type.color);
			case 'queen':
				return new Queen(type.color+type.name+randNo, x, y, type.color);
			case 'king':
				return new King(type.color+type.name+randNo, x, y, type.color);
		}
	}

});