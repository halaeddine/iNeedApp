import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyBusinessesPageRoutingModule } from './my-businesses-routing.module';

import { MyBusinessesPage } from './my-businesses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyBusinessesPageRoutingModule
  ],
  declarations: [MyBusinessesPage]
})
export class MyBusinessesPageModule {}
