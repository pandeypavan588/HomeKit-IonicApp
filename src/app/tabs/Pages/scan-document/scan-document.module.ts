import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScanDocumentPageRoutingModule } from './scan-document-routing.module';

import { ScanDocumentPage } from './scan-document.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScanDocumentPageRoutingModule
  ],
  declarations: [ScanDocumentPage]
})
export class ScanDocumentPageModule {}
