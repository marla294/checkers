import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Space }	 from './space';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  	private row: Space[] = [];

  	ngOnInit() {
  		for (var i = 0; i < 8; i = i+2) {
  			this.row[i] = new Space(i, 0, true);
  			this.row[i+1] = new Space(i+1, 0, false);
  		}
  	}

}
