import { Space }	from './space';

export class CheckerBoard {
	public board = new Array();

	constructor() {
		for (var i = 0; i < 8; i = i+2) {
  			let rowEven = new Array();
  			let rowOdd = new Array();
  			for (var j = 0; j < 8; j = j+2) {
  				rowEven[j] = new Space(i, j, true);
  				rowEven[j+1] = new Space(i, j+1, false);
  			}
  			for (var j = 0; j < 8; j = j+2) {
  				rowOdd[j] = new Space(i+1, j, false);
  				rowOdd[j+1] = new Space(i+1, j+1, true);
  			}
  			this.board[i] = rowEven;
  			this.board[i+1] = rowOdd;
  		}
	}
	
}