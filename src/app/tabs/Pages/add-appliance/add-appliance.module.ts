import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAppliancePageRoutingModule } from './add-appliance-routing.module';

import { AddAppliancePage } from './add-appliance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAppliancePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddAppliancePage]
})
export class AddAppliancePageModule {}
