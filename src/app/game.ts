export class Game {
	currentTurn: string;
	redScore: number;
	blackScore: number;

	constructor(turn: string = "red", red: number = 0, black: number = 0) {
		this.currentTurn = turn;
		this.redScore = red;
		this.blackScore = black;
	}
}