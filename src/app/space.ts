import { Piece }	from './piece';

export class Space {
	row: number;
	col: number;
	playable: boolean;
	piece: Piece;
	isEmpty: boolean;
	highlight: boolean;
	moveTo: boolean;
	jump: boolean;

	constructor(r: number, c: number, play: boolean) {
		this.row = r;
		this.col = c;
		this.playable = play;
		this.piece = null;
		this.isEmpty = true;
		this.highlight = false;
		this.moveTo = false;
		this.jump = false;
	}
}