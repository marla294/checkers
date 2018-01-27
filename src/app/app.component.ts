import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Space }	 from './space';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  	//private row: Space[] = [];
  	private board = new Array();

  	ngOnInit() {
  		for (var i = 0; i < 8; i = i+2) {
  			let rowEven = new Array();
  			let rowOdd = new Array();
  			for (var j = 0; j < 8; j = j+2) {
  				rowEven[j] = new Space(0, j, true);
  				rowEven[j+1] = new Space(0, j+1, false);
  			}
  			for (var j = 0; j < 8; j = j+2) {
  				rowOdd[j] = new Space(0, j, false);
  				rowOdd[j+1] = new Space(0, j+1, true);
  			}
  			this.board[i] = rowEven;
  			this.board[i+1] = rowOdd;
  		}
  		console.log(this.board);
  	}

}
