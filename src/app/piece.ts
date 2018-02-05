export class Piece {
	id: number;
	isRed: boolean = true;
	king: boolean;
	inPlay: boolean;
	row: number = null;
	col: number = null;

	constructor(id1: number, color: string, k: boolean, i: boolean, r: number, c: number) {
		this.id = id1;
		this.king = k;
		this.inPlay = i;
		this.row = r;
		this.col = c;

		if (color == "black") {
			this.isRed = false;
		} else if (color == "red") {
			this.isRed = true;
		}
	}

	// Move -> ^
	moveUpRight() {
		this.row--;
		this.col++;
	}

	// Generic move piece function
	movePiece(r: number, c: number) {
		this.row = r;
		this.col = c;
	}
}