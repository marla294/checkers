import { Piece, Pawn }	from './piece';
import { CheckerBoard }	from './checkerBoard';

export class Game {
	public board: any;
	public redPieces = new Array();
	public blackPieces = new Array();

	constructor() {
		this.board = new CheckerBoard().board;
		var id = 1;
  		for (var i = 0; i < 3; i++) {
  			for (var j = 0; j < 8; j++) {
  				if (this.board[i][j].playable == true) {
  					this.redPieces.push(new Pawn(id, 'red', false, true, i, j));
  					id++;
  				}
  			}
  		}
  		for (var i = 5; i < 8; i++) {
  			for (var j = 0; j < 8; j++) {
  				if (this.board[i][j].playable == true) {
  					this.blackPieces.push(new Pawn(id, 'black', false, true, i, j));
  					id++;
  				}
  			}
  		}
	}
}