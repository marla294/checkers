// This will be on the side of the actual checkers game board, showing things like the reset button, whose turn it is, and whether someone has won the game or not
import { Component, OnInit }	from '@angular/core';
import { GameService }			from './game.service';
import { Observable }			from 'rxjs/Observable';

@Component({
  selector: 'game-console',
  templateUrl: './game-console.component.html',
  styleUrls: ['./game-console.component.css'],
})
export class GameConsoleComponent implements OnInit {
	public redTurn$: Observable<boolean>;
	public turn: string = null;
	
	constructor(
	  	private service: GameService
	) {}

	ngOnInit() {
		this.redTurn$ = this.service.redTurnObs;
		this.redTurn$.subscribe(redTurn => {
			this.turn = redTurn ? 'Red' : 'Black';
		});
	}

	resetGame() {
		this.service.resetGame();
	}

	/*
	getTurn() {
		this.turn = this.service.redTurn ? 'Red' : 'Black';
	}
	*/

}