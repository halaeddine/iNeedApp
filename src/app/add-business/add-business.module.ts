import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddBusinessPageRoutingModule } from './add-business-routing.module';

import { AddBusinessPage } from './add-business.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddBusinessPageRoutingModule
  ],
  declarations: [AddBusinessPage]
})
export class AddBusinessPageModule {}
