import { BrowserModule }       from '@angular/platform-browser';
import { NgModule }            from '@angular/core';

import { AppComponent }        from './app.component';
import { GameBoardComponent }  from './game-board.component';
import { GameConsoleComponent }  from './game-console.component';
import { GameService }	       from './game.service';
import { PawnComponent }       from './pawn.component';   
import { SpaceComponent }      from './space.component';
import { Piece }               from './piece';             

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    GameConsoleComponent,
    PawnComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
  	GameService,
    Piece
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
