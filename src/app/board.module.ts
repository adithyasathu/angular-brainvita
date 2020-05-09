import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BoardComponent } from './board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { DragDropDirective } from './directives/drag-drop.directive';

@NgModule({
  declarations: [
    BoardComponent,
    DragDropDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  bootstrap: [BoardComponent]
})
export class BoardModule { }
