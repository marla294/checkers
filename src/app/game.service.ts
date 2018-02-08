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
    clickEmptySpace(sp: Space) {
        // If the space is empty and piece can move to it
        if (this.selectedPiece !== null && sp.moveTo) { 
            this.findPiece(this.selectedPiece).clearPiece(); // First remove piece from old space
            sp.addPiece(this.selectedPiece); // Then add piece to the new space
            if (sp.jump === true) { // A piece was jumped
                this.clearJumpedPiece(this.findJumpedPiece(sp));
            }
            this.clearSelections();
        }
    }

    // Given a space that a piece has moved to, find the piece that was jumped
    findJumpedPiece(sp: Space): Piece {
        let pieces = new Array();

        pieces.push(this.getPiece(sp.row - 1, sp.col - 1));
        pieces.push(this.getPiece(sp.row - 1, sp.col + 1));
        pieces.push(this.getPiece(sp.row + 1, sp.col - 1));
        pieces.push(this.getPiece(sp.row + 1, sp.col + 1));

        return pieces.find(p => p !== null && p.jump === true);

    }

    // Clear the jumped piece from the board
    clearJumpedPiece(p: Piece) {
        this.board[p.row][p.col].clearPiece();
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
        // Spaces right and left
        let spaceRight = this.getBoardSpace(p.getRightMove().row, p.getRightMove().col);
        let spaceLeft = this.getBoardSpace(p.getLeftMove().row, p.getLeftMove().col);
        let diagRight = this.getBoardSpace(p.getDiagRightMove().row, p.getDiagRightMove().col);
        let diagLeft = this.getBoardSpace(p.getDiagLeftMove().row, p.getDiagLeftMove().col);

        // Returns an object with the right and left spaces
        return {
            right: this.getDiagMoveSpace(p, spaceRight, diagRight),
            left: this.getDiagMoveSpace(p, spaceLeft, diagLeft)
        }

    }

    // Given a row and column that may or may not be on the board, check if it is on the board.  If it is return the space.
    getBoardSpace(row: number, col: number): Space {
        if (row < 8 && row > -1 && col < 8 && col > -1) {
            return this.board[row][col];
        } else {
            return null;
        }
    }

    // Given a row and column, return a piece if there is one
    getPiece(row: number, col: number): Piece {
        let space = this.getBoardSpace(row, col);

        if (space !== null && space.piece !== null) {
            return space.piece;
        } else {
            return null;
        }
    }

    // Given a diagonal (a space and the next space up) return the space you can move to or null if you can't move
    getDiagMoveSpace(p: Piece, sp: Space, diag: Space): Space {
        let space: Space = null;

        if (sp !== null) {
            if (sp.piece === null) { // nextdoor is empty
                space = sp;
            } else if (p.isRed === !sp.piece.isRed && diag !== null && diag.piece === null) { // piece to jump
                sp.piece.jump = diag.jump = true; // set jump flag on piece to jump and diag space
                space = diag;
            } else { // can't move down this diag
                space = null;
            }
        }

        return space;
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

    // Clears all highlights, direction flags, and selected pieces from board
    clearSelections() {
        this.board.forEach(row => row.forEach(space => {
            space.highlight = space.moveTo = false;
            space.jump = false;
            if (space.piece !== null) {
                space.piece.jump = false;
            }
        }));
        this.selectedPiece = null;
    }

}
