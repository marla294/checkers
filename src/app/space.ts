import { Piece }	from './piece';

export class Space {
	playable: boolean;
	piece: Piece;
	isEmpty: boolean;
	highlight: boolean;

	constructor(play: boolean) {
		this.playable = play;
		this.piece = null;
		this.isEmpty = true;
		this.highlight = false;
	}
}