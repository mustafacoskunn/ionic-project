import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrCodeLoginPage } from './qr-code-login.page';

const routes: Routes = [
  {
    path: '',
    component: QrCodeLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrCodeLoginPageRoutingModule {}
