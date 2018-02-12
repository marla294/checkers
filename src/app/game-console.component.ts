// This will be on the side of the actual checkers game board, showing things like the reset button, whose turn it is, and whether someone has won the game or not
import { Component }	from '@angular/core';
import { GameService }	from './game.service';

@Component({
  selector: 'game-console',
  templateUrl: './game-console.component.html',
  styleUrls: ['./game-console.component.css'],
})
export class GameConsoleComponent {
	
	constructor(
	  	private service: GameService
	) {}

}