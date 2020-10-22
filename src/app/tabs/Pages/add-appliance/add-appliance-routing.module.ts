import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAppliancePage } from './add-appliance.page';

const routes: Routes = [
  {
    path: '',
    component: AddAppliancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAppliancePageRoutingModule {}
