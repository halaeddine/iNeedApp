import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessdetailsPageRoutingModule } from './businessdetails-routing.module';

import { BusinessdetailsPage } from './businessdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusinessdetailsPageRoutingModule
  ],
  declarations: [BusinessdetailsPage]
})
export class BusinessdetailsPageModule {}
