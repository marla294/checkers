export class Piece {
	id: number;
	color: string;
	king: boolean;
	inPlay: boolean;

	constructor(id1: number, c: string, k: boolean, i: boolean) {
		this.id = id1;
		this.color = c;
		this.king = k;
		this.inPlay = i;
	}
}