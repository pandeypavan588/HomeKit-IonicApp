import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScanDocumentPage } from './scan-document.page';

const routes: Routes = [
  {
    path: '',
    component: ScanDocumentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScanDocumentPageRoutingModule {}
