import { Piece }	from './piece';

export class Space {
	playable: boolean;
	piece: Piece = null;
	highlight: boolean = false;
	moveTo: boolean = false; // Says whether a piece can move here or not

	constructor(play: boolean) {
		this.playable = play;
	}

	// Add piece to space
	addPiece(p: Piece) {
		if (this.piece == null) {
			this.piece = p;
		}
	}

	// Clear piece out of space by setting to null
	clearPiece() {
		if (this.piece != null) {
			this.piece = null;
		}
    }
}