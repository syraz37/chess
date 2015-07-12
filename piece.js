angular.module('piece', [])
	.factory('pieces', function piecesFactory() {
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
				getPossibleMoves: function(squares) {
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
			}
			pieces[i+8] = {
				name: 'pwan',
				color: 'white',
				initialPositionX: i,
				initialPositionY: 6,
				positionX: i,
				positionY: 6,
				html: '\u2659',
				getPossibleMoves: function(squares) {
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
					positionX: k-0,
					positionY: j,
					html: String.fromCharCode(0x265C - htmlCodeDiff),
					getPossibleMoves: function(squares) {
						return rookPossibleMoves(this, squares);
					}
				}
				pieces[i++] = {
					name: 'knight',
					color: color,
					initialPositionX: k== 0 ? 1 : k-1,
					initialPositionY: j,
					positionX: k== 0 ? 1 : k-1,
					positionY: j,
					html: String.fromCharCode(0x265E - htmlCodeDiff),
					getPossibleMoves: function(squares) {
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
				pieces[i++] = {
					name: 'bishop',
					color: color,
					initialPositionX: k== 0 ? 2 : k-2,
					initialPositionY: j,
					positionX: k== 0 ? 2 : k-2,
					positionY: j,
					html: String.fromCharCode(0x265D - htmlCodeDiff),
					getPossibleMoves: function(squares) {
						return bishopPossibleMoves(this, squares);
					}
				};
			}
			pieces[i++] = {
				name: 'queen',
				color: color,
				initialPositionX: 3,
				initialPositionY: j,
				positionX: 3,
				positionY: j,
				html: String.fromCharCode(0x265B - htmlCodeDiff),
				getPossibleMoves: function(squares) {
					var moves = [];
					var moves1 = rookPossibleMoves(this, squares);
					var moves2 = bishopPossibleMoves(this, squares);
					moves = moves1.concat(moves2);
					return moves;
				}
			}
			pieces[i++] = {
				name: 'king',
				color: color,
				initialPositionX: 4,
				initialPositionY: j,
				positionX: 4,
				positionY: j,
				html: String.fromCharCode(0x265A - htmlCodeDiff),
				getPossibleMoves: function(squares) {
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
			}
			color = 'white';
		};

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

		return pieces;
	});