import { Component } 	from '@angular/core';
import { OnInit } 		from '@angular/core';
import { Space }	 	from './space';
import { Piece }	 	from './piece';
import { Game }	 		from './game';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  	public board = new Array();
  	private game = new Game();
  	private selected: Piece;

  	ngOnInit() {
  		this.resetBoard();
  	}

  	// Initializing the board
  	resetBoard() {
  		// Setting up board spaces
  		for (var i = 0; i < 8; i = i+2) {
  			let rowEven = new Array();
  			let rowOdd = new Array();
  			for (var j = 0; j < 8; j = j+2) {
  				rowEven[j] = new Space(i, j, true);
  				rowEven[j+1] = new Space(i, j+1, false);
  			}
  			for (var j = 0; j < 8; j = j+2) {
  				rowOdd[j] = new Space(i+1, j, false);
  				rowOdd[j+1] = new Space(i+1, j+1, true);
  			}
  			this.board[i] = rowEven;
  			this.board[i+1] = rowOdd;
  		}

  		// Putting pieces on board
  		var id = 1;
  		for (var i = 0; i < 3; i++) {
  			for (var j = 0; j < 8; j++) {
  				if (this.board[i][j].playable == true) {
  					this.board[i][j].piece = new Piece(id, 'red', false, true);
  					this.board[i][j].isEmpty = false;
  					id++;
  				}
  			}
  		}
  		for (var i = 5; i < 8; i++) {
  			for (var j = 0; j < 8; j++) {
  				if (this.board[i][j].playable == true) {
  					this.board[i][j].piece = new Piece(id, 'black', false, true);
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
  		let R: Space = null; //Right
  		let L: Space = null; //Left
  		let DR: Space = null; //Diagonal Right
  		let DL: Space = null; //Diagonal Left
  		let cannotMove = true;
  		if (sp.piece.color === "red") {
	  		R = this.board[sp.row + 1][sp.col + 1]; 
	  		L = this.board[sp.row + 1][sp.col - 1]; 
	  		DR = this.board[sp.row + 2][sp.col + 2]; 
	  		DL = this.board[sp.row + 2][sp.col - 2]; 
  		} 
  		if (sp.piece.color === "black") {
	  		R = this.board[sp.row - 1][sp.col + 1]; 
	  		L = this.board[sp.row - 1][sp.col - 1]; 
	  		DR = this.board[sp.row - 2][sp.col + 2]; 
	  		DL = this.board[sp.row - 2][sp.col - 2]; 
  		} 
  			this.clearBoardSelections();
  			if ((sp.col < 6) && (sp.col > 1)) {
  				if (R.isEmpty === true) {
  					this.selectMoveablePiece(sp);
  					R.highlight = R.moveTo = true;
  					cannotMove = false;
  				} else if (DR.isEmpty === true) {
  					this.selectMoveablePiece(sp);
  					DR.highlight = DR.moveTo = true;
  					cannotMove = false;
  				}

  				if (L.isEmpty === true) {
  					this.selectMoveablePiece(sp);
  					L.highlight = L.moveTo = true;
  					cannotMove = false;
  				} else if (DL.isEmpty === true) {
  					this.selectMoveablePiece(sp);
  					DL.highlight = DL.moveTo = true;
  					cannotMove = false;
  				}

  				if (cannotMove) {
  					this.clearBoardSelections();
  				}
  			} 

  			if (sp.col == 0) {
  				if (R.isEmpty === true) {
					this.selectMoveablePiece(sp);
					R.highlight = R.moveTo = true;
  				} else if (DR.isEmpty === true) {
  					this.selectMoveablePiece(sp);
  					DR.highlight = DR.moveTo = true;
  				} else {
  					this.clearBoardSelections();
  				}
  			} 

  			if (sp.col == 1) {
  				if (R.isEmpty === true) {
  					this.selectMoveablePiece(sp);
  					R.highlight = R.moveTo = true;
  					cannotMove = false;
  				} else if (DR.isEmpty === true) {
  					this.selectMoveablePiece(sp);
  					DR.highlight = DR.moveTo = true;
  					cannotMove = false;
  				}

  				if (L.isEmpty === true) {
  					this.selectMoveablePiece(sp);
					L.highlight = L.moveTo = true;
					cannotMove = false;
  				}

  				if (cannotMove) {
  					this.clearBoardSelections();
  				}
  			}

  			if (sp.col == 6) {
  				if (L.isEmpty === true) {
  					this.selectMoveablePiece(sp);
  					L.highlight = L.moveTo = true;
  					cannotMove = false;
  				} else if (DL.isEmpty === true) {
  					this.selectMoveablePiece(sp);
  					DL.highlight = DL.moveTo = true;
  					cannotMove = false;
  				}

  				if (R.isEmpty === true) {
  					this.selectMoveablePiece(sp);
					R.highlight = R.moveTo = true;
					cannotMove = false;
  				}

  				if (cannotMove) {
  					this.clearBoardSelections();
  				}
  			}

  			if (sp.col == 7) {
  				if (L.isEmpty === true) {
					this.selectMoveablePiece(sp);
					L.highlight = L.moveTo = true;
  				} else if (DL.isEmpty === true) {
  					this.selectMoveablePiece(sp);
  					DL.highlight = DL.moveTo = true;
  				} else {
					this.clearBoardSelections();
  				}
  			}
  	}

  	// If a piece to move has been selected, and the user selects a valid empty
  	// square, then the piece will move to the empty square
  	movePiece(sp:Space) {
  		if (this.selected !== null && sp.moveTo == true) {
  			this.clearSpaceForMove();
  			sp.piece = this.selected;
  			sp.isEmpty = false;
  			this.clearBoardSelections();
  		}
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
