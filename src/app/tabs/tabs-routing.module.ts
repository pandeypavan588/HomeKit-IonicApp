import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/gaurds/auth.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'account',
        loadChildren: () => import('./Pages/account/account.module').then( m => m.AccountPageModule)
      },
      {
        path: 'home',
        canActivate: [AuthGuard],
        loadChildren: () => import('./Pages/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'news-feed',
        loadChildren: () => import('./Pages/news-feed/news-feed.module').then( m => m.NewsFeedPageModule)
      },
      {
        path: 'appliance',
        loadChildren: () => import('./Pages/appliance/appliance.module').then( m => m.AppliancePageModule)
      },
      {
        path: 'scan-document',
        loadChildren: () => import('./Pages/scan-document/scan-document.module').then( m => m.ScanDocumentPageModule)
      },
      
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  },
  
 
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
