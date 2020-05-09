import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'board-root',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {
  tiles: number [];
  unavailableTiles: number [];
  emptyTiles: number [];
  won: boolean;
  snackBar$: Subscription;

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.startNewGame();
  }

  startNewGame() {
    this.tiles = [ ...Array(50).keys() ];
    this.unavailableTiles = [1, 2, 6, 7, 8, 9, 13, 14, 36, 37, 41, 42, 43, 44, 48, 49];
    this.emptyTiles = [ 25 ];
    this.won = false;
  }

  /**
   *  Core logic of the game
   *    1. checks if the move was legit
   *    2. tile movement
   *    3. checks if the player won the game
   *    4. shows winning message as snackbar
   *    5. creates new game after congratulations message is cleared
   *
   */
  move(event: {previous: number, current: number}) {
    const { previous, current} = event;
    // check for legal move
    if (!this.unavailableTiles.includes(previous) &&
          this.emptyTiles.includes(current) &&
            !this.emptyTiles.includes((previous + current) / 2) &&
            ( Math.abs(previous - current) === 2 || Math.abs(previous - current) === 14)) {
      // X-X-O ==> O-O-X
      this.emptyTiles[this.emptyTiles.indexOf(current)] = previous; // clear the moving item space
      this.emptyTiles.push((previous + current) / 2); // and clear and the one in between
      // check if we have a winner
      this.won = this.emptyTiles.length === 32;
      if (this.won) {
        const snackBarRef = this.snackBar.open('Congratulations, You Won !!!', 'NEW GAME');
        this.snackBar$ = snackBarRef.onAction().pipe(take(1)).subscribe(() => {
          this.startNewGame();
        });
      }
    }
  }

  // make sure to unsubscribe
  ngOnDestroy() {
    if (this.snackBar$) {
      this.snackBar$.unsubscribe();
    }
  }

}
