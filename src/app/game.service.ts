import { Injectable }     from '@angular/core';
import { Piece, Pawn }	  from './piece';
import { Space }          from './space';
import { CheckerBoard }	  from './checkerBoard';
import { Coord }          from './coord';

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
                  this.board[i][j].addPiece(new Pawn('red', i, j));
                }
            }
        }
        for (let i = 5; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (this.board[i][j].playable === true) {
                    this.board[i][j].addPiece(new Pawn('black', i, j));
                }
            }
        }
    }

    // Click on a piece on the board
    clickAPiece(p: Pawn) {
        this.clearSelections();
        this.selectAPiece(p);
        this.selectMoveableSpaces(p);
    }

    // Highlights and sets moveTo flag on the spaces a pawn could move to
    selectMoveableSpaces(p: Pawn) {
        let right = this.findMoveableSpaces(p).right;
        let left = this.findMoveableSpaces(p).left;
        
        // If the space exists
        if (right !== null) {
            right.highlight = right.moveTo = true;
        }
        if (left !== null) {
            left.highlight = left.moveTo = true;
        }
    }

    // This method will find moveable spaces for a pawn piece
    findMoveableSpaces(p: Pawn) {
        let coordRight = p.getRightMove();
        let coordLeft = p.getLeftMove();

        // Returns an object with the right and left spaces
        return {
            right: this.checkBoardSpace(coordRight.row, coordRight.col) ? this.board[coordRight.row][coordRight.col] : null,
            left: this.checkBoardSpace(coordLeft.row, coordLeft.col) ? this.board[coordLeft.row][coordLeft.col] : null
        }

    }

    // Checks to see if a space is empty, on the board, and playable
    checkBoardSpace(row: number, col: number): boolean {
        let space: Space;

        // Check if the space is on the board
        if (row < 8 && row > -1 && col < 8 && col > -1) {
            space = this.board[row][col];
        } else {
            return false;
        }

        // Check if the space is one that a piece could move to
        if (space.piece === null && space.playable) {
            return true;
        } else {
            return false;
        }
    }

    // Finds a piece on the board and returns the space it is on
    findPiece(p: Piece): Space {
        let sp: Space = null;

        // Look through the board and see if the piece is on a space
        this.board.forEach(row => row.forEach(space => {
            if (space.piece === p) {
                sp = space;
            }
        }));

        return sp;
    }

  	// Clicking a piece on the board causes (only) that piece to be selected
  	selectAPiece(p: Piece) {
    		this.clearSelections();
    		if (p !== null ) {
      			p.selected = true;
            this.findPiece(p).highlight = true;
    		}
  	}

    // Clears all highlights from board
    clearSelections() {
        this.board.forEach(row => row.forEach(space => {
            space.highlight = space.moveTo = false;
            if (space.piece !== null) {
                space.piece.selected = false;
            }
        }));
    }

    /*
    // Place piece on board according to coordinates on the piece
    placePiece(p: Piece) {
        let row = p.row;
        let col = p.col;
        let oldSpace = this.findPiece(p);

        // First clear the piece off the old space
        oldSpace.clearPiece();

        // Then add the piece to the new space on the board
        this.board[row][col].addPiece(p);
    }
    */
}
