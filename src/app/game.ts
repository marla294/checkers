import { Piece, Pawn }	from './piece';
import { CheckerBoard }	from './checkerBoard';

export class Game {
	public board: any;
	public redPieces = new Array();
	public blackPieces = new Array();

	constructor() {
		this.board = new CheckerBoard().board;
		var id = 1;
  		for (var i = 0; i < 3; i++) {
  			for (var j = 0; j < 8; j++) {
  				if (this.board[i][j].playable == true) {
  					this.redPieces.push(new Pawn(id, 'red', false, true, i, j));
  					id++;
  				}
  			}
  		}
  		for (var i = 5; i < 8; i++) {
  			for (var j = 0; j < 8; j++) {
  				if (this.board[i][j].playable == true) {
  					this.blackPieces.push(new Pawn(id, 'black', false, true, i, j));
  					id++;
  				}
  			}
  		}
	}

	// Places red and black pieces on the game board
  	placePieces() {
  		this.clearPieces();
  		this.redPieces.forEach(piece => {
	  			this.board[piece.row][piece.col].piece = piece;
	  			this.board[piece.row][piece.col].isEmpty = false;
	  		}
  		);
  		this.blackPieces.forEach(piece => {
	  			this.board[piece.row][piece.col].piece = piece;
	  			this.board[piece.row][piece.col].isEmpty = false;
	  		}
  		);
  	}

	// Clear the selected piece from the piece arrays
	clearSelectedPiece() {
		this.redPieces.forEach(piece => piece.selected = false);
		this.blackPieces.forEach(piece => piece.selected = false);
	}

	// Clear all pieces out of squares on board
  	clearPieces() {
  		this.board.forEach(row => row.forEach(space => space.piece = null));
  	}

  	// Clicking a piece on the board causes (only) that piece to be selected
  	selectAPiece(p: Piece) {
  		this.clearSelectedPiece();
  		if (p != null ) {
  			p.selected = true;
  		}
  	}
}