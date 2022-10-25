import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroasignaturaPageRoutingModule } from './registroasignatura-routing.module';

import { RegistroasignaturaPage } from './registroasignatura.page';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroasignaturaPageRoutingModule,
    ReactiveFormsModule,
    NgxQRCodeModule
  ],
  declarations: [RegistroasignaturaPage]
})
export class RegistroasignaturaPageModule {}
