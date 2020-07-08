import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentEditPageRoutingModule } from './student-edit-routing.module';

import { StudentEditPage } from './student-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentEditPageRoutingModule,
    TranslateModule
  ],
  declarations: [StudentEditPage]
})
export class StudentEditPageModule {}
