import { Component } 	from '@angular/core';
import { OnInit } 		from '@angular/core';
import { Space }	 	from './space';
import { Piece }	 	from './piece';
import { Game }	 		from './game';
import { CheckerBoard }	from './checkerBoard';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  	public board: any;
  	private game = new Game();
  	private selected: Piece;
  	private jumpPiece: Piece;

  	ngOnInit() {
  		this.board = new CheckerBoard().board;
  		this.resetBoard();
  	}

  	// Initializing the board
  	resetBoard() {
  		// Putting pieces on board
  		var id = 1;
  		for (var i = 0; i < 3; i++) {
  			for (var j = 0; j < 8; j++) {
  				if (this.board[i][j].playable == true) {
  					this.board[i][j].piece = new Piece(id, 'red', false, true, i, j);
  					this.board[i][j].isEmpty = false;
  					id++;
  				}
  			}
  		}
  		for (var i = 5; i < 8; i++) {
  			for (var j = 0; j < 8; j++) {
  				if (this.board[i][j].playable == true) {
  					this.board[i][j].piece = new Piece(id, 'black', false, true, i, j);
  					this.board[i][j].isEmpty = false;
  					id++;
  				}
  			}
  		}
  	}

  	// Check if a piece can move forward
  	// If a piece is selected, and if it has a way to move forward, 
  	// it sets the game's selected piece, and highlights
  	// the piece that is selected and the cells that are open.
  	checkIfMove(sp: Space) {
  		/* Local Variables */
  		// Spaces the checkers could potentially move to
  		let R: Space = null; //Right
  		let L: Space = null; //Left
  		let DR: Space = null; //Diagonal Right
  		let DL: Space = null; //Diagonal Left
  		// Row variables we need to make spaces ambiguous of red or black
  		let row: number; //1 row up
  		let dRow: number; //2 rows up
  		// Flag for cannot move since we got all these damn if statements
  		let cannotMove = true; 
  		
  		/* Setting rows based on color */
  		if (sp.piece.isRed === true) {
  			row = sp.row + 1;
  			dRow = sp.row + 2;
  		} else if (sp.piece.isRed === false) {
  			row = sp.row - 1;
  			dRow = sp.row - 2;
  		}

  		/* Loading spaces to move to */
  		// If the spaces would be located off the board, they will be set
  		// to null, and that'll let the rest of the function know not to
  		// let the piece move there.
  		if (row >= 0 && row <= 7) {
			if (sp.col == 6) { 
				R = this.board[row][sp.col + 1];
			} else if (sp.col < 6) { 
				R = this.board[row][sp.col + 1];
				DR = ((row == 7 || row == 0) ? null : this.board[dRow][sp.col + 2]);
			}
			if (sp.col == 1) {
				L = this.board[row][sp.col - 1];
			} else if (sp.col > 1) {
				L = this.board[row][sp.col - 1];
				DL = ((row == 7 || row == 0) ? null : this.board[dRow][sp.col - 2]);
			}
		}

		/* Checking whether the checkers can move */
  		this.clearBoardSelections();
  		if (R != null && 
  			R.isEmpty === true) {
				this.selectMoveablePiece(sp);
				R.highlight = R.moveTo = true;
				cannotMove = false;
		} else if (DR != null && 
			DR.isEmpty === true && 
			sp.piece.isRed === !R.piece.isRed) {
				this.selectMoveablePiece(sp);
				DR.highlight = DR.moveTo = DR.jump = true;
				this.jumpPiece = R.piece;
				cannotMove = false;
		}
		if (L != null && 
			L.isEmpty === true) {
				this.selectMoveablePiece(sp);
				L.highlight = L.moveTo = true;
				cannotMove = false;
		} else if (DL != null && 
			DL.isEmpty === true &&
			sp.piece.isRed === !L.piece.isRed) {
				this.selectMoveablePiece(sp);
				DL.highlight = DL.moveTo = DL.jump = true;
				this.jumpPiece = L.piece;
				cannotMove = false;
		}
		if (cannotMove) {
				this.clearBoardSelections();
		}
  		
  	}

  	// If a piece to move has been selected, and the user selects a valid empty
  	// square, then the piece will move to the empty square
  	movePiece(sp:Space) {
  		if (this.selected !== null && 
  			sp.moveTo == true) {
	  			this.clearSpaceForMove();
	  			sp.piece = this.selected;
	  			sp.isEmpty = false;
	  			if (sp.jump == true) {
	  				this.removePiece(this.jumpPiece);
	  				sp.jump = false;
	  			}
	  			this.clearBoardSelections();
  		}
  	}

  	// If a piece gets jumped, removed it from the game
  	removePiece(p: Piece) {
  		this.board.map(row => row.map(space => {
  			if (space.piece != null && space.piece.id == p.id) {
  				space.piece = null;
  				space.isEmpty = true;
  				p.inPlay = false;
  			}
  		}
  		));
  	}


  	// Helpers

  	// Select a moveable piece
  	selectMoveablePiece(sp: Space) {
  		this.selected = sp.piece;
  		sp.highlight = true;
  	}

  	// Clear board
  	clearBoardSelections() {
  		this.clearHighlights();
  		this.clearMoveTo();
  		this.selected = null;
  	}

  	// Clears space highlights for potential moves
  	clearHighlights() {
  		this.board.map(row => row.map(space => space.highlight = false));
  	}

  	// Clears space "moveTo" flag
  	clearMoveTo() {
  		this.board.map(row => row.map(space => space.moveTo = false));
  	}

  	//find the selected piece and clear it for move
  	clearSpaceForMove() {
  		this.board.map(row => row.map(space => {
  				if (space.playable && !space.isEmpty) {
  					if (space.piece === this.selected) {
  						space.piece = null;
  						space.isEmpty = true;
  					}
  				}
	  		}
  		));
  	}

}
