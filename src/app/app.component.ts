import { Component } 	         from '@angular/core';
import { GameBoardComponent }    from './game-board.component';
import { GameConsoleComponent }  from './game-console.component';
import { GameService }	   		 from './game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
	isWinner = false;

	constructor(
  		  private service: GameService
  	) {}

	onReset() {
		this.service.resetGame();
	}

}