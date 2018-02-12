// This will be a component that houses the actual checkers game board
import { Component }	from '@angular/core';
import { OnInit } 		from '@angular/core';
import { Piece }	 	from './piece';
import { GameService }	from './game.service';

@Component({
  selector: 'game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css'],
})
export class GameBoardComponent implements OnInit {
	public board: any;

  	constructor(
  		private service: GameService
  	) {}

  	ngOnInit() {
  		this.onReset();
  	}

    onReset() {
      this.service.resetGame();
      this.board = this.service.board;
    }
}