export class Piece {
	id: number;
	isRed: boolean = true;
	king: boolean;
	inPlay: boolean;
	moveDir: string;
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
}

export class Pawn extends Piece {

}

export class King extends Piece {

}