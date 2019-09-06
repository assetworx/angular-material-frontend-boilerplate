import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatSnackBarModule,
  MatTableModule,
  MatToolbarModule,
  MatSortModule,
  MatPaginatorModule,
  MatInputModule
} from '@angular/material';

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
