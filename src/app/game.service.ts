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
            if (sp.jump === false || !this.checkForJump(sp)) { // if I didn't just jump or there is no jump
                this.redTurn = !this.redTurn;
            }
            this.clearSelections();
        }
    }

    // Check and see if there is a potential jump opportunity, for multi jump
    checkForJump(sp: Space): boolean {
        let p = sp.piece;
        let upRight = this.calcDiag(p, true, true);
        let upLeft = this.calcDiag(p, true, false);
        let downRight = this.calcDiag(p, false, true);
        let downLeft = this.calcDiag(p, false, false);

        if (this.canJump(p, upRight.sp, upRight.diag) || 
            this.canJump(p, upLeft.sp, upLeft.diag) ||
            this.canJump(p, downRight.sp, downRight.diag) || 
            this.canJump(p, downLeft.sp, downLeft.diag) ) {
            return true;
        } else {
            return false;
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

    // Find moveable spaces for all piece types, highlight and set moveTo flag
    selectMoveableSpaces(p: Piece) {
        // Calculating the 4 "diagonals" of the piece
        let upRightDiag = this.calcDiag(p, true, true);
        let downRightDiag = this.calcDiag(p, false, true);
        let upLeftDiag = this.calcDiag(p, true, false);
        let downLeftDiag = this.calcDiag(p, false, false);

        // Calculating the 4 potential move spaces of the piece
        let upRight = this.getDiagMoveSpace(p, upRightDiag.sp, upRightDiag.diag);
        let downRight = this.getDiagMoveSpace(p, downRightDiag.sp, downRightDiag.diag);
        let upLeft = this.getDiagMoveSpace(p, upLeftDiag.sp, upLeftDiag.diag);
        let downLeft = this.getDiagMoveSpace(p, downLeftDiag.sp, downLeftDiag.diag);

        // If any of the potential move spaces exist, highlight and set moveTo flag
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

    // Given a row and column that may or may not be on the board, check if it is on the board.  If it is return the space.
    checkBoardSpace(row: number, col: number): Space {
        if (row < 8 && row > -1 && col < 8 && col > -1) {
            return this.board[row][col];
        } else {
            return null;
        }
    }

    // Diagonal stuff

    // Given a piece, and the direction, calculate the "diagonal" - the spaces on the right or left diagonally
    // Returns the piece on the space, the neighbor space and the space 2 up
    calcDiag(p: Piece, up: boolean, right: boolean) {
        let neighborRow = -1; // -1 means not on board
        let neighborCol = -1;
        let neighborSp = null;

        let diagRow = -1;
        let diagCol = -1;
        let diagSp = null;

        if (up) {
            if (right) {
                neighborRow = (<Pawn>p).getUpRightMove().row;
                neighborCol = (<Pawn>p).getUpRightMove().col;
                diagRow = (<Pawn>p).getDiagUpRightMove().row;
                diagCol = (<Pawn>p).getDiagUpRightMove().col;
            }
            if (!right) {
                neighborRow = (<Pawn>p).getUpLeftMove().row;
                neighborCol = (<Pawn>p).getUpLeftMove().col;
                diagRow = (<Pawn>p).getDiagUpLeftMove().row;
                diagCol = (<Pawn>p).getDiagUpLeftMove().col;
            }
        } else if (!up && p.type === "king") {
            if (right) {
                neighborRow = (<King>p).getDownRightMove().row;
                neighborCol = (<King>p).getDownRightMove().col;
                diagRow = (<King>p).getDiagDownRightMove().row;
                diagCol = (<King>p).getDiagDownRightMove().col;
            }
            if (!right) {
                neighborRow = (<King>p).getDownLeftMove().row;
                neighborCol = (<King>p).getDownLeftMove().col;
                diagRow = (<King>p).getDiagDownLeftMove().row;
                diagCol = (<King>p).getDiagDownLeftMove().col;
            }
        }

        neighborSp = this.checkBoardSpace(neighborRow, neighborCol);
        diagSp = this.checkBoardSpace(diagRow, diagCol);

        return {
            p: p,
            sp: neighborSp,
            diag: diagSp
        }
    }

    // Can Jump - returns true if you can jump, if not then false
    canJump(p: Piece, sp: Space, diag: Space): boolean {
        if (sp === null || diag === null || sp.piece === null) {
            return false;
        } else if (p.isRed === !sp.piece.isRed && diag !== null && diag.piece === null) {
            return true;
        } else {
            return false;
        }
    }

    // Given a diagonal (a space and the next space up) return the space you can move to or null if you can't move
    getDiagMoveSpace(p: Piece, sp: Space, diag: Space): Space {
        let space: Space = null;

        if (sp !== null) {
            if (sp.piece === null) { // nextdoor is empty
                space = sp;
            } else if (this.canJump(p, sp, diag)) { // piece to jump
                sp.piece.jump = diag.jump = true; // set jump flag on piece to jump and diag space
                space = diag;
            } else { // can't move down this diag
                space = null;
            }
        }

        return space;
    }

    // Give a diagonal return space you can jump to or null if you can't jump
    getJumpSpace(p: Piece, sp: Space, diag: Space): Space {
        let space: Space = null;

        if (sp !== null) {
            if (this.canJump(p, sp, diag)) { // piece to jump
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
            space.highlight = space.moveTo = space.jump = false;
            if (space.piece !== null) {
                space.piece.jump = false;
            }
        }));
        this.selectedPiece = null;
    }
}
