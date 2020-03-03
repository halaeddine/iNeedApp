import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessesPage } from './businesses.page';

const routes: Routes = [
  {
    path: '',
    component: BusinessesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessesPageRoutingModule {}
