export class Space {
	row: number;
	col: number;
	playable: boolean;

	constructor(public r: number, public c: number, public play: boolean) {
		this.row = r;
		this.col = c;
		this.playable = play;
	}
}