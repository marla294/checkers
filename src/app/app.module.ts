import { BrowserModule }       from '@angular/platform-browser';
import { NgModule }            from '@angular/core';

import { AppComponent }        from './app.component';
import { GameBoardComponent }  from './game-board.component';
import { GameService }	       from './game.service';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
  	GameService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
