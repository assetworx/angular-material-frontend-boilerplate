import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

// Add all the Angular Material components you wish to import here.
// They will automatically be added to module imports/exports.
const matImportsExports = [
  MatButtonModule,
  MatSnackBarModule,
  MatTableModule,
  MatToolbarModule,
  MatSortModule,
  MatPaginatorModule,
  MatInputModule
];

// Declare the Material Module
@NgModule({
  declarations: [],
  imports: matImportsExports,
  exports: matImportsExports
})
export class MaterialModule { }
