import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPage } from './auth.page';
import { AuthGuard } from './gaurds/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthPage,
    children: [
      {
        path: 'login',
        
        loadChildren: () => import('./auth-pages/login/login.module').then( m => m.LoginPageModule),
      },
      {
        path: 'register',
        loadChildren: () => import('./auth-pages/register/register.module').then( m => m.RegisterPageModule)
      },
      {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full'
      }

    ]
  },
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
