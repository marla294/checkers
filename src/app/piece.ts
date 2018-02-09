import { Coord }	from './coord';

export class Piece {
	type: string = 'piece';
	isRed: boolean = true;
	jump: boolean = false; // Says whether the piece was jumped or not
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
}

export class Pawn extends Piece {
	type: string = "pawn";

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

export class King extends Piece {
	type: string = "king";

	// Nextdoor space moves
	getUpRightMove(): Coord {
		let col = this.col + 1;
		let row = this.row - 1;
		return new Coord(row, col);
	}

	getUpLeftMove(): Coord {
		let col = this.col - 1;
		let row = this.row - 1;
		return new Coord(row, col);
	}

	getDownRightMove(): Coord {
		let col = this.col + 1;
		let row = this.row + 1;
		return new Coord(row, col);
	}

	getDownLeftMove(): Coord {
		let col = this.col - 1;
		let row = this.row + 1;
		return new Coord(row, col);
	}

	// Diag moves
	getDiagUpRightMove(): Coord {
		let col = this.col + 2;
		let row = this.row - 2;
		return new Coord(row, col);
	}

	getDiagUpLeftMove(): Coord {
		let col = this.col - 2;
		let row = this.row - 2;
		return new Coord(row, col);
	}

	getDiagDownRightMove(): Coord {
		let col = this.col + 2;
		let row = this.row + 2;
		return new Coord(row, col);
	}

	getDiagDownLeftMove(): Coord {
		let col = this.col - 2;
		let row = this.row + 2;
		return new Coord(row, col);
	}
}
