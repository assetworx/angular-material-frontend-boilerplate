import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { 
    path: '', 
    canActivate: [AuthGuard],
    loadChildren: () => import(`./modules/home/home.module`).then(
      module => module.HomeModule
    )
  },
  { 
    path: 'users', 
    canActivate: [],
    loadChildren: () => import(`./modules/auth/auth.module`).then(
      module => module.AuthModule
    )
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
