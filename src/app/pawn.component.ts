import { Component }	from '@angular/core';
import { Piece }		from './piece';

@Component({
  selector: 'pawn',
  templateUrl: './pawn.component.html',
  styleUrls: ['./pawn.component.css'],
})
export class PawnComponent extends Piece {
	type: string = "pawn";

	// Nextdoor space moves
	getUpRightMove() {
		let col = this.col + 1;
		let row = this.isRed ? this.row + 1 : this.row - 1;
		return {row, col};
	}

	getUpLeftMove() {
		let col = this.col - 1;
		let row = this.isRed ? this.row + 1 : this.row - 1;
		return {row, col};
	}

	// Diag moves
	getDiagUpRightMove() {
		let col = this.col + 2;
		let row = this.isRed ? this.row + 2 : this.row - 2;
		return {row, col};
	}

	getDiagUpLeftMove() {
		let col = this.col - 2;
		let row = this.isRed ? this.row + 2 : this.row - 2;
		return {row, col};
	}
}