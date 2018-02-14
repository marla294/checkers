import { Component } 	         from '@angular/core';
import { OnInit } 		         from '@angular/core';
import { GameBoardComponent }    from './game-board.component';
import { GameConsoleComponent }  from './game-console.component';
import { GameService }	   		 from './game.service';
import { Observable }      		 from 'rxjs/Observable';
import { BehaviorSubject }       from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
	isWinner = false;

	// Observables
    public isWinner$: Observable<boolean>;

    // Behavior Subjects
	public _resetGame: BehaviorSubject<boolean>;

	constructor(
  		  private service: GameService
  	) {}

  	ngOnInit() {
  		// Observables
  		this.isWinner$ = this.service.isWinnerObs;

  		// Behavior Subjects
		this._resetGame = this.service.resetGameBeh;
  	}

	onReset() {
		this._resetGame.next(true);
	}

}