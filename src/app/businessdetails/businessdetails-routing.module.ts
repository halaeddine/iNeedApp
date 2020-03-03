import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessdetailsPage } from './businessdetails.page';

const routes: Routes = [
  {
    path: '',
    component: BusinessdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessdetailsPageRoutingModule {}
