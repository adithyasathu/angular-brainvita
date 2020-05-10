import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  exports: [
    MatGridListModule,
    MatButtonModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule
  ]
})
export class MaterialModule { }
