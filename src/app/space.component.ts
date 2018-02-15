import { Component, Input }	from '@angular/core';
import { Space }			from './space';
import { GameService }	   	from './game.service';

@Component({
  	selector: 'space',
  	templateUrl: './space.component.html',
  	styleUrls: ['./space.component.css'],
})
export class SpaceComponent {
	@Input() space: Space;

	constructor(
  		private service: GameService
  	) {}
}