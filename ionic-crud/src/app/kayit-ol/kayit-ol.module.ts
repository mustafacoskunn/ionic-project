import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KayitOlPageRoutingModule } from './kayit-ol-routing.module';

import { KayitOlPage } from './kayit-ol.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KayitOlPageRoutingModule
  ],
  declarations: [KayitOlPage]
})
export class KayitOlPageModule {}
