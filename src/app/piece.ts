export class Piece {
	id: number;
	isRed: boolean = true;
	king: boolean;
	inPlay: boolean;

	constructor(id1: number, c: string, k: boolean, i: boolean) {
		this.id = id1;
		this.king = k;
		this.inPlay = i;

		if (c == "black") {
			this.isRed = false;
		} else if (c == "red") {
			this.isRed = true;
		}
	}
}