import { Coord }	from './coord';

export class Piece {
	isRed: boolean = true;
	inPlay: boolean = true;
	row: number = null;
	col: number = null;
	isRight: boolean = false;
	jump: boolean = false;

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

	getRightMove(): Coord {
		let col = this.col + 1;
		let row = this.isRed ? this.row + 1 : this.row - 1;
		return new Coord(row, col);
	}

	getLeftMove(): Coord {
		let col = this.col - 1;
		let row = this.isRed ? this.row + 1 : this.row - 1;
		return new Coord(row, col);
	}

	getDiagRightMove(): Coord {
		let col = this.col + 2;
		let row = this.isRed ? this.row + 2 : this.row - 2;
		return new Coord(row, col);
	}

	getDiagLeftMove(): Coord {
		let col = this.col - 2;
		let row = this.isRed ? this.row + 2 : this.row - 2;
		return new Coord(row, col);
	}
}
