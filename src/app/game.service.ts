import { Injectable }     from '@angular/core';
import { Piece, Pawn }	  from './piece';
import { Space }          from './space';
import { CheckerBoard }	  from './checkerBoard';
import { Coord }          from './coord';

@Injectable()
export class GameService {
  	public board: any;
    private selectedPiece: Piece = null;

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
        this.selectedPiece = p;
        this.findPiece(p).highlight = true;
        this.selectMoveableSpaces(p);
    }

    // Click on an empty space on the board
    clickEmptySpace(s: Space) {
        // If the space is empty and piece can move to it
        if (this.selectedPiece !== null && s.moveTo) { 
            this.findPiece(this.selectedPiece).clearPiece(); // First remove piece from old space
            s.addPiece(this.selectedPiece); // Then add piece to the new space
            this.clearSelections();
        }
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
        let coordDiagRight = p.getDiagRightMove();
        let coordDiagLeft = p.getDiagLeftMove();
        // Spaces right and left
        let spaceRight: Space = this.getBoardSpace(coordRight.row, coordRight.col);
        let spaceLeft: Space = this.getBoardSpace(coordLeft.row, coordLeft.col);

        if (spaceRight !== null && spaceRight.piece !== null) {
            let diagRight = this.getBoardSpace(coordDiagRight.row, coordDiagRight.col);
            if (diagRight !== null) {
                spaceRight = diagRight.piece === null ? diagRight : null;
            } else {
                spaceRight = null;
            }
        }

        if (spaceLeft !== null && spaceLeft.piece !== null) {
            let diagLeft = this.getBoardSpace(coordDiagLeft.row, coordDiagLeft.col);
            if (diagLeft !== null) {
                spaceLeft = diagLeft.piece === null ? diagLeft : null;
            } else {
                spaceLeft = null;
            }
        }

        // Returns an object with the right and left spaces
        return {
            right: spaceRight,
            left: spaceLeft
        }

    }

    // Given a row and column that may or may not be on the board, check if it is on the board.  If it is return the space
    getBoardSpace(row: number, col: number): Space {

        if (row < 8 && row > -1 && col < 8 && col > -1) {
            return this.board[row][col];
        } else {
            return null;
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

    // Clears all highlights and selected pieces from board
    clearSelections() {
        this.board.forEach(row => row.forEach(space => {
            space.highlight = space.moveTo = false;
        }));
        this.selectedPiece = null;
    }

}
