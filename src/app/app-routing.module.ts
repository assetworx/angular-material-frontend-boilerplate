import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TableExampleComponent } from './components/table-example/table-example.component';

// List of all routes with a redirect to it's component
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'table', component: TableExampleComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
