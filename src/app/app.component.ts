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

  	ngOnInit() {
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
  	// it sets the Selected flag to true on that piece, and highlights
  	// the piece that is selected and the cells that are open.
  	checkIfMove(sp: Space) {
  		if (sp.piece.color === "red") {
  			if ((sp.col !== 7) && (sp.col !== 0)) {
  				if (this.board[sp.row + 1][sp.col + 1].isEmpty === true || this.board[sp.row + 1][sp.col - 1].isEmpty === true) {
  						this.selectMoveablePiece(sp);
  						if (this.board[sp.row + 1][sp.col + 1].isEmpty === true) {
  							this.board[sp.row + 1][sp.col + 1].highlight = true;
  						} 
  						if (this.board[sp.row + 1][sp.col - 1].isEmpty === true) {
  							this.board[sp.row + 1][sp.col - 1].highlight = true;
  						}
  				} else {
  						this.clearBoardSelections();
  				}
  			} if (sp.col == 0) {
  				if (this.board[sp.row + 1][sp.col + 1].isEmpty === true) {
  						this.selectMoveablePiece(sp);
  						this.board[sp.row + 1][sp.col + 1].highlight = true;
  				} else {
  						this.clearBoardSelections();
  				}
  			} if (sp.col == 7) {
  				if (this.board[sp.row + 1][sp.col - 1].isEmpty === true) {
  						this.selectMoveablePiece(sp);
  						this.board[sp.row + 1][sp.col + 1].highlight = true;
  				} else {
  						this.clearBoardSelections();
  				}
  			}
  			console.log(this.returnSelected());
  		}
  		
  	}

  	movePiece(sp:Space) {

  	}


  	// Helpers

  	// Select a moveable piece
  	selectMoveablePiece(sp: Space) {
  		this.clearBoardSelections();
  		sp.piece.selected = true;
  		sp.highlight = true;
  	}

  	// Clear board
  	clearBoardSelections() {
  		this.clearHighlights();
  		this.clearSelected();
  	}

  	// Clears space highlights for potential moves
  	clearHighlights() {
  		this.board.map(row => row.map(space => space.highlight = false));
  	}

  	// Clears piece selections for potential moves
  	clearSelected() {
  		this.board.map(row => row.map(space => {
  				if (space.playable && !space.isEmpty) {
  					space.piece.selected = false;
  				}
	  		}
  		));
  	}

  	//find the selected piece
  	returnSelected() {
  		this.board.map(row => row.map(space => {
  				if (space.playable && !space.isEmpty) {
  					if (space.piece.selected == true) {
  						return "hi";
  					}
  				}
  				return "no";
	  		}
  		));
  	}

}
