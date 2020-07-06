import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KayitOlPage } from './kayit-ol.page';

const routes: Routes = [
  {
    path: '',
    component: KayitOlPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KayitOlPageRoutingModule {}
