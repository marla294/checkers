import { Injectable }           from '@angular/core';
import { Piece, Pawn, King }	  from './piece';
import { Space }                from './space';
import { CheckerBoard }	        from './checkerBoard';

@Injectable()
export class GameService {
  	public board: any;
    private selectedPiece: Piece = null;
    private redTurn: boolean = null;

  	constructor() {
  		  this.resetGame();
  	}

    // Resets game back to beginning
    resetGame() {
        this.board = new CheckerBoard().board;
        this.redTurn = true;
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

    // Click events for pieces and spaces

    // Click on a piece on the board
    clickAPiece(p: Piece) {
        if (this.redTurn === p.isRed) {
            this.clearSelections();
            this.selectedPiece = p;
            this.findPiece(p).highlight = true;
            this.selectMoveableSpaces(p);
        }
    }

    // Click on an empty space on the board
    clickEmptySpace(sp: Space) {
        // If the space is empty and piece can move to it
        if (this.selectedPiece !== null && sp.moveTo) { 
            this.findPiece(this.selectedPiece).clearPiece(); // First remove piece from old space
            sp.addPiece(this.selectedPiece); // Then add piece to the new space
            if (sp.jump === true) { // A piece was jumped
                this.clearJumpedPiece(sp);
            }
            if (this.isEndSpace(sp)) {
                this.makeKing(this.selectedPiece);
            }
            this.clearSelections();
            this.redTurn = !this.redTurn;
        }
    }

    // Given a space that a piece has moved to, find the piece that was jumped and clear it out
    clearJumpedPiece(sp: Space) {
        let pieces = new Array();

        pieces.push(this.getPiece(sp.row - 1, sp.col - 1));
        pieces.push(this.getPiece(sp.row - 1, sp.col + 1));
        pieces.push(this.getPiece(sp.row + 1, sp.col - 1));
        pieces.push(this.getPiece(sp.row + 1, sp.col + 1));

        this.findPiece(pieces.find(p => p !== null && p.jump === true)).clearPiece();

    }

    // Highlights and sets moveTo flag on the spaces a piece could move to
    selectMoveableSpaces(p: Piece) {
        if (p.type === "pawn") {
            let right = this.findMoveableSpaces(<Pawn>p).upRight;
            let left = this.findMoveableSpaces(<Pawn>p).upLeft;
        
            // If the space exists
            if (right !== null) {
                right.highlight = right.moveTo = true;
            }
            if (left !== null) {
                left.highlight = left.moveTo = true;
            }
        }
        if (p.type === "king") {
            let upRight = this.findMoveableSpaces(<King>p).upRight;
            let downRight = this.findMoveableSpaces(<King>p).downRight;
            let upLeft = this.findMoveableSpaces(<King>p).upLeft;
            let downLeft = this.findMoveableSpaces(<King>p).downLeft;

            // If the space exists
            if (upRight !== null) {
                upRight.highlight = upRight.moveTo = true;
            }
            if (upLeft !== null) {
                upLeft.highlight = upLeft.moveTo = true;
            }
            if (downRight !== null) {
                downRight.highlight = downRight.moveTo = true;
            }
            if (downLeft !== null) {
                downLeft.highlight = downLeft.moveTo = true;
            }

        }
    }

    // Find moveable spaces for all piece types
    findMoveableSpaces(p: Piece) {
        let spaceUpRight = this.checkBoardSpace((<Pawn>p).getUpRightMove().row, (<Pawn>p).getUpRightMove().col);
        let spaceUpLeft = this.checkBoardSpace((<Pawn>p).getUpLeftMove().row, (<Pawn>p).getUpLeftMove().col);
        let diagUpRight = this.checkBoardSpace((<Pawn>p).getDiagUpRightMove().row, (<Pawn>p).getDiagUpRightMove().col);
        let diagUpLeft = this.checkBoardSpace((<Pawn>p).getDiagUpLeftMove().row, (<Pawn>p).getDiagUpLeftMove().col);
        let spaceDownRight = null;
        let spaceDownLeft = null;
        let diagDownRight = null;
        let diagDownLeft = null;

        if (p.type === "king") {
            spaceDownRight = this.checkBoardSpace((<King>p).getDownRightMove().row, (<King>p).getDownRightMove().col);
            spaceDownLeft = this.checkBoardSpace((<King>p).getDownLeftMove().row, (<King>p).getDownLeftMove().col);
            diagDownRight = this.checkBoardSpace((<King>p).getDiagDownRightMove().row, (<King>p).getDiagDownRightMove().col);
            diagDownLeft = this.checkBoardSpace((<King>p).getDiagDownLeftMove().row, (<King>p).getDiagDownLeftMove().col);
        }

        // Returns an object with the right and left spaces
        return {
            upRight: this.getDiagMoveSpace(p, spaceUpRight, diagUpRight),
            downRight: this.getDiagMoveSpace(p, spaceDownRight, diagDownRight),
            upLeft: this.getDiagMoveSpace(p, spaceUpLeft, diagUpLeft),
            downLeft: this.getDiagMoveSpace(p, spaceDownLeft, diagDownLeft) 
        }
    }

    // Given a row and column that may or may not be on the board, check if it is on the board.  If it is return the space.
    checkBoardSpace(row: number, col: number): Space {
        if (row < 8 && row > -1 && col < 8 && col > -1) {
            return this.board[row][col];
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

    // King stuff

    // When a pawn makes it to the end of the board, replace the pawn piece with a king piece
    makeKing(p: Piece) {
        let king = new King(p.isRed === true ? 'red' : 'black', p.row, p.col);
        let space = this.findPiece(p);

        space.clearPiece();
        space.addPiece(king);
    }

    // Given a space, return true if it is in an end row and false if it is not
    isEndSpace(sp: Space): boolean {
        if (sp.row === 0 || sp.row === 7) {
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

    // Given a row and column, return a piece if there is one
    getPiece(row: number, col: number): Piece {
        let space = this.checkBoardSpace(row, col);

        if (space !== null && space.piece !== null) {
            return space.piece;
        } else {
            return null;
        }
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
