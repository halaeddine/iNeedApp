import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyBusinessesPage } from './my-businesses.page';

const routes: Routes = [
  {
    path: '',
    component: MyBusinessesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyBusinessesPageRoutingModule {}
