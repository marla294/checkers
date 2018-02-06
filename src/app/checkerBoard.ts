import { Space }	from './space';

export class CheckerBoard {
	public board = new Array();

	constructor() {
		for (var i = 0; i < 8; i = i+2) {
  			let rowEven = new Array();
  			let rowOdd = new Array();
  			for (var j = 0; j < 8; j = j+2) {
  				rowEven[j] = new Space(true);
  				rowEven[j+1] = new Space(false);
  			}
  			for (var j = 0; j < 8; j = j+2) {
  				rowOdd[j] = new Space(false);
  				rowOdd[j+1] = new Space(true);
  			}
  			this.board[i] = rowEven;
  			this.board[i+1] = rowOdd;
  		}
	}

  // Checks to see if a space is empty, on the board, and playable
  checkBoardSpace(row: number, col: number): boolean {
    var space: Space;

    if (row < 8 && row > -1 && col < 8 && col > -1) {
      space = this.board[row][col];
    } else {
      return false;
    }

      if (space.isEmpty && space.playable) {
        return true;
      } else {
        return false;
      }
  }
	
}