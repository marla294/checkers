export class Piece {
	id: number;
	isRed: boolean = true;
	king: boolean;
	inPlay: boolean;
	moveDir: string;
	selected: boolean;
	row: number = null;
	col: number = null;

	constructor(id1: number, color: string, k: boolean, i: boolean, r: number, c: number) {
		this.id = id1;
		this.king = k;
		this.inPlay = i;
		this.row = r;
		this.col = c;
		this.selected = false;

		if (color == "black") {
			this.isRed = false;
			this.moveDir = "up";
		} else if (color == "red") {
			this.isRed = true;
			this.moveDir = "down";
		}
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

export class King extends Piece {

}