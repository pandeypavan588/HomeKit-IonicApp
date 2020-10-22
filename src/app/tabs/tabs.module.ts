import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { AuthPageModule } from '../auth/auth.module';
import { ApplianceService } from '../services/appliance/appliance.service';
import { FirebaseService } from '../services/firebase/firebase.service';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    AuthPageModule,
    
  ],
  declarations: [TabsPage],
  providers: [
    ApplianceService,
    FirebaseService
  ]
})
export class TabsPageModule {}
