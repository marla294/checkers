import { Injectable }     from '@angular/core';
import { Piece, Pawn }	  from './piece';
import { CheckerBoard }	  from './checkerBoard';

@Injectable()
export class GameService {
	public board: any;

	constructor() {
		  this.resetGame();
	}

  // Resets game back to beginning
  resetGame() {
      this.board = new CheckerBoard().board;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 8; j++) {
          if (this.board[i][j].playable === true) {
            this.board[i][j].piece = new Pawn('red', i, j);
          }
        }
      }
      for (let i = 5; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          if (this.board[i][j].playable === true) {
            this.board[i][j].piece = new Pawn('black', i, j);
          }
        }
      }
  }

	// Clear the selected flag from the piece arrays so no piece is selected
	clearSelectedPiece() {
    this.board.forEach(row => 
          row.forEach(space => { 
              if (space.piece !== null) 
                space.piece.selected = false 
              } 
          )
      );
	}

	// Clear all pieces out of squares on board
  	clearPiecesBoard() {
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
