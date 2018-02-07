import { Component } 	from '@angular/core';
import { OnInit } 		from '@angular/core';
import { Piece }	 	from './piece';
import { GameService }	from './game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  	public board: any;

  	constructor(
  		private service: GameService
  	) {}

  	ngOnInit() {
  		this.service.resetGame();
  		this.board = this.service.board;
  	}

}
