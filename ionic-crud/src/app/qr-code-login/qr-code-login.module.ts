import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrCodeLoginPageRoutingModule } from './qr-code-login-routing.module';

import { QrCodeLoginPage } from './qr-code-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrCodeLoginPageRoutingModule
  ],
  declarations: [QrCodeLoginPage]
})
export class QrCodeLoginPageModule {}
