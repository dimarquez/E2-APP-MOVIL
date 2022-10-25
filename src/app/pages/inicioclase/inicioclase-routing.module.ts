import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioclasePage } from './inicioclase.page';

const routes: Routes = [
  {
    path: '',
    component: InicioclasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioclasePageRoutingModule {}
