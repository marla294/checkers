import { Piece }	from './piece';

export class Space {
	playable: boolean;
	piece: Piece;
	highlight: boolean;

	constructor(play: boolean) {
		this.playable = play;
		this.piece = null;
		this.highlight = false;
	}

	// Add piece to space
	addPiece(p: Piece) {
		if (this.piece == null) {
			this.piece = p;
		}
	}

	// Clear piece out of space
	clearPiece() {
		if (this.piece != null) {
			this.piece = null;
		}
    }
}