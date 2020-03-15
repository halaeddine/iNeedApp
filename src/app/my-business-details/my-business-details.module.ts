import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyBusinessDetailsPageRoutingModule } from './my-business-details-routing.module';

import { MyBusinessDetailsPage } from './my-business-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyBusinessDetailsPageRoutingModule
  ],
  declarations: [MyBusinessDetailsPage]
})
export class MyBusinessDetailsPageModule {}
