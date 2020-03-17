import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyBusinessDetailsPage } from './my-business-details.page';

const routes: Routes = [
  {
    path: '',
    component: MyBusinessDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyBusinessDetailsPageRoutingModule {}
