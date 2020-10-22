import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppliancePageRoutingModule } from './appliance-routing.module';

import { AppliancePage } from './appliance.page';
import { AddAppliancePage } from '../add-appliance/add-appliance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppliancePageRoutingModule
  ],
  declarations: [AppliancePage,AddAppliancePage],
  
})
export class AppliancePageModule {}
