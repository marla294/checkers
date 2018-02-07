import { Coord }	from './coord';

export class Piece {
	isRed: boolean = true;
	inPlay: boolean = true;
	selected: boolean = false;
	row: number = null;
	col: number = null;

	constructor(color: string, r: number, c: number) {
		if (color === "black") {
			this.isRed = false;
		} else if (color === "red") {
			this.isRed = true;
		}
		this.row = r;
		this.col = c;
	}

	// Generic move piece function
	movePiece(r: number, c: number) {
		this.row = r;
		this.col = c;
	}

	killPiece() {
		this.inPlay = false;
		this.row = null;
		this.col = null;
	}
}

export class Pawn extends Piece {

	movePieceRight() {
		this.col++;
		this.isRed ? this.row++ : this.row--;
	}

	movePieceLeft() {
		this.col--;
		this.isRed ? this.row++ : this.row--;
	}

	jumpRight() {
		this.col = this.col + 2;
		this.row = this.isRed ? this.row + 2 : this.row - 2;
	}

	jumpLeft() {
		this.col = this.col - 2;
		this.row = this.isRed ? this.row + 2 : this.row - 2;
	}
}
