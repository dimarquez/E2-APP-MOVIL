import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroasignaturaPage } from './registroasignatura.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroasignaturaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroasignaturaPageRoutingModule {
  
}
