import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioclasePageRoutingModule } from './inicioclase-routing.module';

import { InicioclasePage } from './inicioclase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioclasePageRoutingModule
  ],
  declarations: [InicioclasePage]
})
export class InicioclasePageModule {}
