import { Component } 	         from '@angular/core';
import { GameBoardComponent }    from './game-board.component';
import { GameConsoleComponent }  from './game-console.component';
import { GameService }	   		 from './game.service';
import { Observable }      		 from 'rxjs/Observable';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
	isWinner = false;

	// Observables
    public resetGame$: Observable<boolean>;

	constructor(
  		  private service: GameService
  	) {}
}